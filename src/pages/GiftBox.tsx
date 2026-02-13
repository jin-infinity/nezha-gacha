import React, { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';
import { ITEMS, GachaItem } from '@/types';

const GiftBox: React.FC = () => {
  const { inventory, clearInventory } = useStore();
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your inventory? This action cannot be undone.')) {
      clearInventory();
    }
  };

  // Helper to get fresh item info
  const getFreshItem = (storedItem: GachaItem): GachaItem => {
    const freshItem = ITEMS.find(i => i.id === storedItem.id);
    return freshItem || storedItem;
  };

  // Helper to categorize items for sorting
  const getItemCategoryOrder = (item: GachaItem): number => {
    const name = item.name;
    // 1. Characters (Highest priority)
    if (name.includes('灵狐者') || name.includes('角色')) return 1;
    // 2. Weapons
    if (name.includes('Scar') || name.includes('无影') || name.includes('神威') || name.includes('烈渊') || name.includes('蝶刃')) return 2;
    // 3. Dolls/Accessories
    if (name.includes('玩偶') || name.includes('魔童') || name.includes('音效卡')) return 3;
    // 4. Valuable Items (Keys, Stones, High CF Points)
    if (name.includes('王者之石') || name.includes('钥匙') || name.includes('保护券') || name.includes('属性')) return 4;
    // 5. CF Points & Boxes
    if (name.includes('CF点') || name.includes('宝箱') || name.includes('盲盒')) return 5;
    // 6. Cards (Low Tier)
    if (name.includes('卡')) return 6;
    
    return 99; // Others
  };

  const sortedAndFilteredInventory = useMemo(() => {
    let items = [...inventory];
    
    // 1. Update with fresh data first
    items = items.map(entry => ({
      ...entry,
      item: getFreshItem(entry.item)
    }));

    // 2. Filter
    if (filter !== 'all') {
      items = items.filter(entry => entry.item.rarity === filter);
    }

    // 3. Sort
    items.sort((a, b) => {
      // Sort by Category First
      const catA = getItemCategoryOrder(a.item);
      const catB = getItemCategoryOrder(b.item);
      if (catA !== catB) return catA - catB;

      // Then by Rarity (High -> Low)
      const rarityOrder = { high: 0, medium: 1, low: 2 };
      if (rarityOrder[a.item.rarity] !== rarityOrder[b.item.rarity]) {
        return rarityOrder[a.item.rarity] - rarityOrder[b.item.rarity];
      }

      // Then by Name
      return a.item.name.localeCompare(b.item.name);
    });

    return items;
  }, [inventory, filter]);

  return (
    <div className="min-h-screen bg-[#1a0b00] p-4 md:p-8 font-sans">
      {/* Background overlay similar to game style */}
      <div className="fixed inset-0 bg-[url('/images/background.jpg')] opacity-30 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#2d1b12]/80 p-4 rounded-xl border border-orange-900/50 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-orange-400 flex items-center gap-2 drop-shadow-md">
              <span className="text-4xl">🎁</span> 暂存箱 <span className="text-sm text-orange-200/60 font-normal mt-2">(Inventory)</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center">
             {/* Filter Tabs */}
             <div className="flex bg-black/40 rounded-lg p-1 mr-4 border border-orange-900/30">
                {(['all', 'high', 'medium', 'low'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filter === f 
                        ? 'bg-orange-600 text-white shadow-md' 
                        : 'text-orange-200/70 hover:text-orange-100 hover:bg-white/5'
                    }`}
                  >
                    {f === 'all' ? '全部 (All)' : 
                     f === 'high' ? '稀有 (Rare)' : 
                     f === 'medium' ? '普通 (Common)' : '卡片 (Cards)'}
                  </button>
                ))}
             </div>

            {inventory.length > 0 && (
              <button 
                onClick={handleClear}
                className="bg-red-600/80 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all font-bold text-sm shadow-md border border-red-500/50 flex items-center gap-2"
              >
                <span>🗑️</span> 清空 (Clear)
              </button>
            )}
            <Link 
              to="/" 
              className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded-lg transition-all font-bold shadow-md border border-orange-400/50 flex items-center gap-2"
            >
              ↩️ 返回 (Back)
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#fff8e7]/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-4 border-[#e6c9a0] min-h-[70vh]">
          {sortedAndFilteredInventory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#8b5a3e]/60 py-32">
              <div className="text-7xl mb-6 opacity-50">📦</div>
              <p className="text-2xl font-bold mb-2">暂存箱是空的</p>
              <p className="text-sm mb-8">Empty Inventory</p>
              <Link to="/" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all font-bold text-lg">
                去抽奖 (Go Gacha)
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              {sortedAndFilteredInventory.map((entry, idx) => (
                <div 
                  key={idx} 
                  className={`
                    group relative rounded-xl p-2 border-2 shadow-sm flex flex-col items-center transition-all hover:scale-105 hover:shadow-xl hover:z-10 bg-white
                    ${entry.item.rarity === 'high' ? 'border-yellow-400 bg-yellow-50/50' : 
                      entry.item.rarity === 'medium' ? 'border-blue-300 bg-blue-50/50' : 
                      'border-gray-300 bg-gray-50/50'}
                  `}
                >
                  {/* Rarity Glow */}
                  {entry.item.rarity === 'high' && (
                    <div className="absolute inset-0 rounded-xl bg-yellow-400/10 animate-pulse pointer-events-none"></div>
                  )}

                  {/* Badge */}
                  {entry.item.badge && (
                    <div className="absolute -top-2 -left-2 z-20 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm font-bold tracking-tighter border border-white">
                      {entry.item.badge}
                    </div>
                  )}

                  {/* Count Badge */}
                  <div className="absolute top-2 right-2 z-20 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded-md min-w-[24px] text-center border border-white/20 backdrop-blur-sm">
                    x{entry.count}
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full aspect-square mb-2 flex items-center justify-center overflow-hidden rounded-lg bg-contain bg-center bg-no-repeat transition-transform group-hover:scale-110 duration-300">
                    <img 
                      src={entry.item.image} 
                      alt={entry.item.name} 
                      className="w-full h-full object-contain drop-shadow-md" 
                    />
                  </div>

                  {/* Name */}
                  <div className="text-center w-full mt-auto">
                    <div className={`
                      text-xs font-bold line-clamp-2 h-8 flex items-center justify-center leading-tight px-1
                      ${entry.item.rarity === 'high' ? 'text-[#8b5a3e]' : 'text-gray-700'}
                    `}>
                      {entry.item.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftBox;
