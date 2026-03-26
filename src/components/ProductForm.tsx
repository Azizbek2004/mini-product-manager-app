import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Modal } from './Modal';
import { useStore } from '../hooks/useStore';
import { Product } from '../types';
import { validateProduct } from '../utils/validation';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export function ProductForm({ isOpen, onClose, productToEdit }: ProductFormProps) {
  const { addProduct, updateProduct, categories } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setFormData({
          name: productToEdit.name,
          categoryId: productToEdit.categoryId,
          price: productToEdit.price.toString(),
          description: productToEdit.description
        });
      } else {
        setFormData({ name: '', categoryId: '', price: '', description: '' });
      }
      setErrors(null);
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const priceNum = parseFloat(formData.price);
    
    const validationErrors = validateProduct(
      formData.name,
      priceNum,
      formData.categoryId,
      formData.description
    );

    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      categoryId: formData.categoryId,
      price: priceNum,
      description: formData.description.trim()
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
      toast.success('Mahsulot muvaffaqiyatli yangilandi');
    } else {
      addProduct(payload);
      toast.success('Mahsulot muvaffaqiyatli yaratildi');
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = (name: string) => `w-full px-5 py-3 bg-slate-50/50 border rounded-2xl text-base focus:ring-4 focus:outline-none transition-all ${
    errors?.[name] 
      ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50/50 text-red-900' 
      : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
  }`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Mahsulot nomi</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses('name')}
            placeholder="Masalan: Simsiz quloqchin"
          />
          {errors?.name && <p className="mt-1.5 text-sm text-red-500 font-medium px-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Kategoriya</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={inputClasses('categoryId')}
            >
              <option value="">Tanlang...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors?.categoryId && <p className="mt-1.5 text-sm text-red-500 font-medium px-1">{errors.categoryId}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Narxi ($)</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className={inputClasses('price')}
              placeholder="0.00"
            />
            {errors?.price && <p className="mt-1.5 text-sm text-red-500 font-medium px-1">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Tavsifi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`${inputClasses('description')} resize-none`}
            placeholder="Mahsulot haqida batafsil..."
          />
          {errors?.description && <p className="mt-1.5 text-sm text-red-500 font-medium px-1">{errors.description}</p>}
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
            {productToEdit ? "O'zgarishlarni saqlash" : "Mahsulot qo'shish"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
