<script setup lang="ts">
  import { computed } from 'vue';
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore();

  const user = computed(() => userStore.getUser);

  import AboutMe from '@/components/AboutMe.vue';
  import LeaderBoard from '@/components/LeaderBoard.vue';
</script>

<template>
  <div class="container">
    <AboutMe
      :userpic="user?.userPic"
      :first-name="user?.firstName"
      :last-name="user?.lastName"
      :score="user?.score || 0"
    />
    <LeaderBoard />
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 100px;
  }
</style>