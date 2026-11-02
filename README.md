# JonasM-Studio.github.io

Jonas M 的 App 网站：首页、隐私政策、支持页。网址：<https://jonasm-studio.github.io/>

| 页面 | 网址 | 填到哪里 |
|---|---|---|
| 里程 隐私政策 | `/mileage/privacy/` | Play Console → 应用内容 → 隐私权政策；App Store Connect → App 隐私 → 隐私政策网址；App 设置页 |
| 里程 支持页 | `/mileage/support/` | App Store Connect 支持网址；Play 商店页联系信息（网站）；App 健康检查各品牌项链接 `#oneplus` 等 |
| 调音器 隐私政策 | `/tuner/privacy/` | 同上；App 的"关于"页 |
| 调音器 支持页 | `/tuner/support/` | 同上 |

## 上架前核对

这些页面是在 App 正式版完成前写的，下面这些地方要对照正式版逐项确认，确认一项勾一项：

**两个 App**
- [ ] App 正式名称（现在是工作名 "Mileage Logbook"、"Offline Tuner & Metronome"），改名只改文字，不改网址
- [ ] 隐私政策里列的权限 = 正式版实际申请的权限（安卓 `AndroidManifest.xml` 合并后清单、iOS `Info.plist` 和 `PrivacyInfo.xcprivacy`）
- [ ] 商店的数据安全表 / 隐私营养标签与隐私政策一致（都写"不收集"）

**里程**
- [ ] 正式版界面名称：健康检查、"Phone maker background settings"、Done 开关、"Possibly missed"、"Not my drive"、设置里的版本号、备份恢复入口
- [ ] 一加 / ColorOS 三项设置和 App 健康检查配截图（用自己的手机拍，裁掉状态栏里的个人信息）
- [ ] 备份确实加密，安卓确实关闭了系统备份（`allowBackup=false`）
- [ ] 诊断文件导出功能是否保留到正式版；不保留就删掉隐私政策和支持页里相关的句子
- [ ] 三星、小米、vivo、华为的步骤找真机或测试者截图核对，核对后把"Steps based on dontkillmyapp.com"改成"Tested on …"
- [ ] 一加 / OPPO 的英文菜单名在英文系统（OxygenOS）上核对

**调音器**
- [ ] 麦克风只在调音界面打开时使用（安卓 `onStop` 时停止输入，iOS 同样处理）
- [ ] 正式版加入"导入音频文件"（v1.0）前，先在隐私政策加一节说明
- [ ] 安卓 App 名称在系统设置里显示的名字（支持页麦克风路径里写的是 "Offline Tuner & Metronome"）
- [ ] 正式版的"A4 不是 440 时高亮"、熄屏后节拍器继续播放，和支持页描述一致
