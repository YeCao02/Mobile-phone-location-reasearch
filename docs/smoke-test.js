const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const data=JSON.parse(scripts[0]);
const assert=require('node:assert/strict');
const vm=require('node:vm');
const nodes={};
const node=(id)=>nodes[id]??=( {value:'all',textContent:'',innerHTML:'',listeners:{},dataset:{},addEventListener(e,f){this.listeners[e]=f},insertAdjacentHTML(pos,s){this.innerHTML+=s},focus(){},scrollIntoView(){}} );
node('#search').value='';node('#evidence-data').textContent=JSON.stringify(data);
const ctx={document:{querySelector:node,getElementById:id=>nodes['#'+id],querySelectorAll:()=>[]},window:{addEventListener(){}},location:{hash:''},console};
vm.createContext(ctx);
vm.runInContext(scripts[1],ctx);
const total=data.papers.length;
const countLabel=n=>`${n} / ${total} 篇`;
const count=predicate=>data.papers.filter(predicate).length;
const unknown=v=>v!==true&&v!==false;
assert.equal(node('#paper-count').textContent,countLabel(total));
assert.equal(node('#stat-read').textContent,`${count(r=>r.fulltext_read===true)} 篇正文关键段 / 摘要已读`);
assert.equal(Number(node('#stat-reviewed').textContent),count(r=>r.catalog_status==='reviewed'));
function change(id,value){node(id).value=value;node(id).listeners.change()}
for(const [value,predicate] of [
 ['read',r=>r.fulltext_read===true],
 ['pending',r=>r.fulltext_read===false],
 ['unknown',r=>unknown(r.fulltext_read)]
]){change('#read-filter',value);assert.equal(node('#paper-count').textContent,countLabel(count(predicate)))}
for(const [id,field] of [['#pdf-filter','pdf_downloaded'],['#zotero-filter','zotero_attachment_verified']]){
 node('#clear').listeners.click();
 for(const [value,predicate] of [['yes',r=>r[field]===true],['no',r=>r[field]===false],['unknown',r=>unknown(r[field])]]){
  change(id,value);assert.equal(node('#paper-count').textContent,countLabel(count(predicate)));
 }
}
node('#clear').listeners.click();
change('#pdf-filter','yes');change('#zotero-filter','yes');
assert.equal(node('#paper-count').textContent,countLabel(count(r=>r.pdf_downloaded===true&&r.zotero_attachment_verified===true)));
node('#clear').listeners.click();
node('#search').value='Moxing';node('#search').listeners.input();
assert.equal(node('#paper-count').textContent,countLabel(count(r=>JSON.stringify(r).toLowerCase().includes('moxing'))));
node('#search').value='no-such-record-81297';node('#search').listeners.input();assert.equal(node('#paper-count').textContent,countLabel(0));
assert.match(node('#paper-list').innerHTML,/没有匹配记录/);
node('#clear').listeners.click();assert.equal(node('#paper-count').textContent,countLabel(total));
assert.equal(vm.runInContext("triMatch(true,'yes')&&triMatch(false,'no')&&triMatch(undefined,'unknown')&&!triMatch(undefined,'yes')",ctx),true);
node('#clear').listeners.click();
for(const d of ['year','journal','field']){
 assert.equal(vm.runInContext(`countsBy(corpus(),'${d}').reduce((sum,x)=>sum+x[1],0)`,ctx),total);
 const first=vm.runInContext(`dimensions['${d}'](D.papers[0])`,ctx);
 vm.runInContext(`dimensionClick(${JSON.stringify(d)},${JSON.stringify(first)})`,ctx);
 const expected=count(r=>(d==='year'?(r.year?String(r.year):'年份待核验'):d==='journal'?(r.journal||'期刊待核验'):(r.field||'领域待分类'))===first);
 assert.equal(node('#paper-count').textContent,countLabel(expected));
 node('#clear').listeners.click();
}
change('#status-filter','pending');assert.equal(node('#paper-count').textContent,countLabel(count(r=>r.catalog_status==='pending')));
node('#clear').listeners.click();
change('#work-filter','research');assert.equal(node('#paper-count').textContent,countLabel(count(r=>r.catalog_status!=='reviewed'||r.fulltext_read!==true)));
assert.equal(Number(node('#queue-pending').textContent),count(r=>r.catalog_status!=='reviewed'||r.fulltext_read!==true));
node('#clear').listeners.click();
change('#corpus-filter','reviewed');
const reviewedTotal=count(r=>r.catalog_status==='reviewed');
assert.equal(node('#paper-count').textContent,`${reviewedTotal} / ${reviewedTotal} 篇`);
for(const d of ['year','journal','field'])assert.equal(vm.runInContext(`countsBy(corpus(),'${d}').reduce((sum,x)=>sum+x[1],0)`,ctx),reviewedTotal);
node('#clear').listeners.click();
assert.equal(node('#paper-count').textContent,countLabel(total));
assert.equal((node('#paper-list').innerHTML.match(/id="paper-/g)||[]).length,total);
const numericYears=data.papers.map(r=>String(r.year)).filter(y=>/^\d{4}$/.test(y)).map(Number);
if(numericYears.length){for(let y=Math.min(...numericYears);y<=Math.max(...numericYears);y++)assert(node('#year-chart').innerHTML.includes(`data-value="${y}"`));}
assert(!html.includes('EVIDENCE FIRST'));assert(!html.includes('id="scope"'));

const usage=data.provider_usage||{providers:[],associations:[]};
assert.equal(new Set(usage.associations.map(a=>a.provider_id+'|'+a.paper_id)).size,usage.associations.length);
const ids=new Set(data.papers.map(r=>r.id));
assert(usage.associations.every(a=>ids.has(a.paper_id)));
for(const provider of usage.providers){
 const pairs=usage.associations.filter(a=>a.provider_id===provider.id);
 let sum=0;
 for(const status of ['confirmed_use','mention_only','unresolved_candidate']){
  const expected=new Set(pairs.filter(a=>a.status===status).map(a=>a.paper_id)).size;
  const actual=vm.runInContext(`supplierPaperIds(${JSON.stringify(provider.id)},${JSON.stringify(status)}).size`,ctx);
  assert.equal(actual,expected);sum+=actual;
 }
 assert.equal(sum,pairs.length);
}
if(usage.associations.length){
 const a=usage.associations[0], args=[a.provider_id,a.status,'all'];
 const call='associationClick('+args.map(JSON.stringify).join(',')+')';
 const selected=new Set(usage.associations.filter(x=>x.provider_id===a.provider_id&&x.status===a.status).map(x=>x.paper_id));
 vm.runInContext(call,ctx);assert.equal(node('#paper-count').textContent,countLabel(selected.size));
 const paper=data.papers.find(r=>r.id===a.paper_id),journal=paper.journal||'期刊待核验';
 change('#journal-filter',journal);
 assert.equal(node('#paper-count').textContent,countLabel(count(r=>selected.has(r.id)&&(r.journal||'期刊待核验')===journal)));
 vm.runInContext(call,ctx);
 assert.equal(node('#paper-count').textContent,countLabel(count(r=>(r.journal||'期刊待核验')===journal)));
 node('#clear').listeners.click();vm.runInContext(call,ctx);node('#clear').listeners.click();
 assert.equal(node('#paper-count').textContent,countLabel(total));
 assert.equal(vm.runInContext('associationSelection',ctx),null);
 for(const role of ['mobility','poi','platform_aggregate','vehicle_gps','distribution','access_contact','comparison_reference','unknown']){
  const expected=new Set(usage.associations.filter(x=>x.provider_id===a.provider_id&&(x.roles?.length?x.roles:[x.role||'unknown']).includes(role)).map(x=>x.paper_id)).size;
  assert.equal(vm.runInContext(`supplierPaperIds(${JSON.stringify(a.provider_id)},'all',${JSON.stringify(role)}).size`,ctx),expected);
 }
}

const relatedCount=usage.providers.filter(p=>usage.associations.some(a=>a.provider_id===p.id)).length;
assert.equal((node('#supplier-ranking').innerHTML.match(/data-provider-row-id=/g)||[]).length,relatedCount);
node('#toggle-zero-suppliers').listeners.click();
assert.equal((node('#supplier-ranking').innerHTML.match(/data-provider-row-id=/g)||[]).length,usage.providers.length);
node('#clear').listeners.click();
for(const r of data.papers.filter(r=>r.publication_type==='conference_abstract'))assert(vm.runInContext(`paper(D.papers.find(r=>r.id===${JSON.stringify(r.id)}))`,ctx).includes('会议摘要'));
for(const r of data.papers.filter(r=>r.bibliographic_note))assert(vm.runInContext(`paper(D.papers.find(r=>r.id===${JSON.stringify(r.id)}))`,ctx).includes('bibliographic-note'));

node('#clear').listeners.click();
const groups=data.china_groups||[];
const groupedSourceIds=new Set(groups.flatMap(g=>data.china.filter(r=>(g.source_ids||[]).includes(r.id)||r.group_id===g.id).map(r=>r.id)));
assert.equal(vm.runInContext('filteredChina().sourceCount',ctx),data.china.length);
assert.equal(vm.runInContext('filteredChina().standalone.length',ctx),data.china.length-groupedSourceIds.size);
assert.equal(vm.runInContext('filteredChina().groups.length',ctx),groups.length);
for(const r of data.china)assert.equal(node('#china-list').innerHTML.split(`id="china-${r.id}"`).length-1,1,`Source ${r.id} should render once`);
for(const g of groups){
 assert.equal(node('#china-list').innerHTML.split(`id="china-group-${g.id}"`).length-1,1);
 for(const output of g.outputs||[])if(output.catalog_id)assert(ids.has(output.catalog_id),`Output references unknown paper ${output.catalog_id}`);
 const probe=g.outputs?.find(o=>o.title)?.title||g.title;
 node('#search').value=probe;node('#search').listeners.input();
 assert(node('#china-list').innerHTML.includes(`id="china-group-${g.id}"`),'Group should be searchable through output title');
 node('#clear').listeners.click();
}
// The school/team view exposes compact closed study, procurement and grant rows.
assert(!/\.record(?:\[open\])?\s+summary/.test(html),'Record disclosure styles must target direct summaries');
for(const g of groups){
 for(const [i,study] of (g.studies||[]).entries()){
  const output=vm.runInContext(`teamStudy(${JSON.stringify(study)},${i})`,ctx);
  assert(output.startsWith('<details class="team-study"'),'Studies should be native disclosures');
  assert(!/^<details[^>]*\bopen(?:\s|=|>)/.test(output),'Studies are collapsed by default');
  const summary=output.match(/<summary>([\s\S]*?)<\/summary>/)[1];
  assert(summary.includes(`研究 ${i+1}`));
  for(const journal of [study.journal,...(study.outputs||[]).map(o=>o.journal)].filter(Boolean))
   assert(summary.includes(vm.runInContext(`esc(${JSON.stringify(journal)})`,ctx)),'Journal belongs in the closed study summary');
 }
 for(const [key,label] of [['procurements','采购'],['grants','基金']]){
  for(const [i,activity] of (g[key]||[]).entries()){
   const output=vm.runInContext(`teamActivity(${JSON.stringify(activity)},${i},${JSON.stringify(label)})`,ctx);
   assert(output.startsWith('<details class="team-activity"'));
   assert(!/^<details[^>]*\bopen(?:\s|=|>)/.test(output),'Activities are collapsed by default');
   assert(output.match(/<summary>([\s\S]*?)<\/summary>/)[1].includes(`${label} ${i+1}`));
  }
 }
}
for(const journal of ['Nature Health','Cities','International Journal of Applied Earth Observation and Geoinformation']){
 const preview=vm.runInContext(`studyPreview({title:'A long research title',outputs:[{journal:${JSON.stringify(journal)}}]})`,ctx);
 assert.equal(preview,journal.startsWith('International Journal')?'IJAEOG':journal);
}

const rawChinaPath=path.join(__dirname,'../data/china_evidence.json');
if(fs.existsSync(rawChinaPath)){
 const rawChina=JSON.parse(fs.readFileSync(rawChinaPath,'utf8').replace(/^\uFEFF/,''));
 for(const r of rawChina.sources.filter(r=>r.excluded===true||r.active===false||r.status==='excluded'))assert(!data.china.some(x=>x.id===r.id));
}

for(const alias of data.china_source_aliases||[]){
 assert(!data.china.some(r=>r.id===alias.id));assert(data.china.some(r=>r.id===alias.canonical_id));
 assert(!node('#china-list').innerHTML.includes(`id="china-${alias.id}"`));
 const inner=node('#china-'+alias.canonical_id);inner.tagName='DETAILS';
 const outer={tagName:'DETAILS',open:false};inner.parentElement=outer;
 ctx.location.hash='#china-'+alias.id;vm.runInContext('openHash()',ctx);
 assert.equal(inner.open,true);assert.equal(outer.open,true);ctx.location.hash='';
}
console.log(`PASS: ${total} records visible; all/year/journal/field counts; chart clicks; scope/status/work filters; independent reading/PDF/Zotero flags; supplier exact-ID counts/roles/stack/reset; grouped China evidence/source uniqueness/search; search and clear.`);

assert(!vm.runInContext("coverage({institution:'清华大学',status:'paper_author_affiliation_confirmed_procurement_unverified',sources:[],next:'',query:''})",ctx).includes('采购证据与基金'));

for(const target of ["docs/china-research-round6.md","data/china_round6_search.json","data/china_round6_followups.json","data/china_round6_boundaries.json","data/nature_health_attachment_review.json"])assert(html.includes(`href="${target}"`),`Missing research download ${target}`);
