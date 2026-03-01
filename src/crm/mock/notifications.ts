import { rnd, date } from './helpers';

export interface Notification {
  id: string;
  type: 'order' | 'moderation' | 'payment' | 'system' | 'seller' | 'review';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const types: Notification['type'][] = ['order','moderation','payment','system','seller','review'];
const titles: Record<Notification['type'], string[]> = {
  order: ['Новый заказ','Заказ отменён','Заказ доставлен'],
  moderation: ['Товар на модерации','Товар отклонён','Жалоба на товар'],
  payment: ['Платёж получен','Ошибка платежа','Возврат средств'],
  system: ['Обновление системы','Плановое ТО','Новая функция'],
  seller: ['Новый продавец','Жалоба на продавца','Документы продавца'],
  review: ['Новый отзыв','Жалоба на отзыв','Ответ продавца'],
};

export const notifications: Notification[] = Array.from({ length: 50 }, (_, i) => {
  const type = types[i % types.length];
  const title = titles[type][i % titles[type].length];
  return {
    id: `N-${String(i + 1).padStart(4, '0')}`,
    type,
    title,
    message: `Подробная информация о событии "${title.toLowerCase()}" требует вашего внимания.`,
    read: i > 10,
    createdAt: date(rnd(0, 14)),
  };
});
