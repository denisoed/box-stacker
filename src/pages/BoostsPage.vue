<template>
  <div class="container boosters">
    <div class="boosters-title flex gap-sm items-center">
      <img src="@/assets/boost.svg" />
      <span>{{ $t('boosters.title') }}</span>
    </div>
    <div class="boosters-list mt-md">
      <div
        v-for="(booster, i) of boosters"
        :key="i"
        class="boosters-item"
        :class="{ 'boosters-item--x10': booster.reward === '10' }"
        @click="onClickByBooster"
      >
        <div class="boosters-item_title">
          X<span>{{ booster.reward }}</span>
        </div>
        <div class="flex column">
          <div v-if="booster.reward === '10'" class="boosters-item_subdescription">
            {{ $t('boosters.profitable') }}
          </div>
          <div class="boosters-item_description">
            {{ booster.rounds }}
            {{ $t('boosters.rounds') }}
          </div>
        </div>
        <div class="boosters-item_price mt-sm">
          <img src="@/assets/coin.svg" />
          <span>{{ formatNumberWithSpaces(booster.price) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import useBoostersApi from '@/api/useBoostersApi';
import { useBoostersStore } from '@/stores/boosters';
import useFormaters from '@/composables/useFormaters';
import { openModal } from "jenesius-vue-modal";
import BoosterDetailsDialog from '@/components/Dialogs/BoosterDetailsDialog.vue';

const { fetchBoosters, buyBooster } = useBoostersApi();
const boostersStore = useBoostersStore();
const { formatNumberWithSpaces } = useFormaters();

const boosters = computed(() => boostersStore.boosters);

async function getInitData() {
  const response = await fetchBoosters({ _sort: 'reward:asc' });
  if (response?.data) {
    boostersStore.setBoosters(response.data);
  }
}

function onBuyBooster(type) {
  buyBooster({
    boosterType: type,
  })
}

function onClickByBooster() {
  openModal(BoosterDetailsDialog)
}

onBeforeMount(() => {
  getInitData();
});
</script>

<style lang="scss" scoped>
.boosters {
  &-title {
    font-size: 24px;
    font-weight: bold;
    color: #222;

    img {
      width: 40px;
      height: 40px;
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &-item {
    width: calc(50% - 6px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 16px;

    &_title {
      font-size: 50px;
      color: #fff;
      font-weight: bold;
      line-height: normal;
      font-family: 'TrickyJimmy', sans-serif;

      @media screen and (max-width: 360px) {
        font-size: 30px;
      }
      
      span {
        font-size: 60px;

        @media screen and (max-width: 360px) {
          font-size: 40px;
        }
      }
    }

    &_subdescription {
      font-size: 14px;
      color: #fff;
      font-weight: lighter;

      @media screen and (max-width: 360px) {
        font-size: 12px;
      }
    }

    &_description {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.8);
      font-weight: lighter;
      line-height: normal;

      @media screen and (max-width: 360px) {
        font-size: 16px;
      }
    }

    &_price {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 18px;
      color: #fff;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 4px 8px 3px;
      font-weight: lighter;
      line-height: normal;

      img {
        width: 18px;
        height: 18px;
      }

      span {
        line-height: normal;
      }
    }

    &--x10 {
      width: 100%;
      aspect-ratio: auto;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      margin-top: auto;
      background: linear-gradient(to left, #F2709C, #FF9472);

      .boosters-item_price {
        margin-top: 0;
      }
    }
  }
}
</style>