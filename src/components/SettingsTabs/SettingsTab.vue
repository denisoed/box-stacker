<template>
  <div class="settings-tab flex column">
    <div class="flex column items-center gap-sl mt-sm">
      <div
        v-for="(key, i) of Object.keys(settings)"
        :key="i"
        class="settings-tab_item"
      >
        <div class="flex items-center gap-sm">
          <div class="settings-tab_item-icon">
            <img :src="settings[key].logo" >
          </div>
          <span>{{ $t(settings[key].label) }}</span>
        </div>
        <Toggler
          v-model="settings[key].value"
          off-label="Off"
          on-label="On"
        />
      </div>
      <TonConnectButton class="mt-sm hidden" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { AUDIO_LOCAL_STORAGE_KEY, VIBRATION_LOCAL_STORAGE_KEY } from '@/config';
import { TonConnectButton } from '@townsquarelabs/ui-vue';

import VibrationSvg from '@/assets/vibration.svg';
import AudioSvg from '@/assets/volume.svg';

import Toggler from '@/components/Toggler.vue';
import Button from '@/components/Button.vue';

const settings = reactive({
  audio: {
    label: 'settings.settingsTab.audio.title',
    value: localStorage.getItem(AUDIO_LOCAL_STORAGE_KEY) === 'true',
    logo: AudioSvg
  },
  vibration: {
    label: 'settings.settingsTab.vibration.title',
    value: localStorage.getItem(VIBRATION_LOCAL_STORAGE_KEY) === 'true',
    logo: VibrationSvg
  }
});

function onSwitchAudio() {
  if (settings.audio.value) {
    localStorage.setItem(AUDIO_LOCAL_STORAGE_KEY, true);
  } else {
    localStorage.setItem(AUDIO_LOCAL_STORAGE_KEY, false);
  }
}

function onSwitchVibration() {
  if (settings.vibration.value) {
    localStorage.setItem(VIBRATION_LOCAL_STORAGE_KEY, true);
  } else {
    localStorage.setItem(VIBRATION_LOCAL_STORAGE_KEY, false);
  }
}

watch(settings.audio, () => {
  onSwitchAudio();
});

watch(settings.vibration, () => {
  onSwitchVibration();
});
</script>

<style scoped lang="scss">
.settings-tab {
  width: 100%;

  &_connect {
    img {
      width: 20px;
      height: 20px;
    }
  }

  &_item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 8px;
  
    span {
      font-weight: bold;
      color: #fff;
    }
  
    &-icon {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: #FF9472;
  
      img {
        width: 20px;
      }
    }
  
    .button {
      width: 100% !important;
      height: 30px !important;
      display: flex;
      align-items: center;
  
      span {
        color: #222;
        margin-left: 10px;
        line-height: normal;
    
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>