import type {
  DashboardStats, ParserConfig, ParserStatus, Category, Product,
  AiConfig, AiTask, SchedulerTask, LogEntry, ExcludedWord,
  AttributeDefinition, ProductAttribute, Brand, FilterConfig, ProductHistoryEntry,
} from './types';

export const mockDashboard: DashboardStats = {
  totalProducts: 12847,
  newToday: 234,
  disabled: 89,
  lastParserRun: '2026-02-27T14:30:00',
  activeTasks: 3,
  errors: 7,
  aiStatus: 'active',
  schedulerStatus: 'running',
};

export const mockParserConfig: ParserConfig = {
  withPhotos: true,
  saveToDB: true,
  previewOnly: false,
  category: '',
  subcategory: '',
  depthLimit: 3,
  recordLimit: 500,
  cronExpression: '0 */6 * * *',
  autoCheckRelevance: true,
  retryOnError: true,
  threadLimit: 4,
};

export const mockParserStatus: ParserStatus = {
  isRunning: false,
  progress: 0,
  currentItem: '',
  processedCount: 0,
  totalCount: 0,
  errors: [],
  startedAt: null,
};

export const mockCategories: Category[] = [
  {
    id: '1', name: 'Электроника', slug: 'electronics', parentId: null,
    enabled: true, linkedToParser: true, order: 0,
    children: [
      { id: '1-1', name: 'Смартфоны', slug: 'smartphones', parentId: '1', enabled: true, linkedToParser: true, order: 0, children: [] },
      { id: '1-2', name: 'Ноутбуки', slug: 'laptops', parentId: '1', enabled: true, linkedToParser: true, order: 1, children: [
        { id: '1-2-1', name: 'Игровые', slug: 'gaming', parentId: '1-2', enabled: true, linkedToParser: false, order: 0, children: [] },
      ]},
    ],
  },
  {
    id: '2', name: 'Одежда', slug: 'clothing', parentId: null,
    enabled: true, linkedToParser: true, order: 1,
    children: [
      { id: '2-1', name: 'Мужская', slug: 'mens', parentId: '2', enabled: true, linkedToParser: true, order: 0, children: [] },
      { id: '2-2', name: 'Женская', slug: 'womens', parentId: '2', enabled: true, linkedToParser: true, order: 1, children: [] },
    ],
  },
  {
    id: '3', name: 'Дом и сад', slug: 'home-garden', parentId: null,
    enabled: false, linkedToParser: false, order: 2, children: [],
  },
];

const productNames = ['iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Pro 14"', 'Nike Air Max', 'Кресло офисное', 'Стол IKEA', 'Sony WH-1000XM5', 'iPad Air', 'Кроссовки Adidas', 'Шуруповёрт Bosch', 'Куртка зимняя', 'Диван угловой', 'Монитор Dell 27"', 'Клавиатура Logitech', 'Пылесос Dyson', 'Телевизор LG 55"', 'Наушники AirPods', 'Холодильник Samsung', 'Стиральная машина', 'Микроволновка LG'];
const productCategories = ['Электроника', 'Электроника', 'Электроника', 'Одежда', 'Дом и сад', 'Дом и сад', 'Электроника', 'Электроника', 'Одежда', 'Дом и сад', 'Одежда', 'Дом и сад', 'Электроника', 'Электроника', 'Дом и сад', 'Электроника', 'Электроника', 'Дом и сад', 'Дом и сад', 'Дом и сад'];
const productPrices = [89990, 74990, 199990, 12990, 15490, 8990, 29990, 54990, 9990, 7490, 18990, 45990, 32990, 5490, 39990, 54990, 19990, 64990, 42990, 8990];
const productStatuses: Product['status'][] = ['active', 'active', 'active', 'disabled', 'active', 'pending', 'active', 'active', 'active', 'archived', 'active', 'active', 'active', 'disabled', 'active', 'active', 'pending', 'active', 'active', 'active'];
const productAiStatuses: Product['aiStatus'][] = ['processed', 'processed', 'pending', 'none', 'processed', 'error', 'processed', 'pending', 'processed', 'none', 'processed', 'processed', 'pending', 'none', 'processed', 'processed', 'error', 'processed', 'pending', 'processed'];

