<template>
  <SkyStars />
  <div class="qr-code_content flex column items-center justify-center">
    <div class="qr-code_content-title">{{ $t('qrCode.title') }}</div>
    <QRCodeVue3
      :width="250"
      :height="250"
      value="https://t.me/BoxStackerBot"
      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
      :dotsOptions="{
        type: 'dots',
        color: '#26249a',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#26249a' },
            { offset: 1, color: '#26249a' },
          ],
        },
      }"
      :backgroundOptions="{ color: 'transparent' }"
      :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
      :cornersDotOptions="{ type: undefined, color: '#000000' }"
      fileExt="png"
      myclass="my-qur"
      imgclass="img-qr"
    />
    <div class="qr-code_content-text">https://t.me/BoxStackerBot</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import QRCodeVue3 from 'qrcode-vue3';
import SkyStars from '@/components/SkyStars.vue';

onMounted(() => {
  document.body.style.background = `linear-gradient(0deg, rgb(190, 190, 190) 0%, rgb(240, 128, 128) 84%)`;
})
</script>

<style lang="scss">
.qr-code_content {
  height: 100vh;

  &-title {
    width: 320px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
    text-align: center;
    line-height: normal;
  }

  &-text {
    font-size: 16px;
    color: #fff;
    line-height: normal;
    text-transform: none;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
  }
}
.my-qur {
  img {
    padding: 10px;
    background: #fff;
    border-radius: 8px;
  }
}
</style>