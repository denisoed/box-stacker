<template>
  <router-view />
  <SideBar />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import SideBar from '@/components/SideBar.vue';

function vibrate() {
  if (window?.Telegram?.WebApp) {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
}

function getRandomGradient() {
  const gradients = [
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(255, 127, 80) 84%)", // коралловый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(240, 128, 128) 84%)", // светло-коралловый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(255, 160, 122) 84%)", // светло-лососевый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(250, 128, 114) 84%)", // лососевый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(255, 99, 71) 84%)", // помидорный
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(255, 69, 0) 84%)", // оранжево-красный
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(255, 165, 0) 84%)", // оранжевый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(255, 215, 0) 84%)", // золотой
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(124, 252, 0) 84%)", // зелено-желтый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(127, 255, 0) 84%)", // липовый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(173, 255, 47) 84%)", // желтовато-зеленый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(0, 255, 127) 84%)", // весенне-зеленый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(0, 250, 154) 84%)", // средний весенне-зеленый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(0, 255, 255) 84%)", // циан
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(64, 224, 208) 84%)", // бирюзовый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(72, 209, 204) 84%)", // средний бирюзовый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(0, 206, 209) 84%)", // темно-бирюзовый
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(70, 130, 180) 84%)", // стальной синий
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(100, 149, 237) 84%)", // васильковый синий
    "linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(123, 104, 238) 84%)"  // средний фиолетовый
  ];
  
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
}

onMounted(() => {
  document.body.style.background = getRandomGradient();
  document.addEventListener('click', vibrate);
})

onUnmounted(() => {
  document.removeEventListener('click', vibrate);
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
