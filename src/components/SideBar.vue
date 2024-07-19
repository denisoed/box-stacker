<template>
  <div class="sidebar">
    <Button>
      <img height="20" src="https://cdn.simpleicons.org/googlehome/333344" />
    </Button>
    <Button>
      <img height="20" src="https://cdn.simpleicons.org/github/333344" />
    </Button>
    <Button>
      <img height="20" src="https://cdn.simpleicons.org/telegram/333344" />
    </Button>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 30px;
  right: 16px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>