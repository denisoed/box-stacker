<template>
  <div class="progress">
    <div class="progress-done" :style="{ width: `${progressResult}%`}">
      <span v-if="progressResult >= 15">{{ progressResult }}%</span>
    </div>
    <span v-if="loading" class="progress-done-alt">{{ $t('common.loading') }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const progressResult = computed(() => {
  if (!props.progress || props.progress < 0) {
    return 0
  }
  if (props.progress > 100) {
    return 100
  }
  return Math.floor(props.progress)
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
	transition: all 0.5s ease;
  overflow: hidden;
}

.progress-done-alt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
  color: #222;
}
</style>