<template>
  <view class="ch" :class="{ locked: locked }" @click="$emit('tap')">
    <view class="no">第{{ no }}回</view>
    <view class="tt">{{ title }}</view>
    <view class="arrow">{{ locked ? '🔒' : '▶' }}</view>
  </view>
</template>

<script setup>
defineProps({
  no: { type: Number, default: 0 },
  title: { type: String, default: '' },
  locked: { type: Boolean, default: false }
})
defineEmits(['tap'])
</script>

<style scoped>
.ch {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}
.no {
  font-size: 13px;
  color: var(--primary);
  width: 64px;
  flex-shrink: 0;
}
.tt {
  flex: 1;
  font-size: 15px;
  color: var(--ink);
}
.arrow {
  color: var(--muted);
  font-size: 16px;
}
.ch.locked .tt,
.ch.locked .no { color: var(--muted); }
</style>
