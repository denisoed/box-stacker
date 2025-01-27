<template>
	<SwipeToClose @on-close="onClose">
		<div class="booster-details-dialog flex column gap-sm">
			<div class="booster-details-dialog_close">
				<img src="@/assets/close.svg" @click="onClose" />
			</div>
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
					<img v-if="booster?.stars > 0" src="@/assets/tg-star.svg" />
          <img v-else src="@/assets/coin.svg" />
          <span v-if="booster?.stars > 0">{{ booster.stars }}</span>
          <span v-else>{{ formatNumberWithSpaces(booster.price) }}</span>
				</div>
			</div>
			<div
				class="booster-details-dialog_description"
				v-html="$t('boosters.dialogDescr', { reward: booster.reward, rounds: booster.rounds })"
			/>
			<!-- Balance -->
			<div v-if="!booster?.stars" class="booster-details-dialog_balance flex items-center justify-between">
				<span>{{ $t('boosters.yourBalance') }}:</span>
				<div class="flex items-center">
					<img src="@/assets/coin.svg" />
					{{ balance }}
				</div>
			</div>
			<Button
				v-if="booster?.stars > 0"
				:disabled="activated"
				@click="onBuyBoosterUseStars(booster?.type, booster?.invoiceLink)"
				class="mt-sm"
			>
				{{
					activated ?
						$t(roundsLeftKey, {
							roundsLeft: booster.roundsLeft
						}) :
							$t('boosters.buy')
				}}
			</Button>
			<Button
				v-else
				:disabled="notEnoughBalance || activated"
				@click="onBuyBooster(booster.type)"
				class="mt-sm"
			>
				{{
					activated ?
						$t(roundsLeftKey, {
							roundsLeft: booster.roundsLeft
						}) :
							notEnoughBalance ?
								$t('boosters.notEnoughBalance') :
									$t('boosters.buy')
				}}
			</Button>
		</div>
	</SwipeToClose>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { IBooster } from '@/interfaces/boosters';
import useFormaters from '@/composables/useFormaters';
import Button from '@/components/Button.vue';
import { useUserStore } from '@/stores/user';
import SwipeToClose from '@/components/SwipeToClose.vue';

const emit = defineEmits(['close', 'buy', 'on-buy-stars']);
const props = defineProps({
	booster: {
		type: Object as PropType<IBooster>,
		required: true,
	}
})

const { formatNumberWithSpaces } = useFormaters();
const userStore = useUserStore();

const user = computed(() => userStore.getUser);
const notEnoughBalance = computed(() => +(user.value?.score || 0) < +(props.booster.price || 0));
const activated = computed(() => !!props.booster.roundsLeft);
const roundsLeftKey = computed(() => {
	if (+props.booster.roundsLeft === 1) return 'boosters.roundsLeft1';
  if (+props.booster.roundsLeft > 1 && +props.booster.roundsLeft <= 4) return 'boosters.roundsLeft2_3_4';
  return 'boosters.roundsLeft5+';
});
const balance = computed(() => formatNumberWithSpaces(user.value?.score || 0));

function onBuyBooster(type) {
	emit('buy', type);
}

function onBuyBoosterUseStars(type, invoiceLink) {
	emit('on-buy-stars', { type, invoiceLink });
}

function onClose() {
	emit('close');
}
</script>

<style scoped lang="scss">
.booster-details-dialog {
	position: relative;
	width: inherit;
	padding: 30px 20px;
	box-sizing: border-box;
	text-align: center;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	background: linear-gradient(to left, #F2709C, #FF9472);

	&_balance {
		font-size: 14px;
		color: #fff;
		font-weight: bold;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		padding: 4px 15px;
		line-height: normal;

		img {
			width: 20px;
			height: 20px;
			margin-right: 4px;
		}
	}

	&_close {
		width: 40px;
		height: 40px;
		padding: 5px;
		border-radius: 8px;
		position: absolute;
		top: -20px;
		right: 10px;
		background: linear-gradient(to left, #F2709C, #FF9472);
	}

	&_description {
		font-size: 14px;
		color: #fff;
		font-weight: lighter;
		text-align: left;
		background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
		padding: 10px 15px 8px;
		line-height: normal;

		:deep(span) {
			font-size: 20px;
		}
	}

	&_item {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
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
