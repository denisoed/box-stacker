import axios from '@/api';

interface IUserPayload {
  telegramId: number;
  firstName: string;
  lastName: string;
  userName: string;
}

const useUserApi = () => {
  async function getUser(telegramId: number) {
    const response = await axios.get(`/users/${telegramId || 0}`);
    return response?.data;
  }

  async function getUsers(limit = 10) {
    const response = await axios.get('/users', { params: { limit, sort: 'score:desc' }});
    return response?.data;
  }

  async function createUser(user: IUserPayload) {
    const response = await axios.post('/users', user);
    return response?.data;
  }

  return {
    getUser,
    getUsers,
    createUser
  };
};

export default useUserApi;
