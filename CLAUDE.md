# CLAUDE.md — JonasM-Studio.github.io

公开网站：开发者 Jonas M 所有 App 的首页、隐私政策和支持页。仓库在组织 `JonasM-studio` 下，用 GitHub Pages 托管（main 分支根目录），网址 `https://jonasm-studio.github.io/`。**这个仓库是公开的**，任何人都能看到全部内容和历史。

## 硬性规定

1. **只放网页。**不放 App 代码、日志、测试数据、截图原图里的个人信息、密钥或任何私人内容。提交前确认每个文件都可以公开。
2. **网站本身不收集任何数据**：不用 cookie、分析、广告、第三方脚本、第三方字体（包括 Google Fonts）、外链图片或嵌入内容。只用系统字体和本仓库的文件。
3. **网址永久不变。**以下路径会填进 App Store / Google Play 和 App 内，改了会让商店和旧版本 App 的链接失效：
   - `/mileage/privacy/`、`/mileage/support/`（含锚点 `#oneplus` `#samsung` `#xiaomi` `#vivo` `#huawei` `#pixel` `#other`）
   - `/tuner/privacy/`、`/tuner/support/`
   App 改名只改页面文字，不改路径。
4. **隐私政策必须和 App 的真实行为一致。**App 新增权限、联网、文件导入、诊断导出等功能时，先改对应的隐私政策（更新"Last updated"日期，在 Changes 列表加一行），再发布那个版本。
5. **不做税务建议**（与 mileage-app 规定 5 一致）：涉及费率只链接官方页面，并写明请自行确认。
6. 不承诺回复时限、上线日期或价格，除非用户明确确认过。
7. **不写开发者的个人信息**：不介绍是谁、做什么、在哪个城市或国家、是不是一个人开发。署名只用 "Jonas M"，正文用 "we" 或中性句式，不用 "I"。

## 结构

```
index.html            首页（App 卡片 + 联系方式）
style.css             共用样式（浅色 / 深色）
privacy/              网站本身的隐私说明
mileage/              里程 App：介绍、privacy/、support/
tuner/                调音器 App：介绍、privacy/、support/
404.html
```

页面之间的链接用相对路径；404.html 例外，用 `/` 开头的绝对路径（它会在任何路径下显示）。

不要在页面或提交里出现开发者个人 GitHub 账号的名字或链接；仓库链接一律用 `https://github.com/JonasM-studio/JonasM-Studio.github.io`。

## 工作方式

- 页面文字用英文；本文件和 README 用中文；提交信息用英文。
- **直接提交并推送到 main，不开 PR、不建 issue。**这是公开仓库：通过会话开的 PR 会算在开发者个人账号名下，出现在他的公开动态里，暴露账号和组织的关系。提交作者用 `Claude <noreply@anthropic.com>`。
- 改完在手机宽度（375px）和深色模式下截图检查。
- 上架前按 README 的"上架前核对"逐项确认。
