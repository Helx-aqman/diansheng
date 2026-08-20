<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">微信支付</view>
      <view class="x">✕</view>
    </view>

    <view class="amount">¥30.00</view>
    <view class="recv">向 典声 支付</view>

    <view class="qr">（微信支付二维码占位）</view>
    <view class="tip">演示环境：点击模拟支付成功</view>

    <view class="buy btn-primary" @click="ok">我已支付</view>
  </view>
</template>

<script setup>
function back() { uni.navigateBack() }
function ok() { uni.redirectTo({ url: '/pages/paysuccess/paysuccess' }) }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .x { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.amount { text-align: center; font-size: 40px; font-weight: 800; color: var(--ink); margin-top: 30px; }
.recv { text-align: center; font-size: 14px; color: var(--muted); margin-top: 6px; }
.qr { margin: 40px auto; width: 180px; height: 180px; border: 2px dashed var(--line); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--muted); text-align: center; padding: 10px; }
.tip { text-align: center; font-size: 12px; color: var(--muted); }
.buy { margin: 30px 16px; padding: 15px; text-align: center; font-size: 17px; font-weight: 700; }
</style>
