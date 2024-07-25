<template>
  <div id="container">
    <div id="game" @click="onTap"></div>
    <div id="score">
      <img src="@/assets/coin.svg" />
      <span>{{ score }}</span>
    </div>
    <div class="game-over">
      <h2>Game Over</h2>
      <p>Tap to start again</p>
    </div>
    <div class="game-ready">
      <div class="button" @click="onTap">
        Play
      </div>
    </div>
    <transition name="slide">
      <Fingers v-if="helpFinger" class="help-fingers" />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Game from '@/core/game';
import { FIRST_TAP_HELP_LOCAL_STORAGE_KEY } from '@/config';
import { SCORE_CHANGE } from '@/config/events';
import Fingers from '@/components/Fingers.vue';

let gameInstance = null;
const score = ref(0);
const helpFinger = ref(false);

function showFinger() {
  const isShowed = localStorage.getItem(FIRST_TAP_HELP_LOCAL_STORAGE_KEY) === 'true';
  if (!isShowed) {
    helpFinger.value = true;
    localStorage.setItem(FIRST_TAP_HELP_LOCAL_STORAGE_KEY, true);
  } else {
    helpFinger.value = false;
  }
}

function onTap() {
  gameInstance.onAction();
  showFinger();
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

.help-fingers {
  width: 150px;
  position: fixed;
  bottom: 50px;
  right: 0;
  z-index: 2;
  transform: rotate(-20deg);
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}

#container {
  width: 100%;
  height: 100%;
}

#container #score {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  font-size: 10vh;
  transition: transform 0.5s ease;
  color: #333344;
  transform: translatey(-200px);
  font-weight: bold;

  img {
    width: 60px;
    height: 60px;
  }
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
  position: fixed;
  bottom: -100px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  max-height: 52px;
  transition: all 0.3s ease;

  .button {
    font-size: 24px;
    padding: 8px 24px;
  }
}

#container.playing #score, #container.resetting #score {
  transform: translatey(0px);
}

#container.ready .game-ready {
  opacity: 1;
  visibility: visible;
  bottom: 110px;
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

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  bottom: -150px;
}
</style>