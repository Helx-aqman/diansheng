<template>
  <view class="task">
    <view class="left">
      <view class="name">{{ task.name }}</view>
      <view class="reward">+{{ task.reward }} 书豆</view>
    </view>
    <view
      class="btn"
      :class="{ done: task.done }"
      @click="!task.done && $emit('claim', task.id)"
    >{{ task.done ? '已领取' : '领取' }}</view>
  </view>
</template>

<script setup>
defineProps({ task: { type: Object, required: true } })
defineEmits(['claim'])
</script>

<style scoped>
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}
.name { font-size: 15px; color: var(--ink); }
.reward { font-size: 12px; color: var(--primary); margin-top: 2px; }
.btn {
  background: var(--primary);
  color: #fff;
  font-size: 13px;
  padding: 7px 16px;
  border-radius: 18px;
}
.btn.done {
  background: #e8e0d8;
  color: var(--muted);
}
</style>
