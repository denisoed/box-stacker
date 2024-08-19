import axios from '@/api';

const useBoostersApi = () => {
  async function fetchBoosters(params) {
    return await axios.get('/boosters', { params });
  }

  async function fetchBooster(id: number, params) {
    return await axios.get(`/boosters/${id}`, { params });
  }

  async function buyBooster(body) {
    return await axios.post('/boosters/buy', body);
  }

  return {
    fetchBoosters,
    fetchBooster,
    buyBooster,
  };
};

export default useBoostersApi;
