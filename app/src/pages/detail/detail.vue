<template>
  <view class="page" v-if="book">
    <view class="topbar">
      <view class="back" @click="back">‹</view>
      <view class="brand">书籍详情</view>
      <view class="more">⋮</view>
    </view>

    <view class="hero">
      <view class="cv">{{ book.name.charAt(0) }}</view>
      <view class="info">
        <view class="bn">{{ book.name }}</view>
        <view class="meta">{{ book.author }} · {{ book.tag }}</view>
        <view class="tip">前 {{ book.freeEnd }} 回免费 · 后续看广告 / 书豆解锁</view>
      </view>
    </view>

    <view class="desc card">{{ book.intro }}</view>

    <view class="sec-title">回目（{{ book.chapters.length }}回）</view>
    <view class="chlist card">
      <ChapterItem
        v-for="c in book.chapters"
        :key="c.no"
        :no="c.no"
        :title="c.title"
        :locked="c.locked"
        @tap="onCh(c)"
      />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { state } from '@/store'
import ChapterItem from '@/components/ChapterItem.vue'
import { back as backTo } from '@/utils/nav'

const id = ref('')
const book = computed(() => state.books.find((b) => b.id === id.value) || state.books[0])
onLoad((opt) => { id.value = opt.id || state.books[0].id })

function back() { backTo('/pages/home/home') }
function onCh(c) {
  if (c.locked) uni.navigateTo({ url: '/pages/unlock/unlock' })
  else uni.switchTab({ url: '/pages/play/play' })
}
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.back, .more { font-size: 22px; color: var(--primary); width: 32px; }
.brand { font-size: 18px; font-weight: 600; color: var(--ink); }
.hero { display: flex; padding: 16px; gap: 14px; }
.cv { width: 84px; height: 112px; border-radius: 12px; background: linear-gradient(160deg, var(--primary), color-mix(in srgb, var(--primary) 70%, #000)); color: #fff; font-size: 40px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.info { flex: 1; }
.bn { font-size: 20px; font-weight: 700; color: var(--ink); }
.meta { font-size: 13px; color: var(--muted); margin: 6px 0; }
.tip { font-size: 12px; color: var(--primary); }
.desc { margin: 0 16px 8px; padding: 14px; font-size: 14px; color: var(--ink); line-height: 1.6; }
.chlist { margin: 0 16px; padding: 0 0; }
</style>
