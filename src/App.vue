<template>
  <AppLayout v-if="isAndroid || isIOS" />
  <QrCodeLayout v-else />
</template>

<script setup>
import UAParser from 'ua-parser-js';
import AppLayout from '@/layouts/AppLayout.vue';
import QrCodeLayout from '@/layouts/QrCodeLayout.vue';

const UA = new UAParser();
const os = UA.getOS();

const isAndroid = os?.name === 'Android';
const isIOS = os?.name === 'iOS';
</script>