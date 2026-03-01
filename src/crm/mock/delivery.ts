export interface DeliveryMethod {
  id: string;
  name: string;
  type: 'courier' | 'pickup' | 'post' | 'pvz';
  cost: number;
  freeFrom: number;
  daysMin: number;
  daysMax: number;
  active: boolean;
  regionRestrictions: string[];
}

export interface DeliveryProvider {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected';
  apiKey: string;
  webhookUrl: string;
  lastSync: string;
}

export const deliveryMethods: DeliveryMethod[] = [
  { id: 'DM1', name: 'Курьер по городу', type: 'courier', cost: 299, freeFrom: 5000, daysMin: 1, daysMax: 2, active: true, regionRestrictions: [] },
  { id: 'DM2', name: 'Самовывоз из магазина', type: 'pickup', cost: 0, freeFrom: 0, daysMin: 0, daysMax: 1, active: true, regionRestrictions: [] },
  { id: 'DM3', name: 'Почта России', type: 'post', cost: 350, freeFrom: 10000, daysMin: 5, daysMax: 14, active: true, regionRestrictions: [] },
  { id: 'DM4', name: 'ПВЗ СДЭК', type: 'pvz', cost: 199, freeFrom: 3000, daysMin: 2, daysMax: 5, active: true, regionRestrictions: [] },
  { id: 'DM5', name: 'Boxberry', type: 'pvz', cost: 249, freeFrom: 4000, daysMin: 3, daysMax: 7, active: false, regionRestrictions: ['Крым'] },
];

export const deliveryProviders: DeliveryProvider[] = [
  { id: 'DP1', name: 'СДЭК', logo: '📦', status: 'connected', apiKey: 'cdek_***_8f3a', webhookUrl: 'https://api.cheepy.ru/webhooks/cdek', lastSync: '2025-02-28' },
  { id: 'DP2', name: 'Почта России', logo: '✉️', status: 'connected', apiKey: 'post_***_2b1c', webhookUrl: 'https://api.cheepy.ru/webhooks/post', lastSync: '2025-02-27' },
  { id: 'DP3', name: 'DHL', logo: '🚀', status: 'disconnected', apiKey: '', webhookUrl: '', lastSync: '-' },
  { id: 'DP4', name: 'FedEx', logo: '📮', status: 'disconnected', apiKey: '', webhookUrl: '', lastSync: '-' },
  { id: 'DP5', name: 'Boxberry', logo: '📪', status: 'connected', apiKey: 'bbox_***_9d4e', webhookUrl: 'https://api.cheepy.ru/webhooks/boxberry', lastSync: '2025-02-26' },
  { id: 'DP6', name: 'Новая Почта', logo: '📨', status: 'disconnected', apiKey: '', webhookUrl: '', lastSync: '-' },
];
