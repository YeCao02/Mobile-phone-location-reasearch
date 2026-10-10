# 学校—团队—具体内容：第六轮更新

日期：2026-10-10。三组研究代理完成73次定向查询，主代理补充1次精确题名检索以核定北大论文正式出版信息。本轮不是穷尽性检索。

## 分类调整

知识库先按学校或科研机构组织，再按研究者团队组织。团队内分别编号“研究”“采购”“基金”。同一研究的会议摘要、期刊论文、数据集及不同来源页面保持关联；采购公告与论文之间没有直接证据的关系会明确保留为待对应。

- 深圳大学夏吉喆团队：研究1为轨迹数据与PM2.5暴露公平；研究2为Nature Health就医公平性研究（CN-S05、CN-S06同一篇合并）。采购1归纳CN-S01、CN-S12、CN-S13的三个公告条目，分别保留日期和金额，不宣称它们是同一合同。基金1关联CN-S04及原文基金署名。
- 深圳大学微众银行金融科技学院采购单独归单位，负责人未核，不自动归给夏吉喆团队。
- 中科院地理资源所／国科大杜云艳团队：杜苏芮台风研究显示完整刊名International Journal of Applied Earth Observation and Geoinformation；新增2019年腾讯位置请求与暴雨响应研究为另一研究。
- 上海大学李峰清团队：保留Cities研究、通勤概念研究、URA基金及学校采购线索；新增2024年临港LBS研究。2017年同济时期研究按发表时单位归入同济，并说明研究者履历联系，不作为URA产出。

## Nature Health附件复核

Zotero中已索引的正文为13页，独立补充材料为25页。正文第6页Methods/Data与第9页Ethics列Moxing Beijing；第9页Data availability提供pioneerdata.com.cn联系域名。作者通过服务商执行代码获得聚合结果，不能写成作者直接持有个体原始轨迹。

独立补充材料第3–4页的Supplementary Fig. 1–2展示GPS就医识别及深圳外部验证；该附件索引文本未检出Moxing/Pioneer名称。故不把补充材料方法证据描述成第二次独立供应商列名。[附件核验记录](../data/nature_health_attachment_review.json)

## 扩检成果

新增13条主目录研究记录，另保存10条后续线索及8条边界记录；6份公开PDF下载至本地并核验。未具名“公司”“服务商”“operator”保留原称，须依据具体采集方法判别。

| 团队／机构 | 研究及出版物 | 数据证据及状态 |
|---|---|---|
| 同济黄建中／赵民／李峰清等 | 2017厦门空间结构—交通模式，《城市规划学刊》 | 注释明确App→SDK后台→GPS；供应商未披露 |
| 上海大学李峰清等 | 2024临港产城融合，《城市规划学刊》 | 手机LBS通勤与收入画像；采集机制及供应商待核 |
| 天津大学李文博 | 2026限行与城际旅行，Journal of Regional Science | 出版商摘要明确智能手机LBS服务商；待正文 |
| 福州大学合作团队 | 2025下一位置预测，ISPRS International Journal of Geo-Information | 原文明确未具名商业公司的手机GNSS数据 |
| 杜云艳团队 | 2019暴雨响应，Natural Hazards and Earth System Sciences | 腾讯地图API网格位置请求；平台聚合数据 |
| 香港大学杨天人合作团队 | 2026幽灵厨房，Journal of Retailing and Consumer Services | 百度慧眼人口网格的出版商索引线索；待正文，不强配Jike采购 |
| 重庆大学作者线索 | 2023旅游流动，Applied Geography；2025慢跑，Cities | 题录已核；本篇作者机构和采集细节待正文 |
| 中规院上海分院孙娟／葛春晖 | 2024高铁枢纽客群，《城市规划学刊》 | 高分辨率LBS出行链；供应商及传感器组成未披露 |
| 北大深研院刘志航等 | 2023城市经济韧性，ISPRS Archives | 未具名位置服务商、WiFi辅助驻留点；SDK架构待核 |
| 北大深研院／港大陈若宇、周江评 | 2022大湾区通勤标度，《清华大学学报（自然科学版）》 | 明确每日互动／个推、多App位置报点；传感器组成待核 |
| 中南大学王璞合作团队 | 2026乡村就医，《地理与地理信息科学》 | 原刊摘要已核；数据来源与采集方式待正文 |
| 北大深研院Jun Chu合作团队 | 2023城际流动，Annals of the American Association of Geographers | 原刊摘要明确腾讯平台城际LBS；待方法正文 |

北大城市经济韧性论文的正式出版信息已由[ISPRS原刊](https://isprs-archives.copernicus.org/articles/XLVIII-1-W2-2023/361/2023/)补齐，DOI为10.5194/isprs-archives-XLVIII-1-W2-2023-361-2023。刊名含“清华大学”的通勤论文按实际作者单位归类，不因此归入清华团队。

本轮没有新增明确点名先锋／摸星／Jike的论文使用证据。原有合并供应商组、Cities的99%用户主观评估、港大杨天人团队采购Jike的用户确认继续保留；这些信息不自动传递给该校所有新论文。

## 可复查记录

- [74次检索与入库映射](../data/china_round6_search.json)
- [后续线索库](../data/china_round6_followups.json)
- [运营商信令、基站、模拟及智能卡边界](../data/china_round6_boundaries.json)
- [全量文献及字段](../data/literature_catalog.json)
- [逐篇获取与补读队列](../data/acquisition_queue.json)

进一步获取优先顺序：天津限行、中南就医、重庆旅游／慢跑、上海临港与中规院高铁枢纽的供方声明、北大WiFi轨迹供方。明确写出CDR、XDR、基站或通信信令的研究单列边界；仅写“operator”的研究不据这个词排除。
