<template>
  <div class="container flex column">
    <AboutMe
      :first-name="user?.firstname"
      :last-name="user?.lastname"
      :score="balance"
      :avatar="userAvatar"
      show-edit-pencil
    />
    <div class="settings-title mt-md">{{ $t('settings.title') }}</div>
    <div class="flex column items-start gap-sm mt-sm">
      <div
        v-for="(key, i) of Object.keys(settings)"
        :key="i"
        class="settings-item"
      >
        <div class="flex items-center gap-sm">
          <div class="settings-item_icon">
            <img :src="settings[key].logo" >
          </div>
          <span>{{ $t(settings[key].label) }}</span>
        </div>
        <Toggler off-label="Off" on-label="On" v-model="settings[key].value" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';
import { AUDIO_LOCAL_STORAGE_KEY, VIBRATION_LOCAL_STORAGE_KEY } from '@/config';
import { useUserStore } from '@/stores/user';
import useFormaters from '@/composables/useFormaters';

import VibrationSvg from '@/assets/vibration.svg';
import AudioSvg from '@/assets/volume.svg';

import AboutMe from '@/components/AboutMe.vue';
import Toggler from '@/components/Toggler.vue';

const userStore = useUserStore();
const { formatNumberWithSpaces } = useFormaters();

const settings = reactive({
  audio: {
    label: 'settings.audio.title',
    value: localStorage.getItem(AUDIO_LOCAL_STORAGE_KEY) === 'true',
    logo: AudioSvg
  },
  vibration: {
    label: 'settings.vibration.title',
    value: localStorage.getItem(VIBRATION_LOCAL_STORAGE_KEY) === 'true',
    logo: VibrationSvg
  }
});

const userAvatar = computed(() => userStore.getUser?.avatar);
const user = computed(() => userStore.getUser);
const balance = computed(() => formatNumberWithSpaces(userStore.getUser?.score || 0));

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
.settings {
  &-title {
    width: auto;
    font-size: 16px;
    font-weight: bold;
    color: #222;
  }
}

.settings-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 8px;

  span {
    font-weight: bold;
    color: #fff;
  }

  &_icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: #d7514d;

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
</style>