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
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 30px 30px 80px;
    gap: 16px;
    box-sizing: border-box;
  }
</style>