# 海外SDK/GPS手机位置数据供应商证据台账

版本与访问日期：2026-10-10。共 21 个供应商/链路节点，**不是 21 个相互独立的数据面板，也不是当前可采购清单**。

## 范围与证据规则

关注app/SDK来源的手机位置与其衍生产品，排除传统运营商CDR/信令。SDK是采集软件机制，GPS/WiFi是定位技术，二者不能互相替代。企业名下可能同时存在POI、车载GPS、广告竞价流、SDK或模型估计产品，文献必须落到具体数据产品与年份。对设备定位服务中的cellular triangulation和外购运营商信令也应分别标记，不能只凭“LBS”判断。

A：政府/法院/监管原始记录，投诉中的指控仍为指控；B：厂商官方文档，属于供应方声明；C：历史报道/第三方技术调查；D：本轮未核实。所有条目访问日期均为2026-10-10，营销规模、匿名性和精度未独立审计。

种子：[The Markup 2021调查](https://themarkup.org/privacy/2021/09/30/theres-a-multibillion-dollar-market-for-your-phones-location-data)及[原始数据库和方法](https://github.com/the-markup/location-data-industry)。已检查文章和仓库README/文件清单；仓库CSV尚未逐行标准化。2021名单只提供历史种子，不能证明2026经营状态。

## 可检索供应商表

|供应商/品牌|链路与产品|本轮纳入判断|证据等级|
|---|---|---|---|
|[SafeGraph](#safegraph)|历史应用位置数据衍生产品；现以POI为主|历史纳入；当前POI不能当作轨迹|B|
|[Advan Research](#advan)|应用SDK数据汇聚与POI客流产品|优先纳入|B|
|[Veraset](#veraset)|应用、SDK及聚合商数据汇聚；设备级GPS与衍生产品|优先纳入|B|
|[Cuebiq / Spectus](#cuebiq_spectus)|历史自有SDK；数据平台与清洁室|优先纳入但按时期解读|B|
|[CITYDATA / CityData.AI](#citydata)|应用SDK、车辆、IoT混合输入的城市分析平台|分产品纳入|B|
|[Foursquare](#foursquare)|自有应用、合作SDK及第三方融合；地点与访问推断|优先纳入，严格区分产品|B|
|[Unacast](#unacast)|合作应用SDK源的聚合人数及机器学习估计|优先纳入聚合产品|B|
|[Gravy Analytics](#gravy)|多上游位置数据聚合与转售；并入Unacast品牌体系|条件纳入，不认定纯SDK|B/A|
|[Venntel](#venntel)|Gravy子公司及政府用途分发/分析渠道|历史链路节点，非独立面板计数|A|
|[Huq Industries / huq](#huq)|移动位置衍生客流与行为模型|条件纳入；当前SDK机制待核|B/C|
|[Tamoco](#tamoco)|自有SDK及多传感器位置数据；原始位置与POI visits|优先纳入|B|
|[Predicio](#predicio)|历史位置数据供应商线索|未核实当前；保留历史候选|C/D|
|[Azira（Near相关资产承接）](#azira_near)|多源移动位置/GPS分析与营销；含SDK GPS|条件纳入；追溯产品源|B/A|
|[InMarket](#inmarket)|自有应用、SDK合作网络及第三方；营销洞察|应用数据生态纳入；不列原始数据采购推荐|B/A|
|[X-Mode / Outlogic](#outlogic)|自有app、第三方SDK app及外购数据|历史与条件纳入|A|
|[Placer.ai](#placer)|第三方位置输入，聚合POI客流估计/API/Feeds|纳入衍生分析；当前SDK来源待核|B|
|[StreetLight Data](#streetlight)|LBS应用数据与车载GPS等混合的交通分析|条件纳入；须拆分输入|B/A|
|[Quadrant](#quadrant)|SDK与server-to-server移动位置供应|优先纳入|B|
|[Mobilewalla](#mobilewalla)|多源数据经纪，历史含RTB广告竞价输入|边界/排除对照；不认定SDK-only|A|
|[Kochava / Collective Data Solutions](#kochava)|测量SDK业务与第三方位置数据市场并存|条件纳入市场链路，避免SDK误归属|B/A|
|[Reveal Mobile](#reveal)|SDK与外部feeds；GPS及WiFi标识相关采集|优先纳入生态；学术获取待核|B|

## 逐项证据与待核问题

<a id="safegraph"></a>
### SafeGraph

2022-11-03 Advan公告收购SafeGraph Patterns业务，涉及Weekly、Monthly、Neighborhood Patterns；SafeGraph当前首页主推全球POI数据。

**判定：**历史纳入；当前POI不能当作轨迹。**局限：**文献中的SafeGraph必须记录具体产品和数据年份；尚未核实所有旧版数据的上游供应商及WiFi/GPS比例。

- B｜[Advan acquisition announcement](https://advanresearch.com/insights/advan-acquires-safegraphs-patterns-business-expanding-leadership-in-location-intelligence-and-foot-traffic-analytics)｜发布/更新：2022-11-03｜访问：2026-10-10
- B｜[SafeGraph current homepage](https://www.safegraph.com/)｜发布/更新：undated｜访问：2026-10-10

<a id="advan"></a>
### Advan Research

官网FAQ称使用明确同意的手机app数据、通常由SDK采集，并称从未使用cell tower数据；产品包含Patterns+。收购SafeGraph Patterns是历史文献追溯的重要节点。

**判定：**优先纳入。**局限：**非bidstream、精度等属于厂商陈述，尚未独立样本验证；不应将收购前后算法或面板视为相同。

- B｜[Location Data FAQ](https://advanresearch.com/faq)｜发布/更新：undated｜访问：2026-10-10
- B｜[Acquisition of Patterns](https://advanresearch.com/insights/advan-acquires-safegraphs-patterns-business-expanding-leadership-in-location-intelligence-and-foot-traffic-analytics)｜发布/更新：2022-11-03｜访问：2026-10-10

<a id="veraset"></a>
### Veraset

Movement文档明确来自apps、SDKs、aggregators，为预处理的假名化移动数据；产品页明确device-level GPS，提供去重和水平精度字段。

**判定：**优先纳入。**局限：**厂商不公开全部具体上游；不能把SDK作为单一自有采集源，WiFi比例、各国样本和学术许可仍待核实。

- B｜[Movement documentation](https://www.veraset.com/resource/doc/datasets-schema/docs)｜发布/更新：undated｜访问：2026-10-10
- B｜[Movement dataset](https://www.veraset.com/datasets/movement)｜发布/更新：undated｜访问：2026-10-10
- B｜[Products and outputs](https://www.veraset.com/resource/doc/orchestrator/data-products-and-outputs)｜发布/更新：undated｜访问：2026-10-10

<a id="cuebiq_spectus"></a>
### Cuebiq / Spectus

2018技术说明为GPS、WiFi、Bluetooth SDK采集；docs.spectus.ai当前以Cuebiq Documentation Portal呈现。现隐私政策写明API、SDK或server-to-server三条输入途径。

**判定：**优先纳入但按时期解读。**局限：**发现官网内部时间/口径冲突：旧文加注SDK已弃用，而2025文章又称自有SDK独占采集。不得用单篇营销文断言当前全部源为自有SDK；论文需记录采集年份与平台版本。

- B｜[2018 attribution methodology](https://www.cuebiq.com/wp-content/uploads/2018/03/Cuebiq_Attribution_Benchmarks_2018__1_.pdf)｜发布/更新：2018｜访问：2026-10-10
- B｜[Documentation portal](https://docs.spectus.ai/)｜发布/更新：undated｜访问：2026-10-10
- B｜[Deprecated SDK notice](https://cuebiq.com/blog/truth-about-sdk-it-alone-is-not-enough/)｜发布/更新：undated-updated｜访问：2026-10-10
- B｜[First-party data blog](https://cuebiq.com/blog/first-party-location-data-for-privacy-first-marketing/)｜发布/更新：2025 (search metadata)｜访问：2026-10-10
- B｜[Privacy policy](https://cuebiq.com/privacy-policy/)｜发布/更新：undated-current｜访问：2026-10-10

<a id="citydata"></a>
### CITYDATA / CityData.AI

FAQ称位置源包括mobile apps、SDKs，以及connected vehicles与IoT；既有first-party也有third-party aggregators。CityFlow输出OD、路线、交通量与地点访问。

**判定：**分产品纳入。**局限：**不能把整个CityFlow当纯手机SDK样本；需拿到mobile-only抽取条件和每类输入权重；官网精度/规模未独立验证。

- B｜[FAQ, source and products](https://www.citydata.ai/faq/)｜发布/更新：undated｜访问：2026-10-10
- B｜[Homepage](https://www.citydata.ai/)｜发布/更新：undated｜访问：2026-10-10

<a id="foursquare"></a>
### Foursquare

官方方法文说明Owned & Operated apps、SDK partners及trusted third parties；Pilgrim SDK于2023-01-31改名Movement SDK。

**判定：**优先纳入，严格区分产品。**局限：**Places/Places API为地点库，Movement SDK为应用内采集/推断工具，Visits才是访问数据；Studio Data SDK只是数据接口工具，不能作为手机SDK采集证据。

- B｜[Quality and movement engine](https://foursquare.com/resources/blog/capabilities/delivering-quality-data-using-a-sophisticated-movement-engine/)｜发布/更新：2023 (search metadata)｜访问：2026-10-10
- B｜[Movement SDK overview](https://docs.foursquare.com/developer/docs/movement-sdk-overview)｜发布/更新：undated｜访问：2026-10-10
- B｜[Service products and privacy](https://foursquare.com/wp-content/uploads/sites/2/2023/11/Developer-Enterprise-Services-Privacy-Policy.pdf)｜发布/更新：2023-11｜访问：2026-10-10

<a id="unacast"></a>
### Unacast

当前数据文档称第一方合作方通过嵌入多应用的SDK采集，并按Unacast规范处理后传入匿名聚合人数；GPS并非模型唯一输入。

**判定：**优先纳入聚合产品。**局限：**此说明适用于该文档所述ML产品，不能外推为全部Unacast/Gravy产品都只有聚合数据或同一面板。

- B｜[Dataset FAQ](https://docs.unacast.com/datasets/faq/)｜发布/更新：undated｜访问：2026-10-10
- B｜[Gravy merger page](https://www.unacast.com/gravy-analytics)｜发布/更新：undated｜访问：2026-10-10

<a id="gravy"></a>
### Gravy Analytics

Unacast官网称双方已合并，Gravy数据来自15+供应商；FTC说明Gravy/Venntel从其他供应商取得位置数据。

**判定：**条件纳入，不认定纯SDK。**局限：**未证实每条数据均为SDK GPS而非广告竞价流。FTC于2025-01最终化敏感位置数据限制命令；不能以旧官网宣传推断当前可购范围。

- B｜[Gravy Analytics / Unacast](https://www.unacast.com/gravy-analytics)｜发布/更新：undated｜访问：2026-10-10
- A｜[FTC action and data source](https://www.ftc.gov/news-events/news/press-releases/2024/12/ftc-takes-action-against-gravy-analytics-venntel-unlawfully-selling-location-data-tracking-consumers)｜发布/更新：2024-12｜访问：2026-10-10
- A｜[FTC final order announcement](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-order-prohibiting-gravy-analytics-venntel-selling-sensitive-location-data)｜发布/更新：2025-01｜访问：2026-10-10

<a id="venntel"></a>
### Venntel

FTC最终命令公告明确其为Gravy子公司，并同时适用敏感位置数据限制。

**判定：**历史链路节点，非独立面板计数。**局限：**不应把Gravy和Venntel当两套独立采样面板；本轮未核实当前商业及学术数据供应范围。

- A｜[FTC final order announcement](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-order-prohibiting-gravy-analytics-venntel-selling-sensitive-location-data)｜发布/更新：2025-01｜访问：2026-10-10
- A｜[FTC source description](https://www.ftc.gov/news-events/news/press-releases/2024/12/ftc-takes-action-against-gravy-analytics-venntel-unlawfully-selling-location-data-tracking-consumers)｜发布/更新：2024-12｜访问：2026-10-10

<a id="huq"></a>
### Huq Industries / huq

官网当前方法页称以匿名、opt-in移动数据推断现实活动，输出为模型估计并与独立客流真值验证。

**判定：**条件纳入；当前SDK机制待核。**局限：**当前官网页未详细说明SDK与GPS/WiFi组成；历史SDK研究可作追踪线索但不能替代当前产品核验。

- B｜[Current data methodology](https://huq.io/data-methodology)｜发布/更新：undated｜访问：2026-10-10
- C｜[2018 empirical iOS SDK inspection](https://sudosecuritygroup.com/research/ios-app-location-report-sep2018/)｜发布/更新：2018-09｜访问：2026-10-10

<a id="tamoco"></a>
### Tamoco

官方技术说明称SDK联合GPS、WiFi、beacon等；访问产品通过手机GPS的时空聚类和POI归属计算。位置数据页面给出device_id、timestamp、lat/lon、accuracy及app_id字段。

**判定：**优先纳入。**局限：**多传感器机制有公开依据，但当前各市场供应链、采样频率与学术可获性待核实。

- B｜[Location sensor accuracy](https://www.tamoco.com/blog/tag/accuracy/?amp=1)｜发布/更新：undated｜访问：2026-10-10
- B｜[Smart visitation documentation](https://www.tamoco.com/visits-documentation/)｜发布/更新：undated｜访问：2026-10-10
- B｜[Location data schema](https://www.tamoco.com/landin-page-location-data-ad/)｜发布/更新：undated｜访问：2026-10-10

<a id="predicio"></a>
### Predicio

The Markup 2021调查将Predicio列入位置数据行业，并保留其当时高精度移动位置营销页面的存档链接。

**判定：**未核实当前；保留历史候选。**局限：**2026-10-10本工具无法访问predic.io；不能据此认定停业，也不能确认当前数据可购或纯SDK来源。

- C｜[2021 historical inventory](https://themarkup.org/privacy/2021/09/30/theres-a-multibillion-dollar-market-for-your-phones-location-data)｜发布/更新：2021-09-30｜访问：2026-10-10
- D｜[Attempted current homepage, tool inaccessible](https://www.predic.io/)｜发布/更新：2026-10-10 access failed｜访问：2026-10-10

<a id="azira_near"></a>
### Azira（Near相关资产承接）

Azira技术帮助页明确SDK GPS数据以及数据源组筛选。新加坡法院2025判决记载Near债务人资产售予BTC Near Holdco LLC，后者更名Azira LLC。

**判定：**条件纳入；追溯产品源。**局限：**应写资产承接关系，而不是把所有Near实体简单改名；Azira全量并非证明为纯SDK。筛选Data Source Group后才适合SDK限定分析。

- B｜[SDK GPS and source group filtering](https://knowledge.azira.com/what-is-screen-data-and-how-do-i-use-it)｜发布/更新：undated｜访问：2026-10-10
- A｜[Near insolvency and asset buyer identity](https://www.elitigation.sg/gd/s/2025_SGHC_228)｜发布/更新：2025｜访问：2026-10-10
- B｜[New company launch](https://www.azira.com/blogs/azira-a-new-beginning)｜发布/更新：2024-03-21｜访问：2026-10-10

<a id="inmarket"></a>
### InMarket

当前数据页明确自有app、SDK合作网及第三方位置数据；公司说明仍用精确位置服务营销，但已同意禁止对外销售/许可精确位置。

**判定：**应用数据生态纳入；不列原始数据采购推荐。**局限：**研究获得性需按聚合报告、营销测量和许可分别核实；拥有SDK不代表可采购原始GPS轨迹。

- B｜[Current data products](https://inmarket.com/data/)｜发布/更新：undated｜访问：2026-10-10
- B｜[CEO explanation of order and service scope](https://inmarket.com/qa-with-inmarkets-ceo-todd-morris/)｜发布/更新：2024 (search metadata)｜访问：2026-10-10
- A｜[FTC decision and order](https://www.ftc.gov/system/files/ftc_gov/pdf/InMarketMedia-DecisionandOrder.pdf)｜发布/更新：2024｜访问：2026-10-10

<a id="outlogic"></a>
### X-Mode / Outlogic

FTC明确记录第三方应用嵌入SDK、自有app和其他数据商三种来源；X-Mode于2021将大部分业务转至Outlogic。2024-04存在最终命令。

**判定：**历史与条件纳入。**局限：**不是全部数据都源自自有SDK；敏感位置数据限制及删除规则影响历史数据延续，不应把2021宣传面板视为当前可用。

- A｜[FTC sourcing and succession](https://www.ftc.gov/news-events/news/press-releases/2024/01/ftc-order-prohibits-data-broker-x-mode-social-outlogic-selling-sensitive-location-data)｜发布/更新：2024-01｜访问：2026-10-10
- A｜[FTC finalization timeline](https://www.ftc.gov/legal-library/browse/cases-proceedings/x-mode-social-inc-timeline-item-2024-04-11)｜发布/更新：2024-04-11｜访问：2026-10-10

<a id="placer"></a>
### Placer.ai

当前Our Data页称从经审核的供应商获得去标识输入，只显示聚合地点信息；API和Feeds提供访问、来源地与迁移趋势等。

**判定：**纳入衍生分析；当前SDK来源待核。**局限：**2021自有SDK叙述不能直接套用当前官网；用户级原始位置不在当前公开交付说明中。

- B｜[Current source statement](https://www.placer.ai/resources/our-data)｜发布/更新：undated｜访问：2026-10-10
- B｜[API](https://www.placer.ai/products/api)｜发布/更新：undated｜访问：2026-10-10
- B｜[Data feeds](https://docs.placer.ai/docs/welcome-to-placers-feeds)｜发布/更新：undated｜访问：2026-10-10

<a id="streetlight"></a>
### StreetLight Data

官方历史方法说明app LBS来源区别于运营商记录，但设备定位可结合GPS、WiFi、Bluetooth、aGPS和cellular triangulation。现平台为交通指标分析。

**判定：**条件纳入；须拆分输入。**局限：**严格排除任何cell triangulation时，该历史LBS应标边界不确定；设备定位服务融合与外购运营商信令是不同问题。车载GPS也不应算手机SDK。

- B｜[LBS versus carrier data methodology](https://www.streetlightdata.com/location-based-services-data-transportation-rural-studies/)｜发布/更新：2017 (search metadata)｜访问：2026-10-10
- B｜[Current methodology library](https://www.streetlightdata.com/whitepapers/)｜发布/更新：undated｜访问：2026-10-10
- A｜[FTA market scan](https://www.transit.dot.gov/sites/fta.dot.gov/files/2023-07/FTA-Report-No-0245-rev.pdf)｜发布/更新：2023｜访问：2026-10-10

<a id="quadrant"></a>
### Quadrant

官方发布者问答描述SDK在用户同意后收集经纬度，只在app前台运行；另支持AWS S3方式server-to-server接入。

**判定：**优先纳入。**局限：**前台限定意味着采样行为偏差和持续轨迹不足；该说明不能反推其全部历史产品均只前台采集。

- B｜[Publisher source and SDK Q&A](https://www.quadrant.io/blog/monetizing-mobile-location-data-publisher-questions-and-answers)｜发布/更新：2025 (search metadata)｜访问：2026-10-10
- B｜[Mobile location product brief](https://www.quadrant.io/hubfs/Quadrant-assets/Mobile_Location_Data_Solution_Brief_Quadrant.pdf?hsLang=en)｜发布/更新：undated｜访问：2026-10-10

<a id="mobilewalla"></a>
### Mobilewalla

FTC 2025-01最终命令明确限制敏感位置数据并禁止为参加竞价以外目的从实时竞价交易所采集消费者数据。

**判定：**边界/排除对照；不认定SDK-only。**局限：**有移动经纬度不等于SDK持续轨迹；本轮没有确认当前可分离的SDK-only产品。

- A｜[FTC final order announcement](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-order-banning-mobilewalla-selling-sensitive-location-data)｜发布/更新：2025-01｜访问：2026-10-10

<a id="kochava"></a>
### Kochava / Collective Data Solutions

Kochava CEO说明Collective市场中的精确位置数据全部来自第三方，而非Kochava SDK。FTC案件页截至2026-06-26列出Stipulated Order。

**判定：**条件纳入市场链路，避免SDK误归属。**局限：**必须区分SDK软件能力与市场数据来源；此处不对全部当前许可条件作法律结论，需按订单和产品核实。

- B｜[CEO data-source explanation](https://www.kochava.com/blog/open-letter-from-kochava-ceo/)｜发布/更新：2022｜访问：2026-10-10
- A｜[FTC case timeline](https://www.ftc.gov/legal-library/browse/cases-proceedings/ftc-v-kochava-inc)｜发布/更新：2026-06-26｜访问：2026-10-10

<a id="reveal"></a>
### Reveal Mobile

2024-11-08隐私政策明示GPS位置、可选后台位置、MAID及SSID/BSSID，并提到SDK和data feeds；业务为广告带店效果测量。

**判定：**优先纳入生态；学术获取待核。**局限：**收集SSID/BSSID不等于证明所有经纬度都由WiFi定位；原始轨迹供应、面板覆盖及学术授权未确认。

- B｜[Privacy policy and collection methods](https://revealmobile.com/privacy)｜发布/更新：2024-11-08｜访问：2026-10-10

## 对文献演进梳理的直接影响

1. **数据版本比品牌名更关键。** SafeGraph→Advan的Patterns转移，Near相关资产→Azira，以及Spectus/Cuebiq的平台名称变化会造成数据库检索漏项。应建立品牌别名、资产/产品关系和有效年份，而非简单合并企业身份。
2. **观测层级决定研究问题。** Veraset Movement等设备级点位适合停留、活动空间、OD和暴露推断；Patterns、Placer和Unacast聚合/模型产品更适合客流、地点恢复及区域比较。无法从POI访问汇总表恢复真实个人轨迹。
3. **来源更替可能伪装成行为变化。** Quad​rant当前前台SDK说明、Cuebiq相互冲突的SDK描述、Placer当前第三方输入，都提示必须审计论文期间的采集方式、面板留存和版本断点。
4. **多源产品需要可复现的来源筛选。** CITYDATA、StreetLight和Azira不能整体标为纯手机SDK；若无法分离车载、IoT、广告竞价流或设备融合定位，应列入混合/未定组。
5. **“有SDK”和“卖SDK数据”是两回事。** Kochava自己的说明明确区分测量SDK与第三方市场；Foursquare Studio Data SDK仅为数据处理接口。供应商存在SDK名称并不是来源证据。

## 下一轮供应商尽调字段

供应主体与产品合同名；数据年份；国家/地区；是否app-only；是否SDK-only；是否含RTB、车载、IoT或运营商记录；GPS/WiFi/其他定位比例；设备稳定标识及重置；前台/后台权限；水平精度与采样间隔分布；DAU/MAU/留存；POI关联算法；人口校准；敏感地点抑制和版本变更；学术许可、结果发表与共享条件。未公开的项目必须标“未知”，不能补推。

## 查询覆盖日志

以下为实际执行的 32 条搜索，均在2026-10-10执行。另直接读取了种子文章、仓库、官网/FAQ和FTC页面。搜索零命中或官网访问失败不代表公司不存在。

1. `site.safegraph.com Patterns Advan 2023 divest patterns data`
2. `site.veraset.com movement data GPS SDK sources`
3. `site.spectus.ai Cuebiq data SDK academic research`
4. `site.citydata.ai mobility SDK GPS data sources`
5. `site.foursquare.com data movement SDK panel data collection`
6. `site.unacast.com data SDK location source Gravy`
7. `site.cuebiq.com Spectus SDK data collection`
8. `site.safegraph.com patterns divested Advan November 2022`
9. `site.huq.io data SDK location GPS Wifi methodology`
10. `site.tamoco.com SDK GPS data sources location`
11. `site.predic.io location data SDK privacy`
12. `site.ftc.gov Gravy Venntel location data 2024 2025 order`
13. `site.huq.io data methodology SDK apps GPS`
14. `site.azira.com Near data mobile SDK sources`
15. `site.inmarket.com SDK GPS location data methodology`
16. `site.outlogic.io SDK location data`
17. `site.ftc.gov X-Mode Outlogic SDK data 2024 order`
18. `site.cuebiq.com deprecated SDK first party data 2024`
19. `site.azira.com Near rebrand 2024`
20. `site.huq.io SDK data`
21. `site.placer.ai data methodology SDK GPS apps`
22. `site.streetlightdata.com data sources LBS GPS mobile apps`
23. `site.quadrant.io mobile location data SDK`
24. `site.ftc.gov Mobilewalla data real time bidding 2025 finalized`
25. `site.huq.io "SDK"`
26. `site.predic.io "data"`
27. `site.kochava.com "location data" "SDK"`
28. `site.azira.com "Near"`
29. `"Azira" "Near Intelligence" "2024"`
30. `site.ftc.gov Kochava "2026"`
31. `site.ftc.gov "Finalizes" "Gravy"`
32. `site.revealmobile.com "SDK" "location" data`

## 完成边界

已完成首轮21个节点核验及当前/历史、SDK/混合、原始/衍生的区分。本轮尚未完成全市场穷尽检索、完整工商谱系、逐论文绑定、所有源的全文快照或学术许可核实。SafeGraph是否为学术使用最多的供应商，需要独立的文献计量，不能由此表推断。

