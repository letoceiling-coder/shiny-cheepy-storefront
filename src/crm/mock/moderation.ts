import { rnd, pick, date, sellerNames } from './helpers';

export interface ModerationItem {
  id: string;
  image: string;
  title: string;
  category: string;
  seller: string;
  sellerId: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  history: { date: string; action: string; moderator: string }[];
}

const titles = ['Куртка демисезонная','Кроссовки беговые','Платье вечернее','Рюкзак городской','Джинсы slim fit','Свитшот оверсайз','Пальто шерстяное','Сумка тоут','Футболка базовая','Ботинки челси'];
const categories = ['Верхняя одежда','Обувь','Платья','Сумки','Джинсы','Свитшоты'];
const reasons = ['Некорректное фото','Запрещённый товар','Неполное описание','Нарушение правил','Дубликат'];
const statuses: ModerationItem['status'][] = ['pending','pending','pending','approved','rejected'];

export const moderationItems: ModerationItem[] = Array.from({ length: 80 }, (_, i) => {
  const status = statuses[i % statuses.length];
  return {
    id: `MOD-${String(i + 1).padStart(4, '0')}`,
    image: `/images/product-${(i % 6) + 1}.jpg`,
    title: titles[i % titles.length],
    category: categories[i % categories.length],
    seller: sellerNames[i % sellerNames.length],
    sellerId: `S${String((i % 10) + 1).padStart(4, '0')}`,
    uploadedAt: date(rnd(0, 30)),
    status,
    rejectReason: status === 'rejected' ? reasons[i % reasons.length] : undefined,
    history: [
      { date: date(rnd(1, 30)), action: 'Загружено продавцом', moderator: '-' },
      ...(status !== 'pending' ? [{ date: date(rnd(0, 5)), action: status === 'approved' ? 'Одобрено' : 'Отклонено', moderator: 'Модератор А.' }] : []),
    ],
  };
});
