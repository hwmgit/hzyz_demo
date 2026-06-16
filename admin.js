const adminState = {
  search: "",
  category: "全部",
  status: "全部",
  selectedCaseId: "zhedinghui",
  toastTimer: null
};

const MINI_CONFIG_KEY = "ysb_case_show_mini_config_v1";

const defaultFrontendConfig = {
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
    { id: "cashier-service", label: "收银系统", iconImage: "./resource/收银台01.jpg", view: "scope", payload: { scopeCategory: "收银系统" } },
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

function loadFrontendConfig() {
  try {
    const raw = localStorage.getItem(MINI_CONFIG_KEY);
    if (!raw) return cloneConfig(defaultFrontendConfig);
    const parsed = JSON.parse(raw);
    const merged = {
      quickModules: mergeByKey(parsed.quickModules, defaultFrontendConfig.quickModules, "id"),
      caseTiles: mergeByKey(parsed.caseTiles, defaultFrontendConfig.caseTiles, "id"),
      businessItems: mergeByKey(parsed.businessItems, defaultFrontendConfig.businessItems, "id"),
      tabBar: mergeByKey(parsed.tabBar, defaultFrontendConfig.tabBar, "tab")
    };
    if (JSON.stringify(parsed) !== JSON.stringify(merged)) {
      localStorage.setItem(MINI_CONFIG_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return cloneConfig(defaultFrontendConfig);
  }
}

const frontendConfigState = loadFrontendConfig();

const quickTargetOptions = [
  { value: "company", label: "公司介绍" },
  { value: "scope", label: "业务范围" },
  { value: "detail", label: "案例详情" },
  { value: "help", label: "咨询顾问" },
  { value: "cases", label: "案例列表" }
];

const caseCategoryOptions = [
  { value: "餐饮", label: "餐饮" },
  { value: "茶饮", label: "茶饮" },
  { value: "零售", label: "零售" },
  { value: "服务", label: "服务" },
  { value: "全部", label: "全部" }
];

const scopeCategoryOptions = [
  { value: "全部", label: "全部" },
  { value: "移动宽带", label: "移动宽带" },
  { value: "监控网络", label: "监控网络" },
  { value: "门店导航", label: "门店导航" },
  { value: "收银系统", label: "收银系统" },
  { value: "配套硬件", label: "配套硬件" },
  { value: "海报设计", label: "海报设计" }
];

const caseTargetOptions = [
  { value: "餐饮", label: "餐饮" },
  { value: "茶饮", label: "茶饮" },
  { value: "零售", label: "零售" },
  { value: "服务", label: "服务" },
  { value: "全部", label: "全部" }
];

const adminCases = [
  {
    id: "zhedinghui",
    title: "浙鼎荟门店收银系统上线",
    category: "餐饮",
    status: "已发布",
    cover: "./resource/收银台01.jpg",
    videos: [
      { id: "v1", title: "门店部署现场总览", duration: "00:04", src: "./videos/case-zhedinghui.mp4", poster: "./resource/收银台01.jpg" }
    ],
    summary: "PC 收银、小票机、扫码盒与培训交付。",
    location: "温州浙鼎荟门店",
    contact: "400-875-0577",
    highlight: "收银链路快速闭环",
    tags: ["POS", "打印", "培训"],
    content: "以门店部署为核心，统一展示收银系统、打印设备、安装培训和签收闭环。"
  },
  {
    id: "tea-device",
    title: "茶饮门店称重与小票联调案例",
    category: "茶饮",
    status: "草稿",
    cover: "./resource/称重&小票机.jpg",
    videos: [
      { id: "v2", title: "称重与小票联调讲解", duration: "00:04", src: "./videos/case-tea-device.mp4", poster: "./resource/称重&小票机.jpg" }
    ],
    summary: "称重设备、小票机与收银台组合展示。",
    location: "茶饮客户门店场景",
    contact: "400-875-0577",
    highlight: "硬件组合直观可讲",
    tags: ["称重", "联调", "设备组合"],
    content: "把复杂硬件讲解压缩为易讲解的案例页面，让客户快速理解部署效果。"
  },
  {
    id: "mini-shop",
    title: "小程序商城与会员营销展示方案",
    category: "零售",
    status: "已发布",
    cover: "./resource/环境01.jpg",
    videos: [
      { id: "v3", title: "小程序商城内容展示", duration: "00:04", src: "./videos/case-mini-shop.mp4", poster: "./resource/环境01.jpg" }
    ],
    summary: "案例展示、会员触达与咨询表单一体化。",
    location: "客户自营小程序入口",
    contact: "400-875-0577",
    highlight: "内容入口统一",
    tags: ["小程序", "会员", "内容展示"],
    content: "将公司介绍、推荐案例、服务能力和咨询表单整合到移动端客户入口中。"
  },
  {
    id: "service-order",
    title: "上门安装与培训服务闭环",
    category: "服务",
    status: "待完善",
    cover: "./resource/上门服务工单.jpg",
    videos: [
      { id: "v4", title: "服务工单与交付说明", duration: "00:04", src: "./videos/case-service-order.mp4", poster: "./resource/上门服务工单.jpg" }
    ],
    summary: "把服务工单转成售前可展示内容。",
    location: "门店现场上门服务",
    contact: "400-875-0577",
    highlight: "售后能力可视化",
    tags: ["工单", "上门", "培训"],
    content: "把工单、模块、设备和服务节点写入案例详情，让售后能力成为案例的一部分。"
  }
];

const adminAssets = [
  { id: "a1", kind: "image", name: "收银台01", type: "门店部署", src: "./resource/收银台01.jpg", source: "客户资料" },
  { id: "a2", kind: "image", name: "收银台02", type: "门店部署", src: "./resource/收银台02.jpg", source: "客户资料" },
  { id: "a3", kind: "image", name: "称重&小票机", type: "智能硬件", src: "./resource/称重&小票机.jpg", source: "客户资料" },
  { id: "a4", kind: "image", name: "上门服务工单", type: "服务记录", src: "./resource/上门服务工单.jpg", source: "客户资料" },
  { id: "a5", kind: "image", name: "环境01", type: "门店环境", src: "./resource/环境01.jpg", source: "客户资料" },
  { id: "a6", kind: "image", name: "小票机", type: "智能硬件", src: "./resource/小票机.jpg", source: "客户资料" },
  { id: "v1", kind: "video", name: "门店部署现场总览", type: "案例视频", src: "./videos/case-zhedinghui.mp4", poster: "./resource/收银台01.jpg", source: "系统生成" },
  { id: "v2", kind: "video", name: "称重与小票联调讲解", type: "案例视频", src: "./videos/case-tea-device.mp4", poster: "./resource/称重&小票机.jpg", source: "系统生成" },
  { id: "v3", kind: "video", name: "小程序商城内容展示", type: "案例视频", src: "./videos/case-mini-shop.mp4", poster: "./resource/环境01.jpg", source: "系统生成" },
  { id: "v4", kind: "video", name: "服务工单与交付说明", type: "案例视频", src: "./videos/case-service-order.mp4", poster: "./resource/上门服务工单.jpg", source: "系统生成" }
];

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const statusFilter = document.querySelector("#statusFilter");
const caseList = document.querySelector("#caseList");
const editorHost = document.querySelector("#editorHost");
const assetGrid = document.querySelector("#assetGrid");
const toast = document.querySelector("#toast");
const uploadInput = document.querySelector("#uploadInput");
const fileCount = document.querySelector("#fileCount");
const statCases = document.querySelector("#statCases");
const statPublished = document.querySelector("#statPublished");
const statAssets = document.querySelector("#statAssets");
const statVideos = document.querySelector("#statVideos");
const configHost = document.querySelector("#configHost");
const saveConfigBtn = document.querySelector("#saveConfigBtn");

function escapeAttr(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(adminState.toastTimer);
  adminState.toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function currentCase() {
  return adminCases.find((item) => item.id === adminState.selectedCaseId) || adminCases[0];
}

function filteredCases() {
  const q = adminState.search.trim().toLowerCase();
  return adminCases.filter((item) => {
    const text = [item.title, item.category, item.summary, item.highlight, item.tags.join(" ")].join(" ").toLowerCase();
    const matchSearch = !q || text.includes(q);
    const matchCategory = adminState.category === "全部" || item.category === adminState.category;
    const matchStatus = adminState.status === "全部" || item.status === adminState.status;
    return matchSearch && matchCategory && matchStatus;
  });
}

function updateStats() {
  statCases.textContent = `${adminCases.length}`;
  statPublished.textContent = `${adminCases.filter((item) => item.status === "已发布").length}`;
  statAssets.textContent = `${adminAssets.length}`;
  statVideos.textContent = `${adminAssets.filter((item) => item.kind === "video").length}`;
}

function renderCaseList() {
  const list = filteredCases();
  caseList.innerHTML = list.map((item) => `
    <button class="case-item ${item.id === adminState.selectedCaseId ? "active" : ""}" data-case-id="${item.id}">
      <img src="${item.cover}" alt="${item.title}">
      <div>
        <strong>${item.title}</strong>
        <p>${item.summary}</p>
        <div class="tag-row">
          <span class="status ${item.status === "草稿" || item.status === "待完善" ? "draft" : ""}">${item.status}</span>
          <span class="tag">${item.category}</span>
        </div>
      </div>
    </button>
  `).join("");
}

function renderEditor() {
  const item = currentCase();
  editorHost.innerHTML = `
    <article class="editor-card">
      <img class="editor-cover" src="${item.cover}" alt="${item.title}">
      <div class="editor-body">
        <div class="panel-head">
          <div>
            <h3>案例编辑</h3>
            <p>查看、修改并维护客户案例内容，更新后可同步到客户展示端。</p>
          </div>
          <div class="tag-row">
            <span class="status ${item.status === "草稿" || item.status === "待完善" ? "draft" : ""}">${item.status}</span>
            <span class="tag">${item.category}</span>
          </div>
        </div>
        <div class="editor-grid">
          <div class="field">
            <label for="caseTitle">案例标题</label>
            <input id="caseTitle" class="input" value="${item.title}">
          </div>
          <div class="field">
            <label for="caseCategory">案例分类</label>
            <select id="caseCategory">
              ${["餐饮", "茶饮", "零售", "服务"].map((category) => `<option value="${category}" ${category === item.category ? "selected" : ""}>${category}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="caseStatus">发布状态</label>
            <select id="caseStatus">
              ${["已发布", "草稿", "待完善"].map((status) => `<option value="${status}" ${status === item.status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="caseHighlight">核心亮点</label>
            <input id="caseHighlight" class="input" value="${item.highlight}">
          </div>
          <div class="field full">
            <label for="caseSummary">摘要说明</label>
            <textarea id="caseSummary">${item.summary}</textarea>
          </div>
          <div class="field full">
            <label for="caseContent">正文内容</label>
            <textarea id="caseContent">${item.content}</textarea>
          </div>
          <div class="field">
            <label for="caseLocation">门店 / 场景</label>
            <input id="caseLocation" class="input" value="${item.location}">
          </div>
          <div class="field">
            <label for="caseContact">联系电话</label>
            <input id="caseContact" class="input" value="${item.contact}">
          </div>
          <div class="field full">
            <label for="caseTags">标签</label>
            <input id="caseTags" class="input" value="${item.tags.join(" / ")}">
          </div>
        </div>
        <div class="field full">
          <label>已绑定视频</label>
          <div class="asset-grid">
            ${(item.videos || []).map((video) => `
              <article class="asset-card">
                <video controls preload="metadata" poster="${video.poster}">
                  <source src="${video.src}" type="video/mp4">
                </video>
                <div>
                  <strong>${video.title}</strong>
                  <span>时长 ${video.duration}</span>
                </div>
              </article>
            `).join("") || `<article class="asset-card"><div><strong>暂无视频</strong><span>可从下方资料库上传视频并绑定到当前案例。</span></div></article>`}
          </div>
        </div>
        <div class="editor-actions">
          <button class="primary-btn" id="saveCaseBtn">保存修改</button>
          <button class="ghost-btn" id="publishCaseBtn">${item.status === "已发布" ? "转为草稿" : "发布案例"}</button>
          <button class="ghost-btn" id="useAssetBtn">设为推荐案例</button>
        </div>
      </div>
    </article>
  `;

  document.querySelector("#saveCaseBtn").addEventListener("click", saveCase);
  document.querySelector("#publishCaseBtn").addEventListener("click", togglePublish);
  document.querySelector("#useAssetBtn").addEventListener("click", () => showToast("已加入首页推荐位"));
}

function renderAssets() {
  assetGrid.innerHTML = adminAssets.map((asset) => `
    <article class="asset-card">
      ${asset.kind === "video"
        ? `<video controls preload="metadata" poster="${asset.poster || currentCase().cover}"><source src="${asset.src}" type="video/mp4"></video>`
        : `<img src="${asset.src}" alt="${asset.name}">`
      }
      <div>
        <strong>${asset.name}</strong>
        <span>${asset.type} · ${asset.source}</span>
        <div class="action-row">
          ${asset.kind === "video"
            ? `<button class="small-btn" data-asset-video="${asset.id}">绑定视频</button>`
            : `<button class="small-btn" data-asset-use="${asset.id}">设为封面</button><button class="small-btn" data-asset-append="${asset.id}">加入案例</button>`
          }
        </div>
      </div>
    </article>
  `).join("");
}

function renderConfigPanel() {
  configHost.innerHTML = `
    <div class="config-grid">
      <article class="config-card">
        <h3>首页快捷模块</h3>
        <div class="config-list">
          ${frontendConfigState.quickModules.map((item, index) => renderConfigRow("quick", index, item)).join("")}
        </div>
      </article>
      <article class="config-card">
        <h3>中部案例入口</h3>
        <div class="config-list">
          ${frontendConfigState.caseTiles.map((item, index) => renderConfigRow("case", index, item)).join("")}
        </div>
      </article>
      <article class="config-card">
        <h3>主营业务与底部导航</h3>
        <div class="config-list">
          ${frontendConfigState.businessItems.map((item, index) => renderConfigRow("business", index, item)).join("")}
          ${frontendConfigState.tabBar.map((item, index) => renderConfigRow("tab", index, item)).join("")}
        </div>
      </article>
    </div>
    <div class="config-note">说明：前台小程序会读取同一份本地配置，刷新页面后即可看到后台修改结果。</div>
  `;
}

function renderConfigRow(group, index, item) {
  if (group === "quick") {
    return `
      <div class="config-row">
        <div class="config-row-head">
          <strong>快捷模块 ${index + 1}</strong>
        </div>
        <div class="config-fields">
          <input data-group="quick" data-index="${index}" data-field="label" value="${escapeAttr(item.label)}" placeholder="标题">
          <input data-group="quick" data-index="${index}" data-field="iconImage" value="${escapeAttr(item.iconImage || "")}" placeholder="图标图片地址">
          <select data-group="quick" data-index="${index}" data-field="view">
            ${renderOptions(quickTargetOptions, item.view)}
          </select>
          ${renderQuickPayloadField(index, item)}
        </div>
      </div>
    `;
  }
  if (group === "case") {
    return `
      <div class="config-row">
        <div class="config-row-head">
          <strong>案例入口 ${index + 1}</strong>
        </div>
        <div class="config-fields">
          <input data-group="case" data-index="${index}" data-field="label" value="${escapeAttr(item.label)}" placeholder="标题">
          <input data-group="case" data-index="${index}" data-field="iconImage" value="${escapeAttr(item.iconImage || "")}" placeholder="图标图片地址">
          <select data-group="case" data-index="${index}" data-field="category">
            ${renderOptions(caseTargetOptions, item.category)}
          </select>
        </div>
      </div>
    `;
  }
  if (group === "business") {
    return `
      <div class="config-row">
        <div class="config-row-head">
          <strong>主营业务 ${index + 1}</strong>
        </div>
        <div class="config-fields">
          <input data-group="business" data-index="${index}" data-field="label" value="${escapeAttr(item.label)}" placeholder="标题">
          <input data-group="business" data-index="${index}" data-field="iconImage" value="${escapeAttr(item.iconImage || "")}" placeholder="图标图片地址">
          <select data-group="business" data-index="${index}" data-field="scopeCategory">
            ${renderOptions(scopeCategoryOptions, item.payload?.scopeCategory || "全部")}
          </select>
        </div>
      </div>
    `;
  }
  return `
    <div class="config-row">
      <div class="config-row-head">
        <strong>底部导航 ${index + 1}</strong>
      </div>
      <div class="config-fields">
        <input data-group="tab" data-index="${index}" data-field="label" value="${escapeAttr(item.label)}" placeholder="标题">
        <input data-group="tab" data-index="${index}" data-field="iconImage" value="${escapeAttr(item.iconImage || "")}" placeholder="图标图片地址">
      </div>
    </div>
  `;
}

function renderQuickPayloadField(index, item) {
  if (item.view === "detail") {
    return `
      <select class="full" data-group="quick" data-index="${index}" data-field="caseId">
        ${renderOptions(caseDetailsOptions(), item.payload?.caseId || "zhedinghui")}
      </select>
    `;
  }
  if (item.view === "scope") {
    return `
      <select class="full" data-group="quick" data-index="${index}" data-field="scopeCategory">
        ${renderOptions(scopeCategoryOptions, item.payload?.scopeCategory || "全部")}
      </select>
    `;
  }
  if (item.view === "cases") {
    return `
      <select class="full" data-group="quick" data-index="${index}" data-field="category">
        ${renderOptions(caseTargetOptions, item.payload?.category || "全部")}
      </select>
    `;
  }
  return `<div class="config-note full">该模块点击后直接跳转，无需额外参数。</div>`;
}

function renderOptions(options, selectedValue) {
  return options.map((option) => `<option value="${escapeAttr(option.value)}" ${option.value === selectedValue ? "selected" : ""}>${option.label}</option>`).join("");
}

function caseDetailsOptions() {
  return adminCases.map((item) => ({ value: item.id, label: item.title }));
}

function saveFrontendConfig() {
  const nextConfig = {
    quickModules: frontendConfigState.quickModules.map((item) => ({ id: item.id, label: item.label, iconImage: item.iconImage || "", view: item.view, payload: cloneConfig(item.payload || {}) })),
    caseTiles: frontendConfigState.caseTiles.map((item) => ({ id: item.id, label: item.label, iconImage: item.iconImage || "", category: item.category, view: item.view, payload: cloneConfig(item.payload || {}) })),
    businessItems: frontendConfigState.businessItems.map((item) => ({ id: item.id, label: item.label, iconImage: item.iconImage || "", view: item.view, payload: cloneConfig(item.payload || {}) })),
    tabBar: frontendConfigState.tabBar.map((item) => ({ tab: item.tab, label: item.label, iconImage: item.iconImage || "" }))
  };
  document.querySelectorAll("[data-group]").forEach((input) => {
    const group = input.dataset.group;
    const index = Number(input.dataset.index);
    const field = input.dataset.field;
    const value = input.value.trim();
    if (group === "quick") {
      const item = nextConfig.quickModules[index];
      if (!item) return;
      if (field === "view") {
        item.view = value;
        if (value === "company" || value === "help") {
          item.payload = {};
        }
        if (value === "scope") {
          item.payload = { scopeCategory: "全部" };
        }
        if (value === "detail") {
          item.payload = { caseId: adminCases[0]?.id || "" };
        }
        if (value === "cases") {
          item.payload = { category: "全部" };
        }
        return;
      }
      if (field === "caseId" || field === "scopeCategory" || field === "category") {
        item.payload = item.payload || {};
        item.payload[field === "caseId" ? "caseId" : field] = value;
        return;
      }
      item[field] = value;
    }
    if (group === "case") {
      const item = nextConfig.caseTiles[index];
      if (!item) return;
      if (field === "category") {
        item.category = value;
        item.payload = { category: value };
        return;
      }
      item[field] = value;
    }
    if (group === "business") {
      const item = nextConfig.businessItems[index];
      if (!item) return;
      if (field === "scopeCategory") {
        item.payload = { scopeCategory: value };
        return;
      }
      item[field] = value;
    }
    if (group === "tab") {
      const item = nextConfig.tabBar[index];
      if (!item) return;
      item[field] = value;
    }
  });
  localStorage.setItem(MINI_CONFIG_KEY, JSON.stringify(nextConfig));
  Object.assign(frontendConfigState, nextConfig);
  renderConfigPanel();
  showToast("前台配置已保存");
}

function saveCase() {
  const item = currentCase();
  item.title = document.querySelector("#caseTitle").value.trim() || item.title;
  item.category = document.querySelector("#caseCategory").value;
  item.status = document.querySelector("#caseStatus").value;
  item.highlight = document.querySelector("#caseHighlight").value.trim() || item.highlight;
  item.summary = document.querySelector("#caseSummary").value.trim() || item.summary;
  item.content = document.querySelector("#caseContent").value.trim() || item.content;
  item.location = document.querySelector("#caseLocation").value.trim() || item.location;
  item.contact = document.querySelector("#caseContact").value.trim() || item.contact;
  item.tags = document.querySelector("#caseTags").value.split("/").map((tag) => tag.trim()).filter(Boolean);
  updateStats();
  renderCaseList();
  renderEditor();
  showToast("案例内容已保存");
}

function togglePublish() {
  const item = currentCase();
  item.status = item.status === "已发布" ? "草稿" : "已发布";
  updateStats();
  renderCaseList();
  renderEditor();
  showToast(item.status === "已发布" ? "案例已发布" : "案例已转为草稿");
}

function bindCaseListEvents() {
  caseList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-case-id]");
    if (!button) return;
    adminState.selectedCaseId = button.dataset.caseId;
    renderCaseList();
    renderEditor();
  });
}

function bindAssetEvents() {
  assetGrid.addEventListener("click", (event) => {
    const useBtn = event.target.closest("[data-asset-use]");
    const appendBtn = event.target.closest("[data-asset-append]");
    const videoBtn = event.target.closest("[data-asset-video]");
    if (useBtn) {
      const asset = adminAssets.find((item) => item.id === useBtn.dataset.assetUse);
      if (!asset) return;
      currentCase().cover = asset.src;
      renderCaseList();
      renderEditor();
      showToast(`已将 ${asset.name} 设为案例封面`);
    }
    if (appendBtn) {
      const asset = adminAssets.find((item) => item.id === appendBtn.dataset.assetAppend);
      if (!asset) return;
      showToast(`已将 ${asset.name} 加入案例资料`);
    }
    if (videoBtn) {
      const asset = adminAssets.find((item) => item.id === videoBtn.dataset.assetVideo);
      if (!asset) return;
      const item = currentCase();
      item.videos = item.videos || [];
      const exists = item.videos.some((video) => video.src === asset.src);
      if (!exists) {
        item.videos.unshift({
          id: asset.id,
          title: asset.name,
          duration: "本地资料",
          src: asset.src,
          poster: asset.poster || item.cover
        });
      }
      renderEditor();
      showToast(`已将 ${asset.name} 绑定到当前案例`);
    }
  });
}

function bindFilters() {
  searchInput.addEventListener("input", () => {
    adminState.search = searchInput.value;
    renderCaseList();
  });

  categoryFilter.addEventListener("change", () => {
    adminState.category = categoryFilter.value;
    renderCaseList();
  });

  statusFilter.addEventListener("change", () => {
    adminState.status = statusFilter.value;
    renderCaseList();
  });
}

function bindUpload() {
  uploadInput.addEventListener("change", async () => {
    const files = [...uploadInput.files];
    if (!files.length) return;
    for (const file of files) {
      const src = await fileToPreviewUrl(file);
      adminAssets.unshift({
        id: `upload-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
        name: file.name,
        kind: file.type.startsWith("video/") ? "video" : "image",
        type: file.type.startsWith("video/") ? "视频资料" : "图片资料",
        src,
        poster: currentCase().cover,
        source: "本次上传"
      });
    }
    fileCount.textContent = `已上传 ${files.length} 份资料`;
    updateStats();
    renderAssets();
    showToast("资料上传成功，已加入资料库");
    uploadInput.value = "";
  });
}

function fileToPreviewUrl(file) {
  return Promise.resolve(URL.createObjectURL(file));
}

function init() {
  updateStats();
  renderCaseList();
  renderEditor();
  renderAssets();
  renderConfigPanel();
  bindCaseListEvents();
  bindAssetEvents();
  bindFilters();
  bindUpload();
  saveConfigBtn.addEventListener("click", saveFrontendConfig);
}

init();
