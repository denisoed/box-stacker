<script setup lang="ts">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '@/stores/user';
  import useUserApi from '@/api/useUserApi';

  import AboutMe from '@/components/AboutMe.vue';
  import LeaderBoard from '@/components/LeaderBoard.vue';

  const userStore = useUserStore();
  const { getUsers } = useUserApi();

  const user = computed(() => userStore.getUser);
  const users = computed(() => userStore.getUsers);
  
  async function fetchInitData() {
    const response = await getUsers();
    if (response?.success) {
      userStore.setUsers(response?.data);
    }
  }

  onBeforeMount(() => {
    fetchInitData();
  });
</script>

<template>
  <div class="container">
    <AboutMe
      :userpic="user?.userPic"
      :first-name="user?.firstName"
      :last-name="user?.lastName"
      :score="user?.score || 0"
    />
    <LeaderBoard :users="users" />
  </div>
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