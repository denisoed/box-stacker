<template>
  <div class="avatar-options_scroller mt-sm">
    <div class="avatar-options_list flex">
      <div
        v-for="(option, i) of Object.keys(selectedOption)"
        :key="`option-${i}`"
        class="avatar-options_list-item"
      >
        <svg
          viewBox='0 0 264 280'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          :style="cssVars"
          v-html="selectedOption[option]"
        ></svg>
      </div>
    </div>
  </div>
  <div class="avatar-options_scroller mt-sm">
    <div class="avatar-options_list flex">
      <div
        v-for="(option, i) of Object.keys(selectedOption)"
        :key="`option-${i}`"
        class="avatar-options_list-item"
      >
        <svg
          viewBox='0 0 264 280'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          :style="cssVars"
          v-html="selectedOption[option]"
        ></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { clothesType } from '@/components/AvatarMaker/AssetsTypes/clothes'

const selectedOption = ref(clothesType);
</script>

<style lang="scss" scoped>
.avatar-options {
  &_list {
    gap: 8px;

    &-item {
      width: 60px;
      min-width: 60px;
      height: 60px;
      border-radius: 8px;
      position: relative;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid #fff;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;

      &-title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #222;
        font-size: 10px;
        background: #fff;
        text-align: center;
        line-height: normal;
      }

      svg {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &_scroller {
    width: 100%;
    height: 65px;
    overflow: auto;
  }
}
</style>