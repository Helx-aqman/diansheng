<template>
  <view class="page suc">
    <view class="check">✓</view>
    <view class="st">支付成功</view>
    <view class="sd">已开通典声 · 畅听会员</view>
    <view class="buy btn-primary" @click="go">开始听书</view>
  </view>
</template>

<script setup>
function go() { uni.switchTab({ url: '/pages/home/home' }) }
</script>

<style scoped>
.suc { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; }
.check { width: 80px; height: 80px; border-radius: 50%; background: var(--green); color: #fff; font-size: 44px; display: flex; align-items: center; justify-content: center; }
.st { font-size: 22px; font-weight: 800; color: var(--ink); margin-top: 18px; }
.sd { font-size: 14px; color: var(--muted); margin-top: 6px; }
.buy { width: 70%; margin-top: 40px; padding: 15px; text-align: center; font-size: 17px; font-weight: 700; }
</style>
