"""Build the public, offline-capable SDK location research atlas (stdlib only)."""
from pathlib import Path
import argparse
import json
import re

ROOT = Path(__file__).resolve().parent
FILES = ('global_providers', 'literature_evolution', 'china_evidence')


def select(record, keys):
    return {k: record[k] for k in keys.split() if k in record}


def public_data(source):
    raw = {name: json.loads((source / (name + '.json')).read_text(encoding='utf-8-sig')) for name in FILES}
    providers = []
    for item in raw['global_providers']['records']:
        obj = select(item, 'id name supply_chain_role scope_decision evidence_summary limitations accessed_at')
        obj['sources'] = [select(s, 'grade title url published_or_updated accessed_at') for s in item.get('sources', [])]
        providers.append(obj)
    papers = [select(r, 'id title year doi provider product application data_declaration data_form use_method evidence_url evidence_section fulltext_read fulltext_scope source_confirmed access_status app_collection_confirmed sdk_explicit sensor_mix review_date pdf_downloaded zotero_attachment_verified') for r in raw['literature_evolution']['records']]
    china = raw['china_evidence']
    sources = [select(s, 'id title url type published institution supplier finding confidence limits doi dataset_doi') for s in china['sources']]
    coverage = [select(c, 'institution query status sources next') for c in china['coverage']]
    edges = [select(e, 'from to relation sources') for e in china.get('verified_edges', [])]
    result = {'as_of': raw['literature_evolution'].get('as_of', '2026-10-10'), 'providers': providers, 'papers': papers, 'china': sources, 'coverage': coverage, 'edges': edges}
    encoded = json.dumps(result, ensure_ascii=False)
    # Public export must never embed machine-specific paths, access credentials, or emails.
    encoded = re.sub(r'[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}', '[公开联系邮箱省略]', encoded)
    if re.search(r'(?<![A-Za-z])[A-Za-z]:[/\\]|file://|/(?:Users|home)/|(?:10|192\.168)\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+', encoded, re.I):
        raise ValueError('Potential local path or private address in public fields; review source data.')
    return json.loads(encoded)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--data-dir', type=Path, help='Directory containing the three evidence JSON files')
    args = parser.parse_args()
    source = args.data_dir or (ROOT / 'data' if (ROOT / 'data' / 'global_providers.json').exists() else ROOT.parent / 'agents')
    data = public_data(source)
    template = (ROOT / 'assets' / 'template.html').read_text(encoding='utf-8')
    payload = json.dumps(data, ensure_ascii=False).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    assert template.count('__EVIDENCE_DATA__') == 1
    html = template.replace('__EVIDENCE_DATA__', payload)
    (ROOT / 'index.html').write_text(html, encoding='utf-8')
    assert all(len(data[k]) for k in ('providers', 'papers', 'china', 'coverage'))
    assert len({r['id'] for r in data['papers']}) == len(data['papers'])
    assert len({r['doi'].lower() for r in data['papers'] if r.get('doi')}) == len(data['papers'])
    print(json.dumps({'output': 'index.html', 'counts': {k: len(data[k]) for k in ('providers', 'papers', 'china', 'coverage')}, 'bytes': len(html.encode('utf-8'))}, ensure_ascii=False))


if __name__ == '__main__':
    main()
