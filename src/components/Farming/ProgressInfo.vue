<template>
  <div class="progress-info flex column items-center gap-lg full-width">
    <div
      class="flex column gap-sm full-width items-center"
    >
      <div class="progress-info_progress-info flex justify-center items-center">
        <span
          >{{
            running
              ? `${timeString ? `${$t('farming.timeLeft', { time: timeString })}` : $t('common.loading')}`
              : $t('common.finished')
          }}
        </span>
      </div>
      <ProgressBar :progress="progress" :loading="loading" />
    </div>
    <div
      class="progress-info_farmed flex items-center gap-xs mt-sm"
    >
      <span class="mr-xs">{{ running ? $t('common.farming') : $t('common.farmed') }}</span>
      <img src="@/assets/coin.svg" class="progress-info_farmed-img" />
      <span v-if="farmingValue">{{ farmingValue }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProgressBar from '@/components/ProgressBar.vue';

export default defineComponent({
  name: 'ProgressInfo',
  components: {
    ProgressBar,
  },
  props: {
    progress: {
      type: Number,
      required: false,
    },
    farmingValue: {
      type: String,
      required: false,
    },
    timeString: {
      type: String,
      required: false,
    },
    running: {
      type: Boolean,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
});
</script>

<style lang="scss" scoped>
.progress-info {
  &_start {
    &-title {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      text-align: center;
    }

    &-descr {
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      text-align: center;
    }
  }

  &_progress-info {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 2px 8px;
    font-size: 16px;
    line-height: normal;
  }

  &_farmed {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 4px 8px;
    font-size: 18px;
    line-height: normal;

    img {
      width: 16px;
    }
  }
}
</style>
