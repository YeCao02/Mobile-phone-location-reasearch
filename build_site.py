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
    catalog_path = source / 'literature_catalog.json'
    catalog = json.loads(catalog_path.read_text(encoding='utf-8-sig')) if catalog_path.exists() else raw['literature_evolution']
    papers = [select(r, 'id title year doi reported_doi journal field institution team catalog_status origins metadata_source publication_type bibliographic_note notes bibliographic_status provider_evidence_status classification_basis provider provider_display product application data_declaration data_form use_method evidence_url evidence_section fulltext_read fulltext_scope source_confirmed access_status app_collection_confirmed sdk_explicit sensor_mix review_date pdf_downloaded zotero_attachment_verified zotero_attachment_scope research_scope scope_reason provider_confirmation_basis cooperation_label user_review_status zotero_catalog_present zotero_pdf_present zotero_reconciled_at') for r in catalog['records'] if not r.get('excluded_from_active')]
    excluded_papers = [select(r, 'id title journal year doi evidence_url provider scope_reason scope_decision_basis') for r in catalog['records'] if r.get('excluded_from_active')]
    queue_path = source / 'acquisition_queue.json'
    queue = {r['id']: r for r in json.loads(queue_path.read_text(encoding='utf-8-sig'))['records']} if queue_path.exists() else {}
    for paper in papers:
        paper.setdefault('catalog_status', 'reviewed')
        if paper['id'] in queue:
            paper['acquisition_next_action'] = queue[paper['id']].get('next_action')
            paper['acquisition_urls'] = queue[paper['id']].get('source_urls', [])
    china = raw['china_evidence']
    active = lambda r: not (r.get('excluded') is True or r.get('active') is False or r.get('status') == 'excluded')
    sources = [select(s, 'id title url type published institution supplier finding confidence limits doi dataset_doi group_id verbatim_statement research_scope') for s in china['sources'] if active(s) and not (s.get('merged_into') or s.get('duplicate_of'))]
    source_aliases = [{'id': s['id'], 'canonical_id': s.get('merged_into') or s.get('duplicate_of')} for s in china['sources'] if active(s) and (s.get('merged_into') or s.get('duplicate_of'))]
    assert all(a['canonical_id'] in {s['id'] for s in sources} for a in source_aliases), 'Source alias references an unknown canonical source'
    research_groups = []
    for item in china.get('research_groups', []) + china.get('secondary_research_groups', []):
        if not active(item):
            continue
        group = select(item, 'id title institution institution_id team collaborators summary source_ids supplier_names verbatim_statement statement_source statement_url research_scope related_source_ids')
        output_keys = 'id type title year journal url catalog_id doi reported_doi provider data_statement verbatim_statement bibliographic_note source_ids'
        group['outputs'] = [select(r, output_keys) for r in item.get('outputs', [])]
        group['studies'] = []
        for study in item.get('studies', []):
            row = select(study, 'id title summary source_ids verbatim_statement statement_url')
            row['outputs'] = [select(r, output_keys) for r in study.get('outputs', [])]
            group['studies'].append(row)
        for kind in ['procurements', 'grants']:
            group[kind] = []
            for activity in item.get(kind, []):
                row = select(activity, 'id title summary status grant_number source_ids')
                row['items'] = [select(r, 'title date summary source_ids') for r in activity.get('items', [])]
                group[kind].append(row)
        group['relationships'] = [select(r, 'from to relation evidence statement source_ids url') if isinstance(r, dict) else r for r in item.get('relationships', [])]
        research_groups.append(group)
    assert len({r['id'] for r in research_groups}) == len(research_groups), 'Duplicate research group ID'
    coverage = [select(c, 'institution query status sources next') for c in china['coverage']]
    linkable_sources = {s['id'] for s in sources} | {s['id'] for s in source_aliases}
    for row in coverage:
        row['sources'] = [sid for sid in row.get('sources', []) if sid in linkable_sources]
    edges = [select(e, 'from to relation sources') for e in china.get('verified_edges', [])]
    usage_path = source / 'provider_usage.json'
    usage_raw = json.loads(usage_path.read_text(encoding='utf-8-sig')) if usage_path.exists() else {}
    usage = {
        'providers': [select(r, 'id name region profile_group') for r in usage_raw.get('providers', [])],
        'associations': [select(r, 'paper_id provider_id provider_name status classification role roles declared_brands evidence_url evidence_section basis catalog_status') for r in usage_raw.get('associations', [])],
    }
    # This supplier already has official SDK evidence in the source ledger,
    # even though its candidate paper has no confirmed usage relationship yet.
    if any(s['id'] == 'CN-S22' for s in sources) and not any(p['id'] == 'talkingdata' for p in usage['providers']):
        usage['providers'].append({'id': 'talkingdata', 'name': 'TalkingData', 'region': 'china', 'profile_group': 'other_commercial_sdk'})
    for provider_id, source_id in [('talkingdata', 'CN-S22'), ('getui', 'CN-S19'), ('aurora', 'CN-S24')]:
        source_record = next((s for s in sources if s['id'] == source_id), None)
        if source_record and not any(p['id'] == provider_id for p in providers):
            providers.append({'id': provider_id, 'name': next(p['name'] for p in usage['providers'] if p['id'] == provider_id), 'sources': [{'title': source_record['title'], 'url': source_record['url']}]})
    paper_ids = {r['id'] for r in papers}
    provider_ids = {r['id'] for r in usage['providers']}
    assert all(r['paper_id'] in paper_ids and r['provider_id'] in provider_ids for r in usage['associations']), 'Supplier association references an unknown record'
    assert len({(r['provider_id'], r['paper_id']) for r in usage['associations']}) == len(usage['associations']), 'Duplicate supplier-paper association'
    secondary_scopes = {'map_platform', 'other_commercial', 'carrier_boundary', 'indoor_wifi_boundary', 'method_boundary_candidate'}
    result = {'as_of': china.get('as_of', '2026-10-11'), 'providers': providers, 'provider_usage': usage, 'papers': papers, 'china': [r for r in sources if r.get('research_scope') not in secondary_scopes], 'china_groups': [g for g in research_groups if g.get('research_scope') not in secondary_scopes], 'china_source_aliases': source_aliases, 'coverage': coverage, 'edges': edges, 'secondary_sources': [r for r in sources if r.get('research_scope') in secondary_scopes], 'secondary_groups': [g for g in research_groups if g.get('research_scope') in secondary_scopes], 'excluded_papers': excluded_papers, 'scope_policy': china.get('scope_policy', {}).get('rules', [])}
    institution_path = source / 'institution_leads.json'
    result['institution_leads'] = json.loads(institution_path.read_text(encoding='utf-8')) if institution_path.exists() else {'records': []}
    # Browsing categories are paper-level decisions, independent of reading/PDF progress.
    analog_ids = {p['id'] for p in usage['providers'] if p.get('profile_group') == 'original_21'} | {'getui', 'aurora', 'in_loco', 'descartes_labs', 'talkingdata'}
    use_roles = {'mobility', 'mixed_mobility', 'platform_aggregate', 'demographic_profile'}
    pioneer_ids = {a['paper_id'] for a in usage['associations'] if a['provider_id'] == 'pioneer_moxing_jike' and a['status'] in {'confirmed_use', 'user_confirmed_use'}}
    analog_papers = {a['paper_id'] for a in usage['associations'] if a['provider_id'] in analog_ids and a['status'] in {'confirmed_use', 'user_confirmed_use'} and set(a.get('roles') or [a.get('role')]) & use_roles} - pioneer_ids
    omitted_scopes = {'map_platform', 'carrier_boundary', 'indoor_wifi_boundary', 'non_empirical_context', 'other_thematic_collection', 'user_excluded'}
    omitted = {r['id'] for r in papers if r.get('research_scope') in omitted_scopes} - pioneer_ids - analog_papers
    # Other already-identified data sources do not become candidates again.
    known_other = {a['paper_id'] for a in usage['associations'] if a['status'] in {'confirmed_use', 'user_confirmed_use'} and set(a.get('roles') or [a.get('role')]) & use_roles} | {r['id'] for r in papers if r.get('source_confirmed') is True}
    omitted |= known_other - pioneer_ids - analog_papers
    pending_ids = paper_ids - pioneer_ids - analog_papers - omitted
    result['browse'] = {'pioneer_ids': sorted(pioneer_ids), 'analog_ids': sorted(analog_papers), 'pending_ids': sorted(pending_ids), 'omitted_ids': sorted(omitted), 'analog_provider_ids': sorted(analog_ids)}
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
    shown_ids = set(data['browse']['analog_ids'] + data['browse']['pioneer_ids'] + data['browse']['pending_ids'])
    abstracts = sum(r.get('publication_type') == 'conference_abstract' for r in data['papers'] if r['id'] in shown_ids)
    library_scope = (f"<strong>当前展示 {len(shown_ids)} 条研究文献</strong>，含 {abstracts} 条会议摘要；年度图统计其余 {len(shown_ids)-abstracts} 篇论文与预印本。"
                     f"历史台账保留 {len(data['papers'])+len(data['excluded_papers'])} 条：{len(data['papers'])} 条未排除记录中，{len(data['browse']['omitted_ids'])} 条边界来源或综述背景省略展示；另有 {len(data['excluded_papers'])} 条已明确排除。采购、基金及配套数据集不计入论文数。")
    html = template.replace('__EVIDENCE_DATA__', payload).replace('__LIBRARY_SCOPE__', library_scope)
    (ROOT / 'index.html').write_text(html, encoding='utf-8')
    assert all(len(data[k]) for k in ('providers', 'papers', 'china', 'coverage'))
    assert len({r['id'] for r in data['papers']}) == len(data['papers'])
    dois = [r['doi'].lower().strip() for r in data['papers'] if r.get('doi')]
    assert len(set(dois)) == len(dois), 'Duplicate DOI in literature catalog'
    print(json.dumps({'output': 'index.html', 'counts': {k: len(data[k]) for k in ('providers', 'papers', 'china', 'coverage')}, 'bytes': len(html.encode('utf-8'))}, ensure_ascii=False))
    from build_access import build as build_access
    build_access()


if __name__ == '__main__':
    main()
