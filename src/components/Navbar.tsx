import { Home, Refrigerator, Sparkles, ShoppingBag, Utensils, SlidersHorizontal, BookOpen, FileText } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'recipes' | 'inventory' | 'shopping';
  setActiveTab: (tab: 'home' | 'recipes' | 'inventory' | 'shopping') => void;
  detectedCount: number;
  shoppingCount: number;
  onOpenMobileFilters: () => void;
  onOpenNewScan: () => void;
  onOpenCookbook?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  detectedCount,
  shoppingCount,
  onOpenMobileFilters,
  onOpenNewScan,
  onOpenCookbook,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
            <Refrigerator className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-stone-100 bg-clip-text text-transparent">
                FrostChef
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                Smart Fridge AI
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">Snap. Detect. Cook hands-free.</p>
          </div>
        </div>

        {/* Primary Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-stone-950/60 p-1 rounded-xl border border-stone-800/80">
          <button
            onClick={() => setActiveTab('home')}
            aria-label="Home"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'home'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden xs:inline">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            aria-label="View Recipes"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'recipes'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            aria-label="View Fridge Inventory"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'inventory'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Refrigerator className="w-4 h-4" />
            <span>Fridge</span>
            {detectedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold bg-stone-800 text-emerald-300 rounded-full border border-emerald-500/30">
                {detectedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('shopping')}
            aria-label="View Shopping List"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
              activeTab === 'shopping'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Shopping</span>
            <span className="sm:hidden">List</span>
            {shoppingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold bg-amber-500 text-stone-950 rounded-full">
                {shoppingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Downloadable PDF Cookbook Button (Prompt Requirement) */}
          {onOpenCookbook && (
            <button
              onClick={onOpenCookbook}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-semibold transition shadow-sm"
              aria-label="Download Kenyan Culinary Masterclass PDF"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Cookbook PDF</span>
              <span className="px-1.5 py-0.2 text-[10px] bg-amber-500 text-stone-950 font-black rounded-full hidden sm:inline">
                16 Images
              </span>
            </button>
          )}

          {/* Mobile Filter Toggle */}
          <button
            onClick={onOpenMobileFilters}
            className="md:hidden p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white border border-stone-700"
            aria-label="Open Filter Sidebar"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Quick Rescan Button */}
          <button
            onClick={onOpenNewScan}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-medium shadow-sm transition-all border border-emerald-400/30"
            aria-label="Scan Fridge Photo"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Scan Fridge</span>
            <span className="sm:hidden">Scan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