export const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: `p-${i + 1}`,
  title: productNames[i],
  slug: productNames[i].toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-'),
  category: productCategories[i],
  subcategory: '',
  price: productPrices[i],
  oldPrice: i % 3 === 0 ? Math.round(productPrices[i] * 1.2) : undefined,
  currency: 'RUB',
  availability: (i % 5 === 0 ? 'out_of_stock' : 'in_stock') as Product['availability'],
  quantity: i % 5 === 0 ? 0 : Math.floor(Math.random() * 100) + 1,
  status: productStatuses[i],
  source: 'sadovodbaza.ru',
  aiStatus: productAiStatuses[i],
  imageUrl: '/placeholder.svg',
  images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  description: `Описание товара ${productNames[i]}. Высокое качество, доставка по России.`,
  brandId: i < 3 ? 'b-1' : i < 6 ? 'b-2' : i < 9 ? 'b-3' : null,
  updatedAt: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
  parsedAt: new Date(Date.now() - Math.random() * 14 * 86400000).toISOString(),
  relevanceCheckedAt: i % 2 === 0 ? new Date(Date.now() - Math.random() * 2 * 86400000).toISOString() : null,
}));

export const mockAiConfig: AiConfig = {
  apiKey: '••••••••••••••••',
  model: 'gpt-4o',
  tokenLimit: 4096,
  enabled: true,
};

export const mockAiTasks: AiTask[] = [
  { id: 'ai-1', type: 'title', status: 'done', productId: 'p-1', createdAt: '2026-02-27T10:00:00' },
  { id: 'ai-2', type: 'description', status: 'processing', productId: 'p-3', createdAt: '2026-02-27T14:20:00' },
  { id: 'ai-3', type: 'seo', status: 'queued', productId: 'p-5', createdAt: '2026-02-27T14:25:00' },
  { id: 'ai-4', type: 'moderation', status: 'error', productId: 'p-6', createdAt: '2026-02-27T13:00:00' },
  { id: 'ai-5', type: 'image', status: 'queued', productId: 'p-8', createdAt: '2026-02-27T14:30:00' },
];

export const mockSchedulerTasks: SchedulerTask[] = [
  { id: 's-1', name: 'Парсинг sadovodbaza.ru', type: 'parsing', cronExpression: '0 */6 * * *', enabled: true, lastRun: '2026-02-27T12:00:00', nextRun: '2026-02-27T18:00:00', status: 'idle' },
  { id: 's-2', name: 'Проверка актуальности', type: 'relevance', cronExpression: '0 3 * * *', enabled: true, lastRun: '2026-02-27T03:00:00', nextRun: '2026-02-28T03:00:00', status: 'idle' },
  { id: 's-3', name: 'AI обработка новых', type: 'ai_processing', cronExpression: '*/30 * * * *', enabled: false, lastRun: null, nextRun: '—', status: 'idle' },
];

export const mockLogs: LogEntry[] = [
  { id: 'l-1', timestamp: '2026-02-27T14:35:12', level: 'info', module: 'Parser', message: 'Парсинг завершён: 234 записей' },
  { id: 'l-2', timestamp: '2026-02-27T14:30:00', level: 'info', module: 'Scheduler', message: 'Задача "Парсинг" запущена' },
  { id: 'l-3', timestamp: '2026-02-27T14:28:15', level: 'warn', module: 'AI', message: 'Rate limit approaching: 89/100 requests' },
  { id: 'l-4', timestamp: '2026-02-27T14:20:00', level: 'error', module: 'Parser', message: 'Ошибка загрузки страницы: timeout', details: 'URL: https://sadovodbaza.ru/category/tools?page=15' },
  { id: 'l-5', timestamp: '2026-02-27T13:55:00', level: 'info', module: 'Relevance', message: 'Проверено 150 объявлений, 3 отключены' },
  { id: 'l-6', timestamp: '2026-02-27T13:00:00', level: 'error', module: 'AI', message: 'Модерация: ошибка обработки p-6', details: 'Invalid response from OpenAI' },
  { id: 'l-7', timestamp: '2026-02-27T12:00:00', level: 'info', module: 'System', message: 'Система запущена' },
];

