import React, { useState } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'cn', label: '中文 (CN)' },
    { code: 'vi', label: 'Tiếng Việt (VN)' },
    { code: 'en', label: 'English (EN)' },
  ];

  const currentLabel = languages.find(l => l.code === language)?.label || 'Language';

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 text-white font-bold text-sm shadow-lg hover:bg-black/80 transition-all flex items-center gap-2"
      >
        <span>🌐</span> {currentLabel}
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl z-[100] min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 ${
                language === lang.code ? 'text-orange-400 bg-white/5' : 'text-white/80'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Click outside to close overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
