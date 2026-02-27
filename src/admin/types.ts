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
  category: string;
  price: number;
  status: 'active' | 'disabled' | 'pending' | 'archived';
  source: string;
  aiStatus: 'processed' | 'pending' | 'error' | 'none';
  imageUrl: string;
  updatedAt: string;
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
  action: 'delete' | 'replace';
  replacement?: string;
  matchCount: number;
}

export type UserRole = 'admin' | 'moderator' | 'operator';
