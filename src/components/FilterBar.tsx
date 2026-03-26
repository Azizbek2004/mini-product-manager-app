import { Filter } from 'lucide-react';
import { useStore } from '../hooks/useStore';

interface FilterBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function FilterBar({ value, onChange }: FilterBarProps) {
  const { categories } = useStore();

  return (
    <div className="relative w-full max-w-[240px] group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Filter className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <select
        className="block w-full pl-11 pr-10 py-3 border border-slate-200/60 rounded-xl leading-5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 sm:text-sm transition-all shadow-sm appearance-none cursor-pointer font-medium"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Barcha kategoriyalar</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
      </div>
    </div>
  );
}
