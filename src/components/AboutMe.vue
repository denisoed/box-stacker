<template>
  <div class="about-me">
    <div class="about-me_avatar">
      <!-- <img v-if="props?.userpic" :src="props.userpic" /> -->
      <img src="@/assets/avatar.webp" />
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
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.4);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border-radius: 100%;
    padding: 4px;
    width: 80px;
    height: 80px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }

  &_name {
    font-size: 16px;
    color: #000;
    margin-top: 4px;
  }

  &_score {
    display: flex;
    align-items: center;
    font-size: 42px;
    color: #000;
    font-weight: bold;

    img {
      width: 40px;
      margin-right: 8px;
    }
  }
}
</style>