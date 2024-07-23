<template>
  <div class="header">
    <div class="button">
      <img src="@/assets/leaderboard.png" alt="L" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 8px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 50px;
  display: flex;
  gap: 8px;
  z-index: 1;

  .button {
    width: 30px !important;
    height: 30px !important;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>