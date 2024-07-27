import axiosInstance from './index';

axiosInstance.interceptors.request.use(
  (config) => {
    const aaa = '{"query_id":"AAEGKqcZAAAAAAYqpxkZ0pKX","user":{"id":430385670,"first_name":"Denis","last_name":"Grushkin","username":"denisoed","language_code":"en","allows_write_to_pm":true},"auth_date":"1722070333","hash":"593343ad3f60527db4eb9856e8449f10a8fb284722e9d31a9e659ec532144fde"}';
    const initData = aaa || JSON.stringify((window as any).Telegram.WebApp.initDataUnsafe);
    if (initData) {
      config.headers['init-data'] = initData;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
