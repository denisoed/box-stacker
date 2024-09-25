<template>
	<SwipeToClose @on-close="onClose">
		<div class="daily-reward-dialog flex column gap-sm">
			<div class="daily-reward-dialog_close">
				<img src="@/assets/close.svg" @click="onClose" />
			</div>
			<div class="daily-reward-dialog_content flex column items-center">
				<div class="daily-reward-dialog_content-reward flex items-center">
					<img src="@/assets/coin.svg" />
					<span>{{ reward }}</span>
				</div>
				<div class="daily-reward-dialog_content-title mt-sm">
					{{ $t('dailyReward.title') }}
				</div>
				<p>
					{{ $t('dailyReward.descr') }}
				</p>
				<Button
					class="mt-lg"
					@click="onCollect"
					:loading="loading"
				>
					<div class="flex items-center gap-xs">
						<span>{{ $t('dailyReward.collect') }}</span>
						<img src="@/assets/coin.svg" class="daily-reward-dialog_btn-coin" />
						<span>{{ reward }}</span>
					</div>
				</Button>
			</div>
		</div>
	</SwipeToClose>
</template>

<script lang="ts" setup>
import SwipeToClose from '@/components/SwipeToClose.vue';
import Button from '@/components/Button.vue';
import { ref } from 'vue';

const emit = defineEmits(['close', 'on-collect']);
defineProps({
	reward: {
		type: Number,
		required: true,
	}
})

const loading = ref(false);

function onCollect() {
	loading.value = true;
	emit('on-collect');
}

function onClose() {
	emit('close');
}
</script>

<style scoped lang="scss">
.daily-reward-dialog {
	position: relative;
	width: 100%;
	padding: 30px 20px;
	box-sizing: border-box;
	text-align: center;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	background: linear-gradient(to left, #F2709C, #FF9472);

	.avatar-maker {
		width: 100px;
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

	&_content {
		&-reward {
			font-size: 28px;
			color: #fff;
			font-weight: bold;
			background: rgba(0, 0, 0, 0.2);
			border-radius: 8px;
			padding: 4px 8px;
			line-height: normal;

			img {
				width: 28px;
				height: 28px;
				margin-right: 4px;
			}
		}

		&-title {
			font-size: 24px;
		}

		p {
			margin: 0;
			font-size: 14px;
			max-width: 250px;
			opacity: 0.8;
		}

		.button {
			width: 100%;
			line-height: normal;
		}
	}

	&_btn-coin {
		width: 15px;
		height: 15px;
	}
}
</style>
