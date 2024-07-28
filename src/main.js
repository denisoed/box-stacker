import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import * as Sentry from "@sentry/vue";

const app = createApp(App)

const pinia = createPinia()

Sentry.init({
  app,
  enabled: process.env.NODE_ENV === "production",
  dsn: "https://2f311b36e8c0553885d0d4aece4154cd@o511273.ingest.us.sentry.io/4507677295181824",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

import '@/api/setupInterceptor' // Setup axios interceptor

app.use(pinia)
app.use(router)
app.mount('#app')
