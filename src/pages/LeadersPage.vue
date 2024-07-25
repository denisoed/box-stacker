<script setup lang="ts">
  import AboutMe from '@/components/AboutMe.vue';
  import LeaderBoard from '@/components/LeaderBoard.vue';
</script>

<template>
  <div class="container">
    <AboutMe />
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