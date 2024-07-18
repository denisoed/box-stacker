import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'

if (window?.Telegram?.WebApp) {
  window.Telegram.WebApp.expand()
  window.Telegram.WebApp.setBackgroundColor('#ffffff')
  window.Telegram.WebApp.setHeaderColor('#ffffff')
  window.Telegram.WebApp.ready()
}

createApp(App).use(router).mount('#app')
