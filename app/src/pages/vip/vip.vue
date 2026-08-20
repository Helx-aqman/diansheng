<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">会员中心</view>
      <view class="x">✕</view>
    </view>

    <view class="vip-banner">
      <view class="vt">典声 · 畅听会员</view>
      <view class="vp">¥30<text class="vo"> /月</text></view>
      <view class="vd">会员畅听全货架 · 免费看广告也能解锁</view>
    </view>

    <view class="sec-title">会员权益</view>
    <view class="rights card">
      <view class="right">📚 全本名著畅听</view>
      <view class="right">🎧 多角色音色</view>
      <view class="right">⬇ 高速离线下载</view>
      <view class="right">🚫 免广告打扰</view>
    </view>

    <view class="buy btn-primary" @click="buy">开通畅听会员 ¥30/月</view>
  </view>
</template>

<script setup>
import { back as backTo } from '@/utils/nav'
function back() { backTo('/pages/me/me') }
function buy() { uni.navigateTo({ url: '/pages/order/order' }) }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .x { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.vip-banner { margin: 8px 16px 4px; padding: 22px 18px; border-radius: 18px; background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 65%, #000)); color: #fff; }
.vt { font-size: 18px; font-weight: 700; }
.vp { font-size: 34px; font-weight: 800; margin: 8px 0 4px; }
.vo { font-size: 15px; font-weight: 400; }
.vd { font-size: 13px; opacity: 0.9; }
.rights { margin: 0 16px; padding: 8px 16px; }
.right { padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 15px; color: var(--ink); }
.right:last-child { border-bottom: none; }
.buy { margin: 24px 16px; padding: 15px; text-align: center; font-size: 17px; font-weight: 700; }
</style>
