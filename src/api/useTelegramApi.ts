import axios from '@/api';

const useTelegramApi = () => {
  async function authTelegram(initData: string) {
    const response = await axios.post('/api/auth/telegram', { initData });
    return response?.data;
  }

  return {
    authTelegram
  };
};

export default useTelegramApi;
