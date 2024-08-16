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
      >
        <div class="boosters-item_title">
          X<span>{{ booster.x }}</span>
        </div>
        <div class="boosters-item_description">{{ booster.description }}</div>
        <div class="boosters-item_price mt-sm">
          <img src="@/assets/coin.svg" />
          <span>{{ booster.price }}</span>
        </div>
      </div>

      <!-- X10 -->
      <div class="boosters-item boosters-item--x10">
        <div class="boosters-item_title">
          X<span>10</span>
        </div>
        <div class="flex column">
          <div class="boosters-item_subdescription">Most profitable</div>
          <div class="boosters-item_description">40 rounds</div>
        </div>
        <div class="boosters-item_price mt-sm">
          <img src="@/assets/coin.svg" />
          <span>5 000</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const boosters = [
  {
    x: 2,
    title: 'X2',
    description: '5 rounds',
    price: '250'
  },
  {
    x: 3,
    title: 'X3',
    description: '10 rounds',
    price: '500'
  },
  {
    x: 4,
    title: 'X4',
    description: '15 rounds',
    price: '750'
  },
  {
    x: 5,
    title: 'X5',
    description: '20 rounds',
    price: '1 000'
  },
]
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