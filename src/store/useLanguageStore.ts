import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'cn' | 'vi' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'cn', // Default to Chinese
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);
