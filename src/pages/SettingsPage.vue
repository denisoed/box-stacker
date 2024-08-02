<template>
  <div class="container">
    <div class="settings-audio">
      <div class="button" @click="onSwitchAudio">
        <img v-if="isDisabled" src="@/assets/audio-off.svg" />
        <img v-else src="@/assets/audio-on.svg" />
        <span>{{ isDisabled ? $t('settings.audio.disabled') : $t('settings.audio.enabled') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { AUDIO_LOCAL_STORAGE_KEY } from '@/config';

const isDisabled = ref(false);

function onSwitchAudio() {
  if (isDisabled.value) {
    isDisabled.value = false;
    localStorage.setItem(AUDIO_LOCAL_STORAGE_KEY, false);
  } else {
    isDisabled.value = true;
    localStorage.setItem(AUDIO_LOCAL_STORAGE_KEY, true);
  }
}

onBeforeMount(() => {
  isDisabled.value = localStorage.getItem(AUDIO_LOCAL_STORAGE_KEY) === 'true'
})
</script>

<style scoped lang="scss">
.settings-audio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  .button {
    width: 100% !important;
    height: 30px !important;
    display: flex;
    align-items: center;

    img {
      width: 20px;
    }

    span {
      color: #333344;
      margin-left: 10px;
      line-height: normal;
  
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>