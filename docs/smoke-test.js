const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const data=JSON.parse(scripts[0]),nodes={};
const node=id=>nodes[id]??={value:'all',innerHTML:'',textContent:'',listeners:{},addEventListener(e,f){this.listeners[e]=f},scrollIntoView(){}};
node('#evidence-data').textContent=JSON.stringify(data);node('#search').value='';
const ctx={document:{querySelector:node,getElementById:id=>nodes['#'+id]},window:{addEventListener(){}},location:{hash:''},console};vm.createContext(ctx);vm.runInContext(scripts[1],ctx);
const cardIds=id=>new Set([...node(id).innerHTML.matchAll(/data-paper-id="([^"]+)"/g)].map(x=>x[1]));
const equal=(a,b)=>assert.deepEqual([...a].sort(),[...b].sort());
equal(cardIds('#china-list'),data.browse.pioneer_ids);equal(cardIds('#analog-list'),data.browse.analog_ids);equal(cardIds('#pending-list'),data.browse.pending_ids);
assert(!html.includes('04B'));assert(!html.includes('id="other-data"'));assert(html.includes('04 / CONFIRMED PIONEER FAMILY'));assert(html.includes('06 / TO BE CONFIRMED'));
for(const id of ['L21','L25','L48','L64','L80','L27','L28','L34','L59','L44','L55','L57','L78','L79'])assert(cardIds('#china-list').has(id));
assert(cardIds('#pending-list').has('L41'));for(const id of ['L51','L52','L65','L66']){assert(!cardIds('#pending-list').has(id));assert(!cardIds('#china-list').has(id));}
assert(node('#china-list').innerHTML.includes('HKU-YANG-P1'));assert(node('#china-list').innerHTML.includes('SHU-LI-P1'));assert(!node('#pending-list').innerHTML.includes('SHU-LI-P1'));
for(const id of ['L87','L88'])assert(cardIds('#china-list').has(id));
for(const id of ['R18-PROC-01','R18-PROC-02']) {
  assert(node('#china-list').innerHTML.includes(id),'Official named procurement belongs to 04');
  assert(!node('#pending-list').innerHTML.includes(id));
}
assert(node('#china-list').innerHTML.includes('拟成交9.8万元'),'Proposed award must retain its status');
node('#search').value='梦享';node('#search').listeners.input();
for(const id of ['L29','L48','L68','L80','L83','L87','L88'])assert(cardIds('#china-list').has(id),'Company alias should also find papers stating only Jike');
assert(!cardIds('#china-list').has('L21'),'The Jike alias must not relabel Moxing-only studies');
node('#clear').listeners.click();
for(const id of ['CN-R17-PKU-COOP','CN-R17-SYSU-COOP','CN-R17-TONGJI-CHEN','CN-R17-XCU-THESIS'])assert(node('#pending-evidence').innerHTML.includes(id));
node('#search').value='田子坊';node('#search').listeners.input();assert(cardIds('#china-list').has('L80'));assert(!cardIds('#china-list').has('L21'));
node('#clear').listeners.click();node('#pending-filter').value='pioneer';node('#pending-filter').listeners.change();
equal(cardIds('#pending-list'),data.papers.filter(r=>data.browse.pending_ids.includes(r.id)&&r.research_scope==='pioneer_candidate').map(r=>r.id));
node('#pending-material').value='pdf';node('#pending-material').listeners.change();
assert([...cardIds('#pending-list')].every(id=>data.papers.find(r=>r.id===id).pdf_downloaded===true));
node('#clear').listeners.click();node('#search').value='never-match-831124';node('#search').listeners.input();assert.equal(cardIds('#china-list').size,0);assert.equal(cardIds('#analog-list').size,0);assert.equal(cardIds('#pending-list').size,0);
node('#clear').listeners.click();
const rendered=['#china-list','#analog-list','#pending-list','#pending-evidence'].map(id=>node(id).innerHTML).join('');
const ids=[...rendered.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
const duplicates=ids.filter((id,i)=>ids.indexOf(id)!==i);assert.equal(duplicates.length,0,'Duplicate DOM IDs: '+duplicates.join(', '));
console.log(`PASS browsing: 03 ${data.browse.analog_ids.length}; 04 ${data.browse.pioneer_ids.length}; 06 ${data.browse.pending_ids.length}; search, filters, procurement, unique anchors.`);
