# План полной интеграции API: sadavod.loc ↔ Cheepy Admin Panel

**Дата**: 25 февраля 2026  
**Проект-источник**: `C:\OSPanel\domains\sadavod` (http://sadavod.loc/)  
**Проект-потребитель**: `C:\OSPanel\domains\cheepy` (https://cheepy.siteaccess.ru/)  
**Донор данных**: https://sadovodbaza.ru/

---

## 📋 ОБЗОР АРХИТЕКТУРЫ

```
┌─────────────────────────────────────────────────────────────┐
│              sadovodbaza.ru (внешний донор)                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP парсинг
                          ▼
┌─────────────────────────────────────────────────────────────┐
│           sadavod.loc (PHP Backend API)                     │
│  ┌─────────────┐  ┌──────────┐  ┌──────────────────────┐   │
│  │  Parser     │  │ Database │  │  REST API (JSON)      │   │
│  │  Engine     │→ │  SQLite/ │→ │  /api/v1/*            │   │
│  │  (existing) │  │  MySQL   │  │                      │   │
│  └─────────────┘  └──────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │ fetch() / axios
                          ▼
┌─────────────────────────────────────────────────────────────┐
│           Cheepy React Frontend                             │
│  ┌──────────────┐  ┌──────────────────────────────────────┐ │
│  │  Admin Panel │  │  User Pages                          │ │
│  │  /admin/*    │  │  /category/* /product/* /seller/*    │ │
│  └──────────────┘  └──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 ЧАСТЬ 1: СТРУКТУРА ФАЙЛОВ BACKEND (sadavod.loc)

```
C:\OSPanel\domains\sadavod\
├── public/                          # webroot (http://sadavod.loc/)
│   ├── index.php                    # frontend каталог (существующий)
│   ├── bootstrap.php                # bootstrap (существующий)
│   └── api/                         # REST API
│       ├── v1/                      # API v1
│       │   ├── index.php            # роутер всех запросов
│       │   ├── auth.php             # /api/v1/auth/*
│       │   ├── parser.php           # /api/v1/parser/*
│       │   ├── products.php         # /api/v1/products/*
│       │   ├── categories.php       # /api/v1/categories/*
│       │   ├── sellers.php          # /api/v1/sellers/*
│       │   ├── brands.php           # /api/v1/brands/*
│       │   ├── filters.php          # /api/v1/filters/*
│       │   ├── excluded.php         # /api/v1/excluded/*
│       │   ├── scheduler.php        # /api/v1/scheduler/*
│       │   ├── ai.php               # /api/v1/ai/*
│       │   ├── logs.php             # /api/v1/logs/*
│       │   ├── settings.php         # /api/v1/settings/*
│       │   ├── roles.php            # /api/v1/roles/*
│       │   └── dashboard.php        # /api/v1/dashboard/*
│       ├── menu.php                 # существующий
│       └── products.php             # существующий
├── app/
│   ├── Services/
│   │   └── SadovodParser/           # существующие парсеры
│   │       ├── SadovodParserService.php
│   │       ├── HttpClient.php
│   │       └── Parsers/
│   │           ├── MenuParser.php
│   │           ├── CatalogParser.php
│   │           ├── ProductParser.php
│   │           └── SellerParser.php
│   ├── Api/                         # НОВОЕ: API слой
│   │   ├── Router.php               # HTTP роутер
│   │   ├── Request.php              # Обертка HTTP запроса
│   │   ├── Response.php             # JSON ответы
│   │   ├── Middleware/
│   │   │   ├── AuthMiddleware.php   # JWT аутентификация
│   │   │   ├── CorsMiddleware.php   # CORS для React
│   │   │   └── RateLimitMiddleware.php
│   │   └── Controllers/
│   │       ├── AuthController.php
│   │       ├── DashboardController.php
│   │       ├── ParserController.php
│   │       ├── ProductsController.php
│   │       ├── CategoriesController.php
│   │       ├── SellersController.php
│   │       ├── BrandsController.php
│   │       ├── FiltersController.php
│   │       ├── ExcludedController.php
│   │       ├── SchedulerController.php
│   │       ├── AiController.php
│   │       ├── LogsController.php
│   │       ├── SettingsController.php
│   │       └── RolesController.php
│   └── Database/
│       ├── Database.php             # PDO обертка
│       ├── Schema.php               # Схема БД и миграции
│       └── Seeder.php               # Тестовые данные
├── config/
│   ├── sadovod.php                  # существующий
│   ├── database.php                 # НОВОЕ: настройки БД
│   ├── api.php                      # НОВОЕ: настройки API
│   └── scheduler.php                # НОВОЕ: настройки планировщика
├── storage/
│   ├── database/
│   │   └── sadavod.sqlite           # SQLite БД (или MySQL)
│   ├── logs/
│   │   └── parser.log               # логи парсера
│   ├── exports/                     # CSV/JSON экспорты
│   └── uploads/                     # загруженные файлы
├── scripts/
│   ├── run-parser.php               # существующий
│   ├── run-scheduler.php            # НОВОЕ: запуск планировщика
│   └── run-ai.php                   # НОВОЕ: запуск AI задач
├── database.sqlite                  # или настройки MySQL
├── .env                             # переменные окружения
├── .htaccess                        # mod_rewrite для API
└── composer.json                    # зависимости
```

---

## 🗄️ ЧАСТЬ 2: СХЕМА БАЗЫ ДАННЫХ

### Таблица: `products`
```sql
CREATE TABLE products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    external_id VARCHAR(50) UNIQUE NOT NULL,     -- ID с sadovodbaza.ru
    source_url  TEXT NOT NULL,                   -- оригинальный URL
    title       TEXT NOT NULL,
    price       VARCHAR(100),
    price_raw   INTEGER,                          -- цена в копейках
    description TEXT,
    photos      TEXT,                            -- JSON массив URL фото
    characteristics TEXT,                        -- JSON объект: color, size, ...
    category_id INTEGER REFERENCES categories(id),
    seller_id   INTEGER REFERENCES sellers(id),
    category_slugs TEXT,                         -- JSON массив slug'ов категорий
    
    -- Статус и управление
    status      VARCHAR(20) DEFAULT 'active',    -- active, hidden, excluded, error
    is_relevant BOOLEAN DEFAULT 1,
    relevance_checked_at DATETIME,
    
    -- AI поля
    ai_title    TEXT,                            -- AI-генерированный заголовок
    ai_description TEXT,                         -- AI-генерированное описание
    ai_seo_title TEXT,
    ai_seo_description TEXT,
    ai_processed BOOLEAN DEFAULT 0,
    
    -- Метаданные
    parsed_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Фильтры (для поиска)
    color       VARCHAR(100),                    -- извлечен из characteristics
    size_range  VARCHAR(100),                    -- извлечен из characteristics
    brand_id    INTEGER REFERENCES brands(id)
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_external ON products(external_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_parsed_at ON products(parsed_at);
```

### Таблица: `categories`
```sql
CREATE TABLE categories (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    external_slug   VARCHAR(200) UNIQUE,         -- slug с donora
    name            VARCHAR(500) NOT NULL,
    slug            VARCHAR(500) NOT NULL,
    url             TEXT,
    parent_id       INTEGER REFERENCES categories(id),
    sort_order      INTEGER DEFAULT 0,
    
    -- Настройки парсинга
    enabled         BOOLEAN DEFAULT 1,
    linked_to_parser BOOLEAN DEFAULT 0,          -- включена для парсинга
    parser_products_limit INTEGER DEFAULT 0,     -- лимит товаров (0=все)
    parser_depth_limit INTEGER DEFAULT 0,        -- глубина вложенности
    
    -- Метаданные
    icon            VARCHAR(50),
    products_count  INTEGER DEFAULT 0,
    parsed_at       DATETIME,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_enabled ON categories(enabled);
```

### Таблица: `sellers`
```sql
CREATE TABLE sellers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    slug        VARCHAR(200) UNIQUE NOT NULL,
    name        VARCHAR(500) NOT NULL,
    url         TEXT,
    pavilion    VARCHAR(200),                    -- корпус/павильон
    description TEXT,
    
    -- Контакты
    phone       VARCHAR(50),
    whatsapp    VARCHAR(200),
    telegram    VARCHAR(200),
    
    -- Рейтинг и статус
    status      VARCHAR(20) DEFAULT 'active',
    is_verified BOOLEAN DEFAULT 0,
    rating      DECIMAL(3,2) DEFAULT 0,
    products_count INTEGER DEFAULT 0,
    
    -- Метаданные
    parsed_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sellers_slug ON sellers(slug);
CREATE INDEX idx_sellers_status ON sellers(status);
```

### Таблица: `brands`
```sql
CREATE TABLE brands (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(500) NOT NULL,
    slug        VARCHAR(200) UNIQUE NOT NULL,
    logo_url    TEXT,
    status      VARCHAR(20) DEFAULT 'active',
    
    -- SEO
    seo_title   TEXT,
    seo_description TEXT,
    
    -- Маппинг категорий
    category_ids TEXT,                          -- JSON массив category_id
    
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Таблица: `excluded_rules`
```sql
CREATE TABLE excluded_rules (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    word        TEXT NOT NULL,
    type        VARCHAR(20) NOT NULL,           -- word, phrase, regex
    action      VARCHAR(20) NOT NULL,           -- delete, replace, hide, flag
    scope       VARCHAR(30) NOT NULL,           -- global, category, product_type, temporary
    replacement TEXT,                           -- для action=replace
    category_id INTEGER REFERENCES categories(id),
    product_type VARCHAR(100),
    match_count INTEGER DEFAULT 0,
    
    enabled     BOOLEAN DEFAULT 1,
    expires_at  DATETIME,                       -- для scope=temporary
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_excluded_scope ON excluded_rules(scope);
CREATE INDEX idx_excluded_enabled ON excluded_rules(enabled);
```

### Таблица: `filters_config`
```sql
CREATE TABLE filters_config (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id VARCHAR(100) NOT NULL,         -- color, size, price, etc.
    attribute_name VARCHAR(500),
    category_id  INTEGER REFERENCES categories(id),
    display_type VARCHAR(30) NOT NULL,          -- checkbox, select, multiselect, range
    sort_order   INTEGER DEFAULT 0,
    enabled      BOOLEAN DEFAULT 1,
    
    -- Настройки диапазона (для type=range)
    range_min    DECIMAL(15,2),
    range_max    DECIMAL(15,2),
    
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Таблица: `parser_config`
```sql
CREATE TABLE parser_config (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    key              VARCHAR(200) UNIQUE NOT NULL,
    value            TEXT,
    type             VARCHAR(30) DEFAULT 'string', -- string, integer, boolean, json
    description      TEXT,
    updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Значения по умолчанию:
-- base_url = 'https://sadovodbaza.ru'
-- request_delay_ms = 500
-- verify_ssl = false
-- with_photos = true
-- save_to_db = true
-- preview_only = false
-- auto_check_relevance = true
-- retry_on_error = true
-- categories_limit = 0
-- products_per_cat_limit = 0
-- depth_limit = 0
-- record_limit = 0
-- thread_limit = 1
-- cron_expression = '0 */6 * * *'
-- exclude_menu_links = '["/link/3"]'
-- exclude_menu_text = '["Женская одежда ТГ"]'
-- staleness_threshold_days = 30
-- auto_disable_stale = true
-- update_prices = true
-- user_agent = 'Mozilla/5.0...'
```

### Таблица: `parser_jobs`
```sql
CREATE TABLE parser_jobs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    status       VARCHAR(30) DEFAULT 'pending', -- pending, running, done, failed, stopped
    type         VARCHAR(30) DEFAULT 'full',    -- full, menu_only, category, product, seller
    
    -- Параметры запуска
    options      TEXT,                          -- JSON: categories_limit, etc.
    
    -- Прогресс
    total_items  INTEGER DEFAULT 0,
    processed    INTEGER DEFAULT 0,
    progress     INTEGER DEFAULT 0,             -- 0-100
    
    -- Результат
    items_parsed INTEGER DEFAULT 0,
    items_saved  INTEGER DEFAULT 0,
    items_skipped INTEGER DEFAULT 0,
    errors_count INTEGER DEFAULT 0,
    
    -- Временные метки
    started_at   DATETIME,
    finished_at  DATETIME,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Пользователь, запустивший
    triggered_by VARCHAR(100) DEFAULT 'manual'  -- manual, scheduler, api
);

CREATE INDEX idx_parser_jobs_status ON parser_jobs(status);
CREATE INDEX idx_parser_jobs_created ON parser_jobs(created_at);
```

### Таблица: `parser_logs`
```sql
CREATE TABLE parser_logs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id     INTEGER REFERENCES parser_jobs(id),
    level      VARCHAR(10) NOT NULL,            -- info, warn, error
    module     VARCHAR(100),                    -- Parser, Catalog, Product, Seller, AI
    message    TEXT NOT NULL,
    details    TEXT,
    timestamp  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_logs_job ON parser_logs(job_id);
CREATE INDEX idx_logs_level ON parser_logs(level);
CREATE INDEX idx_logs_timestamp ON parser_logs(timestamp);
```

### Таблица: `scheduler_tasks`
```sql
CREATE TABLE scheduler_tasks (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           VARCHAR(300) NOT NULL,
    type           VARCHAR(30) NOT NULL,        -- parsing, relevance, ai_processing
    cron_expression VARCHAR(100) NOT NULL,
    enabled        BOOLEAN DEFAULT 1,
    
    -- Параметры задачи (JSON)
    options        TEXT,
    
    -- Состояние выполнения
    status         VARCHAR(20) DEFAULT 'idle',  -- idle, running, error
    last_run       DATETIME,
    next_run       DATETIME,
    last_result    TEXT,                        -- JSON результат последнего запуска
    
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Таблица: `ai_tasks`
```sql
CREATE TABLE ai_tasks (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER REFERENCES products(id),
    type       VARCHAR(30) NOT NULL,            -- title, description, seo, image, moderation, analysis
    status     VARCHAR(20) DEFAULT 'queued',    -- queued, processing, done, error
    
    -- AI настройки
    model      VARCHAR(50),
    prompt     TEXT,
    result     TEXT,
    error      TEXT,
    tokens_used INTEGER,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processed_at DATETIME
);

CREATE INDEX idx_ai_tasks_product ON ai_tasks(product_id);
CREATE INDEX idx_ai_tasks_status ON ai_tasks(status);
```

### Таблица: `users` и `roles`
```sql
CREATE TABLE roles (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(100) UNIQUE NOT NULL,
    permissions TEXT                             -- JSON массив разрешений
);

CREATE TABLE users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    VARCHAR(200) UNIQUE NOT NULL,
    email       VARCHAR(300) UNIQUE NOT NULL,
    password    VARCHAR(300) NOT NULL,           -- bcrypt hash
    role_id     INTEGER REFERENCES roles(id),
    status      VARCHAR(20) DEFAULT 'active',
    last_login  DATETIME,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE api_tokens (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER REFERENCES users(id),
    token      VARCHAR(500) UNIQUE NOT NULL,    -- JWT или random token
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Таблица: `settings`
```sql
CREATE TABLE settings (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    key         VARCHAR(200) UNIQUE NOT NULL,
    value       TEXT,
    type        VARCHAR(30) DEFAULT 'string',
    group       VARCHAR(100),                    -- general, security, ai, parser
    description TEXT,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 ЧАСТЬ 3: API ENDPOINTS

### CORS и аутентификация
```
Origin: https://cheepy.siteaccess.ru → http://sadavod.loc
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### 3.1 Auth API
```
POST   /api/v1/auth/login              # логин → JWT токен
POST   /api/v1/auth/logout             # выход
POST   /api/v1/auth/refresh            # обновить токен
GET    /api/v1/auth/me                 # текущий пользователь
```

---

### 3.2 Dashboard API
```
GET    /api/v1/dashboard               # сводная статистика
```
**Response:**
```json
{
  "totalProducts": 15420,
  "newToday": 342,
  "disabled": 125,
  "errors": 8,
  "totalSellers": 890,
  "totalCategories": 42,
  "lastParserRun": "2026-02-25T14:30:00Z",
  "parserStatus": "idle",
  "aiStatus": "active",
  "schedulerStatus": "running",
  "recentLogs": [...],
  "topCategories": [...],
  "parseStats": {
    "today": 342,
    "week": 2140,
    "month": 8900
  }
}
```

---

### 3.3 Parser API
```
GET    /api/v1/parser/status           # текущий статус парсера
GET    /api/v1/parser/config           # получить конфиг
PUT    /api/v1/parser/config           # обновить конфиг
POST   /api/v1/parser/start            # запустить парсер
POST   /api/v1/parser/stop             # остановить
POST   /api/v1/parser/restart          # перезапустить
GET    /api/v1/parser/jobs             # история запусков
GET    /api/v1/parser/jobs/{id}        # детали запуска
GET    /api/v1/parser/jobs/{id}/logs   # логи конкретного запуска
DELETE /api/v1/parser/jobs/{id}        # удалить запись

POST   /api/v1/parser/run-menu         # только меню
POST   /api/v1/parser/run-category     # конкретная категория
POST   /api/v1/parser/run-product      # конкретный товар
POST   /api/v1/parser/run-seller       # конкретный продавец
```

**POST /api/v1/parser/start body:**
```json
{
  "menu_only": false,
  "categories_limit": 5,
  "products_per_cat": 20,
  "parse_details": true,
  "parse_sellers": true,
  "with_photos": true,
  "save_to_db": true,
  "preview_only": false,
  "retry_on_error": true,
  "category_slugs": ["jenskaya-odezhda", "obuv"],
  "depth_limit": 0,
  "record_limit": 0,
  "thread_limit": 1
}
```

**GET /api/v1/parser/status response:**
```json
{
  "isRunning": true,
  "jobId": 42,
  "progress": 45,
  "processedCount": 154,
  "totalCount": 342,
  "currentItem": "Категория: Платья",
  "startedAt": "2026-02-25T14:30:00Z",
  "estimatedFinish": "2026-02-25T15:15:00Z",
  "itemsSaved": 148,
  "errorsCount": 2
}
```

---

### 3.4 Products API
```
GET    /api/v1/products                # список с фильтрацией
GET    /api/v1/products/{id}           # детали товара
PUT    /api/v1/products/{id}           # редактировать товар
DELETE /api/v1/products/{id}           # удалить товар
POST   /api/v1/products/{id}/hide      # скрыть товар
POST   /api/v1/products/{id}/restore   # восстановить
POST   /api/v1/products/bulk-action    # массовые операции
GET    /api/v1/products/export         # экспорт CSV/JSON
POST   /api/v1/products/check-relevance # проверить актуальность
```

**GET /api/v1/products query params:**
```
?page=1
&per_page=20
&category_id=5
&seller_id=10
&brand_id=3
&status=active           (active|hidden|excluded|error)
&search=платье
&price_min=100
&price_max=5000
&color=красный
&has_photos=1
&ai_processed=0
&parsed_from=2026-02-01
&parsed_to=2026-02-25
&sort=price_asc          (price_asc|price_desc|title|parsed_at|relevance)
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "externalId": "13588999",
      "title": "Платье",
      "price": "900 ₽",
      "priceRaw": 90000,
      "photos": ["https://..."],
      "status": "active",
      "category": { "id": 1, "name": "Женская одежда" },
      "seller": { "id": 5, "name": "SAVORI LUXURY" },
      "brand": null,
      "characteristics": { "color": "красный", "size": "42-46" },
      "isRelevant": true,
      "parsedAt": "2026-02-25T14:30:00Z"
    }
  ],
  "meta": {
    "total": 15420,
    "page": 1,
    "perPage": 20,
    "totalPages": 772
  }
}
```

---

### 3.5 Categories API
```
GET    /api/v1/categories              # дерево категорий
GET    /api/v1/categories/{id}         # детали категории
POST   /api/v1/categories              # создать категорию
PUT    /api/v1/categories/{id}         # обновить
DELETE /api/v1/categories/{id}         # удалить
POST   /api/v1/categories/{id}/toggle  # включить/выключить
POST   /api/v1/categories/{id}/link-parser   # привязать к парсеру
POST   /api/v1/categories/reorder      # изменить порядок
POST   /api/v1/categories/sync-from-parser   # синхронизировать с парсером
```

**Response (tree):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Женская одежда",
      "slug": "jenskaya-odezhda",
      "externalSlug": "jenskaya-odezhda",
      "parentId": null,
      "sortOrder": 0,
      "enabled": true,
      "linkedToParser": true,
      "productsCount": 1240,
      "icon": "dress",
      "children": [
        {
          "id": 2,
          "name": "Платья",
          "slug": "platya",
          ...
        }
      ]
    }
  ]
}
```

---

### 3.6 Sellers API
```
GET    /api/v1/sellers                 # список продавцов
GET    /api/v1/sellers/{id}            # детали продавца
PUT    /api/v1/sellers/{id}            # обновить
DELETE /api/v1/sellers/{id}            # удалить
POST   /api/v1/sellers/{id}/verify     # верифицировать
GET    /api/v1/sellers/{id}/products   # товары продавца
GET    /api/v1/sellers/export          # экспорт
```

**Query params:**
```
?search=название
&status=active
&is_verified=1
&category_id=1
&has_phone=1
&sort=products_count_desc
&page=1
```

---

### 3.7 Brands API
```
GET    /api/v1/brands                  # список брендов
GET    /api/v1/brands/{id}             # детали
POST   /api/v1/brands                  # создать
PUT    /api/v1/brands/{id}             # обновить
DELETE /api/v1/brands/{id}             # удалить
POST   /api/v1/brands/{id}/toggle      # вкл/выкл
```

---

### 3.8 Filters API
```
GET    /api/v1/filters                 # все фильтры
POST   /api/v1/filters                 # создать фильтр
PUT    /api/v1/filters/{id}            # обновить
DELETE /api/v1/filters/{id}            # удалить
POST   /api/v1/filters/{id}/toggle     # вкл/выкл
GET    /api/v1/filters/attributes      # доступные атрибуты для фильтрации

GET    /api/v1/products/facets         # значения для фильтров на фронте
```

**Атрибуты для фильтрации:**
- `price` — диапазон цен
- `color` — цвета
- `size` — размеры
- `category_id` — категория
- `seller_id` — продавец
- `brand_id` — бренд
- `has_photos` — наличие фото
- `is_relevant` — актуальность

---

### 3.9 Excluded Rules API
```
GET    /api/v1/excluded                # список правил
POST   /api/v1/excluded                # создать правило
PUT    /api/v1/excluded/{id}           # обновить
DELETE /api/v1/excluded/{id}           # удалить
POST   /api/v1/excluded/apply          # применить ко всем товарам
GET    /api/v1/excluded/preview        # предпросмотр совпадений

```

**POST body:**
```json
{
  "word": "дублирую",
  "type": "word",              // word | phrase | regex
  "action": "delete",          // delete | replace | hide | flag
  "scope": "global",           // global | category | product_type | temporary
  "replacement": "",
  "categoryId": null,
  "productType": null,
  "expiresAt": null
}
```

---

### 3.10 Scheduler API
```
GET    /api/v1/scheduler/tasks         # список задач
POST   /api/v1/scheduler/tasks         # создать задачу
PUT    /api/v1/scheduler/tasks/{id}    # обновить
DELETE /api/v1/scheduler/tasks/{id}    # удалить
POST   /api/v1/scheduler/tasks/{id}/toggle   # вкл/выкл
POST   /api/v1/scheduler/tasks/{id}/run-now  # запустить сейчас
GET    /api/v1/scheduler/cron-parse    # распарсить cron выражение
```

**Типы задач:**
- `parsing` — полный парсинг
- `relevance` — проверка актуальности
- `ai_processing` — обработка AI
- `cleanup` — очистка старых данных
- `export` — автоматический экспорт

---

### 3.11 AI API
```
GET    /api/v1/ai/config               # получить настройки AI
PUT    /api/v1/ai/config               # обновить настройки
GET    /api/v1/ai/tasks                # очередь задач
POST   /api/v1/ai/tasks                # создать задачу
DELETE /api/v1/ai/tasks/{id}           # удалить задачу
POST   /api/v1/ai/process-product/{id} # обработать конкретный товар
POST   /api/v1/ai/batch-process        # массовая обработка
GET    /api/v1/ai/stats                # статистика (токены, задачи)
```

**AI функции:**
- `title` — генерация заголовка
- `description` — генерация описания
- `seo` — SEO оптимизация (title + description)
- `image` — генерация изображения (DALL-E)
- `moderation` — проверка контента
- `analysis` — анализ текста
- `replace` — замена слов по excluded правилам

---

### 3.12 Logs API
```
GET    /api/v1/logs                    # список логов с фильтрацией
GET    /api/v1/logs/{jobId}            # логи конкретного задания
GET    /api/v1/logs/export             # экспорт логов
DELETE /api/v1/logs/clear              # очистить старые логи
```

**Query params:**
```
?level=error           (info|warn|error)
&module=Parser         (Parser|Catalog|Product|Seller|AI|Scheduler)
&search=keyword
&from=2026-02-25T00:00:00
&to=2026-02-25T23:59:59
&job_id=42
&page=1
```

---

### 3.13 Settings API
```
GET    /api/v1/settings                # все настройки
PUT    /api/v1/settings                # обновить (batch)
GET    /api/v1/settings/{group}        # настройки группы
GET    /api/v1/settings/export         # экспорт CSV
POST   /api/v1/settings/import         # импорт CSV
POST   /api/v1/settings/check-relevance # запустить проверку актуальности
```

**Группы настроек:**
- `general` — общие (site_name, parser_url)
- `security` — безопасность (rate_limit, xss_protection)
- `parser` — настройки парсера
- `ai` — настройки AI
- `relevance` — проверка актуальности

---

### 3.14 Roles API
```
GET    /api/v1/roles                   # список ролей
POST   /api/v1/roles                   # создать роль
PUT    /api/v1/roles/{id}              # обновить
DELETE /api/v1/roles/{id}              # удалить
GET    /api/v1/users                   # список пользователей
POST   /api/v1/users                   # создать пользователя
PUT    /api/v1/users/{id}              # обновить
DELETE /api/v1/users/{id}              # удалить
```

---

### 3.15 Public API (для пользовательских страниц Cheepy)
```
# Для CategoryPage.tsx, ProductPage.tsx, SellerPage.tsx, BrandPage.tsx

GET    /api/v1/public/categories       # все категории (для меню)
GET    /api/v1/public/categories/{slug}/products  # товары в категории
GET    /api/v1/public/products         # поиск товаров с фильтрами
GET    /api/v1/public/products/{id}    # детали товара
GET    /api/v1/public/sellers          # список продавцов
GET    /api/v1/public/sellers/{slug}   # страница продавца
GET    /api/v1/public/brands           # список брендов
GET    /api/v1/public/brands/{slug}    # страница бренда

# Для главной страницы Index.tsx
GET    /api/v1/public/featured         # популярные товары
GET    /api/v1/public/new              # новые товары
GET    /api/v1/public/hot-deals        # горячие предложения
GET    /api/v1/public/top-sellers      # топ продавцов
GET    /api/v1/public/search           # поиск
GET    /api/v1/public/facets           # данные для фильтров
```

---

## ⚙️ ЧАСТЬ 4: РЕАЛИЗАЦИЯ BACKEND PHP

### 4.1 Структура файла `/public/api/v1/index.php`
```php
<?php
// CORS заголовки
header('Access-Control-Allow-Origin: https://cheepy.siteaccess.ru');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require dirname(dirname(__DIR__)) . '/vendor/autoload.php';
require dirname(dirname(__DIR__)) . '/app/Api/bootstrap.php';

// Маршрутизация
$router = new \App\Api\Router();

// Auth
$router->post('/auth/login',    [\App\Api\Controllers\AuthController::class, 'login']);
$router->get('/auth/me',        [\App\Api\Controllers\AuthController::class, 'me'], ['auth']);

// Dashboard
$router->get('/dashboard',      [\App\Api\Controllers\DashboardController::class, 'index'], ['auth']);

// Parser
$router->get('/parser/status',  [\App\Api\Controllers\ParserController::class, 'status'], ['auth']);
$router->put('/parser/config',  [\App\Api\Controllers\ParserController::class, 'updateConfig'], ['auth']);
$router->post('/parser/start',  [\App\Api\Controllers\ParserController::class, 'start'], ['auth']);
$router->post('/parser/stop',   [\App\Api\Controllers\ParserController::class, 'stop'], ['auth']);
// ... и т.д.

$router->dispatch();
```

### 4.2 Запуск парсера в фоне (Windows-совместимо)
```php
// ParserController::start()
public function start(): void {
    $options = $this->request->json();
    
    // Создаем job в БД
    $jobId = $this->db->insert('parser_jobs', [
        'status' => 'pending',
        'options' => json_encode($options),
        'triggered_by' => 'manual'
    ]);
    
    // Запускаем PHP в фоне
    $cmd = sprintf(
        'php %s --job-id=%d > %s 2>&1',
        escapeshellarg(BASE_PATH . '/scripts/run-parser.php'),
        $jobId,
        escapeshellarg(BASE_PATH . '/storage/logs/parser-' . $jobId . '.log')
    );
    
    // Windows: popen, Unix: popen с &
    if (PHP_OS_FAMILY === 'Windows') {
        pclose(popen('start /B ' . $cmd, 'r'));
    } else {
        exec($cmd . ' &');
    }
    
    $this->response->json(['jobId' => $jobId, 'status' => 'started']);
}
```

### 4.3 SSE для прогресса парсера (real-time)
```
GET /api/v1/parser/jobs/{id}/stream   # Server-Sent Events
```
```php
// Клиент читает в режиме реального времени:
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no');

while (true) {
    $job = $db->fetch('SELECT * FROM parser_jobs WHERE id = ?', [$jobId]);
    echo "data: " . json_encode($job) . "\n\n";
    if (in_array($job['status'], ['done', 'failed', 'stopped'])) break;
    sleep(1);
    flush();
}
```

---

## 🌐 ЧАСТЬ 5: ИНТЕГРАЦИЯ В CHEEPY FRONTEND

### 5.1 API клиент (новый файл `src/lib/api.ts`)
```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://sadavod.loc/api/v1';

export const api = {
  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const url = new URL(API_BASE + path);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      });
    }
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async post<T>(path: string, body?: unknown): Promise<T> { ... },
  async put<T>(path: string, body?: unknown): Promise<T> { ... },
  async delete<T>(path: string): Promise<T> { ... },
};
```

### 5.2 Хуки для данных (React Query)
```typescript
// src/hooks/admin/useParserStatus.ts
export function useParserStatus() {
  return useQuery({
    queryKey: ['parser-status'],
    queryFn: () => api.get('/parser/status'),
    refetchInterval: 2000,  // polling каждые 2 секунды пока запущен
  });
}

// src/hooks/admin/useProducts.ts
export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => api.get('/products', filters),
  });
}

// src/hooks/usePublicProducts.ts
export function usePublicProducts(categorySlug: string, page: number) {
  return useQuery({
    queryKey: ['public-products', categorySlug, page],
    queryFn: () => api.get('/public/categories/' + categorySlug + '/products', { page }),
    staleTime: 5 * 60 * 1000,  // кеш 5 минут
  });
}
```

### 5.3 Обновление admin страниц

**ParserPage.tsx** — заменить mock на реальный API:
```typescript
const { data: status } = useParserStatus();
const { data: config } = useParserConfig();
const startMutation = useMutation(() => api.post('/parser/start', config));
const stopMutation = useMutation(() => api.post('/parser/stop'));
```

**ProductsPage.tsx:**
```typescript
const [filters, setFilters] = useState<ProductFilters>({});
const { data, isLoading } = useProducts(filters);
```

**CategoryPage.tsx (пользовательская):**
```typescript
const { slug } = useParams();
const [page, setPage] = useState(1);
const { data } = usePublicProducts(slug!, page);
// → реальные данные из БД
```

---

## 📡 ЧАСТЬ 6: ПОЛНЫЙ FLOW ДАННЫХ

```
1. ПАРСИНГ (Admin → API → Parser → DB)
   
   Admin кликает "Запустить" 
   → POST /api/v1/parser/start {options}
   → Создается parser_jobs запись (status=pending)
   → PHP запускает scripts/run-parser.php в фоне
   → SadovodParserService.run() с callback прогресса
   → Каждый товар сохраняется в products таблицу
   → Применяются excluded_rules
   → Создаются ai_tasks если AI включен
   → Job обновляется (status=done)
   
2. ПРОСМОТР ПРОГРЕССА (Admin → API → DB)
   
   Admin видит прогресс
   → GET /api/v1/parser/status (polling 2s)
   ← {progress: 45, processedCount: 154, ...}
   → Опционально: SSE стрим для real-time
   
3. ПРОСМОТР ТОВАРОВ (Admin/User → API → DB)
   
   Admin открывает /admin/products
   → GET /api/v1/products?category=jenskaya-odezhda&page=1
   ← {data: [...], meta: {total: 1240, ...}}
   
   User открывает /category/platya
   → GET /api/v1/public/categories/platya/products?page=1
   ← {data: [...], meta: {...}}
   
4. ИСКЛЮЧЕНИЯ (Admin → API → DB + применение)
   
   Admin добавляет "дублирую" в excluded
   → POST /api/v1/excluded {word, type, action, scope}
   → Сохраняется в excluded_rules
   → POST /api/v1/excluded/apply
   → Пробегает по всем products, применяет правила
   → Товары с совпадениями: status=excluded или title изменен
   
5. ФИЛЬТРЫ (Admin настройка → User применение)
   
   Admin настраивает фильтры для категории
   → POST /api/v1/filters {attribute_id: "color", category_id: 1, display_type: "checkbox"}
   
   User фильтрует на CategoryPage
   → GET /api/v1/public/facets?category=platya
   ← {color: ["красный", "синий", ...], size: ["42", "44", ...], price: {min: 100, max: 5000}}
   → GET /api/v1/public/products?category=platya&color=красный&price_min=500
   
6. ПЛАНИРОВЩИК (Cron → API → Parser)
   
   Windows Task Scheduler / Linux cron:
   → php C:\OSPanel\domains\sadavod\scripts\run-scheduler.php
   → Читает scheduler_tasks из БД
   → Запускает задачи по расписанию
   → Логирует результаты в parser_logs
   
7. AI ОБРАБОТКА (After parse → AI → Products updated)
   
   После парсинга создаются ai_tasks
   → POST /api/v1/ai/batch-process
   → Для каждого товара: OpenAI API запрос
   → products.ai_title, products.ai_description обновляются
   → На фронте показывается AI контент если есть
```

---

## 🔐 ЧАСТЬ 7: АУТЕНТИФИКАЦИЯ

### JWT-based для React admin
```
1. Admin: POST /api/v1/auth/login {username, password}
2. Server: проверяет users таблицу, возвращает JWT
3. Frontend: localStorage.setItem('admin_token', token)
4. Все запросы: Authorization: Bearer <token>
5. Server: валидирует JWT в AuthMiddleware
```

### Разграничение доступа
```
Роль "super_admin": все права
Роль "editor": продукты, категории, бренды (без парсера и пользователей)
Роль "viewer": только чтение
```

---

## 🔧 ЧАСТЬ 8: .ENV КОНФИГУРАЦИЯ

```ini
# C:\OSPanel\domains\sadavod\.env

# Database
DB_DRIVER=sqlite
DB_PATH=storage/database/sadavod.sqlite
# или MySQL:
# DB_DRIVER=mysql
# DB_HOST=localhost
# DB_NAME=sadavod
# DB_USER=root
# DB_PASS=

# API
API_SECRET=your-super-secret-jwt-key-here
API_TOKEN_TTL=86400
CORS_ORIGINS=https://cheepy.siteaccess.ru,http://localhost:5173

# Parser
PARSER_BASE_URL=https://sadovodbaza.ru
PARSER_REQUEST_DELAY=500
PARSER_VERIFY_SSL=false
PARSER_USER_AGENT=Mozilla/5.0...

# AI
AI_ENABLED=false
AI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini
AI_TOKEN_LIMIT=1000

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=...  (bcrypt)

# Scheduler
SCHEDULER_ENABLED=true
```

---

## 🔄 ЧАСТЬ 9: ИСКЛЮЧЕНИЯ И ФИЛЬТРАЦИЯ

### 9.1 Обработка excluded_rules при парсинге
```php
class ExcludedService {
    public function applyRules(array $product, int $categoryId): array {
        $rules = $this->db->fetchAll(
            "SELECT * FROM excluded_rules WHERE enabled=1 
             AND (scope='global' OR (scope='category' AND category_id=?))",
            [$categoryId]
        );
        
        foreach ($rules as $rule) {
            $matches = $this->matchRule($rule, $product);
            if ($matches) {
                switch ($rule['action']) {
                    case 'delete':  return null;  // не сохранять
                    case 'hide':    $product['status'] = 'excluded'; break;
                    case 'replace': $product['title'] = str_ireplace(
                        $rule['word'], $rule['replacement'], $product['title']
                    ); break;
                    case 'flag':    $product['flagged'] = true; break;
                }
                $this->db->increment('excluded_rules', $rule['id'], 'match_count');
            }
        }
        return $product;
    }
    
    private function matchRule(array $rule, array $product): bool {
        $text = $product['title'] . ' ' . $product['description'];
        return match($rule['type']) {
            'word'   => str_word_match($rule['word'], $text),
            'phrase' => stripos($text, $rule['word']) !== false,
            'regex'  => (bool)preg_match($rule['word'], $text),
            default  => false,
        };
    }
}
```

### 9.2 Конфигурация для конкретных категорий
```php
// При парсинге категории, проверяем parser_config для неё:
$catConfig = db()->fetch(
    "SELECT parser_products_limit, parser_depth_limit 
     FROM categories WHERE external_slug = ?",
    [$slug]
);
if ($catConfig) {
    $limit = $catConfig['parser_products_limit'] ?: $globalLimit;
    $depth = $catConfig['parser_depth_limit'] ?: $globalDepth;
}
```

---

## 📱 ЧАСТЬ 10: ИНТЕГРАЦИЯ С ПОЛЬЗОВАТЕЛЬСКИМИ СТРАНИЦАМИ CHEEPY

### 10.1 CategoryPage.tsx — реальные товары
```typescript
// Вместо mock данных:
const { data, isLoading } = useQuery({
  queryKey: ['category-products', slug, page, viewMode, sortBy],
  queryFn: () => api.get(`/public/categories/${slug}/products`, {
    page, per_page: 20, sort: sortBy
  }),
});

// Фильтры с facets:
const { data: facets } = useQuery({
  queryKey: ['facets', slug],
  queryFn: () => api.get('/public/facets', { category: slug }),
});
```

### 10.2 ProductPage.tsx — реальный товар
```typescript
const { id } = useParams();
const { data: product } = useQuery({
  queryKey: ['product', id],
  queryFn: () => api.get(`/public/products/${id}`),
});
```

### 10.3 SellerPage.tsx — реальный продавец
```typescript
const { data: seller } = useQuery({
  queryKey: ['seller', id],
  queryFn: () => api.get(`/public/sellers/${id}`),
});
const { data: products } = useQuery({
  queryKey: ['seller-products', id, page],
  queryFn: () => api.get(`/public/sellers/${id}/products`, { page }),
});
```

### 10.4 Index.tsx — реальные данные для главной
```typescript
const { data: hotDeals } = useQuery({
  queryKey: ['hot-deals'],
  queryFn: () => api.get('/public/featured?type=hot'),
  staleTime: 5 * 60 * 1000,
});

const { data: categories } = useQuery({
  queryKey: ['categories'],
  queryFn: () => api.get('/public/categories'),
});
```

---

## 📅 ЧАСТЬ 11: ЭТАПЫ РЕАЛИЗАЦИИ

### Этап 1: База данных и роутер (2-3 дня)
- [ ] `app/Database/Database.php` — PDO обертка
- [ ] `app/Database/Schema.php` — создание всех таблиц
- [ ] `.env` файл и парсер конфига
- [ ] `app/Api/Router.php` — HTTP роутер
- [ ] `app/Api/Request.php` и `Response.php`
- [ ] `app/Api/Middleware/CorsMiddleware.php`
- [ ] `public/api/v1/index.php` — точка входа
- [ ] `.htaccess` для mod_rewrite

### Этап 2: Аутентификация (1 день)
- [ ] `app/Api/Middleware/AuthMiddleware.php`
- [ ] `app/Api/Controllers/AuthController.php`
- [ ] JWT генерация и валидация
- [ ] Создание admin пользователя

### Этап 3: Dashboard и логи (1 день)
- [ ] `app/Api/Controllers/DashboardController.php`
- [ ] `app/Api/Controllers/LogsController.php`

### Этап 4: Парсер API (3-4 дня)
- [ ] `app/Api/Controllers/ParserController.php`
- [ ] Обновление `scripts/run-parser.php` для работы с БД
- [ ] Сохранение данных в таблицы products, categories, sellers
- [ ] Job management (parser_jobs таблица)
- [ ] SSE endpoint для прогресса

### Этап 5: Категории, бренды (2 дня)
- [ ] `app/Api/Controllers/CategoriesController.php`
- [ ] `app/Api/Controllers/BrandsController.php`
- [ ] Синхронизация категорий с парсером

### Этап 6: Товары и продавцы (2 дня)
- [ ] `app/Api/Controllers/ProductsController.php`
- [ ] `app/Api/Controllers/SellersController.php`
- [ ] Фильтрация, пагинация, поиск
- [ ] Экспорт CSV

### Этап 7: Исключения и фильтры (2 дня)
- [ ] `app/Api/Controllers/ExcludedController.php`
- [ ] `ExcludedService.php` — применение правил
- [ ] `app/Api/Controllers/FiltersController.php`
- [ ] Facets API для фронтенда

### Этап 8: Планировщик (2 дня)
- [ ] `app/Api/Controllers/SchedulerController.php`
- [ ] `scripts/run-scheduler.php`
- [ ] Настройка Task Scheduler / cron

### Этап 9: AI модуль (2 дня)
- [ ] `app/Api/Controllers/AiController.php`
- [ ] OpenAI API интеграция
- [ ] Очередь AI задач

### Этап 10: Settings и Roles (1 день)
- [ ] `app/Api/Controllers/SettingsController.php`
- [ ] `app/Api/Controllers/RolesController.php`

### Этап 11: Обновление React frontend (3-4 дня)
- [ ] `src/lib/api.ts` — API клиент
- [ ] `src/hooks/admin/*.ts` — хуки для admin
- [ ] `src/hooks/public/*.ts` — хуки для пользователей
- [ ] Обновление всех admin страниц (замена mock на API)
- [ ] Обновление пользовательских страниц (CategoryPage, ProductPage, SellerPage)
- [ ] `.env.local` с VITE_API_URL

### Этап 12: Тестирование и деплой (2 дня)
- [ ] Тест парсинга с сохранением в БД
- [ ] Тест всех API endpoints
- [ ] Тест фронтенда с реальными данными
- [ ] Деплой обоих проектов

---

## 🌍 ЧАСТЬ 12: НАСТРОЙКА ХОСТИНГА

### OSPanel (localhost)
```
Домен: sadavod.loc → C:\OSPanel\domains\sadavod\public
PHP 8.1+
SQLite или MySQL

# В .htaccess:
RewriteEngine On
RewriteRule ^api/v1/(.*)$ api/v1/index.php?_path=$1 [QSA,L]
```

### Деплой на production (Beget)
```
sadavod.siteaccess.ru → public/
База данных: MySQL (Beget предоставляет)
Cron: в панели Beget добавить задачу
```

### CORS для React
```
cheepy.siteaccess.ru → разрешено в API
localhost:5173 → разрешено для разработки
```

---

## 📊 ЧАСТЬ 13: ЗАВИСИМОСТИ

### Существующие (sadavod)
```json
{
  "require": {
    "guzzlehttp/guzzle": "^7.0",
    "symfony/dom-crawler": "^7.0",
    "symfony/css-selector": "^7.0"
  }
}
```

### Добавить
```json
{
  "require": {
    "firebase/php-jwt": "^6.0",
    "vlucas/phpdotenv": "^5.0",
    "openai-php/client": "^0.10"
  }
}
```

### React (cheepy) — добавить
```json
{
  "@tanstack/react-query": "^5.0"
}
```

---

## ⚠️ ЧАСТЬ 14: КЛЮЧЕВЫЕ РИСКИ И РЕШЕНИЯ

| Риск | Решение |
|------|---------|
| Долгий парсинг блокирует API | Запуск в фоне + SSE/polling |
| Блокировка по IP на sadovodbaza.ru | request_delay_ms, ротация User-Agent |
| SSL ошибки на Windows | verify_ssl=false в конфиге |
| Дублирование товаров | UNIQUE на external_id |
| Устаревшие данные | Планировщик + check-relevance |
| Большой объем данных | Пагинация, индексы в БД |
| CORS проблемы | CorsMiddleware с настраиваемыми origins |
| Нет токена AI | API ключ в .env, AI можно отключить |
| Потеря прогресса при падении | parser_jobs хранит состояние |

---

## 🎯 ИТОГ

Полная интеграция включает:
- **1 PHP Backend** (`sadavod.loc`) с REST API на 15+ контроллерах
- **14 таблиц** SQLite/MySQL базы данных
- **70+ API endpoints** для admin и пользовательских страниц
- **Полный цикл**: парсинг → фильтрация → AI → отображение
- **Real-time прогресс** через SSE или polling
- **Расписание** через scheduler с cron выражениями
- **Исключения** с 4 типами действий и 4 областями применения
- **Фильтры** с 4 типами отображения для каждой категории
- **React хуки** для всех admin страниц и пользовательских страниц
- **JWT аутентификация** для admin панели
- **Экспорт** данных в CSV/JSON

---

**Следующий шаг**: Начать реализацию с Этапа 1 — создание базы данных и роутера.
