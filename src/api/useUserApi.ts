import axios from '@/api';

const useUserApi = () => {
  async function getUsers(params) {
    return await axios.get('/users', { params });
  }

  async function getUser(id: number) {
    return await axios.get(`/users/${id}`);
  }

  async function updateScore(score: number) {
    return await axios.post('/user/updateScore', { score });
  }

  return {
    getUsers,
    getUser,
    updateScore
  };
};

export default useUserApi;
