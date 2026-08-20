<script setup>
import { onLaunch } from '@dcloudio/uni-app'
import { initApp } from './store'
import './uni.scss'

onLaunch(() => {
  initApp()
  // 自定义导航栏下，把系统状态栏高度写入 CSS 变量，供 .topbar 顶部偏移使用
  try {
    const sbh = (uni.getSystemInfoSync().statusBarHeight) || 0
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--sbh', sbh + 'px')
    }
  } catch (e) {}
})
</script>

<template>
  <view></view>
</template>
