<template>
  <view class="bean-card" @click="$emit('tap')">
    <view class="ic">🫘</view>
    <view class="meta">
      <view class="num"><text class="b-num">{{ beans }}</text> 书豆</view>
      <view class="tip">听书赚书豆，兑换解锁章节 / 畅听券</view>
    </view>
    <view class="go">明细 ›</view>
  </view>
</template>

<script setup>
defineProps({ beans: { type: Number, default: 0 } })
defineEmits(['tap'])
</script>

<style scoped>
.bean-card {
  display: flex;
  align-items: center;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px;
  margin: 12px 16px;
}
.ic { font-size: 30px; margin-right: 12px; }
.meta { flex: 1; }
.num { font-size: 18px; font-weight: 700; color: var(--ink); }
.b-num { color: var(--primary); font-size: 22px; }
.tip { font-size: 12px; color: var(--muted); margin-top: 2px; }
.go { color: var(--primary); font-size: 14px; }
</style>
