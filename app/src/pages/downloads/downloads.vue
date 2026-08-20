<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">离线下载</view>
      <view class="x">🗑</view>
    </view>

    <view class="sec-title">已下载</view>
    <view class="dl card" v-for="d in list" :key="d.no">
      <view class="dn">西游记 · 第{{ d.no }}回 {{ d.title }}</view>
      <view class="ds">{{ d.size }}</view>
      <view class="del" @click="del(d)">🗑</view>
    </view>
    <view v-if="!list.length" class="empty">暂无离线内容</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { back as backTo } from '@/utils/nav'
const list = ref([
  { no: 3, title: '四海千山皆拱伏 九幽十类尽除名', size: '21.7MB' },
  { no: 8, title: '我佛造经传极乐 观音奉旨上长安', size: '19.4MB' }
])
function del(d) { list.value = list.value.filter((x) => x !== d) }
function back() { backTo('/pages/me/me') }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .x { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.dl { display: flex; align-items: center; margin: 0 16px 10px; padding: 14px; }
.dn { flex: 1; font-size: 14px; color: var(--ink); }
.ds { font-size: 12px; color: var(--muted); margin: 0 10px; }
.del { font-size: 18px; color: var(--muted); }
.empty { text-align: center; color: var(--muted); padding: 40px; font-size: 14px; }
</style>
