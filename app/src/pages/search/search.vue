<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">搜索</view>
    </view>

    <view class="box">
      <input class="inp" v-model="q" placeholder="搜书名 / 回目 / 说书人" confirm-type="search" />
    </view>

    <view v-if="!q" class="block">
      <view class="sec-title">历史</view>
      <view class="chips">
        <text class="chip" v-for="h in history" :key="h" @click="q = h">{{ h }}</text>
      </view>
      <view class="sec-title">热门</view>
      <view class="chips">
        <text class="chip" v-for="h in hot" :key="h" @click="q = h">{{ h }}</text>
      </view>
    </view>

    <view v-else class="res">
      <view class="r" v-for="(r, i) in results" :key="i" @click="tapRes(r)">
        <view class="rn">{{ r.book }} · 第{{ r.no }}回</view>
        <view class="rt">{{ r.title }}</view>
      </view>
      <view v-if="!results.length" class="empty">没有找到相关结果</view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { state } from '@/store'
import { back as backTo } from '@/utils/nav'

const q = ref('')
const history = ['西游记', '三国演义', '大闹天宫']
const hot = ['孙悟空', '取经', '大闹天宫', '评书讲解']

const results = computed(() => {
  if (!q.value) return []
  const out = []
  state.books.forEach((b) => {
    b.chapters.forEach((c) => {
      if ((c.title + c.no).includes(q.value)) {
        out.push({ book: b.name, no: c.no, title: c.title, locked: c.locked })
      }
    })
  })
  return out
})

function back() { backTo('/pages/home/home') }
function tapRes(r) {
  if (r.locked) uni.navigateTo({ url: '/pages/unlock/unlock' })
  else uni.switchTab({ url: '/pages/play/play' })
}
</script>

<style scoped>
.topbar { display: flex; align-items: center; padding: 14px 16px; }
.back { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.box { margin: 0 16px 12px; }
.inp { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; font-size: 15px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 16px; }
.chip { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 6px 14px; font-size: 13px; color: var(--ink); }
.r { padding: 14px 16px; border-bottom: 1px solid var(--line); }
.rn { font-size: 13px; color: var(--primary); }
.rt { font-size: 15px; color: var(--ink); margin-top: 2px; }
.empty { text-align: center; color: var(--muted); padding: 40px; font-size: 14px; }
</style>
