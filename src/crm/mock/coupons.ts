import { rnd, date } from './helpers';

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  minOrder: number;
  maxUses: number;
  usedCount: number;
  target: 'all' | 'new' | 'vip';
  expiresAt: string;
  active: boolean;
  createdAt: string;
}

export const coupons: Coupon[] = [
  { id: 'C1', code: 'WELCOME10', discount: 10, type: 'percent', minOrder: 0, maxUses: 5000, usedCount: 1280, target: 'new', expiresAt: '2025-12-31', active: true, createdAt: '2025-01-01' },
  { id: 'C2', code: 'SALE500', discount: 500, type: 'fixed', minOrder: 3000, maxUses: 500, usedCount: 450, target: 'all', expiresAt: '2025-02-28', active: false, createdAt: '2025-01-01' },
  { id: 'C3', code: 'SPRING20', discount: 20, type: 'percent', minOrder: 2000, maxUses: 1000, usedCount: 342, target: 'all', expiresAt: '2025-04-01', active: true, createdAt: '2025-02-15' },
  { id: 'C4', code: 'VIP2000', discount: 2000, type: 'fixed', minOrder: 10000, maxUses: 100, usedCount: 15, target: 'vip', expiresAt: '2025-05-01', active: true, createdAt: '2025-02-01' },
  { id: 'C5', code: 'NEWUSER15', discount: 15, type: 'percent', minOrder: 1500, maxUses: 2000, usedCount: 680, target: 'new', expiresAt: '2025-06-30', active: true, createdAt: '2025-01-15' },
  { id: 'C6', code: 'FLASH30', discount: 30, type: 'percent', minOrder: 5000, maxUses: 200, usedCount: 200, target: 'all', expiresAt: '2025-03-01', active: false, createdAt: '2025-02-20' },
  { id: 'C7', code: 'FREESHIP', discount: 299, type: 'fixed', minOrder: 2000, maxUses: 3000, usedCount: 1100, target: 'all', expiresAt: '2025-12-31', active: true, createdAt: '2025-01-01' },
  { id: 'C8', code: 'LOYAL1000', discount: 1000, type: 'fixed', minOrder: 5000, maxUses: 500, usedCount: 89, target: 'vip', expiresAt: '2025-08-01', active: true, createdAt: '2025-03-01' },
];
