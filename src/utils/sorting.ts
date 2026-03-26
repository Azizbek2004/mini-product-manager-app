import { Product } from '../types';

export type SortField = 'name' | 'price' | 'createdAt' | 'updatedAt';
export type SortOrder = 'asc' | 'desc';

export const sortProducts = (products: Product[], field: SortField, order: SortOrder) => {
  return [...products].sort((a, b) => {
    let comparison = 0;
    
    if (field === 'price') {
      comparison = a.price - b.price;
    } else if (field === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else {
      comparison = new Date(a[field]).getTime() - new Date(b[field]).getTime();
    }

    return order === 'asc' ? comparison : -comparison;
  });
};
