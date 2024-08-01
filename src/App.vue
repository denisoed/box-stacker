<template>
  <SkyStars />
  <router-view v-slot="{ Component }">
    <keep-alive :include="['GamePage']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Footer />
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeMount, ref } from 'vue';

import Footer from '@/components/Footer.vue';
import SkyStars from '@/components/SkyStars.vue';

const currentGradient = ref();

function vibrate() {
  if (window?.Telegram?.WebApp) {
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
