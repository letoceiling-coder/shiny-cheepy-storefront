import { rnd } from './helpers';

export interface Region {
  id: string;
  name: string;
  type: 'country' | 'oblast' | 'city' | 'district';
  parentId: string | null;
  active: boolean;
  deliveryRestricted: boolean;
  taxRate: number;
  currency: string;
  children?: Region[];
}

export const regions: Region[] = [
  {
    id: 'R1', name: 'Россия', type: 'country', parentId: null, active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB',
    children: [
      {
        id: 'R1-1', name: 'Московская область', type: 'oblast', parentId: 'R1', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB',
        children: [
          { id: 'R1-1-1', name: 'Москва', type: 'city', parentId: 'R1-1', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB' },
          { id: 'R1-1-2', name: 'Химки', type: 'city', parentId: 'R1-1', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB' },
          { id: 'R1-1-3', name: 'Подольск', type: 'city', parentId: 'R1-1', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB' },
        ],
      },
      {
        id: 'R1-2', name: 'Ленинградская область', type: 'oblast', parentId: 'R1', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB',
        children: [
          { id: 'R1-2-1', name: 'Санкт-Петербург', type: 'city', parentId: 'R1-2', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB' },
        ],
      },
      {
        id: 'R1-3', name: 'Новосибирская область', type: 'oblast', parentId: 'R1', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB',
        children: [
          { id: 'R1-3-1', name: 'Новосибирск', type: 'city', parentId: 'R1-3', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB' },
        ],
      },
      {
        id: 'R1-4', name: 'Краснодарский край', type: 'oblast', parentId: 'R1', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB',
        children: [
          { id: 'R1-4-1', name: 'Краснодар', type: 'city', parentId: 'R1-4', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB' },
          { id: 'R1-4-2', name: 'Сочи', type: 'city', parentId: 'R1-4', active: true, deliveryRestricted: false, taxRate: 20, currency: 'RUB' },
        ],
      },
      { id: 'R1-5', name: 'Крым', type: 'oblast', parentId: 'R1', active: true, deliveryRestricted: true, taxRate: 20, currency: 'RUB' },
    ],
  },
  {
    id: 'R2', name: 'Казахстан', type: 'country', parentId: null, active: true, deliveryRestricted: false, taxRate: 12, currency: 'KZT',
    children: [
      { id: 'R2-1', name: 'Алматы', type: 'city', parentId: 'R2', active: true, deliveryRestricted: false, taxRate: 12, currency: 'KZT' },
      { id: 'R2-2', name: 'Нур-Султан', type: 'city', parentId: 'R2', active: true, deliveryRestricted: false, taxRate: 12, currency: 'KZT' },
    ],
  },
  {
    id: 'R3', name: 'Беларусь', type: 'country', parentId: null, active: false, deliveryRestricted: true, taxRate: 20, currency: 'BYN',
  },
];
