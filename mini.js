const heroSlides = [
  {
    image: "./resource/收银台01.jpg",
    eyebrow: "RX 软剑熊",
    title: "企业级 SAAS 数字一体化解决方案专家",
    desc: "系统·配套·平价超市",
    primary: "餐饮案例",
    secondary: "零售案例",
    primaryAction: "setView('cases')",
    secondaryAction: "setView('services')"
  },
  {
    image: "./resource/称重&小票机.jpg",
    eyebrow: "门店现场 / 联调方案",
    title: "收银、小票、称重一体联动",
    desc: "用真实现场素材展示硬件方案，而不是停留在抽象说明。",
    primary: "收银套餐",
    secondary: "商务合作",
    primaryAction: "setView('detail', { caseId: 'tea-device' })",
    secondaryAction: "setView('help')"
  },
  {
    image: "./resource/上门服务工单.jpg",
    eyebrow: "交付服务 / 工单证明",
    title: "把上门安装与培训也变成信任资产",
    desc: "不仅展示产品，也展示软剑熊的实施和售后能力。",
    primary: "主营业务",
    secondary: "联系咨询",
    primaryAction: "setView('services')",
    secondaryAction: "setView('help')"
  }
];

const caseCategories = ["全部", "餐饮", "茶饮", "零售", "服务"];

const MINI_CONFIG_KEY = "ysb_case_show_mini_config_v1";

const defaultMiniConfig = {
  quickModules: [
    { id: "company", label: "公司介绍", iconImage: "./resource/ui-icons/company.svg", view: "company", payload: {} },
    { id: "scope", label: "业务范围", iconImage: "./resource/ui-icons/scope.svg", view: "scope", payload: { scopeCategory: "全部" } },
    { id: "cashier", label: "收银套餐", iconImage: "./resource/ui-icons/cashier.svg", view: "detail", payload: { caseId: "zhedinghui" } },
    { id: "cooperate", label: "商务合作", iconImage: "./resource/ui-icons/cooperate.svg", view: "help", payload: {} }
  ],
  caseTiles: [
    { id: "case-restaurant", label: "餐饮案例", category: "餐饮", iconImage: "./resource/收银台01.jpg", view: "cases", payload: { category: "餐饮" } },
    { id: "case-retail", label: "零售案例", category: "零售", iconImage: "./resource/环境01.jpg", view: "cases", payload: { category: "零售" } },
    { id: "case-entertainment", label: "休娱案例", category: "服务", iconImage: "./resource/上门服务工单.jpg", view: "cases", payload: { category: "服务" } },
    { id: "case-more", label: "更多案例", category: "全部", iconImage: "./resource/收银台03.jpg", view: "cases", payload: { category: "全部" } }
  ],
  businessItems: [
    { id: "broadband", label: "移动宽带", iconImage: "./resource/环境02.jpg", view: "scope", payload: { scopeCategory: "移动宽带" } },
    { id: "monitor", label: "监控网络", iconImage: "./resource/收银台02.jpg", view: "scope", payload: { scopeCategory: "监控网络" } },
    { id: "nav", label: "门店导航", iconImage: "./resource/环境01.jpg", view: "scope", payload: { scopeCategory: "门店导航" } },
    { id: "cashier", label: "收银系统", iconImage: "./resource/收银台01.jpg", view: "scope", payload: { scopeCategory: "收银系统" } },
    { id: "hardware", label: "配套硬件", iconImage: "./resource/小票机.jpg", view: "scope", payload: { scopeCategory: "配套硬件" } },
    { id: "poster", label: "海报设计", iconImage: "./resource/上门服务工单.jpg", view: "scope", payload: { scopeCategory: "海报设计" } }
  ],
  tabBar: [
    { tab: "home", label: "首页", iconImage: "./resource/ui-icons/home.svg" },
    { tab: "cases", label: "案例", iconImage: "./resource/ui-icons/case.svg" },
    { tab: "services", label: "服务", iconImage: "./resource/ui-icons/service.svg" },
    { tab: "mine", label: "我的", iconImage: "./resource/ui-icons/mine.svg" }
  ]
};

function cloneConfig(source) {
  return JSON.parse(JSON.stringify(source));
}

function normalizeArray(source, fallback) {
  return Array.isArray(source) && source.length ? source : cloneConfig(fallback);
}

