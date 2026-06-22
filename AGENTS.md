# v5 官网模块说明

## 1. 当前目录结构

- `index.html`：v5 官网首页，当前以 v2 明亮 AI 数智化官网为基底。
- `styles.css`：v5 视觉、响应式和组件样式，当前沿用 v2。
- `script.js`：移动导航、表单提示、Umami 统计占位。
- `DESIGN.md`：v5 设计规范，当前从 v2 复制并作为后续调整入口。
- `assets/`：本地生成的首屏和模块 PNG 背景图。
- `assets/youzan-showcase/`：临时下载的有赞首页右侧卡片参考图，仅用于阶段性视觉复刻，正式上线前必须替换为自有或已授权素材。
- `favicon.png`：当前商标，用于 v5 各页面标签页图标。
- `advisory.html`、`software.html`、`global.html`、`commerce.html`、`about.html`：顶部导航对应的独立内容页。

## 2. 当前实现约定

- v5 初始版本由 v2 复制创建，后续在此基础上调整内容与视觉。
- 当前页面主体仍为明亮蓝、青、绿，顶部标题栏已调整为深色玻璃感。
- 首页首屏不再使用背景大图，`.hero-image` 使用暖白色到浅蓝色的多层 CSS 渐变循环。
- 首页各主模块背景使用暖白到浅蓝的连续渐变过渡，避免服务、流程、联系模块之间出现硬切色块。
- 首页核心业务模块中 AI 顾问、AI 软件、商业运营使用 `assets/module-back-compressed.jpg`，该图由 `assets/back.png` 压缩裁切而来；出海业务模块使用 `assets/out_cn.jpeg`；模块文字浮在图片上方。
- 顶部导航中“服务矩阵”仍跳转首页服务矩阵；“AI 顾问 / AI 软件 / 出海业务 / 商业运营 / 关于盈泽”分别跳转到独立页面，独立页面图片复用 `./assets/legacy/` 资源。
- 顶部商标引用本目录 `assets/logo-mark.png`，并为“商标 + 盈泽数科”增加初始化入场动效；减少动画偏好下自动关闭。
- 首页首屏左侧为 `hero-tabs` + `hero-rotator` 文案切换模块，参考有赞首页左侧标签与标题自动循环效果；当前四个主题固定为“AI转型 / 软件定制 / 实体商业 / 商业出海”，标题与说明文案由 `script.js` 的 `initHeroRotator()` 同步切换。
- 首屏左侧标题区必须保持可见优先：`hero-copy` 设置独立层级和最大宽度，`hero-grid` 在 1041px-1180px 区间有专门列宽收敛，避免右侧卡片墙把标题挤出视口。
- 首页首屏右侧为 `hero-showcase` 三列业务卡片墙，按有赞首页右侧结构复刻为 630px 宽、三条 194px 纵向轨道；卡片必须保持图片卡 `showcase-card--image` 与文字卡 `showcase-card--text` 相互独立、交替出现，不要把文字覆盖到图片上。文字卡固定为两行：一行标题 `strong`、一行简介 `span`。当前临时使用 `assets/youzan-showcase/` 本地图片与业务文案，后续图片替换应优先替换 `.showcase-visual` 背景。
- 文字卡标题颜色规则必须写在 `.showcase-card--text strong`，通用图片卡标题规则必须限定为 `.showcase-card--image strong`，避免白色标题覆盖到白底文字卡上。
- `advisory.html` 为 AI 转型顾问服务页，内容重点是业务诊断、场景优先级、数据与流程盘点、AI 治理、组织导入和 90 天试点路线图，不应复用软件开发页文案。
- 2026-06-17 后 v5 内容已按 `资料/` 中 3 个 PPTX 资料重写，资料文本提取结果保存在 `.codex-tmp/资料_pptx_text_extract.md`。
- 首页和各业务页内容边界：
  - 首页：四大业务入口、五步闭环总览和联系转化。
  - AI 顾问页：精益管理 + 流程管理双驱 AI 化、五步闭环、六阶段全员赋能。
  - AI 软件页：软件 3.0、意图编程、1-3 天 Demo、一客一方案、行业专属智能体。
  - 出海业务页：双基融合、信息迷雾/资源孤岛/风险黑洞、AI 市场报告、本地化落地团队。
  - 商业运营页：商业空间运维平台、商业运营平台、软硬件集成系统。
  - 关于页：以杭州盈泽为主体，资料中的瑞维体系经验仅作为协同能力基础表达，避免主体混同。
- 公司信息仍为占位，正式上线前需要替换真实主体信息。
- 首页最终主题固定为 `theme-light-3.css`（晨雾银蓝）。首页通过 `styles-base.css` + `theme-light-3.css` 组合加载；历史候选主题和预览文件已按规则移动到 `delete/`，不要恢复样式选择器或重新新增多主题引用。

## 3. 重要注意事项

- 修改 v5 前先读取本目录 `DESIGN.md`。
- 修改首页主题前先确认 `index.html` 直接引用的主题文件与最终方案一致；当前不再保留 `theme-switcher` 和 `THEME_OPTIONS` 逻辑。
- 首页核心业务模块当前按需求使用压缩后的 `back.png` 模块图，出海业务模块单独使用 `assets/out_cn.jpeg`；不要改回旧版四张模块图。该约定不适用于首页首屏背景，首屏背景保持 CSS 渐变循环。
- `hero-showcase` 由 `script.js` 的 `initHeroShowcase()` 在运行时克隆每条轨道卡片并持续更新 `transform`，用于接近有赞的滚动效果；克隆卡片需保持 `aria-hidden="true"`，避免读屏重复朗读。
- `showcase-lane` 的 `transform` 由 JS 每帧控制，禁止再给 `.hero-showcase:hover .showcase-lane` 或 lane 本身添加 `transition: transform`，否则循环回绕时会出现掉落或反向滚动错觉。
- `hero-rotator` 的标题切换高度由 JS 动态读取，不要在 JS 中写死桌面高度；如修改 CSS 高度，需验证桌面和移动端标题滑动位置。
- 当前三条轨道 `data-speed` 均为 `0.03`，约每秒滚动 30px；如调整速度，优先修改 `index.html` 中的 `data-speed`。
- 移动端保持三条窄轨道在容器内展示，不允许产生横向页面溢出。
- `script.js` 中的 `ANALYTICS_CONFIG` 默认空值，生产域名和配置齐全后才允许启用统计。
- 联系表单当前只显示前端提示，不会真实提交。

## 4. 后续建议

- 若要进一步提升真实感，可使用授权摄影或 AI 生成更精细的杭州城市业务场景图替换当前本地生成图。
- 拿到真实公司资料后优先替换页脚和联系表单说明。

