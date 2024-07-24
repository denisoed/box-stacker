<template>
  <SkyStars />
  <router-view />
  <Footer />
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeMount, ref } from 'vue';
import useColor from '@/composables/useColor';

import Footer from '@/components/Footer.vue';
import SkyStars from '@/components/SkyStars.vue';

const { getRandomGradient, rgbToHex } = useColor();

const currentGradient = ref();

function vibrate() {
  if (window?.Telegram?.WebApp) {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
}

onBeforeMount(() => {
  currentGradient.value = getRandomGradient();
  if (window?.Telegram?.WebApp) {
    window.Telegram.WebApp.setBackgroundColor(rgbToHex(currentGradient.value))
    window.Telegram.WebApp.setHeaderColor(rgbToHex(currentGradient.value))
    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.ready()
  }
})

onMounted(() => {
  // document.body.style.background = `linear-gradient(0deg, rgb(190, 190, 190) 0%, ${currentGradient.value} 84%)`;
  document.body.style.background = 'linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(240, 128, 128) 84%)';
  document.addEventListener('click', vibrate);
})

onUnmounted(() => {
  document.removeEventListener('click', vibrate);
})
</script>
