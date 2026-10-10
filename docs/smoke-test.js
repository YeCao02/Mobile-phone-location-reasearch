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
assert.equal(node('#stat-read').textContent,`${count(r=>r.fulltext_read===true)} 篇全文关键段已读`);
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
console.log(`PASS: ${total} records visible; all/year/journal/field counts; chart clicks; scope/status/work filters; independent reading/PDF/Zotero flags; search and clear.`);
