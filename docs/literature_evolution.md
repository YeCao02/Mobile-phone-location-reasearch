# SDK / 应用定位数据文献演进：证据审计与代表样本

更新：2026-10-10。此为定向检索的阶段性知识图谱，不是穷尽性系统综述，不用于推断各供应商文献市场份额。

## 核验结果与纳入边界

本轮建立 **24 篇**代表记录：**16 篇**已读取原始全文HTML或身份核验PDF的数据/方法关键段；其他文献保留索引、部分正文或摘要状态。**23 篇**有供应商实际使用证据，**16 篇**有应用采集声明或明确来源链。两组指标不等价：供应商被确认不代表逐篇证明SDK，也不代表底层定位只使用GPS/WiFi。

本轮新增L23，正文明确Cuebiq自有定位SDK嵌入合作应用，故有 **1 篇SDK明示**。该声明仍不足以确认逐点物理定位传感器。手机应用可以调用操作系统定位服务；论文只说GPS或应用采集时，仍不能证明每个点没有蜂窝辅助。建议知识库用“应用采集GPS/LBS商业数据”作为已证据支持的主轴，另设SDK明示和传感器来源字段。传统运营商CDR/基站信令研究不进入纯应用数据核心样本；多源对比论文L17放在边界与验证层。

严格区分四类数据：①设备级ping；②供应商识别的停留/访问；③POI—居住区聚合流或区域指标；④在Clean Room或供应商平台运行代码后返回的聚合结果。品牌名称不能代替产品名称，论文作者持有的数据不能与供应商底层数据混写。

## 需要立即修正的旧条目

