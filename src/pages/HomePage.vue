<script setup lang="ts">
  import { computed, ref } from 'vue';
  import useUserApi from '@/api/useUserApi';
  import useFormaters from '@/composables/useFormaters';
  import useUser from '@/composables/useUser';
  import canvasConfetti from 'canvas-confetti';

  import AboutMe from '@/components/AboutMe.vue';
  import Button from '@/components/Button.vue';
  import FarmingProgress from '@/components/Farming/FarmingProgress.vue';
  import Spinner from '@/components/Spinner.vue';

  const { claim, checkClaim } = useUserApi();
  const { formatNumberWithSpaces } = useFormaters();
  const { fetchUser, user } = useUser();

  const loading = ref(false);

  const userAvatar = computed(() => user.value?.avatar);
  const balance = computed(() => formatNumberWithSpaces(user.value?.score || 0));
  const cooldown = computed(() => user.value?.claimUntil);

  async function runClaim() {
    try {
      loading.value = true;
      await claim();
      await fetchUser();
      canvasConfetti({
        spread: 70,
        origin: { y: 1.2 }
      });
    } finally {
      loading.value = false;
    }
  }

  async function onEndClaim() {
    await checkClaim();
    await fetchUser();
  }
</script>

<template>
  <div class="container">
    <AboutMe
      :first-name="user?.firstname"
      :last-name="user?.lastname"
      :score="balance"
      :avatar="userAvatar"
    />
    <FarmingProgress
      v-if="user"
      :cooldown="cooldown" class="mt-auto"
      @on-end="onEndClaim"
      :loading="loading"
    />
    <Spinner v-else class="mt-auto" />
    <Button
      @click="runClaim"
      :loading="loading"
      class="full-width mt-auto"
      :disabled="!!cooldown || loading"
    >
      <div class="flex items-center gap-xs">
        <span class="mr-xs">{{ $t('common.collect') }}</span>
        <img src="@/assets/coin.svg" class="claim-btn_img" />
        <span>500</span>
      </div>
    </Button>
  </div>
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