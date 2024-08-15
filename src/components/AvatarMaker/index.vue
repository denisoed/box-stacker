<template>
  <div class="avatar-maker flex column">
    <div class="avatar-maker_content">
      <svg viewBox='0 0 264 280' version='1.1' xmlns='http://www.w3.org/2000/svg'
        xmlns:xlink='http://www.w3.org/1999/xlink'>
        <defs>
          <circle id='path-1' cx='120' cy='120' r='120'></circle>
          <path
            d='M12,160 C12,226.27417 65.72583,280 132,280 C198.27417,280 252,226.27417 252,160 L264,160 L264,-1.42108547e-14 L-3.19744231e-14,-1.42108547e-14 L-3.19744231e-14,160 L12,160 Z'
            id='path-2'></path>
          <path
            d='M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z'
            id='path-silhouette'></path>
        </defs>
        <g id='Avataaar' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
          <g transform='translate(-825.000000, -1100.000000)' id='Avataaar/Circle'>
            <g transform='translate(825.000000, 1100.000000)'>
              <template v-if="isCircle">
                <g id='Circle' stroke-width='1' fill-rule='evenodd' transform='translate(12.000000, 40.000000)'>
                  <mask id='mask-1' fill='white'>
                    <use xlink:href='#path-1' />
                  </mask>
                  <use id='Circle-Background' fill='#E6E6E6' xlink:href='#path-1' />
                  <g id='Color/Palette/Blue-01' mask='url(#mask-1)' :fill=circleColor>
                    <rect id='🖍Color' x='0' y='0' width='240' height='240' />
                  </g>
                </g>
                <mask id='mask-2' fill='white'>
                  <use xlink:href='#path-2' />
                </mask>
              </template>
              <g id='Mask' />
              <g id='Avataaar' stroke-width='1' fill-rule='evenodd' fill='black' mask='url(#mask-2)'>
                <g id='Body' transform='translate(32.000000, 36.000000)'>
                  <mask id='mask-silhouette' fill='white'>
                    <use xlink:href='#path-silhouette' />
                  </mask>
                  <use :fill="skinColors[skinColor]" xlink:href='#path-silhouette' />
                  <path
                    d='M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z'
                    id='Neck-Shadow' fill-opacity="0.100000001" fill='#000000' mask='url(#mask-silhouette)'></path>
                </g>
                <svg>
                  <g fill='black' transform='translate(76.000000, 82.000000)'>
                    <g id='Nose/Default' transform='translate(28.000000, 40.000000)' opacity='0.16'>
                      <path d='M16,8 C16,12.418278 21.372583,16 28,16 L28,16 C34.627417,16 40,12.418278 40,8' id='Nose' />
                    </g>
                  </g>
                </svg>
                <template
                  v-for="(key, i) of Object.keys(options)"
                  :key="`content-option-${i}`"
                >
                  <svg
                    v-html="options[key].items[options[key].value]"
                    :style="options[key].style"
                  />
                </template>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>

    <!-- Options -->
    <div v-if="!readonly" class="avatar-maker_scroller mt-md">
      <div class="avatar-maker_options flex">
        <div
          v-for="(key, i) of Object.keys(options)"
          :key="`option-${i}`"
          :class="[options[key]?.className, {
            'avatar-maker_option--selected': selectedOptionKey === key
          }]"
          class="avatar-maker_option"
          @click="onOptionClick(key)"
        >
          <svg
            v-if="options[key]?.value"
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            :style="options[key]?.style"
            v-html="options[key].items[options[key]?.value]"
          ></svg>
          <div class="avatar-maker_option-title">{{ $t(options[key]?.title) }}</div>
        </div>
      </div>
    </div>

    <!-- Selected -->
    <div v-if="!readonly && selectedOptionKey" class="avatar-maker_scroller mt-sm">
      <div class="avatar-maker_options flex">
        <div
          v-for="(key, i) of Object.keys(options[selectedOptionKey].items)"
          :key="`sel-option-${i}`"
          :class="[options[selectedOptionKey]?.className, {
            'avatar-maker_option--selected': selectedSubOptionKey === key
          }]"
          class="avatar-maker_option"
          @click="onSubOptionClick(key)"
        >
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            :style="options[selectedOptionKey]?.style"
            v-html="options[selectedOptionKey].items[key]"
          ></svg>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div v-if="!readonly && colorsByType" class="avatar-maker_scroller mt-sm">
      <div class="avatar-maker_colors flex">
        <div
          v-for="(key, i) of Object.keys(colorsByType)"
          :key="`color-${i}`"
          :class="`avatar-maker_color avatar-maker_color--${key}`"
          :style="`background-color: ${colorsByType[key]}`"
          @click="onColorClick(key)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

