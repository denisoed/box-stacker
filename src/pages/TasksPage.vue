<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import canvasConfetti from 'canvas-confetti';
import useFormaters from '@/composables/useFormaters';
import useDailyTasksApi from '@/api/useDailyTasksApi';
import useUserApi from '@/api/useUserApi';
import { useUserStore } from '@/stores/user';
import { useDailyTasksStore } from '@/stores/dailyTasks';
import ProgressBar from '@/components/ProgressBar.vue';
import Button from '@/components/Button.vue';

const { getDailyTasks, claimDailyTask } = useDailyTasksApi();
const { getUser } = useUserApi();
const { formatNumberWithSpaces } = useFormaters();
const userStore = useUserStore();
const dailyTasksStore = useDailyTasksStore();

const user = computed(() => userStore.getUser || 0);
const dailyScore = computed(() => user.value?.dailyScore || 0);
const dailyTasks = computed(() => dailyTasksStore?.getDailyTasks || []);

function calcPercentageFromValue(goal: number, current: number) {
  return Math.round((current / goal) * 100);
}

async function getInitData() {
  const response = await getDailyTasks({ _sort: 'goal:asc' });
  if (response?.data) {
    dailyTasksStore.setDailyTasks(response.data);
  }
}

async function onClaim(task) {
  try {
    if (task.done || task.loading) return;
    task.loading = true;
    await claimDailyTask({ taskType: task.type })
    canvasConfetti({
      spread: 70,
      origin: { y: 1.2 }
    });
    getInitData()
    const response = await getUser(user.value?.id);
    if (response?.data) {
      userStore.setUser(response.data);
    }
  } finally {
    task.loading = false;
  }
}

onBeforeMount(() => {
  getInitData();
});
</script>

<template>
  <div class="container tasks">
    <div class="tasks-title flex gap-sm items-center mb-md">
      <img src="@/assets/tasks.svg" />
      <span>{{ $t('tasks.dailyTitle') }}</span>
    </div>
    <div class="flex column tasks-content">
      <div class="tasks-today-score-title">
        {{ $t('tasks.todayScoreTitle') }}:
        <div class="flex items-center gap-xs">
          <img src="@/assets/coin.svg" />
          {{ formatNumberWithSpaces(dailyScore) }}
        </div>
      </div>
      <div class="tasks-list">
        <div
          v-for="(task, i) in dailyTasks"
          :key="i"
          class="task"
          :style="{ 'background': `rgba(0, 0, 0, 0.${3 + i})` }"
        >
          <div class="task-header">
            <div class="task-header_info">
              <div class="task-header_title">{{ $t('tasks.goal') }}:</div>
              <div class="flex items-center">
                <img src="@/assets/coin.svg" />
                <span>{{ formatNumberWithSpaces(task.goal) }}</span>
              </div>
            </div>
            <Button
              :disabled="task.done || !task.ready || task.loading"
              :loading="task.loading"
              @click="onClaim(task)"
            >
              <template v-if="task.done">
                {{ $t('tasks.claimed') }}
              </template>
              <template v-else>
                {{ $t('tasks.claim') }}:
                <img src="@/assets/coin.svg" />
                {{ task.reward }}
              </template>
            </Button>
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
    font-size: 24px;
    font-weight: bold;
    color: #222;

    img {
      width: 40px;
      height: 40px;
    }
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
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.2);
    background: linear-gradient(to left, #F2709C, #FF9472);

    img {
      width: 18px;
      height: 18px;
    }
  }
}

.task {
  display: flex;
  flex-direction: column;
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

    :deep(.button) {
      width: auto;
      min-height: auto;
      padding: 6px 12px 4px;
      line-height: normal;
      font-size: 14px;
      
      .button-slot {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .button-loader {
        width: 16px;
        height: 16px;
      }

      img {
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>