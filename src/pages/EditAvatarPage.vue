<template>
  <div class="container edit-avatar">
    <div class="edit-avatar_header flex justify-between">
      <div class="button" @click="$router.go(-1)">
        {{ $t('editAvatar.back') }}
      </div>
      <Button
        @click="onSaveAvatar"
        :loading="saving"
      >
        {{ $t('editAvatar.save') }}
      </Button>
    </div>
    <AvatarMaker
      class="mt-md"
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
      :circle-color="userAvatar?.circleColor"
      @update:avatar="onUpdateAvatar"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import AvatarMaker from '@/components/AvatarMaker/index.vue';
import useUserApi from '@/api/useUserApi';
import canvasConfetti from 'canvas-confetti';

import Button from '@/components/Button.vue';

const userStore = useUserStore();
const { updateUser } = useUserApi();

const user = computed(() => userStore.getUser);
const userAvatar = computed(() => user.value?.avatar);

const changedAvatar = ref(null);
const saving = ref(false);

function onUpdateAvatar(avatar) {
  changedAvatar.value = avatar;
}

async function onSaveAvatar() {
  if (changedAvatar.value && !saving.value) {
    try {
      saving.value = true;
      const response = await updateUser(user.value.id, {
        avatar: changedAvatar.value
      });
      userStore.setUser(response.data || {});
      changedAvatar.value = null;
      canvasConfetti({
        spread: 70,
        origin: { y: 1.2 }
      });
    } catch (error) {
      console.error(error);
    } finally {
      saving.value = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-avatar {
  padding-left: 0;
  padding-right: 0;

  &_header {
    position: sticky;
    top: 20px;
    border-radius: 8px;
    padding: 8px;
    padding-bottom: 10px;
    background: rgba($color: #000, $alpha: 0.2);
    margin-left: 20px;
    margin-right: 20px;

    .button {
      font-size: 14px;
      padding: 6px 8px 4px;
      min-height: auto;
    }
  }

  :deep(.avatar-maker_scroller) {
    padding-left: 20px;
  }
}
</style>