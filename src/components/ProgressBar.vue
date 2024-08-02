<template>
  <div class="progress">
    <div class="progress-done" :style="{ width: `${progressResult}%`}">
      <span v-if="progressResult > 10">{{ progressResult }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  }
})

const progressResult = computed(() => {
  if (props.score) return props.score
  if (!props.progress || props.progress < 0) {
    return 0
  }
  if (props.progress > 100) {
    return 100
  }
  return props.progress
})
</script>

<style scoped lang="scss">
.progress {
	width: 100%;
	background-color: #fff;
	border-radius: 8px;
	position: relative;
	height: 22px;
  padding: 3px;
  box-sizing: border-box;
  box-shadow: 0 3px 3px -5px #F2709C, 0 2px 5px #F2709C;
}

.progress-done {
	background: linear-gradient(to left, #F2709C, #FF9472);
	border-radius: 6px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	opacity: 1;
  font-size: 12px;
  font-weight: bold;
	transition: 1s ease 0.3s;
}
</style>