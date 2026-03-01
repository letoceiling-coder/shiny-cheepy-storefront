import { rnd, date } from './helpers';

export interface MarketingChannel {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  subscribers: number;
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  audience: 'all' | 'new' | 'vip' | 'inactive';
  audienceSize: number;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  sentCount: number;
  openRate: number;
  clickRate: number;
  scheduledAt: string;
  createdAt: string;
  content: string;
}

export const channels: MarketingChannel[] = [
  { id: 'CH1', name: 'Email', icon: '📧', connected: true, subscribers: 15420 },
  { id: 'CH2', name: 'Telegram', icon: '✈️', connected: true, subscribers: 8300 },
  { id: 'CH3', name: 'WhatsApp', icon: '💬', connected: false, subscribers: 0 },
  { id: 'CH4', name: 'VK', icon: '🔵', connected: true, subscribers: 4200 },
];

const campaignStatuses: Campaign['status'][] = ['sent','sent','sent','scheduled','draft','sending'];

export const campaigns: Campaign[] = Array.from({ length: 20 }, (_, i) => ({
  id: `CMP-${String(i + 1).padStart(3, '0')}`,
  name: [
    'Весенняя распродажа', 'Новая коллекция', 'Flash Sale Weekend', 'Скидки для VIP',
    'Приветственное письмо', 'Брошенная корзина', 'Новые поступления', 'Программа лояльности',
    'День рождения клиента', 'Рекомендации товаров', 'Ликвидация склада', 'Летний сезон',
    'Чёрная пятница', 'Новогодняя акция', 'Розыгрыш призов', 'Обновление каталога',
    'Отзывы клиентов', 'Реактивация', 'Cross-sell', 'Партнёрская акция',
  ][i],
  channel: channels[i % channels.length].name,
  audience: (['all', 'new', 'vip', 'inactive'] as const)[i % 4],
  audienceSize: rnd(500, 15000),
  status: campaignStatuses[i % campaignStatuses.length],
  sentCount: campaignStatuses[i % campaignStatuses.length] === 'sent' ? rnd(500, 12000) : 0,
  openRate: rnd(15, 65),
  clickRate: rnd(2, 25),
  scheduledAt: date(-rnd(0, 30)),
  createdAt: date(rnd(0, 60)),
  content: 'Шаблон рассылки с персонализированным контентом...',
}));
