'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Tags } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Mahsulotlar', href: '/', icon: LayoutDashboard },
  { name: 'Kategoriyalar', href: '/categories', icon: Tags },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-2xl border-r border-slate-200/50 shadow-sm flex-col z-40 hidden sm:flex">
        <div className="h-20 flex items-center px-8 border-b border-slate-200/50">
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 bg-clip-text text-transparent">
            ProductMgr
          </h1>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300',
                  isActive 
                    ? 'text-blue-700' 
                    : 'text-slate-500 hover:text-slate-900'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-blue-50/80 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-blue-600" : "text-slate-400")} />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-slate-200/50 z-50 sm:hidden">
        <div className="flex items-center justify-around px-2 pb-4 pt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center w-full relative"
              >
                <div className={cn(
                  "p-2 rounded-2xl transition-all duration-300 z-10",
                  isActive ? "text-blue-600" : "text-slate-400"
                )}>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-mobile"
                      className="absolute top-1 bottom-6 left-1/2 -translate-x-1/2 w-12 bg-blue-50 rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-6 h-6" />
                </div>
                <span className={cn("text-[11px] font-semibold mt-1", isActive ? "text-blue-700" : "text-slate-500")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
