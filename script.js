const ANALYTICS_CONFIG = {
  umamiScriptUrl: "",
  websiteId: "",
  productionDomain: "",
};

function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  const direction = form ? form.querySelector('select[name="direction"]') : null;
  if (!form || !status) return;

  if (direction) {
    const initialDirection = new URLSearchParams(window.location.search).get("direction");
    if (initialDirection) {
      direction.value = initialDirection;
    }
  }

  document.querySelectorAll("[data-direction]").forEach((link) => {
    link.addEventListener("click", () => {
      if (!direction) return;
      direction.value = link.dataset.direction;
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "需求已记录。本静态版本未连接后端，正式上线时可接入线索收集接口。";
    form.reset();
  });
}

function initHeroShowcase() {
  const showcase = document.querySelector("[data-showcase]");
  if (!showcase) return;

  const lanes = Array.from(showcase.querySelectorAll("[data-showcase-lane]"));
  if (!lanes.length) return;

  let previousTime = performance.now();
  const states = lanes.map((lane) => {
    const cards = Array.from(lane.children);
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      lane.appendChild(clone);
    });

    const gap = parseFloat(getComputedStyle(lane).gap) || 0;
    const cycleHeight = cards.reduce((total, card) => total + card.getBoundingClientRect().height, 0) + gap * cards.length;
    return {
      lane,
      cycleHeight,
      speed: Number(lane.dataset.speed || 0.36),
      offset: Number(lane.dataset.offset || 0),
    };
  });

  function tick(now) {
    const delta = Math.min(now - previousTime, 48);
    previousTime = now;

    states.forEach((state) => {
      state.offset += state.speed * delta;
      if (state.offset >= state.cycleHeight) {
        state.offset -= state.cycleHeight;
      }
      state.lane.style.transform = `translateY(${-state.offset}px)`;
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initHeroRotator() {
  const tabs = Array.from(document.querySelectorAll("[data-hero-tab]"));
  const titleTrack = document.querySelector("[data-hero-title-track]");
  const copy = document.querySelector("[data-hero-copy]");
  if (!tabs.length || !titleTrack || !copy) return;

  const items = [
    "以精益管理 + 流程管理双驱为底层逻辑，先识别价值流与浪费，再确定最值得 AI 化的业务场景。",
    "基于意图编程和 LLM 操作系统，把业务目标转成可演示、可迭代、可落地的 AI 原生软件。",
    "连接商业空间运维、招商营运、客流销售和软硬件数据，让实体商业进入可量化运营状态。",
    "以商业经验和 AI 数智科技双基融合，覆盖马来西亚、印尼、越南、菲律宾等海外市场落地。",
  ];

  let activeIndex = 0;
  let timer = null;

  function setActive(index) {
    activeIndex = (index + items.length) % items.length;
    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    const titleHeight = titleTrack.parentElement ? titleTrack.parentElement.getBoundingClientRect().height : 132;
    titleTrack.style.transform = `translateY(${-activeIndex * titleHeight}px)`;
    copy.classList.add("is-changing");
    window.setTimeout(() => {
      copy.textContent = items[activeIndex];
      copy.classList.remove("is-changing");
    }, 160);
  }

  function start() {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      setActive(activeIndex + 1);
    }, 6000);
  }

  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(index === 0));
    tab.addEventListener("click", () => {
      setActive(index);
      start();
    });
  });

  setActive(0);
  start();
}

function initAnalytics() {
  const { umamiScriptUrl, websiteId, productionDomain } = ANALYTICS_CONFIG;
  const hostname = window.location.hostname;
  const blockedHosts = ["", "localhost", "127.0.0.1"];
  const shouldEnable =
    umamiScriptUrl &&
    websiteId &&
    productionDomain &&
    hostname === productionDomain &&
    !blockedHosts.includes(hostname);

  if (!shouldEnable) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = umamiScriptUrl;
  script.setAttribute("data-website-id", websiteId);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initContactForm();
  initHeroShowcase();
  initHeroRotator();
  initAnalytics();
});
