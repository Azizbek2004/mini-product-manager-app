import { ArrowDown, ArrowUp, ArrowUpDown, Edit2, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { SortField, SortOrder } from '../utils/sorting';
import { useStore } from '../hooks/useStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductTableProps {
  products: Product[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({ products, sortField, sortOrder, onSort, onEdit, onDelete }: ProductTableProps) {
  const { getCategoryName } = useStore();

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />;
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-blue-600" /> 
      : <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  const formatDate = (isoString: string) => {
    return new Intl.DateTimeFormat('uz-UZ', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    }).format(new Date(isoString));
  };

  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/60 backdrop-blur-xl rounded-[24px] border border-slate-200/50 p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <p className="text-slate-500 font-medium text-lg">Mahsulotlar topilmadi.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white/80 backdrop-blur-xl rounded-[24px] border border-slate-200/60 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200/60 text-slate-500 text-sm font-semibold uppercase tracking-wider">
              <th className="px-6 py-5 cursor-pointer group select-none transition-colors hover:bg-slate-100/50" onClick={() => onSort('name')}>
                <div className="flex items-center gap-2 hover:text-slate-900 transition-colors">Nomi {renderSortIcon('name')}</div>
              </th>
              <th className="px-6 py-5">Kategoriya</th>
              <th className="px-6 py-5">Tavsifi</th>
              <th className="px-6 py-5 cursor-pointer group select-none transition-colors hover:bg-slate-100/50" onClick={() => onSort('price')}>
                <div className="flex items-center gap-2 hover:text-slate-900 transition-colors">Narxi {renderSortIcon('price')}</div>
              </th>
              <th className="px-6 py-5 cursor-pointer group select-none transition-colors hover:bg-slate-100/50" onClick={() => onSort('createdAt')}>
                <div className="flex items-center gap-2 hover:text-slate-900 transition-colors">Yaratilgan sana {renderSortIcon('createdAt')}</div>
              </th>
              <th className="px-6 py-5 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            <AnimatePresence>
              {products.map((product) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  key={product.id} 
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-5 font-semibold text-slate-900">{product.name}</td>
                  <td className="px-6 py-5 text-slate-600">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100/50 shadow-sm">
                      {getCategoryName(product.categoryId)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 text-sm truncate max-w-[250px]" title={product.description}>
                    {product.description}
                  </td>
                  <td className="px-6 py-5 text-slate-900 font-bold tracking-tight">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-5 text-slate-500 text-sm font-medium whitespace-nowrap">{formatDate(product.createdAt)}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                      <button 
                        onClick={() => onEdit(product)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-100"
                        title="Tahrirlash"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