- Xia2026正文Methods/Data与Ethics写 **Moxing Beijing**，数据申请邮箱使用 **pioneerdata.com.cn**。两者具有论文内的服务联系，但不凭这点认定同一法律实体、股权关系或“马甲”。作者明确从未获得个体层移动信息：将代码交由服务商执行，取得聚合输出。出版信息已为 **Nature Health 1, 760–769 (2026)**，不是占位页码1–10。支持基金含NSFC **42171400（J.X.）和42471496（W.T.）**。[原文](https://www.nature.com/articles/s44360-026-00100-6)
- 11城出行偏差研究L22的“Spectus/Cuebiq-type”应删除。本轮出版社可见段落未披露可核实供应商；保留“未披露（待全文复核）”。[出版社](https://www.sciencedirect.com/science/article/pii/S096669232400317X)
- Moro2021的Foursquare是**场所数据库**来源，Cuebiq才是位置轨迹来源。生态文献L20的Dewey是分发渠道、Advan是访问模式产品方、SafeGraph提供Places；文中引用Veraset不等于实际使用Veraset。[Moro](https://www.nature.com/articles/s41467-021-24899-8)；[生态研究](https://www.nature.com/articles/s41598-025-03577-5)
- Chang研究在线发表2020、卷期2021；检索年份须并存。Tang2025重用Xu2021处理后的Cuebiq数据，应连上“数据复用”边，不计成独立新样本。[Chang](https://www.nature.com/articles/s41586-020-2923-3)；[Tang](https://link.springer.com/article/10.1140/epjds/s13688-025-00559-5)
- 旧literature_3axis_extraction.csv中的E1及“已核实全文”不能按标签整体继承；一些证据链接实际为PubMed/摘要或只含原文部分内容。本轮状态以本次读取记录为准。

## 演进脉络：研究问题与数据处理共同变化

**2015–2019数据采集期、2018年前后代表论文：商业应用位置开始服务微观行为识别。** 本轮最早的代表论文是Chen与Rohla2018，把节日相聚的时间利用与政治空间联系；后来的Testoni2022也使用2015–2017历史位置，识别并购前公司总部互访。这里的创新是把“何时在何地停留”转成社会或经济关系的可观察代理。此阶段只是当前样本的早期节点，不能称为学科起源。[L01](https://www.anderson.ucla.edu/faculty_pages/keith.chen/papers/Final_Science18.pdf)；[L07](https://doi.org/10.1002/smj.3435)

**2020–2021：从描述流动到危机模型与可复用基础设施。** Kang把商业访问转成日/周多尺度OD；Chang进一步把供应商聚合表估计成小时CBG–POI网络并接入传播模型；Chen等用跨养老院访问构造潜在职工联系网络。并行出现对细粒度日常行为的研究：Xu重建车辆路线，Moro研究居住地以外的经历性隔离。疫情推动共享和方法扩散，但这些用途并不都使用原始轨迹。[L02](https://www.nature.com/articles/s41597-020-00734-5)；[L03](https://www.nature.com/articles/s41586-020-2923-3)；[L04](https://pmc.ncbi.nlm.nih.gov/articles/PMC7817179/)；[L05](https://link.springer.com/article/10.1140/epjds/s13688-021-00267-w)；[L06](https://www.nature.com/articles/s41467-021-24899-8)

**2022–2024：从静态可达性转向真实到访、日常共现与机会暴露，同时加强偏差审计。** 公共空间研究区分短长访问，公园研究检查实际使用，15分钟城市研究区分附近有设施与实际在附近消费；隔离研究从区域构成推进到地点停留与时空接触网络。Garber讨论不同对比指标在何种假设下不受选择偏差影响；Li展示面板代表性随空间尺度和年份变化；Gallotti等提醒数据源、聚合与删边会改变传播结论。概念上，**居住隔离—场所隔离—经历性隔离—时空接触**应当连成方法递进关系，不能当同一指标的同义词。[L08](https://www.nature.com/articles/s41597-022-01480-6)；[L10](https://pubmed.ncbi.nlm.nih.gov/35288279/)；[L11](https://www.nature.com/articles/s41586-023-06757-3)；[L13](https://www.nature.com/articles/s41562-023-01770-y)；[L16](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0294430)；[L17](https://www.nature.com/articles/s42005-024-01909-x)

**2024–2026：领域扩展与受控计算并行。** NERD在Spectus Clean Room处理位置后释放种族多样性派生指标；灾害研究区分不同移动习惯群体；预测研究结合个人与集体行为；公交规划把轨迹接入供需匹配；生态研究连接人类商业访问与动物项圈轨迹。Xia2026把中国多城市应用位置接入实际医院使用、距离—质量权衡和医疗不平等，并采用供应商运行代码的受控方式。这说明研究单位可从“移动了多少”延伸至“获得何种服务、接触何种机会”，访问方式也从交付原始数据扩展到受控计算。[L14](https://www.nature.com/articles/s41597-024-03490-y)；[L15](https://www.nature.com/articles/s41598-024-64087-4)；[L18](https://pmc.ncbi.nlm.nih.gov/articles/PMC12054799/)；[L19](https://link.springer.com/article/10.1140/epjds/s13688-025-00559-5)；[L20](https://www.nature.com/articles/s41598-025-03577-5)；[L21](https://www.nature.com/articles/s44360-026-00100-6)

以上为基于样本的解释性综合，不是正式引文网络、历年计量统计或因果性的学科史断言。

## 应用索引

|方向|可回答问题|代表记录|不能跳过的有效性检查|
|---|---|---|---|
|交通、通勤与活动空间|去哪、怎么走、何种公交服务短缺|L05、L19|低频采样、方式识别、工作地与路线推断|
|隔离与城市社会接触|居住之外接触哪些收入/族群|L06、L11、L14|区域SES代理、时空共现不等于社会关系|
|疫情与公共卫生|访问网络如何关联传播/设施风险、通勤与共现变化|L02–L04、L23|网络重建、群体可比性与模型识别|
|医疗可达性与实际使用|为何绕过近医院、承担何种出行负担|L21|医院访客是否患者、陪同及职工排除|
|饮食与身体活动环境|实际访问能否补充静态设施可达性|L09|POI到访不等于真实消费或运动量|
|环境暴露与环境公平|居住地暴露与活动轨迹暴露如何不同|L24|位置采样时长、污染栅格分辨率、停留加权与群体代表性|
|公园及生态|谁使用绿地、人与动物怎样共享空间|L12、L20|公园边界与POI覆盖、商品版本、不同GPS载体|
|灾害韧性|不同活动模式如何改变、何处撤离|L15|设备留存、灾时缺测、迁出与断电难区分|
|经济与社会行为|总部互访、节日共处与社会过程|L01、L07|互动/员工/家庭身份均属代理推断|
|测量与验证|不同来源、处理、抽样如何改变结论|L08、L10、L16、L17、L22|不能用人口相关系数证明所有行为无偏|

## 逐篇证据表

“全文关键段”只表示打开全文并阅读数据/方法关键段，不表示补充材料全读。其余状态故意保守。

|ID|年份/论文|供应商与产品|证据状态|
|---|---|---|---|
|L01|2018 · [The effect of partisanship and political advertising on close family ties](https://www.anderson.ucla.edu/faculty_pages/keith.chen/papers/Final_Science18.pdf)|SafeGraph · 历史设备级位置记录|author_pdf_indexed_open_failed|
|L02|2020 · [Multiscale dynamic human mobility flow dataset in the U.S. during the COVID-19 epidemic](https://www.nature.com/articles/s41597-020-00734-5)|SafeGraph · 到访记录及多尺度派生OD|本地PDF关键段已读|
|L03|2021 · [Mobility network models of COVID-19 explain inequities and inform reopening](https://www.nature.com/articles/s41586-020-2923-3)|SafeGraph · Places/Weekly Patterns与Social Distancing聚合指标|本地PDF关键段已读|
|L04|2021 · [Nursing home staff networks and COVID-19](https://pmc.ncbi.nlm.nih.gov/articles/PMC7817179/)|Veraset · 匿名设备位置数据（未见正式商品名）|pmc_methods_indexed_direct_recaptcha|
|L05|2021 · [Understanding vehicular routing behavior with location-based service data](https://link.springer.com/article/10.1140/epjds/s13688-021-00267-w)|Cuebiq · Data for Good历史LBS|全文关键段已读|
|L06|2021 · [Mobility patterns are associated with experienced income segregation in large US cities](https://www.nature.com/articles/s41467-021-24899-8)|Cuebiq（位置）；Foursquare（场所） · Cuebiq Data for Good|全文关键段已读|
|L07|2022 · [Face-to-face interactions and the returns to acquisitions: Evidence from smartphone geolocational data](https://doi.org/10.1002/smj.3435)|SafeGraph · 历史设备级ping|全文关键段已读|
|L08|2022 · [Spatial and Temporal Characterization of Activity in Public Space, 2019–2020](https://www.nature.com/articles/s41597-022-01480-6)|SafeGraph · Social Distancing Metrics（正文称谓）及访问衍生指标|全文关键段已读|
|L09|2022 · [Deriving neighborhood-level diet and physical activity measurements from anonymized mobile phone location data for enhancing obesity estimation](https://link.springer.com/article/10.1186/s12942-022-00321-4)|SafeGraph · POI访问聚合|全文关键段已读|
|L10|2022 · [On selection bias in comparison measures of smartphone-generated population mobility: an illustration of no-bias conditions with a commercial data source](https://pubmed.ncbi.nlm.nih.gov/35288279/)|Cuebiq · 商业移动性指标（本轮未复核具体商品）|abstract_only|
|L11|2023 · [Human mobility networks reveal increased segregation in large cities](https://www.nature.com/articles/s41586-023-06757-3)|SafeGraph · 历史设备级GPS ping|publisher_indexed_methods_open_idp_error|
|L12|2023 · [Change of urban park usage as a response to the COVID-19 global pandemic](https://www.nature.com/articles/s41598-023-46745-1)|SafeGraph · Places及到访模式|publisher_indexed_methods_open_error|
|L13|2024 · [The 15-minute city quantified using human mobility data](https://www.nature.com/articles/s41562-023-01770-y)|SafeGraph · 手机移动/消费到访记录|publisher_indexed_author_pdf_timeout|
|L14|2024 · [An experienced racial-ethnic diversity dataset in the United States using human mobility data](https://www.nature.com/articles/s41597-024-03490-y)|Cuebiq/Spectus · Spectus Clean Room Stay Location Dataset / Data for Good|全文关键段已读|
|L15|2024 · [Returners and explorers dichotomy in the face of natural hazards](https://www.nature.com/articles/s41598-024-64087-4)|Cuebiq · 隐私增强GPS/活动停留表|全文关键段已读|
|L16|2024 · [Understanding the bias of mobile location data across spatial scales and over time: A comprehensive analysis of SafeGraph data in the United States](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0294430)|SafeGraph · Monthly Patterns Panel Overview|全文关键段已读|
|L17|2024 · [Distorted insights from human mobility data](https://www.nature.com/articles/s42005-024-01909-x)|多源：Cuebiq、SafeGraph、Facebook、普查、CDR、Octotelematics等 · 不同来源流网络|本地PDF关键段已读|
|L18|2025 · [Mixing individual and collective behaviors to predict out-of-routine mobility](https://pmc.ncbi.nlm.nih.gov/articles/PMC12054799/)|Cuebiq · Data for Good COVID-19 Collaborative|pmc_indexed_methods_direct_recaptcha|
|L19|2025 · [Designing transit routes based on vehicle routing behavior determined through location-based services data](https://link.springer.com/article/10.1140/epjds/s13688-025-00559-5)|Cuebiq · Xu2021后处理LBS|全文关键段已读|
|L20|2025 · [Integrating human mobility and animal movement data reveals complex space-use between humans and white-tailed deer in urban environments](https://www.nature.com/articles/s41598-025-03577-5)|Advan（访问）/SafeGraph（POI）/Dewey（分发） · Advan Monthly Patterns + SafeGraph Places|全文关键段已读|
|L21|2026 · [Mobile phone data show spatial and socioeconomic inequalities in hospital utilization](https://www.nature.com/articles/s44360-026-00100-6)|Moxing Beijing（Methods）；pioneerdata.com.cn域名联系（Data availability） · 未披露正式产品；服务商运行代码并返回聚合结果|全文关键段已读|
|L22|2025 · [Exploring biases in travel behavior patterns in big passively generated mobile data from 11 U.S. cities](https://www.sciencedirect.com/science/article/pii/S096669232400317X)|未披露（待全文复核） · LBS mobility records|publisher_partial_sections|

|L23|2024 · [Characterizing collective physical distancing in the U.S. during the first nine months of the COVID-19 pandemic](https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000430)|Cuebiq · Data for Good；Spectus Social Impact申请渠道|全文关键段已读；SDK明示|
|L24|2024 · [Big mobility data reveals hyperlocal air pollution exposure disparities in the Bronx, New York](https://senseable.mit.edu/papers/pdf/20240627_Wang-etal_BigMobility_NatureCities.pdf)|Cuebiq（Methods）；Spectus（Reporting summary） · Data for Good / Social Impact|全文关键段已读|

字段级证据、数据形式、处理方法和限制见相邻JSON。并非所有商品的今天名称都能回填到历史研究。

## 下一轮检索缺口与优先级

1. 已补入环境污染暴露L24与通勤/就业L23；热暴露、旅游和零售竞争仍需专门扩展。
2. 完整补读L01、L04、L10、L11、L12、L13、L18及L22，包括附件、勘误与数据许可。索引可见不意味着已下载PDF；工具IDP错误或验证码也不等于机构无权访问。
3. 中国市场从Xia2026开始向同团队、基金42171400/42471496及方法引文延伸；对Moxing Beijing与先锋的关联另用工商、合同或官方声明核证。
4. 按DOI去重，并设“复用同一数据”“换供应商相近问题”“方法引用”“仅背景引用”四类边。严格把综述/工具方法与实际使用指定供应商的实证论文区分。
5. 当前样本不能证明SafeGraph是全球学术使用最多的供应商；需定义检索库、查询式、年份与去重规则后统计。

## 旧库审计范围

读取了literature_commercial_mobile_location_data_2015_2026.csv、literature_commercial_mobile_location_data_addendum_2026.csv与literature_3axis_extraction.csv的候选元数据及部分证据列。未重审旧库全部文献、未更改原CSV、未操作Zotero或GitHub。


## 本地附件复核与本轮补充

已核实本地PDF并读方法段：L02（PDF页2–3）、L03（2、7–8）、L16（4、20）、L17（5–7）、L21（6–7、9）。其中L16、L21同时核实Zotero正文附件；Xia补充附件标题、DOI与目录已核，未声称全部补充图表已读。共尝试22份本地附件、21份解析成功、1份路径失效，包含重复文件及预印本，不能折算为21篇已审读论文。公开数据只保存核验状态与页码，不保存私人存储路径。

L23把通勤、远程办公和时空共现接入疫情行为研究，并提供明确SDK采集声明。[原文](https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000430) L24将手机轨迹与街段污染联系，扩展到动态环境暴露与公平；其方法称Cuebiq，报告摘要称Spectus，分别保留出处。[作者机构PDF](https://senseable.mit.edu/papers/pdf/20240627_Wang-etal_BigMobility_NatureCities.pdf)
