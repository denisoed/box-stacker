import { createMemoryHistory, createRouter } from 'vue-router'

import GamePage from '@/pages/GamePage.vue'

const routes = [
  { path: '/', component: GamePage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router