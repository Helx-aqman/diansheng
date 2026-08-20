<template>
  <view class="login">
    <view class="logo">
      <view class="ai">{{ state.books[0].name.charAt(0) }}</view>
      <view class="wm">典声</view>
      <view class="sm">名著评书伴读</view>
    </view>
    <view class="desc">一句原文一句评书讲解，陪你把名著听得明明白白。微信登录后即可听书、购买会员与分享好书。</view>
    <button class="wx" @click="login">💬 微信一键登录</button>
    <view class="later" @click="later">稍后再说</view>
  </view>
</template>

<script setup>
import { state, doLogin } from '@/store'
function login() {
  doLogin()
  uni.switchTab({ url: '/pages/home/home' })
}
function later() { uni.switchTab({ url: '/pages/home/home' }) }
</script>

<style scoped>
.login { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; background: linear-gradient(160deg, var(--primary), color-mix(in srgb, var(--primary) 70%, #000)); color: #fff; }
.logo { display: flex; flex-direction: column; align-items: center; margin-bottom: 24px; }
.ai { width: 90px; height: 90px; border-radius: 22px; background: rgba(255, 255, 255, 0.16); display: flex; align-items: center; justify-content: center; font-size: 46px; font-weight: 800; }
.wm { font-size: 30px; font-weight: 800; letter-spacing: 5px; margin-top: 12px; }
.sm { font-size: 12px; opacity: 0.82; letter-spacing: 3px; margin-top: 2px; }
.desc { font-size: 14px; opacity: 0.9; line-height: 1.7; text-align: center; max-width: 280px; margin-bottom: 34px; }
.wx { background: #07c160; color: #fff; border: none; border-radius: 28px; padding: 16px 36px; font-size: 18px; font-weight: 700; }
.later { margin-top: 22px; background: none; border: none; color: rgba(255, 255, 255, 0.85); font-size: 14px; text-decoration: underline; }
</style>
