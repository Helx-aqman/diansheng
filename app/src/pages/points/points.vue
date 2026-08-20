<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">书豆明细</view>
    </view>

    <view class="bal">
      <view class="num">{{ state.beans }}</view>
      <view class="lab">当前书豆</view>
    </view>

    <view class="sec-title">书豆兑换（仅虚拟权益，不可提现）</view>
    <view class="ex card" v-for="e in exchanges" :key="e.id" @click="exchange(e)">
      <view class="en">{{ e.name }}</view>
      <view class="ec">{{ e.cost }} 书豆 ›</view>
    </view>

    <view class="sec-title">获取记录</view>
    <view class="log card">
      <view class="li" v-for="(l, i) in state.pointsLog" :key="i">
        <view class="lr">{{ l.reason }}</view>
        <view class="ld" :class="{ minus: l.delta < 0 }">{{ l.delta > 0 ? '+' : '' }}{{ l.delta }} · {{ l.time }}</view>
      </view>
      <view v-if="!state.pointsLog.length" class="empty">暂无记录</view>
    </view>
  </view>
</template>

<script setup>
import { state, useBeans } from '@/store'
import { back as backTo } from '@/utils/nav'

const exchanges = [
  { id: 'chapter', name: '解锁章节', cost: 50 },
  { id: 'pass', name: '畅听券 24h', cost: 100 },
  { id: 'voice', name: '角色音色·悟空', cost: 200 }
]

function exchange(e) {
  if (useBeans(e.cost, '兑换' + e.name)) uni.showToast({ title: '兑换成功', icon: 'none' })
  else uni.showToast({ title: '书豆不足', icon: 'none' })
}
function back() { backTo('/pages/me/me') }
</script>

<style scoped>
.topbar { display: flex; align-items: center; padding: 14px 16px; }
.back { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.bal { text-align: center; margin: 10px 0 4px; }
.num { font-size: 40px; font-weight: 800; color: var(--primary); }
.lab { font-size: 13px; color: var(--muted); }
.ex { display: flex; align-items: center; justify-content: space-between; margin: 0 16px 10px; padding: 16px; }
.en { font-size: 15px; color: var(--ink); }
.ec { font-size: 14px; color: var(--primary); }
.log { margin: 0 16px; padding: 0; }
.li { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--line); }
.lr { font-size: 14px; color: var(--ink); }
.ld { font-size: 13px; color: var(--green); }
.ld.minus { color: var(--muted); }
.empty { text-align: center; color: var(--muted); padding: 30px; font-size: 14px; }
</style>
