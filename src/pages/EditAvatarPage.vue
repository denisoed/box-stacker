<template>
  <div class="container edit-avatar">
    <div class="edit-avatar_header flex justify-between">
      <div class="button" @click="$router.go(-1)">
        {{ $t('editAvatar.back') }}
      </div>
      <div class="button">{{ $t('editAvatar.save') }}</div>
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
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import AvatarMaker from '@/components/AvatarMaker/index.vue';

const userStore = useUserStore();

const userAvatar = computed(() => userStore.getUser?.avatar);
</script>

<style lang="scss" scoped>
.edit-avatar {
  &_header {
    position: sticky;
    top: 20px;
    border-radius: 8px;
    padding: 8px;
    padding-bottom: 10px;
    background: rgba($color: #000, $alpha: 0.2);

    .button {
      font-size: 14px;
      padding: 6px 8px 4px;
      min-height: auto;
    }
  }
}
</style>