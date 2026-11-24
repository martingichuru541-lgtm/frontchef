import React from 'react';
import {
  ChefHat,
  Sparkles,
  Utensils,
  MapPin,
  Flame,
  Refrigerator,
  Calendar,
  Calculator,
  GraduationCap,
  Briefcase,
  Globe2,
  Users,
  ShieldCheck,
  FileText,
  Camera,
  LayoutGrid,
} from 'lucide-react';

export type FrostChefTab =
  | 'home'
  | 'kitchen'
  | 'chef'
  | 'recipes'
  | 'counties'
  | 'studio'
  | 'pantry'
  | 'planner'
  | 'calculators'
  | 'academy'
  | 'pro'
  | 'global'
  | 'community'
  | 'admin';

interface FrostChefNavProps {
  activeTab: FrostChefTab;
  setActiveTab: (tab: FrostChefTab) => void;
  onOpenScanner: () => void;
  onOpenCookbook: () => void;
  pantryCount: number;
}

export const FrostChefNav: React.FC<FrostChefNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenScanner,
  onOpenCookbook,
  pantryCount,
}) => {
  const primaryNavItems: { id: FrostChefTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Overview', icon: LayoutGrid },
    { id: 'kitchen', label: 'Digital Kitchen', icon: ChefHat },
    { id: 'chef', label: 'AI Chef Amani', icon: Sparkles },
    { id: 'recipes', label: 'Recipes Library', icon: Utensils },
    { id: 'counties', label: '47 Counties', icon: MapPin },
    { id: 'studio', label: 'Cooking Studio', icon: Flame },
    { id: 'pantry', label: 'My Pantry', icon: Refrigerator },
    { id: 'planner', label: 'Meal Planner', icon: Calendar },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'academy', label: 'Academy', icon: GraduationCap },
    { id: 'pro', label: 'Pro Kitchen', icon: Briefcase },
    { id: 'global', label: 'Diaspora Kitchen', icon: Globe2 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <nav className="sticky top-0 z-30 w-full backdrop-blur-2xl bg-stone-950/80 border-b border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand & Department Tagline */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-amber-500/20 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:border-emerald-400/50 transition">
              <ChefHat className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-stone-100 to-amber-200 bg-clip-text text-transparent">
                  FROST CHEF
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 hidden sm:inline">
                  Digital Kitchen
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium tracking-tight hidden md:block">
                Where Kenyan Flavours Meet Culinary Intelligence.
              </p>
            </div>
          </div>

          {/* Quick Department Action CTAs */}
          <div className="flex items-center space-x-2.5">
            {/* Downloadable Masterclass PDF */}
            <button
              onClick={onOpenCookbook}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              title="Download 1,350+ words masterclass PDF with 16 images"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Cookbook PDF</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-amber-500 text-stone-950 font-black rounded-full">
                16 Steps
              </span>
            </button>

            {/* Smart Fridge AI Scanner */}
            <button
              onClick={onOpenScanner}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition shadow-md border border-emerald-400/30 flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scan Fridge</span>
              <span className="sm:hidden">Scan</span>
            </button>
          </div>
        </div>

        {/* Liquid Glass Secondary Horizontal Navigation Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-white/[0.05]">
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white/10 text-emerald-400 border border-emerald-500/30 shadow-[0_2px_12px_rgba(16,185,129,0.2)] font-semibold'
                    : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
                {item.id === 'pantry' && pantryCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono rounded-full bg-stone-800 text-emerald-300 border border-emerald-500/30">
                    {pantryCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
