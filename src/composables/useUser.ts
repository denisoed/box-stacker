import { computed, ref } from 'vue';
import useUserApi from '@/api/useUserApi';
import { useUserStore } from '@/stores/user';

const useUser = () => {
  const userStore = useUserStore();
  const { getUser } = useUserApi();

  const userLoading = ref(false);

  async function fetchUser(id?: number) {
    const targetId = id ?? userStore.getUser?.id;
    if (!targetId) return;
    try {
      userLoading.value = true;
      const u = await getUser(targetId);
      if (u?.data) {
        userStore.setUser(u.data);
        return u;
      }
    } catch (error) {
      console.error(error);
    } finally {
      userLoading.value = false;
    }
  }

  const user = computed(() => userStore.getUser);

  return {
    user,
    fetchUser,
    userLoading
  };
};

export default useUser;