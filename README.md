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

## 新电脑从零环境准备（必看）

下面是一台**什么都没装**的电脑把项目跑起来所需的全部环境。**日常开发（H5 预览 / 构建）只需第 1 项**；只有要出 Android 安装包才需要第 2 项（HBuilderX）。

### 1. 必装：日常开发
| 环境 | 版本要求 | 安装 / 说明 |
|------|----------|-------------|
| **Git** | 任意新版（≥ 2.40） | 用于 clone 仓库。Windows：`winget install Git.Git` 或 git-scm.com |
| **Node.js** | **≥ 18，推荐 20 LTS 或 22** | Vite 5 + 当前 `@dcloudio` 依赖要求。装 LTS 版；仓库根附 `.nvmrc`（写 `20`），用 nvm 可 `nvm use` 自动对齐。安装时务必勾选「Add to PATH」 |
| **npm** | 随 Node 自带 | 无需单独装 |

> 仅用 Node + npm 即可完成 `npm install` 与 `npm run dev:h5`（浏览器预览）/ `npm run build:h5`。**不需要 HBuilderX 也能做日常开发与 H5 构建。**

### 2. 仅出 Android 包时需要
| 环境 | 版本要求 | 说明 |
|------|----------|------|
| **HBuilderX** | **必须 v5.24**（与 `package.json` 的 `@dcloudio 3.0.0-50204…` 对齐） | 云打包 CLI 依赖它运行；版本不对会编译失败 |
| **DCloud 账号** | 同一账号 | AppId `__UNI__38009BA` 跟账号走，云打包不受影响 |
| **Node 系统级 PATH** | 一次性管理员操作 | 见下方「真机打包」第 2 步（HBuilderX 编译环节只认 Machine 级 PATH） |

### 3. 装完验证
```bash
node -v   # 应 ≥ v18（推荐 v20.x 或 v22.x）
npm -v
git --version
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

> 前置：先装好 **Node.js ≥ 18（推荐 20 LTS）** 与 Git，见上方「新电脑从零环境准备」。日常开发只需 Node + npm，**无需 HBuilderX**。

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
- 根目录 `covers/` 为封面源素材、已被 gitignore，且 **App 运行时不引用它**（书架封面走 `app/static/xiyouji_cover.png`，已入库），clone 后缺失不影响 App 运行；`covers/` 仅用于原型 HTML 本地预览，需要时可从旧机拷贝或重新生成。
