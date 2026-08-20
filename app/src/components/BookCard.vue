<template>
  <view class="book" :class="{ locked: locked }" @click="$emit('tap')">
    <image v-if="cover" class="cv" :src="cover" mode="aspectFill" />
    <view v-else class="cv ph">{{ name.charAt(0) }}</view>
    <view class="nm">{{ name }}</view>
    <view class="st">{{ locked ? status : '可听 · ' + total + '回' }}</view>
  </view>
</template>

<script setup>
defineProps({
  name: { type: String, default: '' },
  total: { type: Number, default: 0 },
  status: { type: String, default: '即将上线' },
  locked: { type: Boolean, default: false },
  cover: { type: String, default: '' }
})
defineEmits(['tap'])
</script>

<style scoped>
.book {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cv {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  display: block;
  object-fit: cover;
}
.book.locked .cv {
  filter: grayscale(0.4);
  opacity: 0.7;
}
.cv.ph {
  background: linear-gradient(160deg, var(--primary), color-mix(in srgb, var(--primary) 70%, #000));
  color: #fff;
  font-size: 34px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nm {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}
.st {
  font-size: 11px;
  color: var(--muted);
}
</style>
