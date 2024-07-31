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
    const aaa = '{"query_id":"AAEGKqcZAAAAAAYqpxnIfeGM","user":{"id":430385670,"first_name":"Denis","last_name":"Grushkin","username":"denisoed","language_code":"en","allows_write_to_pm":true},"auth_date":"1722424584","hash":"d65f2aae21b21eba967e4e519f040e6058a3c89f7da73c8d7267355d3f775d7d"}'
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
