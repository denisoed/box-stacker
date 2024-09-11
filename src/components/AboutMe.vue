<template>
  <div class="about-me">
    <router-link to="/edit-avatar" class="about-me_avatar">
      <Avatar
        v-if="avatar"
        readonly
        class="about-me_avatar-svg"
        :top-type="avatar?.top"
        :accessories-type="avatar?.accessories"
        :facial-hair-type="avatar?.facialHair"
        :clothe-type="avatar?.clothes"
        :eye-type="avatar?.eyes"
        :eyebrow-type="avatar?.eyebrows"
        :mouth-type="avatar?.mouth"
        :graphic-type="avatar?.graphic"
        :top-color="avatar?.topColor"
        :clothe-color="avatar?.clotheColor"
        :skin-color="avatar?.skinColor"
        :hair-color="avatar?.hairColor"
        :facial-hair-color="avatar?.facialHairColor"
        :circle-color="avatar?.circleColor"
      />
      <div v-if="showEditPencil" class="about-me_avatar-pencil">
        <img src="@/assets/pencil.svg" />
      </div>
    </router-link>
    <div class="about-me_name">{{ fullName }}</div>
    <div class="about-me_score">
      <img src="@/assets/balance.svg" />
      <span>{{ props.score }}</span>
    </div>
  </div>  
</template>

<script setup>
import { computed } from 'vue';
import Avatar from '@/components/AvatarMaker/index.vue';

const props = defineProps({
  avatar: {
    type: Object,
    default: null
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  },
  showEditPencil: {
    type: Boolean,
    default: false
  }
})

const fullName = computed(() =>  `${props?.firstName || ''} ${props?.lastName || ''}`.trim());
</script>

<style scoped lang="scss">
.about-me {
  display: flex;
  flex-direction: column;
  align-items: center;

  &_avatar {
    width: 100px;
    height: 100px;
    position: relative;
    display: block;

    &-pencil {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;

      img {
        width: 14px;
      }
    }
  }

  &_name {
    font-size: 16px;
    color: #222;
    margin-top: 12px;
  }

  &_score {
    display: flex;
    align-items: center;
    font-size: 42px;
    color: #222;
    font-weight: bold;

    img {
      width: 40px;
      margin-right: 12px;
    }
  }
}
</style>