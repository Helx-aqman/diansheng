# 典声 / DianSheng

**名著评书伴读 · 公版经典听书 App**

用 AI 把公版名著做成「一句原文 + 一句评书式讲解」的对照式伴读。内容跨年龄（公版经典名著），首期以《西游记》为 demo。

---

## 技术栈

- **uni-app (Vue 3) + Vite**：一套代码双端目标 —— 微信小程序 + Android App（MVP 期 Android 优先）
- **状态管理**：`reactive` 全局 store + `localStorage` 持久化（书豆 / 任务 / 主题 / 大字模式 / 登录态）
- **数据**：`mock/` 直供假数据；接真实后端只需替换 `store/` + `mock/` 并加 API 层
- **约定**：页面用 `@/store`、`@/components`、`@/mock` 别名

---

## 目录结构

```
听书伴读/
├── app/                      # uni-app 工程根（开发入口）
│   ├── src/
│   │   ├── pages/            # 16 个页面（见下）
│   │   ├── components/       # BookCard / BeanCard / ChapterItem / TaskItem
│   │   ├── store/            # 全局状态（书豆/任务/主题/大字/登录）
│   │   ├── mock/             # books / tasks / user 假数据
│   │   ├── utils/            # storage.js（持久化）/ nav.js（返回键规范化）
│   │   ├── static/           # 封面图、App 图标
│   │   ├── App.vue  main.js  uni.scss  manifest.json  pages.json
│   ├── package.json  vite.config.js  index.html  gen_icon.py
├── .workbuddy/memory/        # 项目记忆（随仓库带走，AI 跨机续作的核心上下文）
└── *.html                    # 产品架构 / 样式原型 / 开发环境清单等交付物
```

---

## 页面清单（16 屏）

| 类型 | 页面 |
|------|------|
| 底栏 tab | `home` 书架 · `play` 伴读 · `vip` 会员 · `me` 我的 |
| 次级页 | `settings` 设置 · `discover` 发现 · `search` 搜索 · `detail` 详情 · `tasks` 任务中心 · `points` 书豆明细 · `unlock` 解锁 · `downloads` 离线下载 |
| 流程页 | `login` 登录 · `order` 确认订单 · `pay` 微信支付 · `paysuccess` 支付结果 |

> 导航规范：`detail/discover/play/search` 返回兜底到首页体系，`downloads/points/settings/tasks/vip` 兜底到「我的」；有导航栈时统一 `navigateBack`（见 `utils/nav.js`）。

---

## 快速开始（本地开发）

```bash
# 拉取工程（新机器）
git clone https://github.com/Helx-aqman/diansheng.git
cd diansheng/app

# 安装依赖（node_modules 已被 .gitignore 忽略，需本地重建）
npm install

# 本地运行（具体平台见 package.json scripts）
npm run dev:h5        # 浏览器预览（H5）
```

---

## 真机打包（Android · HBuilderX 云打包）

1. **安装 HBuilderX v5.24（同版本）**，登录**同一 DCloud 账号**（AppId `__UNI__38009BA` 跟账号走，云打包不受影响）。
2. **Node 加入系统级 PATH**：云打包的本地编译环节只认 **Machine 级** PATH，不认用户级。需管理员 PowerShell 执行一次：
   ```powershell
   [Environment]::SetEnvironmentVariable("PATH", ([Environment]::GetEnvironmentVariable("PATH","Machine") + ";C:\你的\node路径"), "Machine")
   ```
3. **安心打包插件**（首次）：CLI 安装 `cli installPlugin --name app-safe-pack`（该插件不在普通插件市场，由 HBuilderX 打包时自动下载）。
4. **云打包命令**（需 HBuilderX 处于运行状态）：
   ```bash
   cli pack --project "<工程绝对路径>/app" --platform android \
     --android.packagename com.diansheng.app \
     --android.androidpacktype 3 --ignoreWarnings true
   ```
   - `packtype 3` = 云端证书（旧「公共测试证书」已被 DCloud 作废，新应用不可用）
   - APK 产出在 `app/unpackage/release/apk/`

---

## 合规红线

- **书豆（虚拟积分）仅用于兑换听书权益**（解锁章节 / 畅听券 / 角色音色等虚拟权益），**坚决不可提现**（网赚违规）。
- AI 生成内容须标识。

---

## 跨机续作

1. `git clone` 拉取工程
2. `npm install` 重建依赖
3. 装**同版本 HBuilderX** + 登录**同一 DCloud 账号**
4. 系统级 PATH 加 Node（见上）
5. 用 WorkBuddy **同一账号**打开工程，让 AI 读取 `.workbuddy/memory/` 即可接着干（双导航条已修、返回键已规范化、最新 APK 路径等均在记忆中）。

---

## 仓库说明

- `node_modules/`、`unpackage/`、`dist/`、`*.log`、`covers/` 已被 `.gitignore` 忽略（可重建 / 无关产物）。
- `app/node_modules_bak*` 为本机历史残留，已忽略，可在文件管理器手动删除，不影响任何功能。
