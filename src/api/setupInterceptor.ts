import axiosInstance from './index';

axiosInstance.interceptors.request.use(
  (config) => {
    const initData = (window as any).Telegram.WebApp.initDataUnsafe;
    if (initData) {
      config.headers['init-data'] = JSON.stringify(initData);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
