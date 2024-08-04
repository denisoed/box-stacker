import useColor from '@/composables/useColor';
import useTelegramApi from '@/api/useTelegramApi';
import { useUserStore } from '@/stores/user';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/config';

export default async () => {
  const { rgbToHex } = useColor();
  const { telegramAuth } = useTelegramApi();
  const userStore = useUserStore();

  const WebApp = window?.Telegram?.WebApp;

  try {
    if (WebApp) {
      const data = await telegramAuth(WebApp?.initData ? WebApp?.initDataUnsafe : JSON.parse(process.env.VUE_APP_TEST_INIT_DATA_UNSAFE_STRING));
      if (data?.user) {
        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, String(data.jwt));
        userStore.setUser(data.user || {});
      } else {
        localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
      }
      WebApp.setBackgroundColor(rgbToHex('rgb(240, 128, 128)'))
      WebApp.setHeaderColor(rgbToHex('rgb(240, 128, 128)'))
      WebApp.expand()
      WebApp.ready()
    }
  } catch {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  }
};
