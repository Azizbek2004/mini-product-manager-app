import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Modal } from './Modal';
import { useStore } from '../hooks/useStore';
import { Category } from '../types';
import { validateCategory } from '../utils/validation';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | null;
}

export function CategoryForm({ isOpen, onClose, categoryToEdit }: CategoryFormProps) {
  const { addCategory, updateCategory } = useStore();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{name?: string} | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName(categoryToEdit ? categoryToEdit.name : '');
      setErrors(null);
    }
  }, [categoryToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateCategory(name);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    if (categoryToEdit) {
      updateCategory(categoryToEdit.id, name.trim());
      toast.success('Kategoriya muvaffaqiyatli yangilandi');
    } else {
      addCategory(name.trim());
      toast.success('Kategoriya muvaffaqiyatli yaratildi');
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={categoryToEdit ? 'Kategoriyani tahrirlash' : 'Yangi kategoriya'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kategoriya nomi
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors?.name) setErrors(null);
            }}
            className={`w-full px-5 py-4 bg-slate-50/50 border rounded-2xl text-lg focus:ring-4 focus:outline-none transition-all ${
              errors?.name 
                ? 'border-red-300 focus:ring-red-100 focus:border-red-500 text-red-900 bg-red-50/50' 
                : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
            }`}
            placeholder="Masalan: Elektronika"
            autoFocus
          />
          {errors?.name && (
            <p className="mt-2 text-sm text-red-500 font-medium px-1">{errors.name}</p>
          )}
        </div>
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200/50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-base font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            {categoryToEdit ? "O'zgarishlarni saqlash" : "Kategoriya qo'shish"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
