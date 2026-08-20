// 统一的"返回上一级"导航逻辑
// - 当前页是经 navigateTo 进入（导航栈有上一页）时，用 navigateBack 返回真正的上一级；
// - 极端情况下无上一页（如直接作为首屏进入）时，回退到兜底 tab 页，避免用户卡死。
// 兜底目标按页面归属传入：来自首页体系的传 '/pages/home/home'，来自"我的"体系的传 '/pages/me/me'。
export function back(fallbackUrl = '/pages/home/home') {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  } else {
    uni.switchTab({ url: fallbackUrl })
  }
}
