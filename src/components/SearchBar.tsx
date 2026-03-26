import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 border border-slate-200/60 rounded-xl leading-5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
        placeholder="Nomi bo'yicha qidirish..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
