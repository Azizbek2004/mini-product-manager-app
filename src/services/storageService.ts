import { v4 as uuidv4 } from 'uuid';
import { Product, Category } from '../types';

const PRODUCTS_KEY = 'mini_app_products';
const CATEGORIES_KEY = 'mini_app_categories';

// Generic getting and setting to localStorage
const getItems = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const setItems = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const CategoryService = {
  getAll: (): Category[] => getItems<Category>(CATEGORIES_KEY),
  
  create: (name: string): Category => {
    const categories = getItems<Category>(CATEGORIES_KEY);
    const newCategory: Category = { id: uuidv4(), name };
    setItems(CATEGORIES_KEY, [...categories, newCategory]);
    return newCategory;
  },

  update: (id: string, name: string): Category | null => {
    const categories = getItems<Category>(CATEGORIES_KEY);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    categories[index].name = name;
    setItems(CATEGORIES_KEY, categories);
    return categories[index];
  },

  delete: (id: string): void => {
    const categories = getItems<Category>(CATEGORIES_KEY);
    setItems(CATEGORIES_KEY, categories.filter(c => c.id !== id));
    
    // Also delete associated products when category is deleted
    const products = getItems<Product>(PRODUCTS_KEY);
    setItems(PRODUCTS_KEY, products.filter(p => p.categoryId !== id));
  }
};

export const ProductService = {
  getAll: (): Product[] => getItems<Product>(PRODUCTS_KEY),

  create: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const products = getItems<Product>(PRODUCTS_KEY);
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...data,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    setItems(PRODUCTS_KEY, [...products, newProduct]);
    return newProduct;
  },

  update: (id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Product | null => {
    const products = getItems<Product>(PRODUCTS_KEY);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    setItems(PRODUCTS_KEY, products);
    return products[index];
  },

  delete: (id: string): void => {
    const products = getItems<Product>(PRODUCTS_KEY);
    setItems(PRODUCTS_KEY, products.filter(p => p.id !== id));
  }
};
