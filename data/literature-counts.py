import json
from pathlib import Path
from collections import Counter
catalog=json.loads(Path("data/literature_catalog.json").read_text(encoding="utf-8"))["records"]
audit=json.loads(Path("data/literature-statistics.json").read_text(encoding="utf-8"))
overrides={r["id"]:r["effective_type"] for r in audit["publication_type_overrides"]}
venue_domains={r["journal"]:r["domain"] for r in audit["venues"]}
results={}
for key,scope in audit["scopes"].items():
    records=[r for r in catalog if r["id"] in set(scope["record_ids"])]
    papers=[r for r in records if overrides.get(r["id"],r.get("publication_type"))!="conference_abstract"]
    journals=[r for r in papers if overrides.get(r["id"],r.get("publication_type"))=="journal_article"]
    annual_counts=Counter(int(r["year"]) for r in papers)
    domain_counts=Counter(venue_domains[r["journal"]] for r in journals)
    results[key]={"annual":dict(sorted(annual_counts.items())),"domains":dict(domain_counts),"papers":len(papers),"journals":len(journals)}
print(json.dumps(results,ensure_ascii=False))
