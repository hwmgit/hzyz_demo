import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function includesAll(content, tokens, file) {
  for (const token of tokens) {
    assert(content.includes(token), `${file} 缺少关键内容：${token}`);
  }
}

const requiredFiles = [
  "demo需求分析.md",
  "DESIGN.md",
  "index.html",
  "admin.html",
  "AGENTS.md",
  "vendor/qrcode.js"
];

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(root, file)), `缺少文件：${file}`);
}

const requirements = read("demo需求分析.md");
const design = read("DESIGN.md");
const parentHtml = read("index.html");
const adminHtml = read("admin.html");
const agents = read("AGENTS.md");

includesAll(requirements, [
  "中文单语界面",
  "不做 Demo 内扫码模拟入口",
  "index.html",
  "admin.html",
  "姓名和身份证号一致",
  "后台该学生状态变为已支付",
  "扫码落地页不得展示管理后台"
], "demo需求分析.md");

includesAll(design, [
  "唯一设计约束源",
  "中文单语界面",
  "不在 Demo 内提供扫码模拟入口",
  "index.html",
  "admin.html",
  "同一份学生数据池",
  "不使用 Chrome 截图验证"
], "DESIGN.md");

includesAll(parentHtml, [
  "function verifyStudent()",
  "function payCurrentStudent()",
  "function enableAnalytics()",
  "state.students",
  "eduFeeDemoState",
  "paidSnapshot",
  "新增待补缴项目",
  "身份信息不匹配",
  "未找到该学生缴费信息",
  "聚合支付演示通道"
], "index.html");

includesAll(adminHtml, [
  "function simulateImport()",
  "function renderDashboardRelated()",
  "function bindSelectedFees()",
  "function clearStudentBindings()",
  "function addFeeItem()",
  "function filteredStudents()",
  "paidSnapshot",
  "已支付后新增待补缴",
  "index.html",
  "eduFeeDemoState",
  "学生A",
  "idNo: \"123\"",
  "打开家长端缴费页",
  "追加关联",
  "覆盖关联",
  "新增收费项目",
  "移除勾选项目",
  "清空所选学生全部项目",
  "currentFeeIds(student)",
  "generateQrBtn",
  "renderQrCode",
  "vendor/qrcode.js"
], "admin.html");

includesAll(adminHtml, [
  "二维码生成",
  "label for=\"deployUrl\"",
  "label for=\"classFilterSelect\"",
  "label for=\"newFeeName\"",
  "id=\"feeMessage\"",
  "const url = dom.deployUrl.value.trim()",
  "请先填写家长端 URL",
  "请完整填写项目名称、适用周期和大于等于 0 的金额。",
  "已支付后新增待补缴",
  "专升本考前班",
  "成人高考高起专班",
  "职业资格提升班",
  "开放教育本科班"
], "admin.html");

assert(!parentHtml.includes("管理后台") && !parentHtml.includes("后台导入") && !parentHtml.includes("学生数据管理"), "扫码落地页 index.html 不应展示后台模块");
assert(!parentHtml.includes("language") && !parentHtml.includes("i18n") && !parentHtml.includes("中英切换"), "家长端页面不应包含语言切换能力");
assert(!adminHtml.includes("language") && !adminHtml.includes("i18n") && !adminHtml.includes("中英切换"), "后台页面不应包含语言切换能力");
assert(!parentHtml.includes("扫码模拟入口") && !adminHtml.includes("扫码模拟入口"), "页面不应包含扫码模拟入口文案");
assert(!parentHtml.includes("登科") && !adminHtml.includes("登科") && !requirements.includes("登科") && !design.includes("登科") && !agents.includes("登科"), "页面与文档不应包含品牌词登科");
assert(!adminHtml.includes("清空已关联项目"), "后台不应继续使用含歧义的清空已关联项目文案");
assert(parentHtml.includes("productionDomain") && parentHtml.includes("websiteId") && parentHtml.includes("scriptUrl"), "缺少生产统计门禁配置");

includesAll(agents, [
  "项目结构",
  "统一学生数据池",
  "admin.html",
  "验证命令",
  "Umami"
], "AGENTS.md");

console.log("validate-demo: passed");
