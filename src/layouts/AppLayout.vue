<template>
  <SkyStars />
  <router-view v-slot="{ Component }" class="page">
    <keep-alive :include="['GamePage']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Footer />
  <JenesiusModal />
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeMount, ref } from 'vue';
import { VIBRATION_LOCAL_STORAGE_KEY } from '@/config';
import {
  container as JenesiusModal,
  config as configDialog,
  openModal
} from 'jenesius-vue-modal';
import canvasConfetti from 'canvas-confetti';
import useUserApi from '@/api/useUserApi';
import useUser from '@/composables/useUser';

import Footer from '@/components/Footer.vue';
import SkyStars from '@/components/SkyStars.vue';
import DailyRewardDialog from '@/components/Dialogs/DailyRewardDialog.vue';

configDialog({
  animation: "slide-bottom"
})

const { checkDailyReward, collectDailyReward } = useUserApi();
const { fetchUser } = useUser();

const currentGradient = ref();

function vibrate() {
  const vibrationIsEnabled = localStorage.getItem(VIBRATION_LOCAL_STORAGE_KEY) === 'true';
  if (window?.Telegram?.WebApp && vibrationIsEnabled) {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
}

async function onOpenDailyRewardDialog(reward) {
  const modal = await openModal(DailyRewardDialog, {
    reward
  })
  canvasConfetti({
    spread: 70,
    origin: { y: 1.2 }
  });
  modal.on('on-collect', async () => {
    await collectDailyReward();
    fetchUser();
    canvasConfetti({
      spread: 70,
      origin: { y: 1.2 }
    });
    modal.close();
  })
  modal.on('close', () => {
    modal.close();
  })
}

async function checkReward() {
  const response = await checkDailyReward();
  if (response?.data?.success) {
    onOpenDailyRewardDialog(response.data.reward);
  }
}

onBeforeMount(() => {
  currentGradient.value = 'rgb(240, 128, 128)';
  checkReward();
})

onMounted(() => {
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