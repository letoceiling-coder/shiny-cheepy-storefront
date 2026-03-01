import { rnd, date, sellerNames } from './helpers';

export interface SellerPayout {
  id: string;
  sellerId: string;
  sellerName: string;
  balance: number;
  commission: number;
  pendingAmount: number;
  totalPaid: number;
}

export interface PayoutRecord {
  id: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  commission: number;
  net: number;
  status: 'completed' | 'pending' | 'processing' | 'failed';
  method: string;
  createdAt: string;
}

export const sellerPayouts: SellerPayout[] = sellerNames.map((name, i) => ({
  id: `SP-${String(i + 1).padStart(4, '0')}`,
  sellerId: `S${String(i + 1).padStart(4, '0')}`,
  sellerName: name,
  balance: rnd(10000, 500000),
  commission: rnd(5, 20),
  pendingAmount: rnd(5000, 100000),
  totalPaid: rnd(100000, 3000000),
}));

const payoutStatuses: PayoutRecord['status'][] = ['completed','completed','completed','pending','processing','failed'];

export const payoutHistory: PayoutRecord[] = Array.from({ length: 60 }, (_, i) => {
  const amount = rnd(10000, 200000);
  const commission = rnd(5, 15);
  return {
    id: `PO-${String(i + 1).padStart(4, '0')}`,
    sellerId: `S${String((i % 10) + 1).padStart(4, '0')}`,
    sellerName: sellerNames[i % sellerNames.length],
    amount,
    commission,
    net: Math.round(amount * (1 - commission / 100)),
    status: payoutStatuses[i % payoutStatuses.length],
    method: ['Банковский перевод', 'PayPal', 'Stripe'][i % 3],
    createdAt: date(rnd(0, 120)),
  };
});
