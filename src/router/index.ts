import { createWebHistory, createRouter } from 'vue-router'

import GamePage from '@/pages/GamePage.vue'
import LeadersPage from '@/pages/LeadersPage.vue'

const routes = [
  { path: '/', component: GamePage },
  { path: '/leaders', component: LeadersPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router