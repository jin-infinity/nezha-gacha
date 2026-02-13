import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ITEMS, GachaItem, InventoryItem } from '@/types';

interface GachaState {
  keys: number;
  totalSpins: number;
  inventory: InventoryItem[];
  addKeys: (amount: number) => void;
  removeKeys: (amount: number) => void;
  pullGacha: (count: number) => GachaItem[];
  clearInventory: () => void;
}

// CF Point Chest ID from ITEMS
const CFP_CHEST_ID = '14';

// Character IDs for 1000-spin pity
const CHARACTER_IDS = ['3']; // 神威莲华

// Rare IDs for 500-spin pity
const RARE_IDS = ['1', '2', '3'];

const resolveGachaItem = (item: GachaItem): GachaItem => {
  if (item.id === CFP_CHEST_ID) {
    const rand = Math.random() * 100;
    let amount = 3000;
    // 10% 18000, 20% 8000, 30% 5000, 40% 3000
    if (rand < 10) amount = 18000;
    else if (rand < 30) amount = 8000;
    else if (rand < 60) amount = 5000;
    else amount = 3000;

    return {
      ...item,
      id: `cfp-${amount}`, // Unique ID for inventory stacking
      name: `${amount} CF点`,
      image: '/images/cfp.png',
      amount: amount,
      isDisplayedInPool: false, // Result item doesn't need to be in pool display logic
    };
  }
  return item;
};

export const useStore = create<GachaState>()(
  persist(
    (set, get) => ({
      keys: 0,
      totalSpins: 0,
      inventory: [],
      addKeys: (amount) => set((state) => ({ keys: state.keys + amount })),
      removeKeys: (amount) => set((state) => ({ keys: Math.max(0, state.keys - amount) })),
      clearInventory: () => set({ inventory: [], totalSpins: 0 }), // Also reset totalSpins on clear as requested ("reset toàn bộ")
      
      pullGacha: (count) => {
        const { keys, removeKeys, totalSpins } = get();
        if (keys < count) return [];

        removeKeys(count);

        const results: GachaItem[] = [];
        let currentSpins = totalSpins;

        for (let i = 0; i < count; i++) {
          currentSpins++;
          let selectedItem: GachaItem;

          // Pity Logic
          if (currentSpins % 1000 === 0) {
            // Guarantee Character (ID 3)
            const characters = ITEMS.filter(item => CHARACTER_IDS.includes(item.id));
            selectedItem = characters[Math.floor(Math.random() * characters.length)];
          } else if (currentSpins % 500 === 0) {
            // Guarantee Rare (ID 1, 2, or 3)
            const rareItems = ITEMS.filter(item => RARE_IDS.includes(item.id));
            selectedItem = rareItems[Math.floor(Math.random() * rareItems.length)];
          } else {
            // Standard Weighted Random
            const rand = Math.random() * 100;
            let accumulatedProbability = 0;
            selectedItem = ITEMS[ITEMS.length - 1]; // Default fallback

            for (const item of ITEMS) {
              accumulatedProbability += item.probability;
              if (rand <= accumulatedProbability) {
                selectedItem = item;
                break;
              }
            }
          }

          // Resolve dynamic items (like CF Chest)
          results.push(resolveGachaItem(selectedItem));
        }

        // Add to inventory and update total spins
        set((state) => {
          const newInventory = [...state.inventory];
          results.forEach((item) => {
            const existingItem = newInventory.find((i) => i.item.id === item.id);
            if (existingItem) {
              existingItem.count += 1;
              existingItem.obtainedAt = Date.now(); // Update time
            } else {
              newInventory.push({ item, count: 1, obtainedAt: Date.now() });
            }
          });
          return { 
            inventory: newInventory,
            totalSpins: currentSpins
          };
        });

        return results;
      },
    }),
    {
      name: 'gacha-storage',
    }
  )
);
