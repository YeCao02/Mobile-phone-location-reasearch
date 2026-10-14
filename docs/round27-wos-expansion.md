# 2026-10-14：WoS 扩展与台风研究合作归类

## 本轮入库

- **L89｜基于人群活动恢复的开放空间灾害韧性度量研究——以杜苏芮台风为例**，灾害学，2026，41(1)：133–141。DOI：[10.3969/j.issn.1000-811X.2026.01.017](https://doi.org/10.3969/j.issn.1000-811X.2026.01.017)。从用户 Zotero 条目及 PDF 核对，正文 §1.2 明示 Jike／isjike.com、SDK 采集、授权用户匿名位置，福州 2023-07-03 至 08-13。原文同时提到网络定位和蜂窝塔信号，保留该描述，不改写为纯 GPS 数据。
- L29 与 L89 同时显示在**中科院地理所杜云艳团队**、**福州大学吴升团队**下，标注合作与重复展示，统计各计一次。吴升团队归类依用户确认；两篇实际署名的福州合作者为赵志远，不将团队归类改写为吴升本人署名。

## 三篇后续关联研究：正文已下载，原文供应商未具名

| 编号 | 论文与期刊 | 数据声明核查 | 正文 |
|---|---|---|---|
| L90 | GAGNN: a geography-aware graph neural network for citywide commuting flows prediction；International Journal of Applied Earth Observation and Geoinformation，2026 | 福州 2023 年 1—2 月工作日；正文称位置服务运营商提供 GPS 轨迹，处理后 1,374,963 条通勤 OD。未见 Jike、Moxing、Pioneer 具名。 | [作者公开 PDF](https://giserwang.github.io/papers/JAG-2026-02-14.pdf) |
| L91 | Predicting human-activity intensity in urban areas with a prior-enhanced probabilistic-deterministic model；International Journal of Geographical Information Science，2026（2025 在线） | 福州 2023-03-01 至 03-28，885 个 500 m 网格、15 分钟计数；含匿名 ID、经纬度和时间。讨论 Wi-Fi 断连等采样问题，也讨论基站乒乓效应；未见供应商具名。不能仅凭 Wi-Fi 字样确认为泛先锋。 | [作者公开 PDF](https://giserwang.github.io/papers/IJGIS-2025-09.pdf) |
| L92 | Predicting citywide human mobility with a graph-prior-enhanced euclidean convolutional network；Sustainable Cities and Society，2026 | 厦门与福州，2023-04-01 至 06-30，15 分钟 OD；厦门 712、福州 3,164 个村级单元。数据部分未具名供应商，继续待核。 | [作者公开 PDF](https://giserwang.github.io/papers/SCSI-2026-07.pdf) |

更新：经用户认可并完成同团队、城市和时间交叉对照，三篇转入04，标注“及刻 Jike（高概率同源）”；供应商使用计数列为用户关联确认，与原文具名证据分开。PDF 来源为[合作者公开论文页](https://giserwang.github.io/publicationsandpatents)，已保存本地并核读数据章节。

## WoS 检索记录

通过用户已认证的 Chrome 学校 WebVPN 访问 Web of Science Core Collection，改用高级布尔检索。以下为检索当时的结果数，不表示全部已核读，也不是全领域论文总数。

1. `ALL=("isjike.com" OR "Jike" OR "Moxing" OR "Pioneer Data" OR "Guangzhou Mengxiang")`：1,094 条；大量 Jike 人名等误匹配。
2. 上式加 `TS=("mobile phone" OR smartphone* OR "human mobility" OR "location data" OR "trajectory data" OR "location-based service*")`：2 条，均与目标数据供应链无关。
3. `(AU=(Wu Sheng) AND OG=(Fuzhou University) AND TS=("mobile phone" OR smartphone* OR "human mobility" OR "trajectory data" OR "location data" OR "location-based")) OR FG=(2023YFB3906804)`：21 条。结合作者主页获取 L90—L92 全文；已排除条目不重新入库。
4. `((AU=(Xia Jizhe) AND OG=(Shenzhen University)) OR (AU=(Wang Pu) AND OG=(Central South University)) OR (AU=(Li Fengqing) AND OG=(Shanghai University))) AND TS=("mobile phone" OR smartphone* OR "human mobility" OR "location data" OR "location-based" OR "GPS" OR "SDK")`：40 条，重点查看最近发表结果；已在库条目去重。
5. `TS=(("software development kit" OR "SDK" OR "ROM") AND ("human mobility" OR "mobile phone" OR "location data" OR "spatiotemporal")) AND CU=(China)`：44 条。ROM 的降阶模型、关节活动度等歧义带来噪声。
6. 去除上式中的 `OR "ROM"`：8 条，已查看结果以非目标应用为主；未因此新增供应商确认。

WoS 的 ALL 和 TS 面向索引字段，不能当作出版商全文搜索。因此，供应商词没有命中不能证明论文没有使用该供应商。后续仍应采用团队／基金号发现论文，再核读正文与补充材料。

## 边界与后续线索

- **Structure-aware multi-view urban representation learning with coordinated fusion and alignment**：已下载 PDF，实际实验使用纽约、芝加哥出租车及签到数据，不纳入泛先锋。
- **Detecting hidden ping-pong records in mobile phone location data by considering daily activity patterns**：正文公开信息指向西宁基站切换与乒乓记录，暂不据团队关系纳入泛先锋。
- **Reducing CO2 emissions from short-distance vehicle trips: A pathway to sustainable urban transport**：数据为车牌识别，不纳入。
- **An interpretable stratified weighted network for uncovering spatially heterogeneous correlations between the built environment and nighttime urban vitality**（WOS:001684701000001）与 **Population heterogeneity of the impact caused by temporal sampling intervals on typical human mobility indicators using mobile phone location data**（WOS:001814480100001）：本轮仅发现题录，尚未核读数据来源，保留在此检索日志，不计入确认论文。

## 2026-10-14 同源交叉核验补充

- **L90**：福州2023年1—2月，与具名及刻的L64（Cities，2023-01-01至07）重叠，并被L76（福州2023全年、具名及刻、GPS/WiFi）的时段覆盖；同属吴升合作团队，原文称位置服务商提供GPS轨迹。
- **L91**：福州2023-03-01至28，被具名及刻的L76（福州2023全年）覆盖，并包含已关联L55（福州2023-03-06至12、GPS/WIFI/蓝牙）时段；与L46（厦门2023-03-01至28）共享研究团队、日期和500m/15分钟活动强度口径，但城市不同，作为补充关联证据。
- **L92**：福州、厦门2023-04-01至06-30。福州部分被具名及刻的L76（福州2023全年）覆盖；厦门部分与已关联L46的2023年3月研究时段相接，属于同团队连续时段研究。厦门部分证据弱于福州，未取得单独具名供方声明。

其中最强的时间证据是 L76 具名及刻的福州2023全年数据覆盖，而不只是三个新研究月份连续。三个研究原文仍未具名，不把关联判断写成论文声明，也不据此断言同一交付批次或完全相同样本。
