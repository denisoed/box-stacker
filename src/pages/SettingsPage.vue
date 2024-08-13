<template>
  <div class="container flex column">
    <div class="settings-audio">
      <div class="button" @click="onSwitchAudio">
        <img v-if="isDisabled" src="@/assets/audio-off.svg" />
        <img v-else src="@/assets/audio-on.svg" />
        <span>{{ isDisabled ? $t('settings.audio.disabled') : $t('settings.audio.enabled') }}</span>
      </div>
    </div>
    <AvatarMaker
      readonly
      class="mt-lg"
      :top-type="userAvatar?.top"
      :accessories-type="userAvatar?.accessories"
      :facial-hair-type="userAvatar?.facialHair"
      :clothe-type="userAvatar?.clothes"
      :eye-type="userAvatar?.eyes"
      :eyebrow-type="userAvatar?.eyebrows"
      :mouth-type="userAvatar?.mouth"
      :graphic-type="userAvatar?.graphic"
      :top-color="userAvatar?.topColor"
      :clothe-color="userAvatar?.clotheColor"
      :skin-color="userAvatar?.skinColor"
      :hair-color="userAvatar?.hairColor"
      :facial-hair-color="userAvatar?.facialHairColor"
    />
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { AUDIO_LOCAL_STORAGE_KEY } from '@/config';
import AvatarMaker from '@/components/AvatarMaker/index.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const isDisabled = ref(false);

const userAvatar = computed(() => userStore.getUser?.avatar);

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
      color: #222;
      margin-left: 10px;
      line-height: normal;
  
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>