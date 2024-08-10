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
                  <use :fill="skinColors[skinColorValue]" xlink:href='#path-silhouette' />
                  <path
                    d='M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z'
                    id='Neck-Shadow' fill-opacity="0.100000001" fill='#000000' mask='url(#mask-silhouette)'></path>
                </g>
                <svg :style="cssVars" v-html="clothesType[clotheTypeValue]" />
                <svg v-if="clotheTypeValue === 'GraphicShirt'" :style="cssVars" v-html="GraphicShirtTypes[graphicTypeValue]" />
                <svg v-html="eyeTypes[eyeTypeValue]" />
                <svg v-html="mouthTypes[mouthTypeValue]" />
                <svg v-html="eyebrowTypes[eyebrowTypeValue]" />
                <svg>
                  <g fill='black' transform='translate(76.000000, 82.000000)'>
                    <g id='Nose/Default' transform='translate(28.000000, 40.000000)' opacity='0.16'>
                      <path d='M16,8 C16,12.418278 21.372583,16 28,16 L28,16 C34.627417,16 40,12.418278 40,8' id='Nose' />
                    </g>
                  </g>
                </svg>
                <svg :style="cssVars" v-html="topTypes[topTypeValue]" />
                <svg :style="cssVars" v-html="facialHairTypes[facialHairTypeValue]" />
                <svg v-html="accessoriesTypes[accessoriesTypeValue]" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="avatar-maker_scroller mt-md">
      <div v-if="readonly" class="avatar-maker_options flex">
        <div class="avatar-maker_option avatar-maker_option-clothes">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            :style="cssVars"
            v-html="clothesType[clotheTypeValue]"
          />
          <div class="avatar-maker_option-title">Clothes</div>
        </div>
        <div class="avatar-maker_option avatar-maker_option-graphic">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            :style="cssVars"
            v-html="GraphicShirtTypes[graphicTypeValue]" 
          />
          <div class="avatar-maker_option-title">Graphic</div>
        </div>
        <div class="avatar-maker_option avatar-maker_option-eye">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            v-html="eyeTypes[eyeTypeValue]"
          />
          <div class="avatar-maker_option-title">Eye</div>
        </div>
        <div class="avatar-maker_option avatar-maker_option-mouth">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            v-html="mouthTypes[mouthTypeValue]"
          />
          <div class="avatar-maker_option-title">Mouth</div>
        </div>
        <div class="avatar-maker_option avatar-maker_option-brow">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            v-html="eyebrowTypes[eyebrowTypeValue]"
          />
          <div class="avatar-maker_option-title">Eye Brow</div>
        </div>
        <div class="avatar-maker_option avatar-maker_option-head-hair">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            :style="cssVars"
            v-html="topTypes[topTypeValue]"
          />
          <div class="avatar-maker_option-title">Head Hair</div>
        </div>
        <div class="avatar-maker_option avatar-maker_option-facial-hair">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            :style="cssVars"
            v-html="facialHairTypes[facialHairTypeValue]"
          />
          <div class="avatar-maker_option-title">Facial Hair</div>
        </div>
        <div class="avatar-maker_option avatar-maker_option-acces">
          <svg
            viewBox='0 0 264 280'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            v-html="accessoriesTypes[accessoriesTypeValue]"
          />
          <div class="avatar-maker_option-title">Accessories</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { mouthTypes } from '@/components/AvatarMaker/AssetsTypes/mouth'
import { eyeTypes } from '@/components/AvatarMaker/AssetsTypes/eyes'
import { eyebrowTypes } from '@/components/AvatarMaker/AssetsTypes/eyebrows'
import { clothesType } from '@/components/AvatarMaker/AssetsTypes/clothes'
import { topTypes } from '@/components/AvatarMaker/AssetsTypes/top'
import { accessoriesTypes } from '@/components/AvatarMaker/AssetsTypes/accessories'
import { facialHairTypes } from '@/components/AvatarMaker/AssetsTypes/facial-hair'
import { GraphicShirtTypes } from '@/components/AvatarMaker/AssetsTypes/graphic-shirt'
import {
  hairColors,
  skinColors,
  hatAndShirtColors
} from '@/components/AvatarMaker/AssetsTypes/colors'

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
    default: 'random'
  },
  accessoriesType: {
    type: String,
    default: 'random'
  },
  facialHairType: {
    type: String,
    default: 'random'
  },
  clotheType: {
    type: String,
    default: 'random'
  },
  eyeType: {
    type: String,
    default: 'random'
  },
  eyebrowType: {
    type: String,
    default: 'random'
  },
  mouthType: {
    type: String,
    default: 'random'
  },
  skinColor: {
    type: String,
    default: 'random'
  },
  graphicType: {
    type: String,
    default: 'random'
  },
  hairColor: {
    type: String,
    default: 'random'
  },
  facialHairColor: {
    type: String,
    default: 'random'
  },
  topColor: {
    type: String,
    default: 'random'
  },
  clotheColor: {
    type: String,
    default: 'random'
  },
});

function getRandomChoice(items) {
  const itemsLength = Object.entries(items).length
  return Object.entries(items)[Math.floor((Math.random() * (itemsLength)))][1]
}

const cssVars = computed(() => {
  return {
    '--avataaar-hair-color': props.hairColor === 'random' ?
      getRandomChoice(hairColors) : hairColors[props.hairColor],
    '--avataaar-facial-hair-color': props.facialHairColor === 'random' ?
      getRandomChoice(hairColors) :
      hairColors[props.facialHairColor],
    '--avataaar-hat-color': props.topColor === 'random' ?
      getRandomChoice(hatAndShirtColors) :
        hatAndShirtColors[props.topColor],
    '--avataaar-shirt-color': props.clotheColor === 'random' ?
      getRandomChoice(hatAndShirtColors) : hatAndShirtColors[this.clotheColor],
  }
});

const topTypeValue = computed(() =>
  props.topType === 'random' ?
    getRandomChoice(Object.keys(topTypes)) :
      props.topType
);

const accessoriesTypeValue = computed(() =>
  props.accessoriesType === 'random' ?
    getRandomChoice(Object.keys(accessoriesTypes)) :
      props.accessoriesType
);

const facialHairTypeValue = computed(() =>
  props.facialHairType === 'random' ?
    getRandomChoice(Object.keys(facialHairTypes)) :
      props.facialHairType
);
const clotheTypeValue = computed(() =>
  props.clotheType === 'random' ?
    getRandomChoice(Object.keys(clothesType)) :
      props.clotheType
);
const eyeTypeValue = computed(() =>
  props.eyeType === 'random' ?
    getRandomChoice(Object.keys(eyeTypes)) :
      props.eyeType
);
const eyebrowTypeValue = computed(() =>
  props.eyebrowType === 'random' ?
    getRandomChoice(Object.keys(eyebrowTypes)) :
      props.eyebrowType
);
const mouthTypeValue = computed(() =>
  props.mouthType === 'random' ?
    getRandomChoice(Object.keys(mouthTypes)) :
      props.mouthType
);
const skinColorValue = computed(() =>
  props.skinColor === 'random' ?
    getRandomChoice(Object.keys(skinColors)) :
      props.skinColor
);
const graphicTypeValue = computed(() =>
  props.graphicType === 'random' ?
    getRandomChoice(Object.keys(GraphicShirtTypes)) :
      props.graphicType
);
</script>

<style lang="scss" scoped>
.avatar-maker {
  &_options {
    gap: 8px;
  }

  &_scroller {
    width: 100%;
    height: 65px;
    overflow: auto;
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

    &-title {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      color: #000;
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