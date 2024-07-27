<template>
  <div class="leaderboard">
    <h1>
      <img src="@/assets/cup.svg" />
      <span>Top 10 players</span>
    </h1>
    <ul :class="{ 'leaderboard--award': users.length > 3 }">
      <li v-for="(user, index) in users" :key="index">
        <mark>{{ getName(user) }}</mark>
        <template v-if="users.length > 3">
          <img v-if="index === 0" src="@/assets/medal-gold.svg" />
          <img v-if="index === 1" src="@/assets/medal-silver.svg" />
          <img v-if="index === 2" src="@/assets/medal-bronze.svg" />
        </template>
        <small>{{ user.score }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    default: () => []
  }
})

function getName(user) {
  if (!user?.firstName && !user?.lastName) return user?.userName || '';
  return `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
}
</script>

<style scoped lang="scss">
  .leaderboard {
    position: relative;
    width: 100%;
    background: linear-gradient(to bottom, #3a404d, #181c26);
    border-radius: 10px;
    box-shadow: 0 7px 30px rgba(62, 9, 11, .3);

    h1 {
      font-size: 16px;
      color: #e1e1e1;
      padding: 18px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & img {
        width: 25px;
        height: 26px;
        margin-right: 6px;
        vertical-align: baseline;
      }
    }

    ul {
      counter-reset: leaderboard;
      padding: 0;
      margin: 0;

      li {
        position: relative;
        z-index: 1;
        font-size: 14px;
        counter-increment: leaderboard;
        padding: 18px;
        cursor: pointer;
        backface-visibility: hidden;
        transform: translateZ(0) scale(1.0, 1.0);
        list-style: none;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        img {
          width: 30px;
          z-index: 2;
          margin-right: 6px;
        }

        &::before {
          content: counter(leaderboard);
          z-index: 2;
          min-width: 20px;
          height: 20px;
          margin-right: 8px;
          line-height: 20px;
          color: #c24448;
          background: #fff;
          border-radius: 20px;
          text-align: center;
        }

        mark {
          z-index: 2;
          width: 100%;
          height: 100%;
          margin: 0;
          background: none;
          color: #fff;

          &::before,
          &::after {
            content: '';
            position: absolute;
            z-index: 1;
            bottom: -11px;
            left: -9px;
            border-top: 10px solid #c24448;
            border-left: 10px solid transparent;
            transition: all .1s ease-in-out;
            opacity: 0;
          }

          &::after {
            left: auto;
            right: -9px;
            border-left: none;
            border-right: 10px solid transparent;
          }
        }

        small {
          position: relative;
          z-index: 2;
          display: block;
          text-align: right;
          font-size: 14px;
          font-weight: bold;
        }

        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fa6855;
          box-shadow: 0 3px 0 rgba(0, 0, 0, .08);
          // transform: scaleX(1.06) scaleY(1.03);
          transition: all .3s ease-in-out;
          opacity: 0;
        }
      }
    }

    &--award {
      li {
        &:nth-child(1) {
          background: #fa6855;
          z-index: 2;
          overflow: visible;
          min-height: 66px;

          &::after {
            opacity: 1;
            transform: scaleX(1.06) scaleY(1.03);
            background: #fa6855;
          }

          & mark {

            &::before,
            &::after {
              opacity: 1;
              transition: all .35s ease-in-out;
            }
          }
        }

        &:nth-child(2) {
          background: #e0574f;
          min-height: 66px;

          &::after {
            background: #e0574f;
            box-shadow: 0 2px 0 rgba(0, 0, 0, .08);
          }

          & mark {

            &::before,
            &::after {
              border-top: 6px solid #ba4741;
              bottom: -7px;
            }
          }
        }

        &:nth-child(3) {
          background: #d7514d;
          min-height: 66px;

          &::after {
            background: #d7514d;
            box-shadow: 0 1px 0 rgba(0, 0, 0, .11);
          }

          & mark {

            &::before,
            &::after {
              border-top: 2px solid #b0433f;
              bottom: -3px;
            }
          }
        }
      }
    }
  }
</style>