import { mouthTypes } from '@/composables/useAvatar/AssetsTypes/mouth'
import { eyeTypes } from '@/composables/useAvatar/AssetsTypes/eyes'
import { eyebrowTypes } from '@/composables/useAvatar/AssetsTypes/eyebrows'
import { clothesType } from '@/composables/useAvatar/AssetsTypes/clothes'
import { topTypes } from '@/composables/useAvatar/AssetsTypes/top'
import { accessoriesTypes } from '@/composables/useAvatar/AssetsTypes/accessories'
import { facialHairTypes } from '@/composables/useAvatar/AssetsTypes/facial-hair'
import { GraphicShirtTypes } from '@/composables/useAvatar/AssetsTypes/graphic-shirt'
import {
  hairColors,
  skinColors,
  hatAndShirtColors
} from '@/composables/useAvatar/AssetsTypes/colors'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false
  },
  isCircle: {
    type: Boolean,
    default: true
  },
  circleColor: {
    type: String,
    default: '#6fb8e0'
  },
  topType: {
    type: String,
    default: null
  },
  accessoriesType: {
    type: String,
    default: null
  },
  facialHairType: {
    type: String,
    default: null
  },
  clotheType: {
    type: String,
    default: null
  },
  eyeType: {
    type: String,
    default: null
  },
  eyebrowType: {
    type: String,
    default: null
  },
  mouthType: {
    type: String,
    default: null
  },
  skinColor: {
    type: String,
    default: null
  },
  graphicType: {
    type: String,
    default: null
  },
  hairColor: {
    type: String,
    default: null
  },
  facialHairColor: {
    type: String,
    default: null
  },
  topColor: {
    type: String,
    default: null
  },
  clotheColor: {
    type: String,
    default: null
  },
});

const selectedOptionKey = ref();
const selectedSubOptionKey = ref();
const selectedHairColor = ref(hairColors[props.hairColor]);
const selectedClotheColor = ref(hatAndShirtColors[props.clotheColor]);
const selectedFacialHairColor = ref(hairColors[props.facialHairColor]);
const selectedTopColor = ref(hatAndShirtColors[props.topColor]);

const onOptionClick = (key) => {
  selectedOptionKey.value = key
  selectedSubOptionKey.value = null
}

const onSubOptionClick = (key) => {
  selectedSubOptionKey.value = key
  options[selectedOptionKey.value].value = key
}

function onColorClick(key) {
  console.log(selectedSubOptionKey.value);
  if (selectedOptionKey.value === 'topType') {
    selectedHairColor.value = hairColors[key];
  }
  if (selectedOptionKey.value === 'clotheType') {
    selectedClotheColor.value = hatAndShirtColors[key];
  }
  if (selectedOptionKey.value === 'facialHairType') {
    selectedFacialHairColor.value = hairColors[key];
  }
  if (selectedOptionKey.value === 'topType') {
    selectedTopColor.value = hatAndShirtColors[key];
  }
}

const cssVars = computed(() => {
  return {
    '--avataaar-hair-color': selectedHairColor.value,
    '--avataaar-facial-hair-color': selectedFacialHairColor.value,
    '--avataaar-hat-color': selectedTopColor.value,
    '--avataaar-shirt-color': selectedClotheColor.value,
  }
});

