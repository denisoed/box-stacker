<script setup lang="ts">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '@/stores/user';
  import useUserApi from '@/api/useUserApi';
  import useFormaters from '@/composables/useFormaters';

  import AboutMe from '@/components/AboutMe.vue';
  import LeaderBoard from '@/components/LeaderBoard.vue';

  const userStore = useUserStore();
  const { getUsers, getUser } = useUserApi();
  const { formatNumberWithSpaces } = useFormaters();

  const user = computed(() => userStore.getUser);
  const balance = computed(() => formatNumberWithSpaces(userStore.getUser?.score || 0));
  const users = computed(() => userStore.getUsers);
  
  async function fetchInitData() {
    const u = await getUser(user.value?.id);
    if (u?.data) {
      userStore.setUser(u.data);
    }
    const response = await getUsers({ _limit: 10, _sort: 'score:desc' });
    if (response?.data) {
      userStore.setUsers(response.data);
    }
  }

  onBeforeMount(() => {
    fetchInitData();
  });
</script>

<template>
  <keep-alive>
    <div class="container">
      <AboutMe
        :first-name="user?.firstname"
        :last-name="user?.lastname"
        :score="balance"
      />
      <LeaderBoard :users="users" />
    </div>
  </keep-alive>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 100px;
  }
</style>