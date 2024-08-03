import { defineStore } from 'pinia';
import { IDailyTask } from '@/interfaces/dailyTasks';

interface IDailyTasksState {
  dailyTasks: IDailyTask[] | []
}

export const useDailyTasksStore = defineStore('dailyTasks', {
  state: (): IDailyTasksState => ({
    dailyTasks: [],
  }),
  getters: {
    getDailyTasks: (state) => state.dailyTasks
  },
  actions: {
    setDailyTasks(dailyTasks) {
      this.dailyTasks = dailyTasks
    }
  },
})