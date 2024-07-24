<template>
  <div id="container">
    <div id="game" @click="onTap"></div>
    <div id="score">{{ score }}</div>
    <div id="instructions">Tap to place the block</div>
    <div class="game-over">
      <h2>Game Over</h2>
      <p>Tap to start again</p>
    </div>
    <div class="button game-ready" id="start-button" @click="onTap">
      Start Game
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Game from '@/core/game';
import { SCORE_CHANGE } from '@/config/events';

let gameInstance = null;
const score = ref(0);

function onTap() {
  gameInstance.onAction();
}

function onChangeScore(val) {
  score.value = val;
}

onMounted(() => {
  gameInstance = new Game();
  gameInstance.on(SCORE_CHANGE, onChangeScore);
});
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
  width: 100%;
  top: 200px;
  left: 50%;
  transform: translateX(-50%) translateY(-50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition-delay: 0.5s;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
#container .game-over * {
  color: #333344;
}
#container .game-over h2 {
    margin: 0;
    padding: 0;
    font-size: 40px;
    white-space: nowrap;
}
#container .game-over p {
    margin: 6px 0;
}

#container .game-ready {
  position: absolute;
  bottom: 110px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;

  &.button {
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
  color: #333344;
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
#container.ended .game-over {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translatey(0px);
}
#container.ended .game-over * {
  transform: translatey(0);
}
#container.ended .game-over p {
  transition-delay: 0.3s;
}
</style>