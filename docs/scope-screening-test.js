// Regression checks for user-directed scope separation and exclusion.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const data=JSON.parse([...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)][0][1]);
const targetIds=new Set(data.china_groups.flatMap(g=>g.studies.flatMap(s=>s.outputs.map(o=>o.catalog_id))));
const secondaryIds=new Set(data.secondary_groups.flatMap(g=>g.studies.flatMap(s=>s.outputs.map(o=>o.catalog_id))));
for(const id of ['L30','L32','L38','L37','L45','L43','L35','L49','L52','L53','L54','L56']){
 assert(!targetIds.has(id),`${id} must not belong to Pioneer-related research`);
 assert(secondaryIds.has(id),`${id} must be retained in separate source groups`);
}
for(const id of ['L31','L33','L39','L40','L42']){
 assert(!data.papers.some(r=>r.id===id));assert(!targetIds.has(id));assert(!secondaryIds.has(id));
 assert(data.excluded_papers.some(r=>r.id===id));
 assert(!data.provider_usage.associations.some(r=>r.paper_id===id));
}
const hku=data.china_groups.find(g=>g.id==='HKU-YANG-MOBILITY');
assert(hku && hku.studies.length===0 && hku.procurements.length===1);
for(const id of ['L36','L46','L47','L48','L50','L51','L55','L57'])assert(targetIds.has(id),id+' must remain in target studies');
assert(data.china_groups.find(g=>g.id==='FZU-WU-SHENG').outputs.some(r=>r.catalog_id==='L46'));
const sourceIds=[...data.china,...data.secondary_sources].map(r=>r.id);
assert.equal(new Set(sourceIds).size,sourceIds.length);
for(const group of [...data.china_groups,...data.secondary_groups])
 for(const out of group.outputs)if(out.catalog_id)assert(data.papers.some(r=>r.id===out.catalog_id));
assert(!html.includes('中国供应链'));
assert(!html.includes('[私人路径已移除]'));
assert.equal(data.papers.find(r=>r.id==='L28').doi,'10.11819/cpr20230603a');
for(const id of ['L21','L25','L27','L28','L29','L34'])assert(data.papers.find(r=>r.id===id).zotero_attachment_verified);
const queue=JSON.parse(fs.readFileSync(path.join(root,'data/acquisition_queue.json'),'utf8'));
assert(!queue.records.some(r=>data.excluded_papers.some(x=>x.id===r.id)));
const audit=JSON.parse(fs.readFileSync(path.join(root,'data/remvl_format_review.json'),'utf8'));
assert.equal(audit.archive.sample_dictionary_total,145198);
assert(audit.archive.figshare_verification.local_md5_matches);
console.log(`PASS scope: ${data.papers.length} active; ${data.excluded_papers.length} excluded; platform/commercial separated; HKU procurement retained; Zotero and archive evidence linked.`);

for (const id of ['L49','L52']) { const r=data.papers.find(x=>x.id===id); assert(r.fulltext_read && r.pdf_downloaded); assert.equal(r.research_scope,'carrier_boundary'); const q=queue.records.find(x=>x.id===id); assert(!q.needs_fulltext_review && !q.pdf_acquisition); }
assert.equal(data.papers.find(x=>x.id==='L49').zotero_attachment_verified,false);
assert.equal(data.papers.find(x=>x.id==='L52').zotero_attachment_verified,true);
