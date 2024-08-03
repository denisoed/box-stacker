<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
  bonus: {
    type: Number,
    default: 0
  },
  show: {
    type: Boolean,
    default: false
  }
})

const pulse = ref(false);
const pulseTimer = ref(0);

watch(() => props.bonus, () => {
  pulse.value = false;
  if (props.bonus > 2) {
    if (pulseTimer.value) {
      clearTimeout(pulseTimer.value);
    }
    pulse.value = true;
    pulseTimer.value = setTimeout(() => {
      pulse.value = false;
    }, 300);
  }
});
</script>

<template>
  <div class="bonus" :class="{ 'bonus--active': show }">
    <span :class="{ pulse }">X{{ bonus }}</span>
  </div>
</template>

<style scoped lang="scss">
.bonus {
  position: fixed;
  bottom: 85px;
  left: -80px;
  transform: translateY(-50%);
  border-radius: 10px;
  color: #fff;
  z-index: 2;
  font-size: 32px;
  font-weight: bold;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: 'TrickyJimmy', sans-serif;
  text-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.1);

  &--active {
    left: 20px;
  }

  span {
    display: block;
    transition: all 0.5s ease;
  }
}

.pulse {
  animation: pulse 0.3s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
