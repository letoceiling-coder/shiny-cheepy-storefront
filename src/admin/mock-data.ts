import type {
  DashboardStats, ParserConfig, ParserStatus, Category, Product,
  AiConfig, AiTask, SchedulerTask, LogEntry, ExcludedWord
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

export const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: `p-${i + 1}`,
  title: ['iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Pro 14"', 'Nike Air Max', 'Кресло офисное', 'Стол IKEA', 'Sony WH-1000XM5', 'iPad Air', 'Кроссовки Adidas', 'Шуруповёрт Bosch', 'Куртка зимняя', 'Диван угловой', 'Монитор Dell 27"', 'Клавиатура Logitech', 'Пылесос Dyson', 'Телевизор LG 55"', 'Наушники AirPods', 'Холодильник Samsung', 'Стиральная машина', 'Микроволновка LG'][i],
  category: ['Электроника', 'Электроника', 'Электроника', 'Одежда', 'Дом и сад', 'Дом и сад', 'Электроника', 'Электроника', 'Одежда', 'Дом и сад', 'Одежда', 'Дом и сад', 'Электроника', 'Электроника', 'Дом и сад', 'Электроника', 'Электроника', 'Дом и сад', 'Дом и сад', 'Дом и сад'][i],
  price: [89990, 74990, 199990, 12990, 15490, 8990, 29990, 54990, 9990, 7490, 18990, 45990, 32990, 5490, 39990, 54990, 19990, 64990, 42990, 8990][i],
  status: (['active', 'active', 'active', 'disabled', 'active', 'pending', 'active', 'active', 'active', 'archived', 'active', 'active', 'active', 'disabled', 'active', 'active', 'pending', 'active', 'active', 'active'] as const)[i],
  source: 'sadovodbaza.ru',
  aiStatus: (['processed', 'processed', 'pending', 'none', 'processed', 'error', 'processed', 'pending', 'processed', 'none', 'processed', 'processed', 'pending', 'none', 'processed', 'processed', 'error', 'processed', 'pending', 'processed'] as const)[i],
  imageUrl: '/placeholder.svg',
  updatedAt: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
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
  { id: 'ew-1', word: 'спам', type: 'word', action: 'delete', matchCount: 45 },
  { id: 'ew-2', word: 'купить дёшево', type: 'phrase', action: 'replace', replacement: '', matchCount: 12 },
  { id: 'ew-3', word: '\\b(реплика|копия)\\b', type: 'regex', action: 'delete', matchCount: 8 },
  { id: 'ew-4', word: 'оригинал 1:1', type: 'phrase', action: 'delete', matchCount: 23 },
  { id: 'ew-5', word: 'бесплатно', type: 'word', action: 'replace', replacement: '', matchCount: 67 },
];
