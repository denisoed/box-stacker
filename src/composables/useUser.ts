import { computed } from 'vue';
import useUserApi from '@/api/useUserApi';
import { useUserStore } from '@/stores/user';

const useUser = () => {
  const userStore = useUserStore();
  const { getUser } = useUserApi();

  async function fetchUser(id: number = userStore.getUser.id) {
    try {
      const u = await getUser(id);
      if (u?.data) {
        userStore.setUser(u.data);
        return u;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const user = computed(() => userStore.getUser);

  return {
    user,
    fetchUser
  };
};

export default useUser;