<template>
  <div class="about-me">
    <div class="about-me_avatar">
      <img src="@/assets/avatar.webp" />
    </div>
    <div class="about-me_name">Jerry Wood</div>
    <div class="about-me_score">182</div>
  </div>  
</template>

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
    color: #fff;
    margin-top: 4px;

    text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  }

  &_score {
    font-size: 42px;
    color: #fff;
    font-weight: bold;

    text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  }
}
</style>