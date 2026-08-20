# 典声 · 项目长期记忆

## 产品定位
- 产品名：**典声**（2026-08-18 由「银发听书」更名；workspace 文件夹名仍为「听书伴读」）。「名著评书伴读」听书产品，内容跨年龄（公版经典名著）。
- 一句话：用 AI 把公版名著做成"一句原文 + 一句评书式讲解"的对照式伴读。
- **关键定位转向（2026-08-18 决策）：不主打"服务老年人"标签、不绑定亲情/子女线路**。核心用户含银发人群，但门面话术为"好用的经典听书"，体验照样大字清晰却不明说适老。TAM 放大到全年龄经典内容爱好者。
- 技术栈：**uni-app (Vue3)**（双轨：微信小程序 + Android APP）。
- 原型载体：可点击 HTML 手机原型 `产品样式原型.html`；产品定义文档 `产品架构说明.html`（v1.1）。

## 关键决策（已拍板，勿回退）
- **内容线：仅「公版名著评书伴读」（西游记→四大名著→公版名著库）。抗日经典题材小说已取消**（用户 2026-08-18 决策，不在范围内）。
- 分享卡（**已去子女化**）：保留"生成分享卡→微信转发好友"入口，删除所有"孝心/送爸妈/子女"话术与 gift 屏子女定位。非微信礼物式。
- 新手引导 **仅首启一次**（localStorage `ttbd_guide_shown`）。
- 发现页初期用**死数据**。
- 配色默认 **暖橙 (#e8823a)**，设置页可切三主题（暖橙/朱漆红/墨绿），localStorage `ttbd_theme` 记忆。
- 合规红线：内容可通过"看广告"或"书豆积分解锁"；**书豆仅用于兑换听书权益（解锁章节/畅听券/角色音色等虚拟权益），坚决不可提现**（网赚违规）；AI 生成内容须标识。
- **积分体系 + 任务中心（2026-08-18 决策，已实装进原型 `产品样式原型.html`）**：虚拟积分命名「书豆」，存 localStorage `ttbd_beans`、获取记录 `ttbd_bean_log`、任务完成态 `ttbd_tasks`。**用户拍板：守红线（不可提现）；去掉养生贴士**；书豆可兑换 **解锁章节(50)/畅听券24h(100)/角色音色·悟空(200)** 三类虚拟权益。任务中心=每日 3 任务（签到+10 / 听完推荐一整回+5 / 分享好友+8）+ 2 成长任务（听完一整本+50 / 连续听书7天+30）。解锁页改为"看广告解锁 / 用 50 书豆解锁"双通道。

## 原型当前屏结构（2026-08-18）
- 主屏：书架(home)/伴读(play)/会员(vip)/我的(me)/发现(discover)/搜索(search)/详情(detail)/分享卡(gift)/设置(settings)。
- 登录浮层 login；流程屏：离线下载(downloads)/激励视频解锁(unlock,双通道)/确认订单(order)/微信支付(pay)/支付成功(paysuccess)/任务中心(tasks)/书豆明细(points)。
- 弹层：睡眠定时 / 即将上线 / 分享卡生成 / 主题配色。

## APP 工程（2026-08-18 启动，uni-app 真实工程）
- 工程目录：`app/`（uni-app Vue3）。**Android APP 优先**（用户拍板），MVP **单本《西游记》跑通全链路**。
- 结构：`pages/`(16 屏) `components/`(BookCard/BeanCard/ChapterItem/TaskItem) `store/index.js`(reactive 全局状态 + localStorage 持久化：书豆/任务/主题/大字/登录) `mock/`(books 单本多回目 / tasks / user) `utils/storage.js` `uni.scss`(三主题 + 大字模式 CSS 变量) `manifest.json`(app-plus Android) `pages.json`(路由 + tabBar)。
- 约定：状态集中 `store`，Mock 直供；接真实后端只需替换 `store`/`mock` 并加 API 层。页面用 `@/store`、`@/components`、`@/mock` 别名。
- 主题：`document.documentElement` 设 `data-theme`(warm/vermilion/green) 与 `easy` 类（大字模式，默认开启）；`pages.json` tabBar 暂纯文字无图标。
- 校验：manifest/pages/package JSON 合法；5 个 JS 模块 `node --check` 通过；共 21 个 vue 文件。

## 本机环境（D:\Program Files）
- 已装：微信web开发者工具 / HBuilderX / Android Studio（自带 JBR JDK 25.0.2）。
- Android SDK 在 `D:\Program Files\Android\SDK`（platforms=android-37、build-tools=36、含 adb/emulator）。
- 待用户自办：小程序 AppID（mp.weixin.qq.com 注册）；真机 USB 调试或补 emulator 镜像。
- 本地预览原型：`python -m http.server` 项目根目录（封面图相对路径才能正确加载）。

## 协作习惯（来自用户）
- 偏好 HTML 交付物；结构化要点(bullet)+**加粗标签**摘要格式。
- 交付物清单不得出现已删除/不存在文件（杜绝幽灵引用）。
- 每次 AI 变更后要求重新检查工作区文件验证输出；结构性变更（如改名）要求同步更新长期记忆，保持记忆与文件系统一致。
- 习惯"先重试、再排查"；依赖 AI 给出可落地排查/执行步骤。
