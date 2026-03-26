'use client';

import { useState, useMemo } from 'react';
import { Plus, PackageOpen } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { ProductTable } from '../components/ProductTable';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { ProductForm } from '../components/ProductForm';
import { Product } from '../types';
import { SortField, SortOrder, sortProducts } from '../utils/sorting';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const { products, isLoaded, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const openNewForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bu mahsulotni o'chirishga ishonchingiz komilmi?")) {
      deleteProduct(id);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerQuery));
    }

    if (filterCategoryId) {
      result = result.filter(p => p.categoryId === filterCategoryId);
    }

    return sortProducts(result, sortField, sortOrder);
  }, [products, searchQuery, filterCategoryId, sortField, sortOrder]);

  if (!isLoaded) return null;

  return (
    <div className="space-y-8 pb-20 sm:pb-0">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 bg-clip-text">
            Mahsulotlar
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium">Barcha mahsulotlaringizni shu yerdan boshqaring.</p>
        </div>
        <button
          onClick={openNewForm}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Mahsulot qo'shish
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center bg-white/40 backdrop-blur-xl p-3 rounded-2xl border border-white shadow-sm"
      >
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar value={filterCategoryId} onChange={setFilterCategoryId} />
      </motion.div>

      {products.length === 0 && !searchQuery && !filterCategoryId ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/60 backdrop-blur-2xl rounded-[32px] border border-slate-200/50 p-16 sm:p-24 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center mt-8"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner ring-8 ring-blue-50/50">
            <PackageOpen className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Hali mahsulotlar yo'q</h3>
          <p className="text-slate-500 text-lg max-w-md mb-8 leading-relaxed">Birinchi mahsulotingizni yaratishdan boshlang. Avval kategoriya yaratishni unutmang!</p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-slate-200 text-slate-700 text-base font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Birinchi mahsulot
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <ProductTable
            products={filteredAndSortedProducts}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        </motion.div>
      )}

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
}
