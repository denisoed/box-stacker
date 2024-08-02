<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';

function calcPercentageFromValue(goal: number, current: number) {
  return Math.round((current / goal) * 100);
}

const DAILY_TASKS = [
  {
    goal: 1000,
    reward: 100
  },
  {
    goal: 2000,
    reward: 200
  },
  {
    goal: 3000,
    reward: 300
  }
]
</script>

<template>
  <div class="container tasks">
    <div class="tasks-title">
      {{ $t('tasks.dailyTitle') }}
    </div>
    <div class="tasks-list">
      <div v-for="(task, i) in DAILY_TASKS" :key="i" class="task">
        <div class="task-header">
          <div class="task-header_info">
            <div class="task-header_title">{{ $t('tasks.goal') }}:</div>
            <div class="flex items-center">
              <img src="@/assets/coin.svg" />
              <span>{{ task.goal }}</span>
            </div>
          </div>
          <div class="button button--disabled">
            {{ $t('tasks.claim') }}:
            <img src="@/assets/coin.svg" />
            {{ task.reward }}
          </div>
        </div>
        <div class="tasks-daily-score">Daily score: 580</div>
        <ProgressBar :progress="calcPercentageFromValue(task.goal, 580)" />
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

  &-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &-daily-score {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 4px;
  }
}

.task {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    &_title {
      font-size: 14px;
      color: #333344;
      font-weight: bold;
    }

    &_info {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 4px 8px;


      img {
        width: 15px;
        height: 15px;
        margin-right: 2px;
      }
      
      span {
        font-size: 14px;
        color: #333344;
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