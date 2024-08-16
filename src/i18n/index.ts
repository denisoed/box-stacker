import { createI18n } from 'vue-i18n';
import en from '@/i18n/locales/en.json'; 
import ru from '@/i18n/locales/ru.json'; 

const locale = window?.Telegram?.WebApp?.initDataUnsafe?.user?.language_code || 'ru';

const i18n = createI18n({ 
  locale,
  fallbackLocale: 'en', 
  messages: { ru, en }, 
  legacy: false 
});

export default i18n;
