<template>
  <div class="footer">
    <router-link to="/">
      <img src="@/assets/home.svg" />
    </router-link>
    <router-link to="/app">
      <img src="@/assets/game.svg" />
    </router-link>
    <router-link to="/stats">
      <img src="@/assets/cup.svg" />
    </router-link>
    <router-link to="/tasks">
      <img src="@/assets/tasks.svg" />
    </router-link>
    <router-link to="/boosts">
      <img src="@/assets/boost.svg" />
    </router-link>
    <router-link to="/settings">
      <img src="@/assets/settings.svg" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 12px 16px 24px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;

  a {
    width: 45px;
    height: 45px;
    border: 1px solid #fff;
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
    color: #222;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);

    &:active {
      transform: scale(0.9);
    }

    img {
      width: 30px;
    }

    &.router-link-exact-active {
      background: #fff;
      transform: scale(1.05);
    }
  }
}
</style>