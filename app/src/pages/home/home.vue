<template>
  <view class="page">
    <view class="topbar">
      <view class="brand">典声<text class="sub">名著评书伴读</text></view>
      <view class="menu">☰</view>
    </view>

    <view class="search" @click="open('search')">🔍 搜索书名 / 说书人</view>

    <swiper class="banner-swiper" :autoplay="true" :interval="3000" :duration="500" :circular="true" :current="current" @change="onSwiperChange">
      <swiper-item v-for="b in banners" :key="b.id" @click="onBanner(b)">
        <view class="banner-card" :class="{ 'no-img': !b.cover }">
          <image v-if="b.cover" class="bcv" :src="b.cover" mode="aspectFill" />
          <view class="bmask"></view>
          <view class="btext">
            <view class="btag" v-if="b.locked">即将上线</view>
            <view class="btitle">{{ b.name }}</view>
            <view class="bsub">{{ b.sub }}</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="dots">
      <view v-for="(b, i) in banners" :key="i" class="dot" :class="{ on: i === current }" @click="current = i"></view>
    </view>

    <view class="resume" @click="open('play')">
      <image class="cv" src="/static/xiyouji_cover.png" mode="aspectFill" />
      <view class="meta">
        <view class="bn">西游记</view>
        <view class="bp2">继续听 · 第8回（68%）</view>
      </view>
      <view class="play">▶</view>
    </view>

    <view class="sec-title">名著书架</view>
    <view class="grid">
      <view
        v-for="(b, i) in rest"
        :key="'g' + b.id"
        class="cell"
        :class="i < 2 ? 'two' : 'three'"
      >
        <BookCard
          :name="b.name"
          :total="b.total"
          :status="b.status"
          :locked="b.locked"
          :cover="b.cover"
          @tap="onBook(b)"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { state } from '@/store'
import BookCard from '@/components/BookCard.vue'

const main = state.books[0]
const placeholders = [
  { id: 'sanguo', name: '三国演义', status: '即将上线', locked: true },
  { id: 'shuihu', name: '水浒传', status: '即将上线', locked: true },
  { id: 'honglou', name: '红楼梦', status: '敬请期待', locked: true },
  { id: 'fengshen', name: '封神演义', status: '敬请期待', locked: true },
  { id: 'liaozhai', name: '聊斋', status: '敬请期待', locked: true },
  { id: 'more', name: '更多经典', status: '陆续上架', locked: true }
]
const shelf = computed(() => [
  { id: main.id, name: main.name, total: main.chapters.length, locked: false, cover: '/static/xiyouji_cover.png' },
  ...placeholders
])
// 轮播展示书架前 2 本（精选位）；网格只展示轮播之后的剩余书，避免重复
const rest = computed(() => shelf.value.slice(2))

const tabs = ['home', 'play', 'vip', 'me']
function open(p) {
  const url = '/pages/' + p + '/' + p
  if (tabs.includes(p)) uni.switchTab({ url })
  else uni.navigateTo({ url })
}
function onBook(b) {
  if (b.locked) { uni.showToast({ title: '即将上线', icon: 'none' }); return }
  uni.navigateTo({ url: '/pages/detail/detail?id=' + b.id })
}

const banners = computed(() => shelf.value.slice(0, 2).map(b => ({
  id: b.id, name: b.name, cover: b.cover, locked: b.locked,
  sub: b.locked ? '即将上线 · 敬请期待' : '前10回免费听 · 一句原文一句评书讲解'
})))
const current = ref(0)
function onSwiperChange(e) { current.value = e.detail.current }
function onBanner(b) { onBook(b) }
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.brand { font-size: 22px; font-weight: 800; color: var(--ink); }
.sub { font-size: 12px; font-weight: 400; color: var(--muted); margin-left: 6px; }
.menu { font-size: 22px; color: var(--primary); }
.search { margin: 0 16px 12px; padding: 12px 14px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; color: var(--muted); font-size: 14px; }
.banner-swiper { width: calc(100% - 32px); height: 152px; margin: 0 16px 4px; border-radius: 16px; overflow: hidden; }
.banner-card { position: relative; width: 100%; height: 100%; border-radius: 16px; overflow: hidden; color: #fff; display: flex; flex-direction: column; justify-content: center; padding: 18px 20px; box-sizing: border-box; background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 65%, #000)); }
.banner-card.no-img { background: linear-gradient(135deg, #2e7d5b, #16402c); }
.bcv { position: absolute; inset: 0; width: 100%; height: 100%; }
.bmask { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.12)); }
.btext { position: relative; z-index: 1; }
.btag { font-size: 12px; background: rgba(255, 255, 255, 0.22); display: inline-block; padding: 2px 10px; border-radius: 10px; align-self: flex-start; }
.btitle { font-size: 19px; font-weight: 700; margin-top: 10px; }
.bsub { font-size: 13px; opacity: 0.92; margin-top: 6px; }
.dots { display: flex; justify-content: center; gap: 6px; margin: 4px 0 12px; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--line); transition: all 0.2s; }
.dot.on { width: 18px; border-radius: 4px; background: var(--primary); }
.resume { display: flex; align-items: center; margin: 0 16px 6px; padding: 12px; background: var(--card); border: 1px solid var(--line); border-radius: 16px; }
.cv { width: 48px; height: 64px; border-radius: 8px; display: block; object-fit: cover; margin-right: 12px; }
.meta { flex: 1; }
.bn { font-size: 16px; font-weight: 600; color: var(--ink); }
.bp2 { font-size: 12px; color: var(--muted); margin-top: 2px; }
.play { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.grid { display: flex; flex-wrap: wrap; gap: 14px 10px; padding: 0 16px; }
.cell { box-sizing: border-box; }
.cell.two { flex: 0 0 calc(50% - 5px); }
.cell.three { flex: 0 0 calc(33.333% - 6.67px); }
</style>
