# 第13轮全文核验：供应商类似物与运营商边界

5篇已有待核论文确认数据供应商并进入03；2篇确认运营商来源，从06移除，保留历史书目。吴升L55/L79仍为06高概率关联候选。

## P3239D548 · ODT FLOW: Extracting, analyzing, and sharing multi-source multi-scale human mobility

PLOS ONE，2021。供应商：SafeGraph。

直接从SafeGraph网站获取美国2019—2020年Social Distancing Metrics，使用origin_census_block_group、destination_cbgs、date_range_start提取每日OD；约1.603亿SDM记录生成约111亿Entity-O-D-T记录，再聚合为县/州/普查区流。实际并未取得SafeGraph个体GPS轨迹；Twitter数据是独立来源。

证据：PDF第7页，§2.3.2；PDF第9页，§3.1与表1；[官方来源](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0255259)。

正文PDF已下载并核验，共26页。供应商核验与Zotero附件状态分别记录。

## PD4F8B912 · Change of human mobility during COVID-19: A United States case study

PLOS ONE，2021。供应商：SafeGraph。

直接使用SafeGraph Data for Academics的Social Distancing Metrics，时间2019-01-01至2020-12-31。用CBG非居家停留时长中位数平均成县级TSPP，再构造两年同期变化；不是个人轨迹。§2.1说明第三方APP开发者通过API提供用户精确位置，未明确SDK及GPS/WiFi组合。

证据：PDF第4页，§2.1 Mobility data source；第4—5页，§2.2 Human mobility measures；[官方来源](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0259031)。

正文PDF已下载并核验，共19页。供应商核验与Zotero附件状态分别记录。

## PEEE72CD1 · Network percolation reveals adaptive bridges of the mobility network response to COVID-19

PLOS ONE，2021。供应商：Cuebiq。

Cuebiq提供美国大陆2020-01-01至06-30匿名实时位置记录，超过3000万选择参与设备，日均超过1500万。作者从各设备每日轨迹计算中位位置，比较连续两天所在县建立流网络，再做7天平滑与渗流分析。讨论称aggregated GPS data，未明确SDK或WiFi；并非供应商仅交付县级指数。

证据：PDF第3页，Mobility data；GPS措辞见PDF第14页讨论局限；[官方来源](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0258868)。

正文PDF已下载并核验，共18页。供应商核验与Zotero附件状态分别记录。

## P3881BAD2 · Human mobility data and machine learning reveal geographic differences in alcohol sales and alcohol outlet visits across U.S. states during COVID-19

PLOS ONE，2021。供应商：SafeGraph。

使用SafeGraph基于4500多万匿名智能设备、360多万POI的访问聚合数据；正文明确不提供individual-level trajectories。研究取16州2018-01至2020-06的酒类商店/酒吧/酒庄/啤酒厂访问，与NIAAA酒类销售统计结合，使用随机森林等模型；未逐项披露SDK/GPS/WiFi机制。

证据：PDF第3页，Data—Human mobility data from SafeGraph；第12页Changes in alcohol outlet visits；第17页州月聚合；[官方来源](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0255757)。

正文PDF已下载并核验，共27页。供应商核验与Zotero附件状态分别记录。

## L62 · Social inequality of urban park use during the COVID-19 pandemic

Humanities and Social Sciences Communications，2023。供应商：China Unicom（中国联通，手机数据）；JD.com（京东，电商人口社会属性）。

手机公园访问面板 + 京东电商人口社会属性；并未明确SDK采集。原文数据可得性具名联通和京东；结合第3页京东用于电商人口社会属性，可以区别两类数据角色。；研究深圳2019、2020、2021年各年3月的公园访问，联结电商人口社会属性，81,350人面板。该页先称第三方并不抵销后文具名声明。

证据：PDF第9页 Data availability；PDF第3页 Materials and methods / Data description；[官方来源](https://doi.org/10.1057/s41599-023-01918-1)。

正文PDF已下载并核验，共11页。供应商核验与Zotero附件状态分别记录。

## P8B0F32E0 · Unravelling the spatial directionality of urban mobility

Nature Communications，2024。供应商：Chinese telecommunications operator；数据申请平台 Smart Steps / smartsteps.com。

约500米格网间逐小时聚合OD，2019年8月与11月，60个中国城市。明确中国电信运营商手机信令记录，2019年8月与11月，中国60城市约9000万居民，平均18%人口覆盖。处理为0.005度约500米格网间逐小时出行量；不是个体SDK原始轨迹。；数据条件和申请链接明确指向smartsteps.com/product/dataset.php及其联系销售页面；隐私与合同原因不公开。

证据：PDF第9页 Methods / Data description；PDF第10页 Data availability；[官方来源](https://doi.org/10.1038/s41467-024-48909-7)。

正文PDF已下载并核验，共11页。供应商核验与Zotero附件状态分别记录。

## P25D34630 · Analysis of mobility data to build contact networks for COVID-19

PLOS ONE，2021。供应商：SafeGraph。

POI每小时设备访问数、停留时长分布、访客居住CBG与CBG每小时居家设备数；聚合产品，不是直接可识别的个人轨迹。直接具名研究数据供方。；逐项列出Weekly Patterns、Social Distancing、Census、Core Places用途；跟踪app和退出定位说明见本页末段。；特别区分聚合观测与模型分配出的个体接触网络。；Bernalillo County，2020-02-10到06-08按周构网，435CBG、8000余POI、模型人口10,000。

证据：PDF第1页 Data Availability Statement；PDF第4页 2.1 SafeGraph data；PDF第8页 2.5 Concurrent occupancy；PDF第9页 3 Results；[官方来源](https://doi.org/10.1371/journal.pone.0249726)。

正文PDF已下载并核验，共18页。供应商核验与Zotero附件状态分别记录。

## 书目与材料

ODT FLOW更正Xiao Huang、Tao Hu、Xinyue Ye；网络渗流研究更正为Hengfang Deng、Jing Du、Jianxi Gao、Qi Wang。SafeGraph的三项新核及接触网络研究使用聚合产品，Cuebiq网络渗流研究由设备轨迹生成县际流。均不因品牌而补写原文没有说明的SDK或GPS/WiFi机制。

接触网络S1 54页；ODT FLOW S1 1页；美国流动变化S1 7页；Cuebiq网络渗流S1 10页。酒类研究的7幅补图为TIFF，不伪记为PDF补充。
