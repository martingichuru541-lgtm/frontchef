import React from 'react';
import {
  Globe,
  ShoppingBag,
  Bell,
  User,
  ChevronDown,
  Layers,
  Sparkles,
  Search,
} from 'lucide-react';

interface KenyaOneHeaderProps {
  activeDepartment: string;
  onSelectDepartment: (dept: string) => void;
  cartCount?: number;
}

export const KenyaOneHeader: React.FC<KenyaOneHeaderProps> = ({
  activeDepartment,
  onSelectDepartment,
  cartCount = 2,
}) => {
  return (
    <div className="w-full bg-stone-950 border-b border-white/[0.08] text-xs text-stone-300 relative z-40 select-none">
      {/* Top Umbrella Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-[11px]">
        {/* Left: KenyaOne Official Platform Indicator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-bold tracking-wider uppercase text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-black tracking-tight text-xs">KENYA<span className="text-emerald-400">·ONE</span></span>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="text-stone-400 hidden sm:inline font-normal normal-case">National Digital Platform</span>
          </div>
        </div>

        {/* Right: User Profile, Language & KenyaOne Marketplace */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center space-x-1 text-stone-400 hover:text-white cursor-pointer transition">
            <Globe className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold">EN</span>
            <span className="text-stone-600">/</span>
            <span>SW</span>
          </div>

          {/* KenyaOne Marketplace Quick Link */}
          <button
            onClick={() => onSelectDepartment('marketplace')}
            className="flex items-center space-x-1.5 text-stone-300 hover:text-white transition cursor-pointer"
            title="KenyaOne Marketplace"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Marketplace</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-mono text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <div className="relative cursor-pointer text-stone-400 hover:text-white">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </div>

          {/* User Account (Preserving KenyaOne User Session) */}
          <div className="flex items-center space-x-2 pl-2 border-l border-white/10 cursor-pointer group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
              MG
            </div>
            <div className="hidden lg:block text-left">
              <div className="font-semibold text-white leading-none">Martin Gichuru</div>
              <div className="text-[10px] text-emerald-400/90 font-mono">Nairobi, KE</div>
            </div>
            <ChevronDown className="w-3 h-3 text-stone-500 group-hover:text-white transition" />
          </div>
        </div>
      </div>

      {/* KenyaOne Department Navigation Bar */}
      <div className="bg-stone-900/95 backdrop-blur-md border-t border-b border-white/[0.06] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-11 overflow-x-auto scrollbar-none gap-2">
          {/* Departments Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mr-2 hidden sm:inline">
              Departments:
            </span>

            {[
              { id: 'news', label: 'News & Media' },
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'frostchef', label: 'Frost Chef Digital Kitchen', isFlagship: true },
              { id: 'counties', label: 'Gov & 47 Counties' },
              { id: 'business', label: 'Business Hub' },
            ].map(dept => {
              const isActive = activeDepartment === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => onSelectDepartment(dept.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {dept.isFlagship && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <span>{dept.label}</span>
                  {dept.isFlagship && (
                    <span className="ml-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                      Flagship
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Department Breadcrumb */}
          <div className="text-[11px] text-stone-500 hidden xl:flex items-center space-x-1.5 font-mono">
            <span>KenyaOne</span>
            <span>/</span>
            <span>Departments</span>
            <span>/</span>
            <span className="text-emerald-400 font-bold">Frost Chef Digital Kitchen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
