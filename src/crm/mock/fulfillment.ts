import { rnd, pick, date, sellerNames, firstNames, lastNames } from './helpers';

export interface FulfillmentOrder {
  id: string;
  orderId: string;
  customer: string;
  seller: string;
  items: number;
  status: 'pending' | 'picking' | 'packing' | 'shipped' | 'in_transit' | 'delivered' | 'returned';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

const carriers = ['СДЭК', 'Почта России', 'Boxberry', 'DPD', 'Курьер'];
const statuses: FulfillmentOrder['status'][] = ['pending','picking','packing','shipped','in_transit','delivered','returned'];

export const fulfillmentOrders: FulfillmentOrder[] = Array.from({ length: 100 }, (_, i) => ({
  id: `FUL-${String(i + 1).padStart(4, '0')}`,
  orderId: `ORD-2025-${String(i + 1).padStart(4, '0')}`,
  customer: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  seller: sellerNames[i % sellerNames.length],
  items: rnd(1, 5),
  status: statuses[i % statuses.length],
  trackingNumber: statuses[i % statuses.length] !== 'pending' ? `TRK${rnd(100000000, 999999999)}` : '',
  carrier: pick(carriers),
  estimatedDelivery: date(-rnd(1, 14)),
  createdAt: date(rnd(0, 30)),
  updatedAt: date(rnd(0, 10)),
}));

export const fulfillmentStats = {
  pending: fulfillmentOrders.filter(o => o.status === 'pending').length,
  picking: fulfillmentOrders.filter(o => o.status === 'picking').length,
  packing: fulfillmentOrders.filter(o => o.status === 'packing').length,
  shipped: fulfillmentOrders.filter(o => o.status === 'shipped').length,
  inTransit: fulfillmentOrders.filter(o => o.status === 'in_transit').length,
  delivered: fulfillmentOrders.filter(o => o.status === 'delivered').length,
  returned: fulfillmentOrders.filter(o => o.status === 'returned').length,
};
