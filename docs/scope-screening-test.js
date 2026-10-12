const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const data=JSON.parse(html.match(/<script id="evidence-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const sets=['analog_ids','pioneer_ids','pending_ids','omitted_ids'].map(k=>new Set(data.browse[k]));
assert.equal(sets.reduce((n,s)=>n+s.size,0),data.papers.length);assert.equal(new Set(sets.flatMap(s=>[...s])).size,data.papers.length);
const use=data.provider_usage.associations;
assert(sets[1].size>0);for(const id of sets[1])assert(use.some(a=>a.paper_id===id&&a.provider_id==='pioneer_moxing_jike'&&a.status==='confirmed_use'));
for(const id of sets[0])assert(use.some(a=>a.paper_id===id&&data.browse.analog_provider_ids.includes(a.provider_id)&&a.status==='confirmed_use'&&(a.roles||[a.role]).some(r=>['mobility','mixed_mobility','platform_aggregate','demographic_profile'].includes(r))));
for(const id of ['L30','L32','L35','L37','L38','L45','L49','L52','L53','L54','L56','L70'])assert(sets[3].has(id));
for(const id of ['L55','L57'])assert(sets[2].has(id),'Confirmed auxiliary POI supplier must not conceal unknown mobility supplier');
for(const id of ['L81','L82'])assert(sets[0].has(id));
for(const id of ['L78','L79'])assert(sets[2].has(id));
// Round 13: source audits promote only the five named supplier studies.
for(const id of ['P25D34630','P3239D548','PD4F8B912','PEEE72CD1','P3881BAD2']) {
  assert(sets[0].has(id), `${id} must appear in 03 after its official full-text audit`);
  assert(!sets[2].has(id));
  const paper=data.papers.find(p=>p.id===id);
  assert(paper.source_confirmed && paper.fulltext_read && paper.pdf_downloaded);
  assert(!use.some(a=>a.paper_id===id && a.status==='unresolved_candidate'), 'Legacy supplier claims must not survive source confirmation');
}
for(const id of ['L62','P8B0F32E0']) {
  assert(sets[3].has(id), `${id} is a verified carrier boundary`);
  assert(!sets[2].has(id));
  assert(!use.some(a=>a.paper_id===id && a.status==='unresolved_candidate'));
}
assert(!data.papers.find(p=>p.id==='L55').source_confirmed);
assert(!data.papers.find(p=>p.id==='L79').source_confirmed);
assert(data.papers.find(p=>p.id==='L79').provider.includes('99%'));
assert(data.papers.find(p=>p.id==='L79').pdf_downloaded && data.papers.find(p=>p.id==='L79').zotero_attachment_verified);
for(const id of ['P240AD96D','P8C0DBF46'])assert(sets[0].has(id));
assert(sets[3].has('P55058E29'));
assert(!use.some(a=>a.paper_id==='P55058E29' && a.status==='confirmed_use'), 'Governance Comment is not an empirical supplier-use study');
for(const id of ['P25D34630','P3239D548','PD4F8B912','PEEE72CD1','P3881BAD2'])assert(data.papers.find(p=>p.id===id).zotero_attachment_verified);
assert(use.some(a=>a.paper_id==='L80'&&a.role==='platform_aggregate'));
assert(data.papers.find(p=>p.id==='L80').zotero_attachment_verified);
assert(!data.papers.find(p=>p.id==='L81').pdf_downloaded);
assert.equal(data.excluded_papers.length,5);
console.log('PASS scope: exclusive paper categories, evidence-backed 04, auxiliary POI preserved in 06, known boundaries omitted, original archives intact.');
