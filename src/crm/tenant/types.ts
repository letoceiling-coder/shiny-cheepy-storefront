export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string;
  logo: string;
  currency: string;
  commission: number;
  regions: string[];
  status: 'active' | 'inactive' | 'setup';
  sellersCount: number;
  usersCount: number;
  productsCount: number;
  createdAt: string;
}
