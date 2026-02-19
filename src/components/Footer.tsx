import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-auto bg-black/80 backdrop-blur-sm border-t border-orange-900/30">
      <div className="container mx-auto px-4 text-center">
        <p className="text-orange-200/80 font-medium mb-2 text-lg">
          Made with <span className="text-red-500 animate-pulse">❤️</span> for gacha addict
        </p>
        <p className="text-orange-200/50 text-sm">
          © 2026 Nezha Gacha Project
        </p>
      </div>
    </footer>
  );
};
