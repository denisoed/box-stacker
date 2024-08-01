import useColor from '@/composables/useColor';
import useTelegramApi from '@/api/useTelegramApi';
import { useUserStore } from '@/stores/user';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/config';

export default async () => {
  const { rgbToHex } = useColor();
  const { telegramAuth } = useTelegramApi();
  const userStore = useUserStore();

  const WebApp = window?.Telegram?.WebApp;
  if (WebApp) {
    const aaa = '{"query_id":"AAEGKqcZAAAAAAYqpxko5uAy","user":{"id":430385670,"first_name":"Denis","last_name":"Grushkin","username":"denisoed","language_code":"en","allows_write_to_pm":true},"auth_date":"1722523140","hash":"83a38765577638e806764b6ba8f5976d2ff61254fd517844dd889d62dbcafe0c"}'
    const data = await telegramAuth(JSON.parse(aaa) || WebApp?.initDataUnsafe);
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
};