const colorsByType = computed(() => {
  if (
    selectedOptionKey.value === 'topType' &&
    [
      'Hat',
      'Hijab',
      'Eyepatch',
      'Turban',
      'WinterHat1',
      'WinterHat2',
      'WinterHat3',
      'WinterHat4'
    ].includes(selectedSubOptionKey.value)
  ) return hatAndShirtColors
  if (selectedOptionKey.value === 'topType' || selectedOptionKey.value === 'facialHairType') return hairColors
  if (selectedOptionKey.value === 'clotheType') return hatAndShirtColors
  return null
})

const options = reactive({
  clotheType: {
    title: 'editAvatar.clothes',
    value: props.clotheType,
    items: clothesType,
    style: cssVars,
    className: 'avatar-maker_option-clothes'
  },
  // graphicType: {
  //   title: 'editAvatar.graphic',
  //   value: props.graphicType,
  //   items: GraphicShirtTypes,
  //   style: cssVars,
  //   className: 'avatar-maker_option-graphic',
  // },
  eyeType: {
    title: 'editAvatar.eyes',
    value: props.eyeType,
    items: eyeTypes,
    className: 'avatar-maker_option-eye'
  },
  mouthType: {
    title: 'editAvatar.mouths',
    value: props.mouthType,
    items: mouthTypes,
    className: 'avatar-maker_option-mouth'
  },
  eyebrowType: {
    title: 'editAvatar.brows',
    value: props.eyebrowType,
    items: eyebrowTypes,
    className: 'avatar-maker_option-brow'
  },
  topType: {
    title: 'editAvatar.top',
    value: props.topType,
    items: topTypes,
    style: cssVars,
    className: 'avatar-maker_option-head-hair'
  },
  facialHairType: {
    title: 'editAvatar.facialHair',
    value: props.facialHairType,
    items: facialHairTypes,
    style: cssVars,
    className: 'avatar-maker_option-facial-hair'
  },
  accessoriesType: {
    title: 'editAvatar.accessories',
    value: props.accessoriesType,
    items: accessoriesTypes,
    className: 'avatar-maker_option-acces'
  },
});
</script>

<style lang="scss" scoped>
.avatar-maker {
  &_options {
    gap: 8px;
  }

  &_colors {
    gap: 8px;
  }

  &_color {
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 8px;

    &:active {
      transform: scale(0.95);
    }
  }

  &_scroller {
    width: 100%;
    height: 65px;
    overflow: auto;
    padding: 0 2px;
  }

  &_option {
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
    transition: .2s ease-in-out;

    &--selected {
      background: #fff;
    }

    &:active {
      background: #fff;
      transform: scale(0.95);
    }

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

    &-clothes {
      :deep(svg) {
        > g {
          transform: scale(1) translate(0px, 50px);
        }
      }
    }

    &-head-hair {
      :deep(svg) {
        > g {
          transform: scale(1) translate(0px, 30px);
        }
      }
    }

    &-graphic {
      :deep(svg) {
        > g {
          transform: scale(1) translate(0px, 50px);
        }
      }
    }

    &-eye {
      :deep(svg) {
        > g {
          transform: scale(2.4) translate(0px, 20px);
        }
      }
    }

    &-facial-hair {
      :deep(svg) {
        > g {
          transform: scale(1.6) translate(-2px, 0px);
        }
      }
    }

    &-brow {
      :deep(svg) {
        > g {
          transform: scale(2.4) translate(0px, 35px);
        }
      }
    }
    
    &-mouth {
      :deep(svg) {
        > g {
          transform: scale(2.4) translate(0px, -20px);
        }
      }
    }

    &-acces {
      :deep(svg) {
        > g {
          transform: scale(1.5) translate(18px, 50px);
        }
      }
    }
  }

  &_content {
    width: 100%;
  }
}
</style>