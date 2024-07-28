import axiosInstance from './index';
import * as Sentry from '@sentry/vue';

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const initData = (window as any).Telegram.WebApp.initDataUnsafe;
      if (initData) {
        config.headers['init-data'] = JSON.stringify(initData);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
    return config;
  },
  (error) => {
    Sentry.captureException(error);
    Promise.reject(error);
  }
);
