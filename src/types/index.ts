export interface GachaItem {
  id: string;
  name: string;
  image: string;
  rarity: 'high' | 'medium' | 'low';
  probability: number; // percentage
  badge?: string;
  isDisplayedInPool: boolean;
  amount?: number;
}

export interface UserState {
  keys: number;
  inventory: InventoryItem[];
  addKeys: (amount: number) => void;
  addItem: (item: GachaItem) => void;
  removeKeys: (amount: number) => void;
  clearInventory: () => void;
}

export interface InventoryItem {
  item: GachaItem;
  count: number;
  obtainedAt: number;
}

export const ITEMS: GachaItem[] = [
  // Top Tier (0.01% - 0.60%)
  { id: '1', name: '神威核心x1', image: '/images/gift_1.gif', rarity: 'high', probability: 0.01, badge: '极稀有', isDisplayedInPool: true },
  { id: '2', name: '神威天绫', image: '/images/gift_2.gif', rarity: 'high', probability: 0.05, badge: '首发', isDisplayedInPool: true },
  { id: '3', name: '神威莲华', image: '/images/gift_3.gif', rarity: 'high', probability: 0.05, badge: '首发', isDisplayedInPool: true },
  { id: '4', name: '炽芒蝶刃', image: '/images/polc5.png', rarity: 'high', probability: 0.30, isDisplayedInPool: true },
  { id: '5', name: '炽渊之怒', image: '/images/polc6.png', rarity: 'high', probability: 0.35, isDisplayedInPool: true },
  { id: '6', name: 'Scar Light-白虎', image: '/images/polc7.png', rarity: 'high', probability: 0.40, isDisplayedInPool: true },
  { id: '7', name: 'Scar Light-白虎 音效卡', image: '/images/polc8.png', rarity: 'high', probability: 0.50, badge: '不可交易', isDisplayedInPool: true },
  { id: '8', name: '灵狐者-职业经理', image: '/images/polc9.png', rarity: 'high', probability: 0.50, badge: '唯一性', isDisplayedInPool: true },
  { id: '9', name: '无影-华夏传说 皮肤', image: '/images/polc10.png', rarity: 'high', probability: 0.60, badge: '首发 | 不可交易', isDisplayedInPool: true },
  
  // Medium Tier (1.00% - 5.54%)
  { id: '10', name: '降世魔童', image: '/images/polc11.png', rarity: 'medium', probability: 1.00, isDisplayedInPool: true },
  { id: '11', name: '哪吒玩偶', image: '/images/polc12.png', rarity: 'medium', probability: 1.60, isDisplayedInPool: true },
  { id: '12', name: '属性抽取券x1', image: '/images/polc13.png', rarity: 'medium', probability: 1.00, isDisplayedInPool: true },
  { id: '13', name: '王者之石x10', image: '/images/kingstone.PNG', rarity: 'medium', probability: 1.00, isDisplayedInPool: false },
  { id: '14', name: '随机CF点宝箱', image: '/images/cfp.png', rarity: 'medium', probability: 5.54, isDisplayedInPool: true },
  { id: '15', name: '金乌专属盲盒x1', image: '/images/polc18.png', rarity: 'medium', probability: 2.00, isDisplayedInPool: true },
  { id: '16', name: '神威卡x1', image: '/images/zome1(1).png', rarity: 'medium', probability: 0.10, isDisplayedInPool: false },
  { id: '17', name: '王者卡x1', image: '/images/zome2.png', rarity: 'medium', probability: 2.00, isDisplayedInPool: false },
  { id: '18', name: '英雄卡x1', image: '/images/zome3.png', rarity: 'medium', probability: 5.00, isDisplayedInPool: false },

  // Low Tier (39.00%)
  { id: '19', name: '道具卡x1', image: '/images/zome4.png', rarity: 'low', probability: 39.00, isDisplayedInPool: false },
  { id: '20', name: '金马卡x1', image: '/images/zome3.png', rarity: 'low', probability: 39.00, isDisplayedInPool: false },
];
