// ── CRM RBAC Types ──

export const APP_ROLES = [
  'SuperAdmin',
  'TenantOwner',
  'MarketplaceAdmin',
  'Moderator',
  'SellerManager',
  'FinanceManager',
  'SupportManager',
  'ContentManager',
  'Analyst',
] as const;

export type AppRole = typeof APP_ROLES[number];

export type Permission =
  | 'products.read' | 'products.create' | 'products.update' | 'products.delete' | 'products.moderate'
  | 'orders.read' | 'orders.refund' | 'orders.cancel'
  | 'finance.view' | 'finance.payout' | 'finance.export'
  | 'users.manage' | 'sellers.manage'
  | 'marketing.create' | 'marketing.send'
  | 'moderation.read' | 'moderation.approve' | 'moderation.reject'
  | 'analytics.view'
  | 'tenants.manage'
  | 'settings.manage'
  | 'integrations.manage'
  | 'reviews.manage'
  | 'delivery.manage'
  | 'content.manage';

export const ROLE_PERMISSIONS: Record<AppRole, Permission[]> = {
  SuperAdmin: [
    'products.read','products.create','products.update','products.delete','products.moderate',
    'orders.read','orders.refund','orders.cancel',
    'finance.view','finance.payout','finance.export',
    'users.manage','sellers.manage',
    'marketing.create','marketing.send',
    'moderation.read','moderation.approve','moderation.reject',
    'analytics.view','tenants.manage','settings.manage','integrations.manage',
    'reviews.manage','delivery.manage','content.manage',
  ],
  TenantOwner: [
    'products.read','products.create','products.update','products.delete','products.moderate',
    'orders.read','orders.refund','orders.cancel',
    'finance.view','finance.payout','finance.export',
    'users.manage','sellers.manage',
    'marketing.create','marketing.send',
    'moderation.read','moderation.approve','moderation.reject',
    'analytics.view','settings.manage','integrations.manage',
    'reviews.manage','delivery.manage','content.manage',
  ],
  MarketplaceAdmin: [
    'products.read','products.create','products.update','products.delete','products.moderate',
    'orders.read','orders.refund','orders.cancel',
    'finance.view','finance.export',
    'users.manage','sellers.manage',
    'marketing.create','marketing.send',
    'moderation.read','moderation.approve','moderation.reject',
    'analytics.view','reviews.manage','delivery.manage','content.manage',
  ],
  Moderator: [
    'products.read','products.moderate',
    'moderation.read','moderation.approve','moderation.reject',
    'reviews.manage',
  ],
  SellerManager: [
    'products.read','sellers.manage','orders.read','analytics.view',
  ],
  FinanceManager: [
    'finance.view','finance.payout','finance.export','orders.read','analytics.view',
  ],
  SupportManager: [
    'orders.read','orders.refund','orders.cancel','users.manage','reviews.manage',
  ],
  ContentManager: [
    'products.read','products.create','products.update','content.manage','marketing.create',
  ],
  Analyst: [
    'analytics.view','finance.view','products.read','orders.read',
  ],
};

export interface RbacUser {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  avatar?: string;
}
