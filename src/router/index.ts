import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import GamePage from '@/pages/GamePage.vue'
import LeadersPage from '@/pages/LeadersPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import BoostsPage from '@/pages/BoostsPage.vue'
import EditAvatarPage from '@/pages/EditAvatarPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/app', component: GamePage },
  { path: '/stats', component: LeadersPage },
  { path: '/tasks', component: TasksPage },
  { path: '/settings', component: SettingsPage },
  { path: '/boosts', component: BoostsPage },
  { path: '/edit-avatar', component: EditAvatarPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router