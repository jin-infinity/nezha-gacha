import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { GachaItem as GachaItemType, ITEMS } from '@/types';
import { ResultModal } from '@/components/ResultModal';
import { RewardListModal } from '@/components/RewardListModal';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector'; // Use the new component

const RARE_GIF_IDS = ['1', '2', '3']; // IDs that trigger the GIF popup

const Home: React.FC = () => {
  const { keys, addKeys, pullGacha, totalSpins, skipAnimation, setSkipAnimation } = useStore();
  const [result, setResult] = useState<GachaItemType[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardListOpen, setIsRewardListOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  
  const { t, tItem, language, setLanguage } = useTranslation();

  // State for Rare Item Popup
  const [rareItemQueue, setRareItemQueue] = useState<GachaItemType[]>([]);
  const [currentRareItem, setCurrentRareItem] = useState<GachaItemType | null>(null);

  const processGachaResults = (results: GachaItemType[]) => {
    // If "Skip Animation" is checked, show full results immediately
    if (skipAnimation) {
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
        // Basic check for Chinese "Card" character, but also check localized names logic if needed.
        // Since the item object still has the original name/ID, checking the original name is safest for now.
        // Or check ID ranges. But the user logic was "not cards".
        // The original logic checked `!item.name.includes('卡')`.
        // Let's keep it consistent.
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
      alert(t('keys_not_enough'));
      return;
    }

    setIsSpinning(true);
    
    // Simulate spin delay
    await new Promise(resolve => setTimeout(resolve, skipAnimation ? 100 : 800));

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
                  <span className="btnqb">{t('add_10_keys')}</span>
              </a>
              <a href="#" className="btn_tmg2" onClick={(e) => { e.preventDefault(); addKeys(100); }}>
                  <span className="btnqb">{t('add_100_keys')}</span>
              </a>
              <a href="#" className="btn_tmg3" onClick={(e) => { e.preventDefault(); addKeys(500); }}>
                  <span className="btnqb">{t('add_500_keys')}</span>
              </a>
          </div>

          {/* Game Interface */}
          <div className="lotty">
              {/* Decorative GIFs with Translated Names */}
              <div className="gift_1 relative group">
                  <img src="/images/gift_1.gif" alt={tItem(ITEMS.find(i => i.id === '1')!)} />
                  <div className="absolute bottom-2 left-0 right-0 text-center text-white text-sm font-bold drop-shadow-md bg-black/30 rounded px-1">
                      {tItem(ITEMS.find(i => i.id === '1')!)}
                  </div>
              </div>
              <div className="gift_2 relative group">
                  <img src="/images/gift_2.gif" alt={tItem(ITEMS.find(i => i.id === '2')!)} />
                  <div className="absolute bottom-2 left-0 right-0 text-center text-white text-sm font-bold drop-shadow-md bg-black/30 rounded px-1">
                      {tItem(ITEMS.find(i => i.id === '2')!)}
                  </div>
              </div>
              <div className="gift_3 relative group">
                  <img src="/images/gift_3.gif" alt={tItem(ITEMS.find(i => i.id === '3')!)} />
                  <div className="absolute bottom-2 left-0 right-0 text-center text-white text-sm font-bold drop-shadow-md bg-black/30 rounded px-1">
                      {tItem(ITEMS.find(i => i.id === '3')!)}
                  </div>
              </div>
              
              {/* Buttons */}
              <a className="btn_cj1" onClick={() => !isSpinning && handlePull(1)} title={t('draw_1')}></a>
              <a className="btn_cj2" onClick={() => !isSpinning && handlePull(10)} title={t('draw_10')}></a>
              <a className="btn_ck1" onClick={() => setIsRewardListOpen(true)} title={t('view_all')}></a>
              
              {/* CF Point Box Hover Interaction */}
              <a className="btn_fc1" href="#" onClick={(e) => e.preventDefault()}>
                  <img src="/images/fc15.png" alt="CF Points Detail" />
              </a>

              {/* Info */}
              <div className="txt_box2">
                 <p className="txt_num1">{t('remaining_keys')} <span className="jf_7929">{keys}</span></p>
                 <div className="txt_box3" onClick={() => setSkipAnimation(!skipAnimation)}>
                     <a className={skipAnimation ? "cur" : ""}></a>
                     <p>{t('skip_animation')}</p>
                 </div>
              </div>
              
              {/* Total Spins Indicator */}
              <div className="absolute top-[1330px] left-0 w-full text-center pointer-events-none">
                 <span className="text-orange-200 text-lg font-bold drop-shadow-md">{t('total_spins')} <span className="text-yellow-400 text-2xl">{totalSpins}</span> {t('times')}</span>
              </div>
           </div>
       </div>

      {/* Floating Inventory Button & Language Selector */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
           {/* Language Selector */}
           <div className="relative">
             <LanguageSelector />
           </div>

           <Link to="/giftbox" className="bg-orange-500 text-white px-6 py-2 rounded-full text-md font-bold shadow-lg hover:bg-orange-600 transition-colors border-2 border-white flex items-center gap-2">
             <span>🎁</span> {t('gift_box')}
           </Link>
      </div>

      {/* Rare Item GIF Popup */}
      {currentRareItem && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleRarePopupClose} // Close on click outside
        >
           {/* Modal Container */}
           <div 
             className="relative w-[1000px] bg-[#fff5e6] rounded-2xl border-4 border-orange-200 shadow-2xl overflow-hidden px-8 py-6 flex flex-col min-h-[500px] animate-in fade-in zoom-in duration-300"
             onClick={(e) => e.stopPropagation()} // Prevent close on click inside
           >
              
              {/* Header Section */}
              <div className="text-center mb-6 mt-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-4xl font-bold text-[#5c3a21] tracking-wide">
                    {t('congrats')}
                  </h2>
                </div>
                <p className="text-[#8b5a3e] text-sm">
                  {t('gacha_notice')}
                </p>
              </div>

              {/* Content Area - Flexible Center */}
              <div className="flex-1 flex flex-col items-center justify-center w-full mb-6">
                  {/* Item Tile */}
                  <div className="bg-[#e6f2ff] rounded-lg border border-[#cce0ff] flex items-center justify-center mb-4 shadow-sm p-8 w-80 h-80">
                    {RARE_GIF_IDS.includes(currentRareItem.id) ? (
                      <img src={`/images/gift_${currentRareItem.id}.gif`} alt={tItem(currentRareItem)} className="w-full h-full object-contain drop-shadow-md" />
                    ) : (
                      <img src={currentRareItem.image} alt={tItem(currentRareItem)} className="w-full h-full object-contain drop-shadow-md" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className="text-[#3b82f6] font-medium text-center text-xl mt-2 leading-tight flex items-center justify-center">
                     {tItem(currentRareItem)} {currentRareItem.amount ? `x${currentRareItem.amount}` : ''}
                  </div>

                  {/* Button */}
                  <button 
                    onClick={handleRarePopupClose}
                    className="mt-8 px-12 py-3 bg-gradient-to-b from-[#ff9a44] to-[#fc600c] text-white font-bold text-xl rounded-full shadow-[0_4px_0_#b83a00] border border-[#ffcd9e] hover:scale-105 active:scale-95 active:shadow-none active:translate-y-1 transition-all"
                  >
                    {t('receive_reward')}
                  </button>
              </div>

              {/* Footer Note */}
              <div className="mt-auto border-t border-orange-200 pt-4">
                 <p className="text-[#8b5a3e] text-xs leading-relaxed text-left">
                   <span className="font-bold">{t('warm_tips')}</span> {t('warm_tips_content')}
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
