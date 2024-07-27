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
import useUserApi from '@/api/useUserApi';
import { useUserStore } from '@/stores/user';

import Footer from '@/components/Footer.vue';
import SkyStars from '@/components/SkyStars.vue';

const { getRandomGradient, rgbToHex } = useColor();
const { getUser, createUser } = useUserApi();
const userStore = useUserStore();

const currentGradient = ref();

function vibrate() {
  if (window?.Telegram?.WebApp) {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
}

async function getMe(initDataUnsafe) {
  const response = await getUser(initDataUnsafe?.user?.id);
  if (!response?.success) {
    const newUser = await createUser({
      telegramId: initDataUnsafe?.user?.id,
      firstName: initDataUnsafe?.user?.first_name,
      lastName: initDataUnsafe?.user?.last_name,
      userName: initDataUnsafe?.user?.username,
    });
    userStore.setUser(newUser?.data);
  } else {
    userStore.setUser(response?.data);
  }
}

async function initData() {
  currentGradient.value = 'rgb(240, 128, 128)' || getRandomGradient();
  const app = window?.Telegram?.WebApp;
  if (app) {
    getMe(app?.initDataUnsafe);
    app.setBackgroundColor(rgbToHex(currentGradient.value))
    app.setHeaderColor(rgbToHex(currentGradient.value))
    app.expand()
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
