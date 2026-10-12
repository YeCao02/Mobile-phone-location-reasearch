"""Build a public full-text access desk from the current pending category."""
from pathlib import Path
import json, re, html, csv
from urllib.parse import urlparse, quote

ROOT = Path(__file__).resolve().parent
PROXIES = {
    'www.sciencedirect.com': 'www-sciencedirect-com-443.webvpn.scut.edu.cn',
    'link.springer.com': 'link-springer-com-443.webvpn.scut.edu.cn',
    'www.nature.com': 'www-nature-com-443.webvpn.scut.edu.cn',
    'www.tandfonline.com': 'www-tandfonline-com-443.webvpn.scut.edu.cn',
    'onlinelibrary.wiley.com': 'onlinelibrary-wiley-com.webvpn.scut.edu.cn:443',
}

def build():
    text = (ROOT/'index.html').read_text(encoding='utf-8')
    data = json.loads(re.search(r'<script id="evidence-data" type="application/json">(.*?)</script>', text, re.S).group(1))
    pending = set(data['browse']['pending_ids'])
    catalog = {r['id']: r for r in json.loads((ROOT/'data/literature_catalog.json').read_text(encoding='utf-8-sig'))['records']}
    additions_path = ROOT/'data/pending-access-additions.json'
    additions = {r['id']:r for r in json.loads(additions_path.read_text(encoding='utf-8'))['records']} if additions_path.exists() else {}
    rows = []
    for rid in data['browse']['pending_ids']:
        r = catalog[rid]
        extra = additions.get(rid, {})
        doi = extra.get('doi') or r.get('doi', '')
        url = extra.get('url') or r.get('evidence_url') or ('https://doi.org/'+doi if doi else '')
        # DOI resolvers remain useful fallbacks, but do not invent publisher PII identifiers.
        title = extra.get('corrected_title') or r['title']
        search_only = not url or extra.get('status') == 'unresolved_title_search_only'
        if search_only: url = 'https://scholar.google.com/scholar?q='+quote('"'+title+'"')
        if urlparse(url).hostname == 'doi.org':
            if doi.startswith('10.1038/'): url='https://www.nature.com/articles/'+doi.split('/',1)[1]
            elif doi.startswith(('10.1007/','10.1140/')): url='https://link.springer.com/article/'+doi
            elif doi.startswith('10.1080/'): url='https://www.tandfonline.com/doi/full/'+doi
            elif doi.startswith('10.1111/'): url='https://onlinelibrary.wiley.com/doi/full/'+doi
        parsed = urlparse(url)
        vpn = 'https://'+PROXIES[parsed.hostname]+parsed.path+('?' + parsed.query if parsed.query else '') if parsed.hostname in PROXIES else ''
        rows.append({'id':rid,'title':title,'journal':extra.get('journal') or r.get('journal',''),'year':r.get('year',''),'doi':doi,'url':url,'vpn_url':vpn,'pdf_downloaded':bool(r.get('pdf_downloaded')),'search_only':search_only,'notes':extra.get('notes','')})
    rows.sort(key=lambda r:(r['pdf_downloaded'], not r['id'].startswith('L'), r['id']))
    (ROOT/'data/pending-access.json').write_text(json.dumps({'records':rows},ensure_ascii=False,indent=2),encoding='utf-8')
    with (ROOT/'data/pending-access.csv').open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)
    bookmarks='<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>待核论文全文入口</TITLE><H1>待核论文全文入口</H1><DL><p>\n'
    for label,has_pdf in [('仍需下载 PDF',False),('已有 PDF · 来源仍待核',True)]:
        bookmarks+='<DT><H3>'+label+'</H3><DL><p>\n'
        for r in rows:
            if r['pdf_downloaded']==has_pdf: bookmarks+='<DT><A HREF="'+html.escape(r['url'],quote=True)+'">'+html.escape(r['id']+' · '+r['title'])+'</A>\n'
        bookmarks+='</DL><p>\n'
    (ROOT/'data/pending-bookmarks.html').write_text(bookmarks+'</DL><p>',encoding='utf-8')
    payload=json.dumps(rows,ensure_ascii=False).replace('<','\\u003c')
    template=(ROOT/'assets/access-template.html').read_text(encoding='utf-8')
    (ROOT/'pending-access.html').write_text(template.replace('__ACCESS_DATA__',payload),encoding='utf-8')
    print(json.dumps({'pending':len(rows),'existing_pdf':sum(r['pdf_downloaded'] for r in rows),'search_only':sum(r['search_only'] for r in rows)},ensure_ascii=False))

if __name__=='__main__':build()
