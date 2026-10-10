# 摸星与Jike文献证据：第四轮

本轮完成28个定向查询，确认2条可入目录文献：1篇此前已知的期刊数据论文升级为真实全文PDF证据，1篇新发现的会议摘要。另登记1个配套数据集，不重复计作论文。新取得2个PDF，共21,359,829字节；未查得额外匹配的GeoDOI期刊论文，也未证明新的企业法律别名关系。

## L25：全文取得与元数据澄清

吴梓昊、马志锋、夏吉喆：《轨迹数据视角下的分人群PM2.5暴露平等性数据集研发》，全球变化数据学报，2026，10(2)：180–190，出版日2026-04-25。[出版方原文PDF](https://www.geodoi.ac.cn/DOIPaper/PDF/2026139402/202602139408.pdf)

旧.htm链接404；[书目页](https://www.geodoi.ac.cn/WebCn/paper.aspx?Id=963cf123-47e6-4494-953c-8694ca02eace)实际跳转至[新.html全文](https://www.geodoi.ac.cn/DOIPaper/HTML/2026139402/202602139408.html)。真实HTML与11页PDF均已保存。此前的“只能读取搜索索引”限制已解除。

原PDF第2页明确北京摸星科技有限公司提供六城轨迹，定位包含WiFi、蓝牙、GPS。第1页基金为广西科学技术项目GXYD2504850001；第3页表1的数据集基金为NSFC42171400。两处资助语境不同，分别记录。英文同篇写Moxing Technology，构成文章内名称对应，不构成与先锋数聚的工商证明。

出版方PDF/HTML一致报告DOI 10.3974/geodp.2026.02.08，但本轮[DOI解析器](https://doi.org/10.3974/geodp.2026.02.08)、[Crossref](https://api.crossref.org/works/10.3974/geodp.2026.02.08)和[Handle接口](https://doi.org/api/handles/10.3974/geodp.2026.02.08)均未找到登记。目录doi留空，reported_doi保留。机构新闻曾将此字段配给暴雪论文，不能覆盖现有出版方原文身份；也不能声称注册冲突已经由注册记录解决。

配套数据集作者顺序为马志锋、吴梓昊、夏吉喆，报告DOI为10.3974/geodb.2026.02.08.V1；该数据集DOI本轮未单独解析，公开的是污染与暴露衍生数据，不能说个人轨迹公开。

## L26：新发现的Jike会议摘要

Ma Zhifeng、Zhong Leiyang、Xia Jizhe，2023，*PM2.5 Exposure Disparities Among Different Populations in High Mobility Urban Areas: A Case Study of Beijing, Shanghai, and Shenzhen*。GSCS & ICUI2023，香港，2023年8月20—23日。[官方会议摘要集](https://isocui.org/icui2023/programme/GSCS%26ICUI2023-Conference-Proceedings.pdf)

122页PDF已真实下载，目标位于PDF94—95页、印刷90—91页。Methods写已取得Jike提供的约600万去敏用户轨迹数据（原文计量单位不明确，不能当作600万独立用户），研究北京、上海、深圳PM2.5暴露；这是实际数据使用声明。摘要没有给中文法人全名，也没有说明SDK或GPS/WiFi，所以Jike暂不自动合并到即刻LBS、摸星或先锋数聚。

结论使用预计和期望表述，GWR部分写为计划；这是一篇会议摘要，不能作为已经完成全部分析的期刊论文。与L25共享作者和研究主题，是潜在演进线索，尚无证据证明同一数据队列或正式扩展版。

## 其他线索与负面结果

同基金GXYD2504850001检索发现两篇关联文章：[中国PM2.5过早死亡栅格数据](https://www.tandfonline.com/doi/full/10.1080/20964471.2026.2692260)及[GSAR-Tree空间索引](https://www.sciencedirect.com/science/article/pii/S1364815226002240)。当前未核得目标供应商来源，均不纳入供应商使用量。

28个查询未再得到独立匹配的GeoDOI文章。会议集全文关键词扫描中，Jike只在目标摘要命中；pioneer的两处泛称、GeoDOI中的历史人物Mao Jike均排除。检索未命中不代表相关研究不存在。

完整来源与检索日志见data/china_round4.json。全文PDF仅保存本地；此处提供出版方原文入口。


后续种子：同一会议集PDF93–94页（印刷89–90）另有Pengfei Chen、Yi Jian的“A generalised flow-based 2SFCA method for evaluating hospital accessibility: a case study in Wuhan”。摘要未给供应商或SDK声明，且作者不同，不因相邻排版认定同组或同源数据。
