<template>
  <view class="page">
    <view class="topbar">
      <view class="brand">我的</view>
      <view class="gear" @click="open('settings')">⚙</view>
    </view>

    <BeanCard :beans="state.beans" @tap="open('points')" />

    <view class="row" @click="open('tasks')">
      <view class="ic">🎯</view><view class="t">任务中心</view><view class="ar">›</view>
    </view>
    <view class="row" @click="open('downloads')">
      <view class="ic">📥</view><view class="t">离线下载</view><view class="ar">›</view>
    </view>
    <view class="row" @click="open('detail', mainId)">
      <view class="ic">📚</view><view class="t">我的书架与续听</view><view class="ar">›</view>
    </view>
    <view class="row" @click="open('settings')">
      <view class="ic">⚙</view><view class="t">设置</view><view class="ar">›</view>
    </view>
    <view class="row" @click="onLogout">
      <view class="ic">🚪</view><view class="t logout">退出登录</view>
    </view>
  </view>
</template>

<script setup>
import { state, doLogout } from '@/store'
import BeanCard from '@/components/BeanCard.vue'

const mainId = state.books[0].id
const tabs = ['home', 'play', 'vip', 'me']
function open(p, id) {
  const url = id ? '/pages/' + p + '/' + p + '?id=' + id : '/pages/' + p + '/' + p
  if (tabs.includes(p)) uni.switchTab({ url })
  else uni.navigateTo({ url })
}
function onLogout() {
  uni.showModal({
    title: '退出登录',
    success: (r) => { if (r.confirm) doLogout() }
  })
}
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.brand { font-size: 20px; font-weight: 700; color: var(--ink); }
.gear { font-size: 22px; color: var(--primary); }
.row { display: flex; align-items: center; gap: 14px; margin: 0 16px 10px; padding: 16px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; font-size: 16px; color: var(--ink); }
.ic { font-size: 22px; }
.t { flex: 1; }
.ar { color: var(--muted); font-size: 20px; }
.logout { color: var(--primary); }
</style>
