import { useLanguageStore } from '@/store/useLanguageStore';
import { translations } from '@/i18n/locales';
import { GachaItem } from '@/types';

// Define keys that map to strings only, excluding 'items' and 'badges' objects
type TranslationKeys = Exclude<keyof typeof translations['vi'], 'items' | 'badges'>;

export const useTranslation = () => {
  const { language, setLanguage } = useLanguageStore();
  
  const t = (key: TranslationKeys) => {
    // Force cast to string because we excluded non-string keys
    return (translations[language][key] as unknown as string) || key;
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
    // Cast items object to allow string indexing since item.id is string
    const itemsMap = translations[language].items as Record<string, string>;
    const translatedName = itemsMap[item.id];
    return translatedName || item.name;
  };

  const tBadge = (badge: string) => {
    if (!badge) return '';
    
    const badgesMap = translations[language].badges as Record<string, string>;
    
    // Map raw badge text to translation keys
    // This is a simple mapping based on known badge strings in Chinese
    const keyMap: Record<string, string> = {
      '首发': 'first_release',
      '不可交易': 'not_tradable',
      '唯一性': 'unique',
      '极稀有': 'rare'
    };

    // Split badge by ' | ' if it contains multiple badges
    const parts = badge.split(' | ');
    
    return parts.map(part => {
      const key = keyMap[part.trim()] || '';
      return badgesMap[key] || part;
    }).join(' | ');
  };

  return { t, tItem, tBadge, language, setLanguage };
};
