<template>
  <SkyStars />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Footer />
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeMount, ref } from 'vue';
import useColor from '@/composables/useColor';
import useTelegramApi from '@/api/useTelegramApi';
import { useUserStore } from '@/stores/user';

import Footer from '@/components/Footer.vue';
import SkyStars from '@/components/SkyStars.vue';

const { getRandomGradient, rgbToHex } = useColor();
const { authTelegram } = useTelegramApi();
const userStore = useUserStore();

const currentGradient = ref();

function vibrate() {
  if (window?.Telegram?.WebApp) {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
}

async function initData() {
  currentGradient.value = 'rgb(240, 128, 128)' || getRandomGradient();
  const app = window?.Telegram?.WebApp;
  if (app) {
    app.setBackgroundColor(rgbToHex(currentGradient.value))
    app.setHeaderColor(rgbToHex(currentGradient.value))
    app.expand()
    const data = '{"query_id":"AAEGKqcZAAAAAAYqpxlxPkv0","user":{"id":430385670,"first_name":"Denis","last_name":"Grushkin","username":"denisoed","language_code":"en","allows_write_to_pm":true},"auth_date":"1721922864","hash":"ea88f6cf7c588e2a8b7527d3c888d4b9bbfc9a8f15d87e1f6c3e6f63ac1dc21d"}';
    const response = await authTelegram(JSON.parse(data) || app?.initDataUnsafe);
    userStore.setUser(response?.data);
    app.ready()
  }
}

onBeforeMount(() => {
  initData();
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
