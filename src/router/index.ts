import { createMemoryHistory, createRouter } from 'vue-router'

import GamePage from '@/pages/GamePage.vue'
import LeadersPage from '@/pages/LeadersPage.vue'

const routes = [
  { path: '/', component: GamePage },
  { path: '/stats', component: LeadersPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router