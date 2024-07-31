import axios from '@/api';

interface IUserPayload {
  telegramId: number;
  firstName: string;
  lastName: string;
  userName: string;
}

const useUserApi = () => {
  async function getUsers() {
    return await axios.get('/users');
  }

  return {
    getUsers,
  };
};

export default useUserApi;
