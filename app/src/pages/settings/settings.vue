<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">设置</view>
      <view class="x">✕</view>
    </view>

    <view class="set-row" @click="toggleEasy">
      <view class="ic">🔠</view>
      <view class="t">大字清晰模式（超大字·高对比）</view>
      <view class="switch" :class="{ off: !state.easy }"><view class="i"></view></view>
    </view>

    <view class="sec-title">主题配色</view>
    <view class="themes">
      <view class="theme" :class="{ on: state.theme === 'warm' }" @click="setTheme('warm')">
        <view class="sw" style="background: #e8823a"></view><view class="tn">暖橙</view>
      </view>
      <view class="theme" :class="{ on: state.theme === 'vermilion' }" @click="setTheme('vermilion')">
        <view class="sw" style="background: #c8453b"></view><view class="tn">朱漆红</view>
      </view>
      <view class="theme" :class="{ on: state.theme === 'green' }" @click="setTheme('green')">
        <view class="sw" style="background: #2f6b5e"></view><view class="tn">墨绿</view>
      </view>
    </view>

    <view class="set-row" @click="replay">
      <view class="ic">🔄</view><view class="t">重新看新手引导</view><view class="ar">›</view>
    </view>
    <view class="set-row" @click="about">
      <view class="ic">📜</view><view class="t">关于典声 / AI 标识</view><view class="ar">›</view>
    </view>
  </view>
</template>

<script setup>
import { state, toggleEasy, setTheme } from '@/store'
import { back as backTo } from '@/utils/nav'

function back() { backTo('/pages/me/me') }
function replay() { uni.showToast({ title: '引导已重置（演示）', icon: 'none' }) }
function about() {
  uni.showModal({
    title: '关于典声',
    content: '典声 · 名著评书伴读。内容由 AI 生成「一句原文 + 一句评书讲解」对照伴读，请知悉 AI 生成标识。',
    showCancel: false
  })
}
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .x { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 20px; font-weight: 700; color: var(--ink); }
.set-row { display: flex; align-items: center; gap: 14px; margin: 0 16px 10px; padding: 16px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; font-size: 16px; color: var(--ink); }
.ic { font-size: 22px; }
.t { flex: 1; }
.ar { color: var(--muted); font-size: 20px; }
.switch { width: 52px; height: 30px; border-radius: 20px; background: var(--primary); position: relative; flex-shrink: 0; transition: .2s; }
.switch .i { position: absolute; right: 3px; top: 3px; width: 24px; height: 24px; border-radius: 50%; background: #fff; transition: .2s; }
.switch.off { background: #ccc; }
.switch.off .i { right: 25px; }
.themes { display: flex; gap: 12px; padding: 0 16px; }
.theme { flex: 1; border: 2px solid var(--line); border-radius: 12px; padding: 12px; text-align: center; }
.theme.on { border-color: var(--primary); }
.sw { width: 36px; height: 36px; border-radius: 50%; margin: 0 auto 8px; }
.tn { font-size: 13px; color: var(--ink); }
</style>
