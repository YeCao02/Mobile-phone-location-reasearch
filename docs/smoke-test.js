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
assert.equal(Number(node('#stat-read').textContent),count(r=>r.fulltext_read===true));
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
console.log('PASS: rendering, reading/PDF/Zotero filters, combined filters, search, no results, clear, tri-state distinction.');
