<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">伴读</view>
      <view class="more">⋮</view>
    </view>

    <image class="hero" :src="book.cover" mode="aspectFill" />
    <view class="pt">
      <view class="bk">西游记</view>
      <view class="ep">第{{ cur.no }}回 · {{ cur.title }}</view>
    </view>

    <scroll-view class="flow" scroll-y>
      <view class="pgroup" v-for="(p, idx) in paras" :key="idx">
        <view class="card orig">
          <view class="lab">原文</view>
          <view class="txt orig-txt">{{ p.orig }}</view>
        </view>
        <view class="card talk">
          <view class="lab">评书讲解</view>
          <view class="txt talk-txt">{{ p.talk }}</view>
        </view>
      </view>
      <view class="flow-end">— 本回伴读结束 · 下回待续 —</view>
    </scroll-view>

    <view class="progress"><view class="bar" :style="{ width: progress + '%' }"></view></view>

    <view class="ctrls">
      <view class="c" @click="prev">⏮</view>
      <view class="c play" @click="toggle">{{ playing ? '⏸' : '▶' }}</view>
      <view class="c" @click="next">⏭</view>
    </view>

    <view class="unlock-row" @click="openUnlock">看广告 / 书豆 解锁后续 ›</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { state } from '@/store'
import { back as backTo } from '@/utils/nav'

const book = state.books[0]
const curNo = ref(1)
const cur = computed(() => book.chapters.find((c) => c.no === curNo.value) || book.chapters[0])
const paras = computed(() => {
  const c = cur.value
  if (c.paragraphs && c.paragraphs.length) return c.paragraphs
  return [{ orig: c.orig, talk: c.talk }]
})
const progress = ref(68)
const playing = ref(false)

function toggle() { playing.value = !playing.value }
function prev() { if (curNo.value > 1) curNo.value--; progress.value = 10 }
function next() { if (curNo.value < book.freeEnd) curNo.value++; progress.value = 10 }
function back() { backTo('/pages/home/home') }
function openUnlock() { uni.navigateTo({ url: '/pages/unlock/unlock' }) }
</script>

<style scoped>
.page { display: flex; flex-direction: column; height: 100vh; }
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .more { font-size: 24px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.hero { width: 110px; height: 146px; margin: 4px auto; border-radius: 16px; background: linear-gradient(160deg, var(--primary), color-mix(in srgb, var(--primary) 70%, #000)); display: block; }
.pt { text-align: center; margin-bottom: 10px; }
.bk { font-size: 18px; font-weight: 700; color: var(--ink); }
.ep { font-size: 13px; color: var(--muted); margin-top: 2px; }
.flow { flex: 1; overflow: hidden; padding: 0 16px; box-sizing: border-box; }
.pgroup { margin-top: 12px; }
.flow-end { text-align: center; color: var(--muted); font-size: 12px; padding: 22px 0 12px; }
.card { margin: 0 0 12px; padding: 16px; background: var(--card); border: 1px solid var(--line); border-radius: 16px; }
.lab { font-size: 12px; color: var(--primary); margin-bottom: 8px; }
.txt { color: var(--ink); line-height: 1.7; }
.progress { height: 4px; background: var(--line); margin: 4px 16px; border-radius: 4px; overflow: hidden; }
.bar { height: 100%; background: var(--primary); }
.ctrls { display: flex; align-items: center; justify-content: center; gap: 30px; margin: 14px 0; }
.c { font-size: 24px; color: var(--ink); }
.play { width: 56px; height: 56px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; }
.unlock-row { text-align: center; color: var(--primary); font-size: 14px; margin-bottom: 14px; }
</style>
