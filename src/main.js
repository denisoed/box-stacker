import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import i18n from '@/i18n'
import { createPinia } from 'pinia'
import initBoots from '@/boots';

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

initBoots({ app });

app.mount('#app')
