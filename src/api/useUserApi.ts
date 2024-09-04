import axios, { generateFutureTimestamp } from '@/api';
import { IUser } from '@/interfaces/user';

const useUserApi = () => {
  async function getUsers(params) {
    return await axios.get('/users', { params });
  }

  async function getUser(userId: number) {
    return await axios.get(`/users/${userId}`);
  }

  async function checkDailyReward() {
    return await axios.get('/user/checkDailyReward');
  }

  async function updateUser(userId: number, body: IUser) {
    return await axios.put(`/users/${userId}`, body);
  }

  async function updateScore(score: number) {
    const timestamp = generateFutureTimestamp({
      years: 10,
      days: 8,
      hours: 18
    });
    return await axios.post('/user/updateScore', { score, timestamp });
  }

  async function collectDailyReward() {
    return await axios.post('/user/collectDailyReward');
  }

  return {
    getUsers,
    getUser,
    updateScore,
    updateUser,
    checkDailyReward,
    collectDailyReward
  };
};

export default useUserApi;
