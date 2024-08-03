<script setup lang="ts">
import { computed } from 'vue';
import useFormaters from '@/composables/useFormaters';
import { useUserStore } from '@/stores/user';
import ProgressBar from '@/components/ProgressBar.vue';

const { formatNumberWithSpaces } = useFormaters();
const userStore = useUserStore();

const dailyScore = computed(() => userStore.getUser?.dailyScore || 0);

function calcPercentageFromValue(goal: number, current: number) {
  return Math.round((current / goal) * 100);
}

const DAILY_TASKS = [
  {
    goal: 1000,
    reward: 300
  },
  {
    goal: 2000,
    reward: 400
  },
  {
    goal: 3000,
    reward: 500
  }
]
</script>

<template>
  <div class="container tasks">
    <div class="tasks-title">
      {{ $t('tasks.dailyTitle') }}
    </div>
    <div class="flex column tasks-content">
      <div class="tasks-today-score-title">{{ $t('tasks.todayScoreTitle') }}:
        <span>
          <img src="@/assets/coin.svg" />
          {{ formatNumberWithSpaces(dailyScore) }}
        </span>
      </div>
      <div class="tasks-list">
        <div v-for="(task, i) in DAILY_TASKS" :key="i" class="task">
          <div class="task-header">
            <div class="task-header_info">
              <div class="task-header_title">{{ $t('tasks.goal') }}:</div>
              <div class="flex items-center">
                <img src="@/assets/coin.svg" />
                <span>{{ formatNumberWithSpaces(task.goal) }}</span>
              </div>
            </div>
            <div class="button button--disabled">
              {{ $t('tasks.claim') }}:
              <img src="@/assets/coin.svg" />
              {{ task.reward }}
            </div>
          </div>
          <ProgressBar :progress="calcPercentageFromValue(task.goal, dailyScore)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tasks {
  &-title {
    font-size: 18px;
    font-weight: bold;
    color: #333344;
    margin-bottom: 16px;
  }

  &-content {
    gap: 12px;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &-today-score-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.2);

    span {
      display: flex;
      align-items: center;
      gap: 2px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.task {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    &_title {
      font-size: 14px;
      color: #fff;
      font-weight: bold;
    }

    &_info {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 4px 8px;


      img {
        width: 15px;
        height: 15px;
        margin-right: 4px;
      }
      
      span {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        line-height: normal;
      }
    }

    .button {
      width: auto;
      min-height: auto;
      padding: 6px 12px 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: normal;
      font-size: 14px;

      img {
        width: 15px;
        height: 15px;
        margin: 0px 2px 0px 4px;
      }
    }
  }
}
</style>