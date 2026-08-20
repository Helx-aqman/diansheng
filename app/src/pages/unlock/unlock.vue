<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">解锁后续</view>
      <view class="x">✕</view>
    </view>

    <view class="info card">
      <view class="t">解锁《西游记》第 11–20 回</view>
      <view class="s">选择一种方式，免费解锁后续精彩</view>
    </view>

    <view class="ch ad" @click="watchAd">
      <view class="ci">📣</view>
      <view class="ct">看激励视频广告</view>
      <view class="cs">免费 · 约 15 秒</view>
    </view>

    <view class="ch bean" :class="{ disabled: state.beans < cost }" @click="payBeans">
      <view class="ci">🫘</view>
      <view class="ct">用 {{ cost }} 书豆解锁</view>
      <view class="cs">{{ state.beans >= cost ? '立即解锁' : '书豆不足' }}</view>
    </view>

    <view class="hint">合规提示：内容可通过看广告或书豆免费解锁，书豆仅兑换听书权益，不可提现</view>
  </view>
</template>

<script setup>
import { state, useBeans } from '@/store'
const cost = 50

function watchAd() {
  uni.showToast({ title: '广告播放中（演示）', icon: 'none' })
  setTimeout(() => {
    uni.showToast({ title: '解锁成功', icon: 'none' })
    uni.switchTab({ url: '/pages/play/play' })
  }, 800)
}
function payBeans() {
  if (state.beans < cost) { uni.showToast({ title: '书豆不足', icon: 'none' }); return }
  if (useBeans(cost, '解锁章节')) uni.switchTab({ url: '/pages/play/play' })
}
function back() { uni.navigateBack() }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .x { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.info { margin: 12px 16px; padding: 18px; text-align: center; }
.t { font-size: 17px; font-weight: 700; color: var(--ink); }
.s { font-size: 13px; color: var(--muted); margin-top: 6px; }
.ch { display: flex; align-items: center; gap: 14px; margin: 12px 16px; padding: 18px; border-radius: 16px; background: var(--card); border: 1px solid var(--line); }
.ci { font-size: 30px; }
.ct { flex: 1; font-size: 16px; font-weight: 600; color: var(--ink); }
.cs { font-size: 13px; color: var(--primary); }
.ch.bean { background: color-mix(in srgb, var(--primary) 8%, #fff); }
.ch.disabled { opacity: 0.5; }
.hint { font-size: 12px; color: var(--muted); text-align: center; margin: 18px 24px; line-height: 1.6; }
</style>
