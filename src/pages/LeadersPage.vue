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
      :userpic="user.userpic"
      :first-name="user.first_name"
      :last-name="user.last_name"
      :score="user.score"
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