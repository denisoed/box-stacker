<template>
  <div class="about-me">
    <div class="about-me_avatar">
      <Avatar class="about-me_avatar-svg" />
    </div>
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
  userpic: {
    type: String,
    default: '@/assets/avatar.webp'
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
    margin-bottom: 8px;

    svg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &_name {
    font-size: 16px;
    color: #222;
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