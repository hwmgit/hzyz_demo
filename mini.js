const heroSlides = [
  {
    image: "./资料/收银台01.jpg",
    eyebrow: "收银系统 / SaaS 方案",
    title: "把真实门店部署案例讲清楚",
    desc: "客户先看到案例价值，再看到设备、服务和落地成果。",
    primary: "查看案例",
    secondary: "服务能力",
    primaryAction: "setView('cases')",
    secondaryAction: "setView('services')"
  },
  {
    image: "./资料/称重&小票机.jpg",
    eyebrow: "智能硬件 / 联调方案",
    title: "收银、小票、称重一体联动",
    desc: "用真实现场素材展示硬件方案，而不是停留在抽象说明。",
    primary: "硬件方案",
    secondary: "咨询顾问",
    primaryAction: "setView('detail', { caseId: 'tea-device' })",
    secondaryAction: "setView('help')"
  },
  {
    image: "./资料/上门服务工单.jpg",
    eyebrow: "交付服务 / 工单证明",
    title: "把上门安装与培训也变成信任资产",
    desc: "不仅展示产品，也展示软剑熊的实施和售后能力。",
    primary: "查看服务",
    secondary: "联系咨询",
    primaryAction: "setView('services')",
    secondaryAction: "setView('help')"
  }
];

const caseCategories = ["全部", "餐饮", "茶饮", "零售", "服务"];

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
    image: "./资料/收银台01.jpg",
    hero: "./资料/收银台01.jpg",
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
    image: "./资料/称重&小票机.jpg",
    hero: "./资料/称重&小票机.jpg",
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
    image: "./资料/环境01.jpg",
    hero: "./资料/环境01.jpg",
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
    image: "./资料/上门服务工单.jpg",
    hero: "./资料/上门服务工单.jpg",
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
    image: "./资料/收银台02.jpg"
  },
  {
    id: "hardware",
    title: "智能硬件",
    desc: "小票机、称重设备、扫码设备与收银台组合联调。",
    image: "./资料/小票机.jpg"
  },
  {
    id: "mini",
    title: "小程序商城",
    desc: "适合作为客户展示、会员触达与咨询转化入口。",
    image: "./资料/环境02.jpg"
  },
  {
    id: "onsite",
    title: "上门服务",
    desc: "安装、培训、签收和售后回访都可纳入标准交付流程。",
    image: "./资料/上门服务工单.jpg"
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
  heroIndex: 0,
  touchStartX: 0,
  helpType: "案例咨询",
  helpContent: "",
  helpContact: "13800000000"
};

globalThis.state = state;

const app = document.querySelector("#app");
const pageTitle = document.querySelector("#pageTitle");
const backBtn = document.querySelector("#backBtn");
const toast = document.querySelector("#toast");

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
  const featured = cases.slice(0, 2);
  app.innerHTML = `
    ${homeHeroMarkup()}
    <div class="weather-strip">
      <span>已服务 <strong>1500+</strong> 品牌客户</span>
      <span>案例 / 设备 / 上门服务</span>
    </div>

    <section class="section">
      ${renderSectionHead("快速入口")}
      <div class="quick-grid">
        <button class="quick-card" onclick="setView('cases', { category: '餐饮' })"><span>餐</span><b>餐饮案例</b></button>
        <button class="quick-card" onclick="setView('cases', { category: '茶饮' })"><span>茶</span><b>茶饮方案</b></button>
        <button class="quick-card" onclick="setView('cases', { category: '零售' })"><span>零</span><b>零售展示</b></button>
        <button class="quick-card" onclick="setView('cases', { category: '服务' })"><span>服</span><b>服务工单</b></button>
        <button class="quick-card service-entry" onclick="setView('services')"><span>能</span><b>服务能力</b></button>
        <button class="quick-card service-entry" onclick="setView('help')"><span>咨</span><b>咨询顾问</b></button>
        <button class="quick-card service-entry" onclick="setCase('tea-device')"><span>机</span><b>设备方案</b></button>
        <button class="quick-card service-entry" onclick="window.location.href='./index.html'"><span>返</span><b>返回入口</b></button>
      </div>
    </section>

    <section class="section">
      ${renderSectionHead("推荐案例", `<button onclick="setView('cases')">查看全部 ›</button>`)}
      <div class="feature-strip">
        ${featured.map((item) => `
          <article class="case-card" onclick="setCase('${item.id}')">
            <img src="${item.image}" alt="${item.title}">
            <div class="case-body">
              <div class="case-head">
                <h3>${item.title}</h3>
                <span class="status-pill">${item.category}</span>
              </div>
              <p>${item.subtitle}</p>
              <div class="tag-row">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section">
      ${renderSectionHead("讲解路径")}
      ${routes.map((route) => `
        <article class="route-card">
          <div class="route-card-head">
            <h3>${route.title}</h3>
            <span>${route.time}</span>
          </div>
          <p>${route.desc}</p>
          <div class="chip-row">${route.stops.map((stop) => `<span class="chip">${stop}</span>`).join("")}</div>
        </article>
      `).join("")}
    </section>
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
  app.innerHTML = `
    <section class="service-hero service-hero-cashier">
      <span class="eyebrow">六大服务能力</span>
      <h1>系统、硬件、商城与上门交付一体说明</h1>
      <p>小程序端不仅展示案例，也把客户最关心的服务能力做成可点击页面。</p>
    </section>
    ${services.map((service) => `
      <article class="service-card">
        <img class="service-thumb" src="${service.image}" alt="${service.title}">
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
        <div class="cta-row service-cta">
          <button class="primary-btn" onclick="showToast('已记录该服务关注点')">标记重点</button>
          <button class="ghost-btn" onclick="setView('help')">立即咨询</button>
        </div>
      </article>
    `).join("")}
  `;
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
  document.querySelectorAll(".tabbar button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === (state.view === "detail" || state.view === "help" ? (state.view === "help" ? "services" : "cases") : state.view));
  });

  const viewMap = {
    home: { title: "软剑熊案例中心", render: renderHome },
    cases: { title: "案例库", render: renderCases },
    detail: { title: "案例详情", render: renderDetail },
    services: { title: "服务能力", render: renderServices },
    help: { title: "咨询顾问", render: renderHelp },
    mine: { title: "我的", render: renderMine }
  };

  const current = viewMap[state.view] || viewMap.home;
  pageTitle.textContent = current.title;
  current.render();
  app.scrollTop = 0;
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

render();
