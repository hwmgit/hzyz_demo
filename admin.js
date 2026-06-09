const adminState = {
  search: "",
  category: "全部",
  status: "全部",
  selectedCaseId: "zhedinghui",
  toastTimer: null
};

const adminCases = [
  {
    id: "zhedinghui",
    title: "浙鼎荟门店收银系统上线",
    category: "餐饮",
    status: "已发布",
    cover: "./资料/收银台01.jpg",
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
    cover: "./资料/称重&小票机.jpg",
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
    cover: "./资料/环境01.jpg",
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
    cover: "./资料/上门服务工单.jpg",
    summary: "把服务工单转成售前可展示内容。",
    location: "门店现场上门服务",
    contact: "400-875-0577",
    highlight: "售后能力可视化",
    tags: ["工单", "上门", "培训"],
    content: "把工单、模块、设备和服务节点写入案例详情，让售后能力成为案例的一部分。"
  }
];

const adminAssets = [
  { id: "a1", name: "收银台01", type: "门店部署", src: "./资料/收银台01.jpg", source: "客户资料" },
  { id: "a2", name: "收银台02", type: "门店部署", src: "./资料/收银台02.jpg", source: "客户资料" },
  { id: "a3", name: "称重&小票机", type: "智能硬件", src: "./资料/称重&小票机.jpg", source: "客户资料" },
  { id: "a4", name: "上门服务工单", type: "服务记录", src: "./资料/上门服务工单.jpg", source: "客户资料" },
  { id: "a5", name: "环境01", type: "门店环境", src: "./资料/环境01.jpg", source: "客户资料" },
  { id: "a6", name: "小票机", type: "智能硬件", src: "./资料/小票机.jpg", source: "客户资料" }
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
const statDrafts = document.querySelector("#statDrafts");

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
  statDrafts.textContent = `${adminCases.filter((item) => item.status !== "已发布").length}`;
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
      <img src="${asset.src}" alt="${asset.name}">
      <div>
        <strong>${asset.name}</strong>
        <span>${asset.type} · ${asset.source}</span>
        <div class="action-row">
          <button class="small-btn" data-asset-use="${asset.id}">设为封面</button>
          <button class="small-btn" data-asset-append="${asset.id}">加入案例</button>
        </div>
      </div>
    </article>
  `).join("");
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
      const src = await fileToDataUrl(file);
      adminAssets.unshift({
        id: `upload-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
        name: file.name,
        type: "本地上传",
        src,
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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function init() {
  updateStats();
  renderCaseList();
  renderEditor();
  renderAssets();
  bindCaseListEvents();
  bindAssetEvents();
  bindFilters();
  bindUpload();
}

init();
