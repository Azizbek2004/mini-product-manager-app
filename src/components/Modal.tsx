import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/50 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200/50 bg-white/50">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 text-slate-400 hover:text-slate-700 bg-slate-100/50 hover:bg-slate-200/50 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
