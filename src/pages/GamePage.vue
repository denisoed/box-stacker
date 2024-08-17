<template>
  <div id="container">
    <XList class="score-x-list" />
    <Bonus :show="showBonus" :bonus="bonus"/>
    <div id="game" @click="onTap"></div>
    <div id="score" class="score">
      <div class="score-main">
        <img src="@/assets/coin.svg" />
        <span>{{ gameScore }}</span>
      </div>
      <div class="score-best">
        <div>{{ $t('game.bestScore') }}</div>
        <img src="@/assets/coin.svg" />
        <span>{{ bestScore }}</span>
      </div>
      <div class="score-balance">
        <img src="@/assets/balance.svg" />
        <span>{{ balance }}</span>
      </div>
    </div>
    <div class="game-over">
      <h2>{{ $t('game.gameOver') }}</h2>
      <p>{{ $t('game.restart') }}</p>
    </div>
    <div class="game-ready">
      <div class="button" @click="onTap">
        {{ $t('game.play') }}
      </div>
    </div>
    <transition name="slide">
      <Fingers v-if="helpFinger" class="help-fingers" />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue';
import Game from '@/core/game';
import { FIRST_TAP_HELP_LOCAL_STORAGE_KEY } from '@/config';
import { SCORE_CHANGE, GAME_OVER, BONUS } from '@/config/events';
import Fingers from '@/components/Fingers.vue';
import useUserApi from '@/api/useUserApi';
import { useUserStore } from '@/stores/user';
import useFormaters from '@/composables/useFormaters';
import Bonus from '@/components/Bonus.vue';
import XList from '@/components/XList.vue';

const { updateScore, getUser, updateUser } = useUserApi();
const userStore = useUserStore();
const { formatNumberWithSpaces } = useFormaters();

let gameInstance = null;
const bonus = ref(0);
const bonusTimer = ref(0);
const showBonus = ref(false);
const score = ref(0);
const helpFinger = ref(false);

const user = computed(() => userStore.getUser);
const balance = computed(() => formatNumberWithSpaces(user.value?.score || 0));
const gameScore = computed(() => formatNumberWithSpaces(score.value));
const bestScore = computed(() => formatNumberWithSpaces(user.value?.bestScore || 0));

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

async function onGameOver(score) {
  await updateScore(score);
  if (score > bestScore.value) {
    await updateUser(user.value?.id, { bestScore: score });
  }
  const u = await getUser(user.value?.id);
  if (u?.data) {
    userStore.setUser(u.data);
  }
}

function onBonus(b) {
  if (bonusTimer.value) {
    clearTimeout(bonusTimer.value);
  }
  bonus.value = b;
  showBonus.value = true;
  bonusTimer.value = setTimeout(() => {
    showBonus.value = false;
  }, 2000);
}

onMounted(() => {
  gameInstance = new Game();
  gameInstance.on(SCORE_CHANGE, onChangeScore);
  gameInstance.on(GAME_OVER, onGameOver);
  gameInstance.on(BONUS, onBonus);
});

onUnmounted(() => {
  if (gameInstance) {
    gameInstance.off(SCORE_CHANGE, onChangeScore);
    gameInstance.off(GAME_OVER, onGameOver);
    gameInstance.off(BONUS, onBonus);
  }
})
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Comfortaa");

.help-fingers {
  width: 150px;
  position: fixed;
  bottom: 60px;
  right: 0;
  z-index: 2;
  transform: rotate(-20deg);
  opacity: 0.2;
  pointer-events: none;
  user-select: none;
}

#container {
  width: 100%;
  height: 100%;
}

.score {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  transition: transform 0.5s ease;
  text-align: center;
  line-height: normal;

  &-x-list {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  &-main {
    display: flex;
    align-items: center;
    margin-top: 50px;
    
    span {
      font-size: 56px;
      color: #222;
      font-weight: bold;
    }

    img {
      width: 60px;
      height: 60px;
    }
  }

  &-best {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 4px 8px;
    line-height: normal;
    font-size: 18px;
    margin-top: 8px;
    line-height: normal;

    img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }

    div {
      color: #fff;
      font-weight: bold;
      margin-right: 8px;
    }

    span {
      color: #fff;
      font-weight: bold;
    }
  }

  &-balance {
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }

    span {
      color: #222;
      font-size: 16px;
      font-weight: bold;
    }
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
  color: #222;
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
  opacity: 0;
}
</style>