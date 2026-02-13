import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { GachaItem as GachaItemType } from '@/types';
import { ResultModal } from '@/components/ResultModal';
import { RewardListModal } from '@/components/RewardListModal';
import { Link } from 'react-router-dom';

const RARE_GIF_IDS = ['1', '2', '3']; // IDs that trigger the GIF popup

const Home: React.FC = () => {
  const { keys, addKeys, pullGacha, totalSpins } = useStore();
  const [result, setResult] = useState<GachaItemType[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardListOpen, setIsRewardListOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [skipAnim, setSkipAnim] = useState(false);
  
  // State for Rare Item Popup
  const [rareItemQueue, setRareItemQueue] = useState<GachaItemType[]>([]);
  const [currentRareItem, setCurrentRareItem] = useState<GachaItemType | null>(null);

  const processGachaResults = (results: GachaItemType[]) => {
    // If "Skip Animation" is checked, show full results immediately
    if (skipAnim) {
      setResult(results);
      setIsModalOpen(true);
      return;
    }

    // Check for High Tier items (High Rarity) or Medium Tier items that are NOT cards
    // Filter condition: 
    // 1. Rarity is 'high'
    // OR
    // 2. Rarity is 'medium' AND name does NOT contain '卡' (Card)
    const popupItems = results.filter(item => {
        if (item.rarity === 'high') return true;
        if (item.rarity === 'medium' && !item.name.includes('卡')) return true;
        return false;
    });
    
    if (popupItems.length > 0) {
      setRareItemQueue(popupItems);
      setCurrentRareItem(popupItems[0]); // Start with the first one
      setResult(results); // Store final results for later
    } else {
      // No special items, show normal result modal immediately
      setResult(results);
      setIsModalOpen(true);
    }
  };

  const handleRarePopupClose = () => {
    // Remove the current item from queue
    const remainingQueue = rareItemQueue.slice(1);
    
    if (remainingQueue.length > 0) {
      // Show next rare item
      setRareItemQueue(remainingQueue);
      setCurrentRareItem(remainingQueue[0]);
    } else {
      // All rare popups done, show final result modal
      setRareItemQueue([]);
      setCurrentRareItem(null);
      setIsModalOpen(true);
    }
  };

  const handlePull = async (count: number) => {
    if (keys < count) {
      alert('Keys not enough! Please buy more.');
      return;
    }

    setIsSpinning(true);
    
    // Simulate spin delay
    await new Promise(resolve => setTimeout(resolve, skipAnim ? 100 : 800));

    const results = pullGacha(count);
    processGachaResults(results);
    
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center">
       {/* Video Header - Top Flow */}
       <div className="hdvd shrink-0">
           <video className="hd_video" id="myVideo" autoPlay muted loop playsInline>
               <source src="//game.gtimg.cn/images/actdaoju/act/a20260113cfswdb/video1.mp4" type="video/mp4" />
           </video>
       </div>

       {/* Main Content Area - Flows naturally below video */}
       <div className="part1 w-full flex flex-col items-center">
          {/* Buy Key Buttons */}
          <div className="btn_box1">
              <a href="#" className="btn_tmg1" onClick={(e) => { e.preventDefault(); addKeys(10); }}>
                  <span className="btnqb">Add 10 keys</span>
              </a>
              <a href="#" className="btn_tmg2" onClick={(e) => { e.preventDefault(); addKeys(100); }}>
                  <span className="btnqb">Add 100 keys</span>
              </a>
              <a href="#" className="btn_tmg3" onClick={(e) => { e.preventDefault(); addKeys(500); }}>
                  <span className="btnqb">Add 500 keys</span>
              </a>
          </div>

          {/* Game Interface */}
          <div className="lotty">
              {/* Decorative GIFs */}
              <div className="gift_1"><img src="/images/gift_1.gif" alt="" /></div>
              <div className="gift_2"><img src="/images/gift_2.gif" alt="" /></div>
              <div className="gift_3"><img src="/images/gift_3.gif" alt="" /></div>
              
              {/* Buttons */}
              <a className="btn_cj1" onClick={() => !isSpinning && handlePull(1)} title="Draw 1"></a>
              <a className="btn_cj2" onClick={() => !isSpinning && handlePull(10)} title="Draw 10"></a>
              <a className="btn_ck1" onClick={() => setIsRewardListOpen(true)} title="View All"></a>
              
              {/* CF Point Box Hover Interaction */}
              <a className="btn_fc1" href="#" onClick={(e) => e.preventDefault()}>
                  <img src="/images/fc15.png" alt="CF Points Detail" />
              </a>

              {/* Info */}
              <div className="txt_box2">
                 <p className="txt_num1">剩余钥匙：<span className="jf_7929">{keys}</span></p>
                 <div className="txt_box3" onClick={() => setSkipAnim(!skipAnim)}>
                     <a className={skipAnim ? "cur" : ""}></a>
                     <p>中奖后不再单独弹出奖励弹窗</p>
                 </div>
              </div>
              
              {/* Total Spins Indicator */}
              <div className="absolute top-[1330px] left-0 w-full text-center pointer-events-none">
                 <span className="text-orange-200 text-lg font-bold drop-shadow-md">当前已抽取: <span className="text-yellow-400 text-2xl">{totalSpins}</span> 次</span>
              </div>
           </div>
       </div>

      {/* Floating Inventory Button (Fixed Position) */}
      <div className="fixed top-4 right-4 z-50">
           <Link to="/giftbox" className="bg-orange-500 text-white px-6 py-2 rounded-full text-md font-bold shadow-lg hover:bg-orange-600 transition-colors border-2 border-white flex items-center gap-2">
             <span>🎁</span> 暂存箱
           </Link>
      </div>

      {/* Rare Item GIF Popup */}
      {currentRareItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
           {/* Modal Container */}
           <div className="relative w-[1000px] bg-[#fff5e6] rounded-2xl border-4 border-orange-200 shadow-2xl overflow-hidden px-8 py-6 flex flex-col min-h-[500px] animate-in fade-in zoom-in duration-300">
              
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
              <div className="flex-1 flex flex-col items-center justify-center w-full mb-6">
                  {/* Item Tile */}
                  <div className="bg-[#e6f2ff] rounded-lg border border-[#cce0ff] flex items-center justify-center mb-4 shadow-sm p-8 w-80 h-80">
                    {RARE_GIF_IDS.includes(currentRareItem.id) ? (
                      <img src={`/images/gift_${currentRareItem.id}.gif`} alt={currentRareItem.name} className="w-full h-full object-contain drop-shadow-md" />
                    ) : (
                      <img src={currentRareItem.image} alt={currentRareItem.name} className="w-full h-full object-contain drop-shadow-md" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className="text-[#3b82f6] font-medium text-center text-xl mt-2 leading-tight flex items-center justify-center">
                     {currentRareItem.name} {currentRareItem.amount ? `x${currentRareItem.amount}` : ''}
                  </div>

                  {/* Button */}
                  <button 
                    onClick={handleRarePopupClose}
                    className="mt-8 px-12 py-3 bg-gradient-to-b from-[#ff9a44] to-[#fc600c] text-white font-bold text-xl rounded-full shadow-[0_4px_0_#b83a00] border border-[#ffcd9e] hover:scale-105 active:scale-95 active:shadow-none active:translate-y-1 transition-all"
                  >
                    收下奖励 (OK)
                  </button>
              </div>

              {/* Footer Note */}
              <div className="mt-auto border-t border-orange-200 pt-4">
                 <p className="text-[#8b5a3e] text-xs leading-relaxed text-left">
                   温馨提示：1.虚拟道具奖励将在24小时内发到您的游戏仓库，需您耐心等待与关注；2.由于数据量巨大，奖励道具显示可能有所延迟，或存在不展示的情况，请以礼包记录为准。
                 </p>
              </div>
           </div>
        </div>
      )}

      <ResultModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        results={result || []} 
      />

      <RewardListModal
        isOpen={isRewardListOpen}
        onClose={() => setIsRewardListOpen(false)}
      />
    </div>
  );
};

export default Home;
