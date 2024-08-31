<template>
  <div class="container flex column">
    <AboutMe
      :first-name="user?.firstname"
      :last-name="user?.lastname"
      :score="balance"
      :avatar="userAvatar"
      show-edit-pencil
    />
    <SwitchTabs
      :tabs="TABS"
      class="mt-md mb-sm"
      :selected-tab="selectedTab"
      @on-change="selectedTab = $event"
    />
    <keep-alive>
      <StatsTab v-if="selectedTab === TAB_STATS" />
      <FriendsTab v-else-if="selectedTab === TAB_FRIENDS" />
      <SettingsTab v-else-if="selectedTab === TAB_SETTINGS" />
    </keep-alive>
  </div>
</template>

<script setup>
import { computed, reactive, watch, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useI18n } from 'vue-i18n';
import useFormaters from '@/composables/useFormaters';

import AboutMe from '@/components/AboutMe.vue';
import SwitchTabs from '@/components/SwitchTabs.vue';
import SettingsTab from '@/components/SettingsTabs/SettingsTab.vue';
import StatsTab from '@/components/SettingsTabs/StatsTab.vue';
import FriendsTab from '@/components/SettingsTabs/FriendsTab.vue';


const { t } = useI18n();

const TAB_STATS = 0;
const TAB_FRIENDS = 1;
const TAB_SETTINGS = 2;

const TABS = [
  {
    label: t('settings.statsTab.title'),
    value: TAB_STATS,
    disabled: true
  },
  {
    label: t('settings.friendsTab.title'),
    value: TAB_FRIENDS,
    disabled: true
  },
  {
    label: t('settings.settingsTab.title'),
    value: TAB_SETTINGS
  }
]

const userStore = useUserStore();
const { formatNumberWithSpaces } = useFormaters();

const selectedTab = ref(TAB_SETTINGS);

const userAvatar = computed(() => userStore.getUser?.avatar);
const user = computed(() => userStore.getUser);
const balance = computed(() => formatNumberWithSpaces(userStore.getUser?.score || 0));
</script>
