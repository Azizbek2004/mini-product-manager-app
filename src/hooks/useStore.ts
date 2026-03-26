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

  useEffect(() => {
    loadData();
    // Listen for storage events across tabs
    const handleStorage = () => loadData();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [loadData]);

  const addCategory = (name: string) => {
    const created = CategoryService.create(name);
    loadData();
    return created;
  };

  const updateCategory = (id: string, name: string) => {
    const updated = CategoryService.update(id, name);
    loadData();
    return updated;
  };

  const deleteCategory = (id: string) => {
    CategoryService.delete(id);
    loadData();
  };

  const addProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = ProductService.create(data);
    loadData();
    return created;
  };

  const updateProduct = (id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const updated = ProductService.update(id, data);
    loadData();
    return updated;
  };

  const deleteProduct = (id: string) => {
    ProductService.delete(id);
    loadData();
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
