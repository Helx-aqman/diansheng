<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">任务中心</view>
      <view class="bean" @click="open('points')">🫘 {{ state.beans }}</view>
    </view>

    <view class="sec-title">每日任务</view>
    <view class="list card">
      <TaskItem v-for="t in daily" :key="t.id" :task="t" @claim="claim" />
    </view>

    <view class="sec-title">成长任务</view>
    <view class="list card">
      <TaskItem v-for="t in growth" :key="t.id" :task="t" @claim="claim" />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { state, claimTask } from '@/store'
import TaskItem from '@/components/TaskItem.vue'
import { back as backTo } from '@/utils/nav'

const daily = computed(() => state.tasks.filter((t) => t.type === 'daily'))
const growth = computed(() => state.tasks.filter((t) => t.type === 'growth'))

function claim(id) {
  if (claimTask(id)) uni.showToast({ title: '书豆 +1', icon: 'none' })
}
function back() { backTo('/pages/me/me') }
function open(p) { uni.navigateTo({ url: '/pages/' + p + '/' + p }) }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.bean { font-size: 15px; color: var(--primary); font-weight: 600; }
.list { margin: 0 16px; padding: 0; }
</style>
