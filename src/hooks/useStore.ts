import { useState, useEffect, useCallback } from 'react';
import { Category, Product } from '../types';
import { CategoryService, ProductService } from '../services/storageService';

export const useStore = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = useCallback(() => {
    setCategories(CategoryService.getAll());
    setProducts(ProductService.getAll());
    setIsLoaded(true);
  }, []);

  const dispatchSync = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('store_sync'));
    }
  };

  useEffect(() => {
    loadData();
    // Listen for storage events across tabs and local custom sync events
    const handleStorage = () => loadData();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('store_sync', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('store_sync', handleStorage);
    };
  }, [loadData]);

  const addCategory = (name: string) => {
    const created = CategoryService.create(name);
    loadData();
    dispatchSync();
    return created;
  };

  const updateCategory = (id: string, name: string) => {
    const updated = CategoryService.update(id, name);
    loadData();
    dispatchSync();
    return updated;
  };

  const deleteCategory = (id: string) => {
    CategoryService.delete(id);
    loadData();
    dispatchSync();
  };

  const addProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = ProductService.create(data);
    loadData();
    dispatchSync();
    return created;
  };

  const updateProduct = (id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const updated = ProductService.update(id, data);
    loadData();
    dispatchSync();
    return updated;
  };

  const deleteProduct = (id: string) => {
    ProductService.delete(id);
    loadData();
    dispatchSync();
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  return {
    categories,
    products,
    isLoaded,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    getCategoryName,
    refreshFn: loadData
  };
};
