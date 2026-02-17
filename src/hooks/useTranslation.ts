import { useLanguageStore } from '@/store/useLanguageStore';
import { translations } from '@/i18n/locales';
import { GachaItem } from '@/types';

export const useTranslation = () => {
  const { language, setLanguage } = useLanguageStore();
  
  const t = (key: keyof typeof translations['vi']) => {
    return translations[language][key] || key;
  };
  
  const tItem = (item: GachaItem) => {
    // Check if item is a dynamic CF Point chest (id starts with 'cfp-')
    if (item.id.startsWith('cfp-')) {
      const amount = item.amount || 0;
      // You can customize this format in locales if needed, but for now hardcode logic
      // or use a specific key for CF Points
      return `${amount} CF Points`;
    }

    // Use translation map for standard items
    const translatedName = translations[language].items[item.id as keyof typeof translations['vi']['items']];
    return translatedName || item.name;
  };

  return { t, tItem, language, setLanguage };
};
