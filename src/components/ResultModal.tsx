import React from 'react';
import { GachaItem as GachaItemType } from '@/types';

interface Props {
  results: GachaItemType[];
  onClose: () => void;
  isOpen: boolean;
}

export const ResultModal: React.FC<Props> = ({ results, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative w-[1000px] bg-[#fff5e6] rounded-2xl border-4 border-orange-200 shadow-2xl overflow-hidden px-8 py-6 flex flex-col min-h-[500px]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-orange-600 hover:text-orange-800 z-10 font-bold text-2xl"
        >
          ✕
        </button>

        {/* Header Section */}
        <div className="text-center mb-6 mt-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-4xl font-bold text-[#5c3a21] tracking-wide">
              恭喜您获得
            </h2>
          </div>
          <p className="text-[#8b5a3e] text-sm">
            抽奖过程中请勿刷新页面或中断，请以实际礼包记录为准。
          </p>
        </div>

        {/* Content Area - Flexible Center */}
        <div className="flex-1 flex items-center justify-center w-full mb-6">
          <div className={`grid gap-6 ${results.length === 1 ? 'grid-cols-1' : 'grid-cols-5'}`}>
            {results.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Item Tile */}
                <div 
                  className={`
                    bg-[#e6f2ff] rounded-lg border border-[#cce0ff] flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-all
                    ${results.length === 1 ? 'p-8 w-80 h-80' : 'p-4 w-48 aspect-[4/5]'}
                  `}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-md" />
                </div>
                {/* Label */}
                <div 
                  className={`
                    text-[#3b82f6] font-medium text-center leading-tight flex items-center justify-center
                    ${results.length === 1 ? 'text-xl mt-2' : 'text-sm px-1'}
                  `}
                >
                   {item.name} {(item.amount && !item.name.includes('CF点') && !item.name.includes('CF Point')) ? `x${item.amount}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-auto border-t border-orange-200 pt-4">
           <p className="text-[#8b5a3e] text-xs leading-relaxed text-left">
             温馨提示：1.虚拟道具奖励将在24小时内发到您的游戏仓库，需您耐心等待与关注；2.由于数据量巨大，奖励道具显示可能有所延迟，或存在不展示的情况，请以礼包记录为准。
           </p>
        </div>
      </div>
    </div>
  );
};
