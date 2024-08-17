<template>
	<div class="booster-details-dialog flex column gap-md">
		<div
			class="booster-details-dialog_item"
		>
			<div class="booster-details-dialog_item_title">
				X<span>{{ booster.reward }}</span>
			</div>
			<div class="flex column">
				<div v-if="booster.reward === '10'" class="booster-details-dialog_item_subdescription">
					{{ $t('boosters.profitable') }}
				</div>
				<div class="booster-details-dialog_item_description">
					{{ booster.rounds }}
					{{ $t('boosters.rounds') }}
				</div>
			</div>
			<div class="booster-details-dialog_item_price">
				<img src="@/assets/coin.svg" />
				<span>{{ formatNumberWithSpaces(booster.price) }}</span>
			</div>
		</div>
		<Button @click="onBuyBooster(booster.type)">Buy this booster</Button>
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import useBoostersApi from '@/api/useBoostersApi';
import { IBooster } from '@/interfaces/boosters';
import useFormaters from '@/composables/useFormaters';
import Button from '@/components/Button.vue';

const emit = defineEmits(['close']);
defineProps({
	booster: {
		type: Object as PropType<IBooster>,
		required: true,
	}
})

const { buyBooster } = useBoostersApi();
const { formatNumberWithSpaces } = useFormaters();

async function onBuyBooster(type) {
	try {
		await buyBooster({
			boosterType: type,
		})
		emit('close');
	} catch (error) {
		console.log(error);
	}
}
</script>

<style scoped lang="scss">
.booster-details-dialog {
	width: inherit;
	padding: 20px;
	box-sizing: border-box;
	text-align: center;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	background: linear-gradient(to left, #F2709C, #FF9472);

	&_item {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 10px 15px;
		margin-top: auto;

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
  }
}
</style>
