<template>
	<SwipeToClose @on-close="onClose">
		<div class="user-details-dialog flex column gap-sm">
			<div class="user-details-dialog_close">
				<img src="@/assets/close.svg" @click="onClose" />
			</div>
			<div class="user-details-dialog_content flex column items-center">
				<Avatar
					v-if="user?.avatar"
					readonly
					class="about-me_avatar-svg"
					:top-type="user.avatar?.top"
					:accessories-type="user.avatar?.accessories"
					:facial-hair-type="user.avatar?.facialHair"
					:clothe-type="user.avatar?.clothes"
					:eye-type="user.avatar?.eyes"
					:eyebrow-type="user.avatar?.eyebrows"
					:mouth-type="user.avatar?.mouth"
					:graphic-type="user.avatar?.graphic"
					:top-color="user.avatar?.topColor"
					:clothe-color="user.avatar?.clotheColor"
					:skin-color="user.avatar?.skinColor"
					:hair-color="user.avatar?.hairColor"
					:facial-hair-color="user.avatar?.facialHairColor"
					:circle-color="user.avatar?.circleColor"
				/>
				<div class="user-details-dialog_content_name">
					{{ user?.fullname || '' }}
				</div>
				<div class="user-details-dialog_content_score flex items-center mt-sm">
					<img src="@/assets/balance.svg" />
					<span>{{ formatNumberWithSpaces(user?.score || 0) }}</span>
				</div>
			</div>
		</div>
	</SwipeToClose>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import useFormaters from '@/composables/useFormaters';
import { IUser } from '@/interfaces/user';

import Avatar from '@/components/AvatarMaker/index.vue';
import SwipeToClose from '@/components/SwipeToClose.vue';

const { formatNumberWithSpaces } = useFormaters();

const emit = defineEmits(['close', 'buy', 'on-buy-stars']);
defineProps({
	user: {
		type: Object as PropType<IUser>,
		required: true,
	}
})

function onClose() {
	emit('close');
}
</script>

<style scoped lang="scss">
.user-details-dialog {
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
		&_score {
			font-size: 18px;
			color: #fff;
			font-weight: bold;
			background: rgba(0, 0, 0, 0.2);
			border-radius: 8px;
			padding: 4px 8px;
			line-height: normal;
	
			img {
				width: 20px;
				height: 20px;
				margin-right: 4px;
			}
		}
	}
}
</style>
