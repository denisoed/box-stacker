import { defineStore } from 'pinia';
import { IBooster } from '@/interfaces/boosters';

interface IBoostersState {
  boosters: IBooster[] | []
}

export const useBoostersStore = defineStore('boosters', {
  state: (): IBoostersState => ({
    boosters: [],
  }),
  getters: {
    getBoosters: (state) => state.boosters
  },
  actions: {
    setBoosters(boosters) {
      this.boosters = boosters
    }
  },
})