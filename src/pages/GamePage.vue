<template>
  <div id="container">
    <SkyStars />
    <div id="game"></div>
    <div id="score">0</div>
    <div id="instructions">Tap to place the block</div>
    <div class="game-over">
      <h2>Game Over</h2>
      <p>Tap to start again</p>
    </div>
    <div class="game-ready">
        <Button id="start-button">Start</Button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Button from '@/components/Button.vue';
import SkyStars from '@/components/SkyStars.vue';
import Game from '@/core/game';

onMounted(() => {
    new Game();
})
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Comfortaa");

#container {
  width: 100%;
  height: 100%;
}

#container #score {
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  font-size: 10vh;
  transition: transform 0.5s ease;
  color: #333344;
  transform: translatey(-200px);
}
#container #game {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
#container .game-over {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#container .game-over * {
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 0;
  transform: translatey(-50px);
  color: #333344;
}
#container .game-over h2 {
    margin: 0;
    padding: 0;
    font-size: 40px;
}
#container .game-over p {
    margin: 6px 0;
}

#container .game-ready {
  position: absolute;
  bottom: 40px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;

  .button {
    font-size: 24px;
    padding: 8px 24px;
  }
}

#container #instructions {
  position: absolute;
  width: 100%;
  top: 16vh;
  left: 0;
  text-align: center;
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 0;
}
#container #instructions.hide {
  opacity: 0 !important;
}
#container.playing #score, #container.resetting #score {
  transform: translatey(0px);
}
#container.playing #instructions {
  opacity: 1;
}
#container.ready .game-ready {
  opacity: 1;
  visibility: visible;
}
#container.ended #score {
  transform: translatey(6vh);
}
#container.ended .game-over * {
  opacity: 1;
  transform: translatey(0);
}
#container.ended .game-over p {
  transition-delay: 0.3s;
}
</style>