function mergeByKey(sourceList, fallbackList, key) {
  const sourceMap = new Map((Array.isArray(sourceList) ? sourceList : []).map((item) => [item[key], item]));
  return fallbackList.map((fallbackItem) => {
    const current = sourceMap.get(fallbackItem[key]) || {};
    return {
      ...cloneConfig(fallbackItem),
      ...current,
      iconImage: current.iconImage !== undefined ? current.iconImage : (fallbackItem.iconImage || ""),
      payload: {
        ...cloneConfig(fallbackItem.payload || {}),
        ...cloneConfig(current.payload || {})
      }
    };
  });
}

function loadMiniConfig() {
  try {
    const raw = localStorage.getItem(MINI_CONFIG_KEY);
    if (!raw) return cloneConfig(defaultMiniConfig);
    const parsed = JSON.parse(raw);
    const merged = {
      quickModules: mergeByKey(normalizeArray(parsed.quickModules, defaultMiniConfig.quickModules), defaultMiniConfig.quickModules, "id"),
      caseTiles: mergeByKey(normalizeArray(parsed.caseTiles, defaultMiniConfig.caseTiles), defaultMiniConfig.caseTiles, "id"),
      businessItems: mergeByKey(normalizeArray(parsed.businessItems, defaultMiniConfig.businessItems), defaultMiniConfig.businessItems, "id"),
      tabBar: mergeByKey(normalizeArray(parsed.tabBar, defaultMiniConfig.tabBar), defaultMiniConfig.tabBar, "tab")
    };
    if (JSON.stringify(parsed) !== JSON.stringify(merged)) {
      localStorage.setItem(MINI_CONFIG_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return cloneConfig(defaultMiniConfig);
  }
}

function saveMiniConfig(nextConfig) {
  localStorage.setItem(MINI_CONFIG_KEY, JSON.stringify(nextConfig));
}

const cases = [
  {
    id: "zhedinghui",
    category: "餐饮",
    title: "浙鼎荟门店收银系统上线",
    subtitle: "PC 收银、小票机、扫码盒与培训交付",
    price: "7 台设备联调",
    sold: "1 店部署",
    duration: "上线周期 1 天",
    open: "含安装培训",
    address: "温州浙鼎荟门店",
    phone: "400-875-0577",
    image: "./resource/收银台01.jpg",
    hero: "./resource/收银台01.jpg",
    videos: [
      { title: "门店部署现场总览", duration: "00:04", poster: "./resource/收银台01.jpg", src: "./videos/case-zhedinghui.mp4" }
    ],
    tags: ["POS", "打印", "培训"],
    highlights: ["PC 电脑 + 80 小票机 + 扫码盒", "现场部署和员工培训", "收银链路快速闭环"],
    tickets: [
      { name: "门店部署全景包", desc: "系统 + 设备 + 培训展示", price: "收银 / 小票 / 交付" },
      { name: "案例汇报精简版", desc: "适合客户讲解的重点版式", price: "痛点 / 方案 / 成果" }
    ],
    pain: "客户关心的不只是系统界面，还关心现场设备如何安装、能否稳定打印、上线后是否有人培训。",
    solution: "软剑熊以门店为单位配置收银系统、打印设备和扫码配件，并用标准服务工单记录安装、培训和签收过程。",
    result: "把原来零散的部署照片、设备说明和服务记录整合成可复用案例，销售介绍时更容易建立信任。"
  },
  {
    id: "tea-device",
    category: "茶饮",
    title: "茶饮门店称重与小票联调案例",
    subtitle: "称重设备、小票机与收银台组合展示",
    price: "设备方案",
    sold: "多端联动",
    duration: "适合快消门店",
    open: "支持扩展小程序",
    address: "茶饮客户门店场景",
    phone: "400-875-0577",
    image: "./resource/称重&小票机.jpg",
    hero: "./resource/称重&小票机.jpg",
    videos: [
      { title: "称重与小票联调讲解", duration: "00:04", poster: "./resource/称重&小票机.jpg", src: "./videos/case-tea-device.mp4" }
    ],
    tags: ["称重", "联调", "设备组合"],
    highlights: ["真实设备照片", "收银台联动说明", "可扩展到小程序商城"],
    tickets: [
      { name: "硬件组合方案", desc: "称重 + 打印 + 收银台", price: "强调设备联调" },
      { name: "小程序引流版", desc: "增加线上介绍与咨询入口", price: "强调展示转化" }
    ],
    pain: "客户常看不懂设备组合的实际落地方式，只看到参数无法判断是否适合门店。",
    solution: "用真实现场照片、模块标签和案例详情页拆解门店所需硬件组合，让客户快速理解部署效果。",
    result: "把复杂硬件讲解压缩为易讲解的案例页面，利于销售拜访和方案评估。"
  },
  {
    id: "mini-shop",
    category: "零售",
    title: "小程序商城与会员营销展示方案",
    subtitle: "案例展示、会员触达与咨询表单一体化",
    price: "展示型小程序",
    sold: "适合招商介绍",
    duration: "内容化运营",
    open: "支持案例沉淀",
    address: "客户自营小程序入口",
    phone: "400-875-0577",
    image: "./resource/环境01.jpg",
    hero: "./resource/环境01.jpg",
    videos: [
      { title: "小程序商城内容展示", duration: "00:04", poster: "./resource/环境01.jpg", src: "./videos/case-mini-shop.mp4" }
    ],
    tags: ["小程序", "会员", "内容展示"],
    highlights: ["案例 + 公司介绍 + 咨询", "适合分享给潜在客户", "后台可持续维护内容"],
    tickets: [
      { name: "基础展示方案", desc: "首页、案例、介绍、咨询", price: "适合快速上线" },
      { name: "会员增强版", desc: "增加会员权益和商城说明", price: "适合后续立项" }
    ],
    pain: "客户希望先有一个对外入口，能快速展示公司能力和实际案例，而不是只能线下讲。",
    solution: "将公司介绍、推荐案例、服务能力和咨询表单整合到移动端客户入口中，形成统一的对外展示窗口。",
    result: "形成销售可分享的标准展示页面，帮助客户更快理解正式系统价值。"
  },
  {
    id: "service-order",
    category: "服务",
    title: "上门安装与培训服务闭环",
    subtitle: "把服务工单转成售前可展示内容",
    price: "交付能力",
    sold: "售后可证明",
    duration: "长期运营资产",
    open: "适合企业客户",
    address: "门店现场上门服务",
    phone: "400-875-0577",
    image: "./resource/上门服务工单.jpg",
    hero: "./resource/上门服务工单.jpg",
    videos: [
      { title: "服务工单与交付说明", duration: "00:04", poster: "./resource/上门服务工单.jpg", src: "./videos/case-service-order.mp4" }
    ],
    tags: ["工单", "上门", "培训"],
    highlights: ["标准工单模板", "安装签收记录", "售后能力可视化"],
    tickets: [
      { name: "部署服务说明", desc: "安装、培训、签字确认", price: "适合项目汇报" },
      { name: "售后保障说明", desc: "售后、维修和回访", price: "适合长期合作" }
    ],
    pain: "售前讲系统容易，讲交付和售后能力更难，客户担心上线后没人管。",
    solution: "把工单、模块、设备和服务节点写入案例详情，让售后能力也成为案例的一部分。",
    result: "客户能明确看到软剑熊的交付标准，减少对实施阶段的担忧。"
  }
];

const services = [
  {
    id: "cashier",
    title: "收银系统",
    desc: "覆盖前台收银、打印出单、扫码与门店收款链路。",
    image: "./resource/收银台02.jpg"
  },
  {
    id: "hardware",
    title: "智能硬件",
    desc: "小票机、称重设备、扫码设备与收银台组合联调。",
    image: "./resource/小票机.jpg"
  },
  {
    id: "mini",
    title: "小程序商城",
    desc: "适合作为客户展示、会员触达与咨询转化入口。",
    image: "./resource/环境02.jpg"
  },
  {
    id: "onsite",
    title: "上门服务",
    desc: "安装、培训、签收和售后回访都可纳入标准交付流程。",
    image: "./resource/上门服务工单.jpg"
  }
];

const routes = [
  {
    title: "第一次了解软剑熊",
    time: "3 分钟",
    stops: ["首页主视觉", "推荐案例", "服务能力", "提交咨询"],
    desc: "适合拜访客户时快速过一遍产品能力和案例成果。"
  },
  {
    title: "重点讲设备与门店部署",
    time: "5 分钟",
    stops: ["案例列表", "茶饮设备案例", "收银台案例", "服务工单"],
    desc: "适合客户重点关注设备、部署方式和交付细节的场景。"
  },
  {
    title: "从案例切到立项咨询",
    time: "2 分钟",
    stops: ["案例详情", "服务能力", "咨询提交"],
    desc: "适合销售收口，沟通后直接引导填写需求。"
  }
];

const mineMenus = [
  { label: "推荐案例清单", view: "cases" },
  { label: "服务能力说明", view: "services" },
  { label: "咨询顾问", view: "help" },
  { label: "返回系统首页", href: "./index.html" }
];

const state = {
  view: "home",
  caseId: "zhedinghui",
  category: "全部",
  scopeCategory: "全部",
  heroIndex: 0,
  touchStartX: 0,
  helpType: "案例咨询",
  helpContent: "",
  helpContact: "13800000000"
};

globalThis.state = state;
let miniConfig = loadMiniConfig();
globalThis.miniConfig = miniConfig;

const app = document.querySelector("#app");
const pageTitle = document.querySelector("#pageTitle");
const backBtn = document.querySelector("#backBtn");
const toast = document.querySelector("#toast");
const tabbarButtons = [...document.querySelectorAll(".tabbar button")];

function caseById(id) {
  return cases.find((item) => item.id === id) || cases[0];
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 1800);
}

function setView(view, payload = {}) {
  Object.assign(state, payload, { view });
  render();
}

function setCase(id, view = "detail") {
  state.caseId = id;
  setView(view);
}

function setHeroSlide(index) {
  state.heroIndex = index;
  updateHomeHero();
}

function nextHeroSlide() {
  state.heroIndex = (state.heroIndex + 1) % heroSlides.length;
  updateHomeHero();
}

function handleHeroTouchStart(event) {
  state.touchStartX = event.changedTouches[0].clientX;
}

function handleHeroTouchEnd(event) {
  const delta = event.changedTouches[0].clientX - state.touchStartX;
  if (Math.abs(delta) < 40) {
    return;
  }
  if (delta < 0) {
    nextHeroSlide();
    return;
  }
  state.heroIndex = (state.heroIndex - 1 + heroSlides.length) % heroSlides.length;
  updateHomeHero();
}

function homeHeroMarkup() {
  const slide = heroSlides[state.heroIndex];
  return `
    <div id="homeHero" class="hero hero-carousel" style="background-image:url('${slide.image}')" ontouchstart="handleHeroTouchStart(event)" ontouchend="handleHeroTouchEnd(event)">
      <span class="eyebrow">${slide.eyebrow}</span>
      <h1>${slide.title}</h1>
      <p>${slide.desc}</p>
      <div class="hero-actions">
        <button class="primary-btn" onclick="${slide.primaryAction}">${slide.primary}</button>
        <button class="secondary-btn" onclick="${slide.secondaryAction}">${slide.secondary}</button>
      </div>
      <div class="hero-dots">
        ${heroSlides.map((_, index) => `<button class="${index === state.heroIndex ? "active" : ""}" onclick="setHeroSlide(${index})" aria-label="切换到第 ${index + 1} 张"></button>`).join("")}
      </div>
    </div>
  `;
}

function updateHomeHero() {
  if (state.view !== "home") {
    return;
  }
  const hero = document.querySelector("#homeHero");
  if (!hero) {
    renderHome();
    return;
  }
  hero.outerHTML = homeHeroMarkup();
}

function renderSectionHead(title, action = "") {
  return `
    <div class="section-head">
      <h2>${title}</h2>
      ${action || ""}
    </div>
  `;
}

function renderHome() {
  app.innerHTML = `
    ${homeHeroMarkup()}
    <div class="stat-strip">
      <span>已服务 <strong>2000+</strong> 品牌客户</span>
      <span>移动宽带 / 收银系统 / 上门服务</span>
    </div>

    <section class="section">
      <div class="quick-grid quick-grid-inline">
        ${miniConfig.quickModules.map((item) => `
          <button class="quick-card" onclick="invokeConfiguredView('${item.view}', '${actionPayloadAttr(item.payload)}')">
            ${renderIconBox(item)}
            <b>${item.label}</b>
          </button>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="panel-grid">
        ${miniConfig.caseTiles.map((item) => `
          <button class="panel-tile" onclick="invokeConfiguredView('${item.view}', '${actionPayloadAttr(item.payload)}')">
            ${renderTileImage(item)}
            <strong>${item.label}</strong>
          </button>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="business-panel">
        <h2>主营业务</h2>
        <div class="business-grid">
          ${miniConfig.businessItems.map((item) => `
            <button class="business-pill" onclick="invokeConfiguredView('${item.view}', '${actionPayloadAttr(item.payload)}')">
              ${renderBusinessImage(item)}
              <span>${item.label}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section home-footer-space"></section>
  `;
}

function renderCases() {
  const filtered = state.category === "全部" ? cases : cases.filter((item) => item.category === state.category);
  app.innerHTML = `
    <section class="section">
      ${renderSectionHead("案例库", `<button onclick="setView('home')">返回首页 ›</button>`)}
      <div class="pill-row">
        ${caseCategories.map((category) => `<button class="pill ${category === state.category ? "active" : ""}" onclick="setView('cases', { category: '${category}' })">${category}</button>`).join("")}
      </div>
      ${filtered.map((item) => `
        <article class="product-card" onclick="setCase('${item.id}')">
          <img src="${item.image}" alt="${item.title}">
          <div class="product-body">
            <div class="case-head">
              <h3>${item.title}</h3>
              <span class="status-pill">${item.category}</span>
            </div>
            <p>${item.subtitle}</p>
            <div class="tag-row">${item.highlights.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
            <div class="price-row">
              <div class="price">${item.price}</div>
              <button class="primary-btn" onclick="event.stopPropagation(); setCase('${item.id}')">查看详情</button>
            </div>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderDetail() {
  const item = caseById(state.caseId);
  app.innerHTML = `
    <section class="detail-hero" style="background-image:url('${item.hero}')">
      <span class="eyebrow">${item.category}</span>
      <h1>${item.title}</h1>
      <p>${item.subtitle}</p>
      <div class="hero-actions">
        <button class="primary-btn" onclick="setView('help')">咨询方案</button>
        <button class="secondary-btn" onclick="setView('cases')">更多案例</button>
      </div>
    </section>

    <section class="detail-grid">
      <article class="notice-card">
        <h3>客户痛点</h3>
        <p>${item.pain}</p>
      </article>
      <article class="notice-card">
        <h3>解决方案</h3>
        <p>${item.solution}</p>
      </article>
      <article class="notice-card">
        <h3>交付成果</h3>
        <p>${item.result}</p>
        <div class="tag-row">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      </article>
      <article class="ticket-card">
        <h3>案例视频</h3>
        <p>用于展示部署现场、设备联调和服务说明，方便客户快速理解实际落地效果。</p>
        <div class="video-stack">
          ${(item.videos || []).map((video) => `
            <div class="video-player-card">
              <video class="detail-video" controls preload="metadata" poster="${video.poster}">
                <source src="${video.src}" type="video/mp4">
              </video>
              <div class="video-meta">
                <strong>${video.title}</strong>
                <span>时长 ${video.duration}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="ticket-card">
        <h3>方案组合</h3>
        <p>以下内容用于区分不同客户关注点，便于按业务需求组织案例说明。</p>
        ${item.tickets.map((ticket) => `
          <div class="support-card">
            <h3>${ticket.name}</h3>
            <p>${ticket.desc}</p>
            <div class="price-row">
              <div class="price"><small>${ticket.price}</small></div>
              <button class="ghost-btn" onclick="showToast('已加入重点方案')">加入重点</button>
            </div>
          </div>
        `).join("")}
      </article>
      <article class="notice-card">
        <h3>联系方式</h3>
        <p>地址：${item.address}</p>
        <p>电话：${item.phone}</p>
      </article>
    </section>
  `;
}

function renderServices() {
  const scopeTitle = state.scopeCategory === "全部" ? "业务范围" : `${state.scopeCategory}分类`;
  app.innerHTML = `
    <section class="section">
      <article class="service-panel">
        <h2>${scopeTitle}</h2>
        <p class="section-note">点击业务分类后进入对应模块，后台修改后会同步到这里。</p>
        <div class="service-chip-grid">
          ${miniConfig.businessItems.map((item) => `
            <button class="service-chip ${state.scopeCategory === item.label ? "active" : ""}" onclick="invokeConfiguredView('scope', '${actionPayloadAttr({ scopeCategory: item.label })}')">${item.label}</button>
          `).join("")}
        </div>
      </article>
    </section>
    <section class="section service-stack">
      ${scopeItems(state.scopeCategory).map((service) => `
        <article class="service-card">
          <img class="service-thumb" src="${service.image}" alt="${service.title}">
          <div class="service-card-body">
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
            <div class="cta-row service-cta">
              <button class="ghost-btn" onclick="setView('help')">立即咨询</button>
            </div>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderCompany() {
  app.innerHTML = `
    <section class="detail-hero company-hero" style="background-image:url('./resource/收银台03.jpg')">
      <span class="eyebrow">公司介绍</span>
      <h1>软剑熊以系统、硬件和交付服务连接门店经营</h1>
      <p>围绕收银系统、智能设备、小程序展示和上门服务，做可落地的门店数字化方案。</p>
      <div class="hero-actions">
        <button class="primary-btn" onclick="setView('scope')">查看业务范围</button>
        <button class="secondary-btn" onclick="setView('help')">联系合作</button>
      </div>
    </section>
    <section class="detail-grid">
      <article class="notice-card">
        <h3>核心介绍</h3>
        <p>面向餐饮、零售、茶饮、服务等门店场景，输出收银、会员、硬件联调和实施服务的组合方案。</p>
      </article>
      <article class="notice-card">
        <h3>服务特点</h3>
        <p>展示内容以真实现场素材为主，强调设备落地、交付闭环和后续维护，不做空泛产品话术。</p>
      </article>
      <article class="notice-card">
        <h3>合作方式</h3>
        <p>支持销售拜访演示、客户转介绍和线上咨询留资，后台可持续调整首页模块和入口图标。</p>
      </article>
    </section>
  `;
}

const scopePreset = [
  { id: "移动宽带", title: "移动宽带", desc: "门店开店和临时点位的接入方案。", image: "./resource/环境01.jpg" },
  { id: "监控网络", title: "监控网络", desc: "门店安防、画面回传和联网协同。", image: "./resource/环境02.jpg" },
  { id: "门店导航", title: "门店导航", desc: "进店引导、桌台导航和顾客动线展示。", image: "./resource/收银台02.jpg" },
  { id: "收银系统", title: "收银系统", desc: "前台收银、打印和扫码联动。", image: "./resource/收银台01.jpg" },
  { id: "配套硬件", title: "配套硬件", desc: "小票机、称重设备和收银终端组合。", image: "./resource/小票机.jpg" },
  { id: "海报设计", title: "海报设计", desc: "活动页、门店海报和宣传物料输出。", image: "./resource/环境01.jpg" }
];

function scopeItems(category) {
  if (!category || category === "全部") {
    return scopePreset;
  }
  return scopePreset.filter((item) => item.id === category);
}

function renderIconBox(item) {
  if (item.iconImage) {
    return `<span class="quick-icon"><img src="${item.iconImage}" alt=""></span>`;
  }
  return `<span class="quick-icon">${(item.label || "").slice(0, 1)}</span>`;
}

function actionPayloadAttr(payload) {
  return encodeURIComponent(JSON.stringify(payload || {}));
}

function invokeConfiguredView(view, encodedPayload = "") {
  const payload = encodedPayload ? JSON.parse(decodeURIComponent(encodedPayload)) : {};
  setView(view, payload);
}

function renderHelp() {
  app.innerHTML = `
    <section class="service-hero service-hero-help">
      <span class="eyebrow">咨询与跟进</span>
      <h1>把意向客户直接导向顾问沟通</h1>
      <p>提交后将进入待跟进线索，当前页面先展示本地反馈结果。</p>
    </section>
    <article class="support-card">
      <h3>咨询顾问</h3>
      <p>适用于方案讲解后立即收集客户意向、门店数量和关注模块。</p>
      <div class="field">
        <label for="helpType">需求类型</label>
        <input id="helpType" value="${state.helpType}" oninput="state.helpType = this.value">
      </div>
      <div class="field">
        <label for="helpContact">联系方式</label>
        <input id="helpContact" value="${state.helpContact}" oninput="state.helpContact = this.value">
      </div>
      <div class="field">
        <label for="helpContent">需求说明</label>
        <textarea id="helpContent" oninput="state.helpContent = this.value" placeholder="例如：2 家门店，希望了解收银系统和小程序商城">${state.helpContent}</textarea>
      </div>
      <button class="primary-btn" onclick="submitHelp()">提交咨询</button>
    </article>
    <article class="notice-card">
      <h3>建议收集的信息</h3>
      <ul>
        <li>门店数量、业态和现有系统情况</li>
        <li>是否需要收银、小程序、会员或硬件方案</li>
        <li>是否关心上门安装、培训和售后服务</li>
      </ul>
    </article>
  `;
}

function submitHelp() {
  showToast("咨询已提交，顾问将继续跟进");
  state.helpContent = "";
  renderHelp();
}

function renderMine() {
  app.innerHTML = `
    <section class="section">
      <article class="mine-card">
        <h3>软剑熊案例展示端</h3>
        <p>这里用于承接“我的收藏 / 常用入口 / 返回系统首页”等低频功能，便于后续继续扩展会员、收藏与线索记录。</p>
      </article>
    </section>
    <section class="menu-list">
      ${mineMenus.map((item) => item.href
        ? `<a class="menu-item menu-link" href="${item.href}"><strong>${item.label}</strong><span>›</span></a>`
        : `<button class="menu-item" onclick="setView('${item.view}')"><strong>${item.label}</strong><span>›</span></button>`
      ).join("")}
    </section>
  `;
}

function render() {
  document.body.dataset.view = state.view;
  renderTabbar();

  const viewMap = {
    home: { title: "软剑熊案例中心", render: renderHome },
    cases: { title: "案例库", render: renderCases },
    detail: { title: "案例详情", render: renderDetail },
    company: { title: "公司介绍", render: renderCompany },
    scope: { title: "业务范围", render: renderServices },
    services: { title: "业务范围", render: renderServices },
    help: { title: "咨询顾问", render: renderHelp },
    mine: { title: "我的", render: renderMine }
  };

  const current = viewMap[state.view] || viewMap.home;
  pageTitle.textContent = current.title;
  current.render();
  app.scrollTop = 0;
}

function renderTabbar() {
  const viewToTab = {
    home: "home",
    cases: "cases",
    detail: "cases",
    company: "home",
    scope: "services",
    services: "services",
    help: "services",
    mine: "mine"
  };
  const activeTab = viewToTab[state.view] || "home";
  tabbarButtons.forEach((button) => {
    const item = miniConfig.tabBar.find((entry) => entry.tab === button.dataset.tab);
    if (item) {
      button.dataset.tab = item.tab;
      button.innerHTML = `<span class="tab-icon">${renderTabIcon(item)}</span>${item.label}`;
    }
    button.classList.toggle("active", button.dataset.tab === activeTab);
  });
}

function renderTabIcon(item) {
  return item.iconImage ? `<img src="${item.iconImage}" alt="">` : (item.label || "").slice(0, 1);
}

function renderTileImage(item) {
  return item.iconImage
    ? `<span class="tile-thumb"><img src="${item.iconImage}" alt="${item.label}"></span>`
    : `<span class="tile-thumb tile-fallback">${(item.label || "").slice(0, 1)}</span>`;
}

function renderBusinessImage(item) {
  return item.iconImage
    ? `<span class="business-thumb"><img src="${item.iconImage}" alt="${item.label}"></span>`
    : `<span class="business-thumb business-fallback">${(item.label || "").slice(0, 1)}</span>`;
}

backBtn.addEventListener("click", () => {
  if (state.view === "home") {
    window.location.href = "./index.html";
    return;
  }
  if (state.view === "detail") {
    setView("cases");
    return;
  }
  setView("home");
});

document.querySelectorAll(".tabbar button").forEach((button) => {
  button.addEventListener("click", () => {
    const tab = button.dataset.tab;
    setView(tab);
  });
});

window.setHeroSlide = setHeroSlide;
window.setView = setView;
window.setCase = setCase;
window.handleHeroTouchStart = handleHeroTouchStart;
window.handleHeroTouchEnd = handleHeroTouchEnd;
window.showToast = showToast;
window.submitHelp = submitHelp;

window.addEventListener("storage", (event) => {
  if (event.key === MINI_CONFIG_KEY) {
    miniConfig = loadMiniConfig();
    globalThis.miniConfig = miniConfig;
    render();
  }
});

render();
