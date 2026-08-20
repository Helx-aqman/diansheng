<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">确认订单</view>
      <view class="x">✕</view>
    </view>

    <view class="card ot">
      <view class="on">典声 · 畅听会员</view>
      <view class="op">¥30.00</view>
      <view class="ot2">按月连续包月，可随时取消</view>
    </view>

    <view class="row"><view class="rl">支付方式</view><view class="rr">微信支付</view></view>
    <view class="row"><view class="rl">签约代扣</view><view class="rr">已开启</view></view>

    <view class="buy btn-primary" @click="pay">确认支付 ¥30.00</view>
  </view>
</template>

<script setup>
function back() { uni.navigateBack() }
function pay() { uni.navigateTo({ url: '/pages/pay/pay' }) }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .x { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.ot { margin: 16px; padding: 20px; text-align: center; }
.on { font-size: 16px; font-weight: 700; color: var(--ink); }
.op { font-size: 32px; font-weight: 800; color: var(--primary); margin: 8px 0; }
.ot2 { font-size: 12px; color: var(--muted); }
.row { display: flex; align-items: center; justify-content: space-between; margin: 0 16px 10px; padding: 16px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; font-size: 15px; color: var(--ink); }
.rl { color: var(--muted); }
.rr { color: var(--ink); }
.buy { margin: 28px 16px; padding: 15px; text-align: center; font-size: 17px; font-weight: 700; }
</style>
