import axios from '@/api';

const useTelegramApi = () => {
  function authTelegram(initData: string) {
    return axios.post('/api/auth/telegram', { initData });
  }

  return {
    authTelegram
  };
};

export default useTelegramApi;
