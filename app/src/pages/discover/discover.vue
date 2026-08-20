<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">发现</view>
      <view class="sch" @click="open('search')">🔍</view>
    </view>

    <scroll-view scroll-x class="cats">
      <view class="cat" :class="{ on: cur === c }" v-for="c in cats" :key="c" @click="cur = c">{{ c }}</view>
    </scroll-view>

    <view class="sec-title">为你推荐</view>
    <view class="rec card" v-for="b in state.books" :key="b.id" @click="open('detail', b.id)">
      <view class="cv">{{ b.name.charAt(0) }}</view>
      <view class="meta">
        <view class="bn">{{ b.name }}</view>
        <view class="bt">{{ b.tag }}</view>
      </view>
      <view class="play">▶</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { state } from '@/store'
import { back as backTo } from '@/utils/nav'

const cats = ['推荐', '经典名著', '历史演义', '神怪神话', '世情小说', '免费专区']
const cur = ref('推荐')

function back() { backTo('/pages/home/home') }
function open(p, id) { uni.navigateTo({ url: '/pages/' + p + '/' + p + (id ? '?id=' + id : '') }) }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .sch { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.cats { white-space: nowrap; padding: 4px 16px; }
.cat { display: inline-block; padding: 6px 14px; margin-right: 8px; font-size: 14px; color: var(--muted); border-radius: 16px; background: var(--card); border: 1px solid var(--line); }
.cat.on { color: #fff; background: var(--primary); border-color: var(--primary); }
.rec { display: flex; align-items: center; margin: 0 16px 10px; padding: 12px; }
.cv { width: 52px; height: 70px; border-radius: 8px; background: linear-gradient(160deg, var(--primary), color-mix(in srgb, var(--primary) 70%, #000)); color: #fff; font-size: 26px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-right: 12px; }
.meta { flex: 1; }
.bn { font-size: 16px; font-weight: 600; color: var(--ink); }
.bt { font-size: 12px; color: var(--muted); margin-top: 2px; }
.play { width: 38px; height: 38px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; }
</style>
