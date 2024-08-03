import axios from '@/api';

const useDailyTasksApi = () => {
  async function getDailyTasks(params) {
    return await axios.get('/daily-tasks', { params });
  }

  async function claimDailyTask(body) {
    return await axios.post('/daily-tasks/claim', body);
  }

  return {
    getDailyTasks,
    claimDailyTask,
  };
};

export default useDailyTasksApi;
