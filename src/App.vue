<template>
  <SkyStars />
  <router-view v-slot="{ Component }" class="page">
    <keep-alive :include="['GamePage']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Footer />
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeMount, ref } from 'vue';
import { VIBRATION_LOCAL_STORAGE_KEY } from '@/config';

import Footer from '@/components/Footer.vue';
import SkyStars from '@/components/SkyStars.vue';

const currentGradient = ref();

function vibrate() {
  const vibrationIsDisabled = localStorage.getItem(VIBRATION_LOCAL_STORAGE_KEY) === 'true';
  if (window?.Telegram?.WebApp && vibrationIsDisabled) {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
}

onBeforeMount(() => {
  currentGradient.value = 'rgb(240, 128, 128)';
})

onMounted(() => {
  // document.body.style.background = `linear-gradient(0deg, rgb(190, 190, 190) 0%, ${currentGradient.value} 84%)`;
  document.body.style.background = `linear-gradient(0deg, rgb(190, 190, 190) 0%, ${currentGradient.value} 84%)`;
  document.addEventListener('click', vibrate);
})

onUnmounted(() => {
  document.removeEventListener('click', vibrate);
})
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  z-index: 1;
}
</style>