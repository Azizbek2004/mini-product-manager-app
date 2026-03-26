'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Tags } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { CategoryForm } from '../../components/CategoryForm';
import { Category } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoriesPage() {
  const { categories, isLoaded, deleteCategory } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const openNewForm = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bu kategoriyani o'chirishga ishonchingiz komilmi? Unga tegishli barcha mahsulotlar ham o'chiriladi.")) {
      deleteCategory(id);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-8 pb-20 sm:pb-0 max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 bg-clip-text">
            Kategoriyalar
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium">Mahsulotlaringizni toifalar bo'yicha ajrating.</p>
        </div>
        <button
          onClick={openNewForm}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Kategoriya qo'shish
        </button>
      </motion.div>

      {categories.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-white/60 backdrop-blur-2xl rounded-[32px] border border-slate-200/50 p-16 sm:p-24 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center mt-8"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner ring-8 ring-blue-50/50">
            <Tags className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Hali kategoriyalar yo'q</h3>
          <p className="text-slate-500 text-lg max-w-md mb-8 leading-relaxed">Boshlash uchun birinchi kategoriyangizni yarating.</p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-slate-200 text-slate-700 text-base font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Birinchi kategoriya
          </button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-slate-200/60 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6"
        >
          <ul className="divide-y divide-slate-100/80">
            <AnimatePresence>
              {categories.map((category) => (
                <motion.li 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={category.id} 
                  className="flex items-center justify-between p-6 hover:bg-slate-50/80 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                      <span className="font-bold text-lg">{category.name.charAt(0)}</span>
                    </div>
                    <span className="font-bold text-lg text-slate-900">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                    <button 
                      onClick={() => openEditForm(category)}
                      className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-100"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      )}

      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        categoryToEdit={editingCategory}
      />
    </div>
  );
}
