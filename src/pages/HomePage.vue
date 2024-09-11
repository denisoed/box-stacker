<script setup lang="ts">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '@/stores/user';
  import useUserApi from '@/api/useUserApi';
  import useFormaters from '@/composables/useFormaters';

  import AboutMe from '@/components/AboutMe.vue';
  import Button from '@/components/Button.vue';
  import FarmingProgress from '@/components/Farming/FarmingProgress.vue';

  const userStore = useUserStore();
  const { getUser } = useUserApi();
  const { formatNumberWithSpaces } = useFormaters();

  const user = computed(() => userStore.getUser);
  const userAvatar = computed(() => userStore.getUser?.avatar);
  const balance = computed(() => formatNumberWithSpaces(userStore.getUser?.score || 0));
  const cooldown = computed(() => userStore.getUser?.claimUntil);
  
  async function fetchInitData() {
    const u = await getUser(user.value?.id);
    if (u?.data) {
      userStore.setUser(u.data);
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
        :avatar="userAvatar"
      />
      <FarmingProgress :cooldown="cooldown" class="mt-auto" />
      <Button class="full-width mt-auto" :disabled="!!cooldown">
        <div class="flex items-center gap-xs">
          <span class="mr-xs">Claim</span>
          <img src="@/assets/coin.svg" class="claim-btn_img" />
          <span>500</span>
        </div>
      </Button>
    </div>
  </keep-alive>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 100px;
  }

  .claim-btn_img {
    width: 15px;
  }
</style>