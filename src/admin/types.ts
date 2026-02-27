// Admin module types

export interface DashboardStats {
  totalProducts: number;
  newToday: number;
  disabled: number;
  lastParserRun: string;
  activeTasks: number;
  errors: number;
  aiStatus: 'active' | 'inactive' | 'error';
  schedulerStatus: 'running' | 'stopped' | 'paused';
}

export interface ParserConfig {
  withPhotos: boolean;
  saveToDB: boolean;
  previewOnly: boolean;
  category: string;
  subcategory: string;
  depthLimit: number;
  recordLimit: number;
  cronExpression: string;
  autoCheckRelevance: boolean;
  retryOnError: boolean;
  threadLimit: number;
}

export interface ParserStatus {
  isRunning: boolean;
  progress: number;
  currentItem: string;
  processedCount: number;
  totalCount: number;
  errors: string[];
  startedAt: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  enabled: boolean;
  linkedToParser: boolean;
  order: number;
  children: Category[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  oldPrice?: number;
  currency: string;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  quantity: number;
  status: 'active' | 'disabled' | 'pending' | 'archived';
  source: string;
  aiStatus: 'processed' | 'pending' | 'error' | 'none';
  imageUrl: string;
  images: string[];
  description: string;
  brandId: string | null;
  updatedAt: string;
  parsedAt: string;
  relevanceCheckedAt: string | null;
}

export interface AiConfig {
  apiKey: string;
  model: string;
  tokenLimit: number;
  enabled: boolean;
}

export interface AiTask {
  id: string;
  type: 'title' | 'description' | 'seo' | 'image' | 'moderation' | 'analysis';
  status: 'queued' | 'processing' | 'done' | 'error';
  productId: string;
  createdAt: string;
}

export interface SchedulerTask {
  id: string;
  name: string;
  type: 'parsing' | 'relevance' | 'ai_processing';
  cronExpression: string;
  enabled: boolean;
  lastRun: string | null;
  nextRun: string;
  status: 'idle' | 'running' | 'error';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  module: string;
  message: string;
  details?: string;
}

export interface ExcludedWord {
  id: string;
  word: string;
  type: 'word' | 'phrase' | 'regex';
  action: 'delete' | 'replace' | 'hide' | 'flag';
  replacement?: string;
  matchCount: number;
  scope: 'global' | 'category' | 'product_type' | 'temporary';
  categoryId?: string;
  productType?: string;
  expiresAt?: string | null;
}

export type UserRole = 'admin' | 'moderator' | 'operator';

// ===== EAV / Attributes =====

export type AttributeType = 'string' | 'number' | 'boolean' | 'select' | 'multiselect' | 'range' | 'json' | 'text';

export interface AttributeDefinition {
  id: string;
  name: string;
  slug: string;
  type: AttributeType;
  options?: string[]; // for select / multiselect
  unit?: string;
  required: boolean;
  filterable: boolean;
  order: number;
}

export interface ProductAttribute {
  attributeId: string;
  value: string | number | boolean | string[] | [number, number] | Record<string, unknown>;
}

// ===== Brands =====

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  status: 'active' | 'disabled';
  seoTitle: string;
  seoDescription: string;
  categoryIds: string[];
}

// ===== Filters =====

export interface FilterConfig {
  id: string;
  attributeId: string;
  categoryId: string;
  displayType: 'checkbox' | 'select' | 'multiselect' | 'range';
  enabled: boolean;
  order: number;
}

// ===== Product history =====

export interface ProductHistoryEntry {
  id: string;
  productId: string;
  timestamp: string;
  field: string;
  oldValue: string;
  newValue: string;
  source: 'manual' | 'parser' | 'ai' | 'system';
}
