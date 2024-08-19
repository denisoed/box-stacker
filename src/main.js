import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import i18n from '@/i18n'
import initBoots from '@/boots';
import { createPinia } from 'pinia'
import Vue3TouchEvents from 'vue3-touch-events';

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(Vue3TouchEvents)

initBoots({ app });

app.mount('#app')
