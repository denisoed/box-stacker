<template>
  <div v-if="tabs?.length" class="tab-slider--tabs block-bg">
    <div
      v-for="(t, i) of tabs"
      :key="i"
      class="tab-slider--trigger"
      :class="{ 'active': i === selected, 'disabled': t?.disabled}"
      :style="{
        width: `${100 / tabs.length}%`,
      }"
      @click="onClick(i, t.value)"
      v-vibrate
    >
      {{ t.label }}
    </div>
    <div
      class="tab-bg"
      :style="{
        width: `${100 / tabs.length}%`,
        left: `${(100 / tabs.length) * selected}%`
      }"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'SwitchTabs',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    selectedTab: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }) {
    const selected = ref(props.selectedTab)

    function onClick(index, value) {
      selected.value = index
      emit('on-change', value)
    }

    return {
      selected,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
.tab-slider--tabs {
  width: auto;
  display: flex;
  flex-wrap: nowrap;
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	user-select: none;
  background: rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 476px) {
    width: 100%;
  }
}

.tab-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: all 250ms ease-in-out;
  border-radius: 8px;
  background: linear-gradient(to left, #F2709C, #FF9472);
}

.tab-slider--trigger {
  min-width: 80px;
	position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	text-align: center;
	padding: 11px 20px;
	z-index: 2;
	cursor: pointer;
	transition: color 250ms ease-in-out;
	user-select: none;

	&.active {
		color: #fff;
	}

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    user-select: none;
  }
}
</style>
