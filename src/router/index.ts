import { createMemoryHistory, createRouter } from 'vue-router'

import GamePage from '@/pages/GamePage.vue'
import LeadersPage from '@/pages/LeadersPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import TasksPage from '@/pages/TasksPage.vue'

const routes = [
  { path: '/', component: GamePage },
  { path: '/stats', component: LeadersPage },
  { path: '/tasks', component: TasksPage },
  { path: '/settings', component: SettingsPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router