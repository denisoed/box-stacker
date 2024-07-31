import axios from '@/api';

const useTelegramApi = () => {
  async function telegramAuth(initDataUnsafe: string) {
    const response = await axios.post('/auth/telegram', { initDataUnsafe });
    return response?.data;
  }

  return {
    telegramAuth
  };
};

export default useTelegramApi;
