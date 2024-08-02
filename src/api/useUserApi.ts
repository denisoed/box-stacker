import axios from '@/api';
import { IUser } from '@/interfaces/user';

const useUserApi = () => {
  async function getUsers(params) {
    return await axios.get('/users', { params });
  }

  async function getUser(userId: number) {
    return await axios.get(`/users/${userId}`);
  }

  async function updateUser(userId: number, body: IUser) {
    return await axios.put(`/users/${userId}`, body);
  }

  async function updateScore(score: number) {
    return await axios.post('/user/updateScore', { score });
  }

  return {
    getUsers,
    getUser,
    updateScore,
    updateUser
  };
};

export default useUserApi;
