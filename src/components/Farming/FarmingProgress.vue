<template>
  <div class="farming-progress">
    <ProgressInfo
      :progress="progress"
      :time-string="timeString"
      :farming-value="farmingValue"
      :running="running"
    />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, onUnmounted, ref, toRefs, watch } from 'vue';
import { FARMING_AMOUNT, FARMING_COOLDOWN } from '@/config';

import ProgressInfo from '@/components/Farming/ProgressInfo.vue';

const props = defineProps({
  cooldown: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['on-end']);

const { cooldown } = toRefs(props);

const timer = ref();
const progress = ref(0);
const secondsLeft = ref(0);
const timeString = ref();
const running = ref(false);

const farmingValue = computed(() => {
  if (FARMING_AMOUNT && progress.value)
    return String((((FARMING_AMOUNT || 0) / 100) * (progress.value || 1)).toFixed(3));
  return '0';
});

function formatSecondsToDate(current: number) {
  let hours = Math.floor(current / 3600);
  let minutes = Math.floor((current % 3600) / 60);
  let seconds = current % 60;

  // format to 00:00:00
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(ended: string) {
  running.value = true;
  const currentDate = dayjs();
  const endDate = dayjs(ended);
  const diff = endDate.diff(currentDate, 'seconds');
  secondsLeft.value = diff;
  timer.value = setInterval(() => {
    if (secondsLeft.value <= 0) {
      emit('on-end');
      clearInterval(timer.value);
      running.value = false;
    } else {
      secondsLeft.value--;
      progress.value = ((FARMING_COOLDOWN - secondsLeft.value) / FARMING_COOLDOWN) * 100;
      timeString.value = formatSecondsToDate(secondsLeft.value);
    }
  }, 1000);
}

watch(
  cooldown,
  (c: string | null) => {
    if (c) startTimer(c);
  },
  {
    immediate: true,
  }
);

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<style lang="scss" scoped>
.farming-progress {
  width: 100%;
}
</style>