export const mockExcludedWords: ExcludedWord[] = [
  { id: 'ew-1', word: 'спам', type: 'word', action: 'delete', matchCount: 45, scope: 'global' },
  { id: 'ew-2', word: 'купить дёшево', type: 'phrase', action: 'replace', replacement: '', matchCount: 12, scope: 'global' },
  { id: 'ew-3', word: '\\b(реплика|копия)\\b', type: 'regex', action: 'delete', matchCount: 8, scope: 'global' },
  { id: 'ew-4', word: 'оригинал 1:1', type: 'phrase', action: 'delete', matchCount: 23, scope: 'category', categoryId: '2' },
  { id: 'ew-5', word: 'бесплатно', type: 'word', action: 'replace', replacement: '', matchCount: 67, scope: 'global' },
  { id: 'ew-6', word: 'акция', type: 'word', action: 'flag', matchCount: 15, scope: 'temporary', expiresAt: '2026-04-01T00:00:00' },
  { id: 'ew-7', word: 'суперцена', type: 'word', action: 'hide', matchCount: 9, scope: 'product_type', productType: 'Электроника' },
];

// ===== Attributes =====

export const mockAttributes: AttributeDefinition[] = [
  { id: 'a-1', name: 'Цвет', slug: 'color', type: 'select', options: ['Черный', 'Белый', 'Серый', 'Синий', 'Красный', 'Зеленый', 'Розовый'], required: false, filterable: true, order: 0 },
  { id: 'a-2', name: 'Размер', slug: 'size', type: 'select', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'], required: false, filterable: true, order: 1 },
  { id: 'a-3', name: 'Бренд', slug: 'brand', type: 'string', required: false, filterable: true, order: 2 },
  { id: 'a-4', name: 'Пол', slug: 'gender', type: 'select', options: ['Мужской', 'Женский', 'Детский', 'Унисекс'], required: false, filterable: true, order: 3 },
  { id: 'a-5', name: 'Материал', slug: 'material', type: 'string', required: false, filterable: true, order: 4 },
  { id: 'a-6', name: 'Состав', slug: 'composition', type: 'text', required: false, filterable: false, order: 5 },
  { id: 'a-7', name: 'Вес', slug: 'weight', type: 'number', unit: 'кг', required: false, filterable: true, order: 6 },
  { id: 'a-8', name: 'Объем', slug: 'volume', type: 'number', unit: 'л', required: false, filterable: false, order: 7 },
  { id: 'a-9', name: 'Габариты', slug: 'dimensions', type: 'string', required: false, filterable: false, order: 8 },
  { id: 'a-10', name: 'Мощность', slug: 'power', type: 'number', unit: 'Вт', required: false, filterable: true, order: 9 },
  { id: 'a-11', name: 'Диагональ', slug: 'display_size', type: 'number', unit: '"', required: false, filterable: true, order: 10 },
  { id: 'a-12', name: 'Процессор', slug: 'cpu', type: 'string', required: false, filterable: true, order: 11 },
  { id: 'a-13', name: 'ОЗУ', slug: 'ram', type: 'select', options: ['4 ГБ', '8 ГБ', '16 ГБ', '32 ГБ', '64 ГБ'], required: false, filterable: true, order: 12 },
  { id: 'a-14', name: 'Накопитель', slug: 'storage', type: 'select', options: ['64 ГБ', '128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ', '2 ТБ'], required: false, filterable: true, order: 13 },
  { id: 'a-15', name: 'Кол-во в упаковке', slug: 'pack_qty', type: 'number', required: false, filterable: false, order: 14 },
  { id: 'a-16', name: 'Страна производства', slug: 'country', type: 'select', options: ['Китай', 'Россия', 'Германия', 'США', 'Южная Корея', 'Япония', 'Вьетнам'], required: false, filterable: true, order: 15 },
  { id: 'a-17', name: 'Гарантия', slug: 'warranty', type: 'select', options: ['6 мес', '1 год', '2 года', '3 года', '5 лет'], required: false, filterable: true, order: 16 },
];

export const mockProductAttributes: Record<string, ProductAttribute[]> = {
  'p-1': [
    { attributeId: 'a-1', value: 'Черный' },
    { attributeId: 'a-14', value: '256 ГБ' },
    { attributeId: 'a-13', value: '8 ГБ' },
    { attributeId: 'a-16', value: 'Китай' },
    { attributeId: 'a-17', value: '1 год' },
    { attributeId: 'a-11', value: 6.1 },
    { attributeId: 'a-12', value: 'A17 Pro' },
  ],
  'p-2': [
    { attributeId: 'a-1', value: 'Серый' },
    { attributeId: 'a-14', value: '128 ГБ' },
    { attributeId: 'a-13', value: '8 ГБ' },
    { attributeId: 'a-16', value: 'Южная Корея' },
    { attributeId: 'a-11', value: 6.2 },
  ],
  'p-4': [
    { attributeId: 'a-1', value: 'Белый' },
    { attributeId: 'a-2', value: '42' },
    { attributeId: 'a-4', value: 'Унисекс' },
    { attributeId: 'a-5', value: 'Текстиль' },
    { attributeId: 'a-16', value: 'Вьетнам' },
  ],
};

// ===== Brands =====

export const mockBrands: Brand[] = [
  { id: 'b-1', name: 'Apple', slug: 'apple', logoUrl: '/placeholder.svg', description: 'Технологическая компания', status: 'active', seoTitle: 'Apple — купить технику Apple', seoDescription: 'Каталог техники Apple', categoryIds: ['1'] },
  { id: 'b-2', name: 'Samsung', slug: 'samsung', logoUrl: '/placeholder.svg', description: 'Электроника и бытовая техника', status: 'active', seoTitle: 'Samsung — каталог', seoDescription: 'Товары Samsung', categoryIds: ['1', '3'] },
  { id: 'b-3', name: 'Nike', slug: 'nike', logoUrl: '/placeholder.svg', description: 'Спортивная одежда и обувь', status: 'active', seoTitle: 'Nike — спортивные товары', seoDescription: 'Каталог Nike', categoryIds: ['2'] },
  { id: 'b-4', name: 'Bosch', slug: 'bosch', logoUrl: '/placeholder.svg', description: 'Инструменты и бытовая техника', status: 'active', seoTitle: 'Bosch', seoDescription: 'Товары Bosch', categoryIds: ['3'] },
  { id: 'b-5', name: 'IKEA', slug: 'ikea', logoUrl: '/placeholder.svg', description: 'Мебель и товары для дома', status: 'disabled', seoTitle: 'IKEA', seoDescription: 'Мебель IKEA', categoryIds: ['3'] },
];

// ===== Filters =====

export const mockFilters: FilterConfig[] = [
  { id: 'f-1', attributeId: 'a-1', categoryId: '1', displayType: 'checkbox', enabled: true, order: 0 },
  { id: 'f-2', attributeId: 'a-13', categoryId: '1', displayType: 'checkbox', enabled: true, order: 1 },
  { id: 'f-3', attributeId: 'a-14', categoryId: '1', displayType: 'checkbox', enabled: true, order: 2 },
  { id: 'f-4', attributeId: 'a-16', categoryId: '1', displayType: 'select', enabled: true, order: 3 },
  { id: 'f-5', attributeId: 'a-1', categoryId: '2', displayType: 'checkbox', enabled: true, order: 0 },
  { id: 'f-6', attributeId: 'a-2', categoryId: '2', displayType: 'checkbox', enabled: true, order: 1 },
  { id: 'f-7', attributeId: 'a-4', categoryId: '2', displayType: 'checkbox', enabled: true, order: 2 },
  { id: 'f-8', attributeId: 'a-5', categoryId: '2', displayType: 'select', enabled: true, order: 3 },
];

// ===== Product History =====

export const mockProductHistory: Record<string, ProductHistoryEntry[]> = {
  'p-1': [
    { id: 'h-1', productId: 'p-1', timestamp: '2026-02-27T14:00:00', field: 'price', oldValue: '94990', newValue: '89990', source: 'parser' },
    { id: 'h-2', productId: 'p-1', timestamp: '2026-02-26T10:00:00', field: 'title', oldValue: 'iPhone 15 Pro Max', newValue: 'iPhone 15 Pro', source: 'ai' },
    { id: 'h-3', productId: 'p-1', timestamp: '2026-02-25T08:00:00', field: 'status', oldValue: 'pending', newValue: 'active', source: 'manual' },
    { id: 'h-4', productId: 'p-1', timestamp: '2026-02-24T12:00:00', field: 'description', oldValue: '(пусто)', newValue: 'Описание товара iPhone 15 Pro...', source: 'ai' },
  ],
  'p-3': [
    { id: 'h-5', productId: 'p-3', timestamp: '2026-02-27T12:00:00', field: 'price', oldValue: '209990', newValue: '199990', source: 'parser' },
  ],
};
