import axios from '@/api';

const useUserApi = () => {
  async function getUsers() {
    return await axios.get('/users');
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
