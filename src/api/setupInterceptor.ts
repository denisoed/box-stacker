import axiosInstance from './index';

axiosInstance.interceptors.request.use(
  (config) => {
    const initData = JSON.stringify((window as any).Telegram.WebApp.initDataUnsafe);
    if (initData) {
      config.headers['init-data'] = initData;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
