import React, { useState, useMemo } from 'react';
import {
  Camera,
  Search,
  Sparkles,
  Utensils,
  ShoppingBag,
  SlidersHorizontal,
  LayoutGrid,
  LayoutList,
  CheckCircle,
  AlertCircle,
  X,
  Filter,
  Flame,
  Coins,
  ChevronRight,
  BookOpen,
  ChefHat,
  MapPin,
  Calendar,
  Calculator,
  GraduationCap,
  Briefcase,
  Globe2,
  Users,
  ShieldCheck,
  Refrigerator,
} from 'lucide-react';
import { KenyaOneHeader } from './components/KenyaOneHeader.tsx';
import { FrostChefNav, FrostChefTab } from './components/FrostChefNav.tsx';
import { CinematicLandingPage } from './components/CinematicLandingPage.tsx';
import { AiKenyanChefView } from './components/AiKenyanChefView.tsx';
import { CountiesExplorerView } from './components/CountiesExplorerView.tsx';
import { InteractiveCookingStudioView } from './components/InteractiveCookingStudioView.tsx';
import { DigitalPantryView } from './components/DigitalPantryView.tsx';
import { SmartMealPlannerView } from './components/SmartMealPlannerView.tsx';
import { CalculatorsView } from './components/CalculatorsView.tsx';
import { FrostChefAcademyView } from './components/FrostChefAcademyView.tsx';
import { ProfessionalKitchenView } from './components/ProfessionalKitchenView.tsx';
import { GlobalKitchenView } from './components/GlobalKitchenView.tsx';
import { CulinaryCommunityView } from './components/CulinaryCommunityView.tsx';
import { AdminPortalView } from './components/AdminPortalView.tsx';

import { FridgeScanner } from './components/FridgeScanner.tsx';
import { FilterSidebar } from './components/FilterSidebar.tsx';
import { RecipeCard } from './components/RecipeCard.tsx';
import { CompactRecipeCard } from './components/CompactRecipeCard.tsx';
import { CookingModeModal } from './components/CookingModeModal.tsx';
import { RecipeDetailModal } from './components/RecipeDetailModal.tsx';
import { ShoppingListTab } from './components/ShoppingListTab.tsx';
import { CookbookModal } from './components/CookbookModal.tsx';

import { FRIDGE_PRESETS } from './data/presets.ts';
import { KENYAN_RECIPES, ExtendedRecipe } from './data/kenyanRecipes.ts';
import {
  calculateRecipeMatch,
  filterAndSortRecipes,
  RecipeFilterOptions,
  addIngredientsToShoppingList,
} from './utils/culinary.ts';
import { Recipe, IngredientItem, ShoppingItem } from './types.ts';

export default function App() {
  const [activeDepartment, setActiveDepartment] = useState<string>('frostchef');
  const [activeTab, setActiveTab] = useState<FrostChefTab>('home');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('kenyan-staples');
  const [isCookbookOpen, setIsCookbookOpen] = useState(false);

  // Minimalist Dashboard Controls for Recipes View
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);

  // Core Data State
  const [fridgeIngredients, setFridgeIngredients] = useState<IngredientItem[]>(() => {
    return FRIDGE_PRESETS[0].ingredients;
  });

  const [rawRecipes, setRawRecipes] = useState<ExtendedRecipe[]>(() => {
    return KENYAN_RECIPES;
  });

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  // Modals & Navigation
  const [studioRecipe, setStudioRecipe] = useState<ExtendedRecipe | null>(KENYAN_RECIPES[0]);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [detailRecipe, setDetailRecipe] = useState<Recipe | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState<RecipeFilterOptions>({
    dietaryTags: [],
    difficulty: 'All',
    maxTotalMinutes: 0,
    maxCalories: 0,
    maxBudgetKSh: 0,
    kenyanOnly: false,
    sortBy: 'match',
    searchQuery: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Recalculate recipe match whenever recipes or fridge ingredients change
  const recipesWithMatches = useMemo(() => {
    return rawRecipes.map(recipe => {
      const matchResult = calculateRecipeMatch(recipe, fridgeIngredients);
      return {
        ...recipe,
        matchScore: matchResult.matchScore,
        matchedCount: matchResult.matchedCount,
        totalRequiredCount: matchResult.totalRequiredCount,
        missingIngredients: matchResult.missingIngredients,
      };
    });
  }, [rawRecipes, fridgeIngredients]);

  // Filtered & Sorted Recipes
  const displayRecipes = useMemo(() => {
    return filterAndSortRecipes(recipesWithMatches, filters);
  }, [recipesWithMatches, filters]);

  // Featured Kenyan recipe for Landing Page hero
  const featuredRecipe = useMemo(() => {
    return rawRecipes.find(r => r.id === 'kenyan-01') || rawRecipes[0];
  }, [rawRecipes]);

  // Server-side AI Image Analysis
  const handleAnalyzeFridge = async (imageBase64: string, presetId?: string) => {
    setIsAnalyzing(true);
    setIsScannerOpen(true);

    try {
      const res = await fetch('/api/analyze-fridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          presetId,
          dietaryFilters: filters.dietaryTags,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.detectedIngredients && data.detectedIngredients.length > 0) {
          setFridgeIngredients(data.detectedIngredients);
        }
        if (data.recipes && data.recipes.length > 0) {
          setRawRecipes(data.recipes);
        }
        if (presetId) {
          setSelectedPresetId(presetId);
        }
        showToast(data.summary || 'Fridge scanned successfully!');
        setIsScannerOpen(false);
        setActiveTab('recipes');
      } else {
        showToast('Could not process photo. Using cached culinary data.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      if (presetId) {
        const preset = FRIDGE_PRESETS.find(p => p.id === presetId) || FRIDGE_PRESETS[0];
        setFridgeIngredients(preset.ingredients);
        setSelectedPresetId(presetId);
        showToast(`Loaded ${preset.name} preset!`);
      } else {
        showToast('Photo analysis error. Using cached culinary data.');
      }
      setIsScannerOpen(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Add missing ingredients to Shopping List tab
  const handleAddMissingToShoppingList = (
    itemsToAdd: { name: string; amount?: string; recipeTitle: string }[]
  ) => {
    setShoppingList(prev => addIngredientsToShoppingList(prev, itemsToAdd));
    showToast(`Added ${itemsToAdd.length} missing ingredient${itemsToAdd.length > 1 ? 's' : ''} to Shopping List!`);
  };

  const handleExportMealPlanToShoppingList = (items: ShoppingItem[]) => {
    setShoppingList(prev => [...items, ...prev]);
    showToast(`Exported ${items.length} weekly grocery items to Shopping List!`);
  };

  const isMissingInShoppingList = (name: string): boolean => {
    const norm = name.toLowerCase().trim();
    return shoppingList.some(item => item.name.toLowerCase().trim().includes(norm) || norm.includes(item.name.toLowerCase().trim()));
  };

  const handleStartStudioCooking = (recipe: ExtendedRecipe) => {
    setStudioRecipe(recipe);
    setActiveTab('studio');
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Official KenyaOne Platform Header (Preserved) */}
      <KenyaOneHeader
        activeDepartment={activeDepartment}
        onSelectDepartment={dept => {
          setActiveDepartment(dept);
          if (dept === 'frostchef') setActiveTab('home');
        }}
        cartCount={shoppingList.filter(i => !i.isChecked).length}
      />

      {/* 2. Frost Chef Flagship Liquid Glass Navigation */}
      <FrostChefNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScanner={() => setIsScannerOpen(!isScannerOpen)}
        onOpenCookbook={() => setIsCookbookOpen(true)}
        pantryCount={fridgeIngredients.length}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Scanner Accordion / Drawer */}
        {(isScannerOpen || isAnalyzing) && (
          <div className="mb-6 animate-fadeIn">
            <FridgeScanner
              onAnalyzeImage={handleAnalyzeFridge}
              isAnalyzing={isAnalyzing}
              onClose={() => setIsScannerOpen(false)}
              selectedPresetId={selectedPresetId}
            />
          </div>
        )}

        {/* VIEW 0: CINEMATIC LIQUID GLASS LANDING PAGE */}
        {activeTab === 'home' && (
          <CinematicLandingPage
            onNavigateTab={tab => setActiveTab(tab)}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenCookbook={() => setIsCookbookOpen(true)}
            onStartCooking={handleStartStudioCooking}
            featuredRecipe={featuredRecipe}
            onAskChef={prompt => {
              setActiveTab('chef');
            }}
          />
        )}

        {/* VIEW 1: DIGITAL KITCHEN HOME / BENTO CONTROL CENTRE */}
        {activeTab === 'kitchen' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  <ChefHat className="w-4 h-4" />
                  <span>The Digital Kitchen Control Hub</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Welcome to Your Kenyan Smart Kitchen
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                  Choose a high-precision culinary module below to explore recipes, calculate ingredient costs, scale for banquets, or cook with hands-free voice read-aloud.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCookbookOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Download Cookbook PDF</span>
                </button>
              </div>
            </div>

            {/* Quick-Access Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { id: 'chef', title: 'AI Kenyan Chef Amani', desc: 'Ask about pilau browning, soft chapatis, watery stew remedies & guest scaling.', icon: Sparkles, color: 'emerald' },
                { id: 'recipes', title: 'Kenyan Recipe Library', desc: 'Browse verified traditional recipes with macros, allergens, and KSh budgets.', icon: Utensils, color: 'amber' },
                { id: 'counties', title: '47 Counties Culinary Explorer', desc: 'Interactive atlas of ancestral recipes, indigenous staples, and food stories.', icon: MapPin, color: 'teal' },
                { id: 'studio', title: 'Interactive Cooking Studio', desc: 'Hands-free voice read-aloud, multi-timers station, and portion scaling 1-100.', icon: Flame, color: 'emerald' },
                { id: 'pantry', title: 'My Digital Pantry & Vision', desc: 'Inventory tracking, Mama Mboga produce freshness, and instant recipe matching.', icon: Refrigerator, color: 'cyan' },
                { id: 'planner', title: 'Smart Weekly Meal Planner', desc: '7-day breakfast/lunch/dinner plan with Mama Mboga weekly budget caps.', icon: Calendar, color: 'amber' },
                { id: 'calculators', title: 'Measurement Converter & Timers', desc: 'Density-aware volume-to-weight conversions for unga, atta, rice, and sugar.', icon: Calculator, color: 'emerald' },
                { id: 'academy', title: 'Frost Chef Academy', desc: 'Certified masterclasses in chapati lamination, dum pilau, and food hygiene.', icon: GraduationCap, color: 'amber' },
                { id: 'pro', title: 'Professional Kitchen', desc: 'Standard recipe cards, 100+ bulk banquet scaling, and HACCP checklists.', icon: Briefcase, color: 'purple' },
                { id: 'global', title: 'Diaspora Kitchen Guide', desc: 'Authentic Kenyan substitutions for cooks living in the UK, USA, Gulf & Canada.', icon: Globe2, color: 'cyan' },
                { id: 'community', title: 'Culinary Community Hub', desc: 'Share your grandmother’s recipes and food memories from your home county.', icon: Users, color: 'emerald' },
                { id: 'admin', title: 'Frost Chef Admin Desk', desc: 'Editorial review, cultural verification audits, and 47-county statistics.', icon: ShieldCheck, color: 'purple' },
              ].map(card => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveTab(card.id as FrostChefTab)}
                    className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] text-emerald-400 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition">
                        {card.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:underline">
                      Open Module <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: AI KENYAN CHEF */}
        {activeTab === 'chef' && (
          <AiKenyanChefView
            onStartCookingWithRecipe={handleStartStudioCooking}
            onSaveRecipeToCookbook={() => setIsCookbookOpen(true)}
          />
        )}

        {/* VIEW 3: EXPLORE KENYAN RECIPES LIBRARY */}
        {activeTab === 'recipes' && (
          <div className="space-y-5">
            {/* Control Bar */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm space-y-3.5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search dishes, ingredients, or Swahili specialties (sukuma, pilau, chapati, mukimo)..."
                    value={filters.searchQuery || ''}
                    onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full bg-stone-950/80 border border-stone-800 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                  {filters.searchQuery && (
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* View & Filter Toggles */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
                    <button
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                      title="Spacious Grid View"
                      className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                        viewMode === 'grid'
                          ? 'bg-stone-800 text-emerald-400 shadow-sm'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode('compact')}
                      aria-label="Compact list view"
                      title="Minimalist Compact View"
                      className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                        viewMode === 'compact'
                          ? 'bg-stone-800 text-emerald-400 shadow-sm'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <LayoutList className="w-4 h-4" />
                      <span className="hidden sm:inline">Compact</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-medium border border-stone-800 transition cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{showDesktopFilters ? 'Hide Filters' : 'Show Filters'}</span>
                  </button>

                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 text-stone-300 text-xs font-medium border border-stone-800"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Filters ({displayRecipes.length})</span>
                  </button>

                  <button
                    onClick={() => setIsScannerOpen(true)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Scan Fridge</span>
                  </button>
                </div>
              </div>

              {/* Quick-Filter Chips Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, kenyanOnly: !prev.kenyanOnly }))}
                  className={`px-3 py-1 rounded-full border text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                    filters.kenyanOnly
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  <span>🇰🇪 Kenyan Authentic</span>
                  {filters.kenyanOnly && <X className="w-3 h-3 ml-0.5" />}
                </button>

                <button
                  onClick={() =>
                    setFilters(prev => ({
                      ...prev,
                      maxBudgetKSh: prev.maxBudgetKSh === 350 ? 0 : 350,
                    }))
                  }
                  className={`px-3 py-1 rounded-full border text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                    filters.maxBudgetKSh === 350
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  <Coins className="w-3 h-3 text-amber-400" />
                  <span>≤ KSh 350 Budget</span>
                  {filters.maxBudgetKSh === 350 && <X className="w-3 h-3 ml-0.5" />}
                </button>

                <button
                  onClick={() =>
                    setFilters(prev => ({
                      ...prev,
                      maxTotalMinutes: prev.maxTotalMinutes === 25 ? 0 : 25,
                    }))
                  }
                  className={`px-3 py-1 rounded-full border text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                    filters.maxTotalMinutes === 25
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  <span>≤ 25m Fast</span>
                  {filters.maxTotalMinutes === 25 && <X className="w-3 h-3 ml-0.5" />}
                </button>

                {/* Reset all */}
                {(filters.kenyanOnly ||
                  (filters.maxBudgetKSh ?? 0) > 0 ||
                  (filters.maxTotalMinutes ?? 0) > 0 ||
                  filters.dietaryTags.length > 0 ||
                  Boolean(filters.searchQuery)) && (
                  <button
                    onClick={() =>
                      setFilters({
                        dietaryTags: [],
                        difficulty: 'All',
                        maxTotalMinutes: 0,
                        maxCalories: 0,
                        maxBudgetKSh: 0,
                        kenyanOnly: false,
                        sortBy: 'match',
                        searchQuery: '',
                      })
                    }
                    className="text-stone-400 hover:text-stone-200 text-xs underline whitespace-nowrap px-2"
                  >
                    Reset all
                  </button>
                )}

                <span className="ml-auto text-stone-400 text-xs hidden sm:inline whitespace-nowrap">
                  Showing <strong className="text-white">{displayRecipes.length}</strong> recipes
                </span>
              </div>
            </div>

            {/* Layout: Sidebar + Feed */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {showDesktopFilters && (
                <div className="hidden md:block w-72 flex-shrink-0 animate-fadeIn">
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    totalRecipesCount={recipesWithMatches.length}
                    filteredCount={displayRecipes.length}
                    isOpenMobile={isMobileFiltersOpen}
                    onCloseMobile={() => setIsMobileFiltersOpen(false)}
                  />
                </div>
              )}

              <div className="md:hidden">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  totalRecipesCount={recipesWithMatches.length}
                  filteredCount={displayRecipes.length}
                  isOpenMobile={isMobileFiltersOpen}
                  onCloseMobile={() => setIsMobileFiltersOpen(false)}
                />
              </div>

              <main className="flex-1 w-full space-y-4">
                {displayRecipes.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className={`grid grid-cols-1 ${showDesktopFilters ? 'lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-5`}>
                      {displayRecipes.map(recipe => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onSelectForCooking={r => handleStartStudioCooking(r as ExtendedRecipe)}
                          onOpenDetails={r => setDetailRecipe(r)}
                          onAddMissingToShoppingList={handleAddMissingToShoppingList}
                          isMissingInShoppingList={isMissingInShoppingList}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {displayRecipes.map(recipe => (
                        <CompactRecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onSelectForCooking={r => handleStartStudioCooking(r as ExtendedRecipe)}
                          onOpenDetails={r => setDetailRecipe(r)}
                          onAddMissingToShoppingList={handleAddMissingToShoppingList}
                          isMissingInShoppingList={isMissingInShoppingList}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">No recipes match current filters</h3>
                      <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                        Try loosening your dietary filters or clearing the search query to see more suggestions.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setFilters({
                          dietaryTags: [],
                          difficulty: 'All',
                          maxTotalMinutes: 0,
                          maxCalories: 0,
                          maxBudgetKSh: 0,
                          kenyanOnly: false,
                          sortBy: 'match',
                          searchQuery: '',
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </main>
            </div>
          </div>
        )}

        {/* VIEW 4: 47 COUNTIES CULINARY EXPLORER */}
        {activeTab === 'counties' && (
          <CountiesExplorerView
            onSelectCountyDishes={countyName => {
              setFilters(prev => ({ ...prev, searchQuery: countyName }));
              setActiveTab('recipes');
            }}
          />
        )}

        {/* VIEW 5: INTERACTIVE COOKING STUDIO */}
        {activeTab === 'studio' && (
          <InteractiveCookingStudioView
            recipe={studioRecipe}
            onSelectRecipe={r => setStudioRecipe(r)}
            onAddMissingToShoppingList={handleAddMissingToShoppingList}
            onOpenCookbook={() => setIsCookbookOpen(true)}
          />
        )}

        {/* VIEW 6: DIGITAL PANTRY */}
        {activeTab === 'pantry' && (
          <DigitalPantryView
            ingredients={fridgeIngredients}
            setIngredients={setFridgeIngredients}
            onOpenScanner={() => setIsScannerOpen(true)}
            onGoToRecipes={() => setActiveTab('recipes')}
          />
        )}

        {/* VIEW 7: SMART MEAL PLANNER */}
        {activeTab === 'planner' && (
          <SmartMealPlannerView
            onExportToShoppingList={handleExportMealPlanToShoppingList}
            onGoToShoppingTab={() => setActiveTab('recipes')}
          />
        )}

        {/* VIEW 8: CALCULATORS */}
        {activeTab === 'calculators' && <CalculatorsView />}

        {/* VIEW 9: ACADEMY */}
        {activeTab === 'academy' && <FrostChefAcademyView />}

        {/* VIEW 10: PRO KITCHEN */}
        {activeTab === 'pro' && <ProfessionalKitchenView />}

        {/* VIEW 11: DIASPORA KITCHEN */}
        {activeTab === 'global' && <GlobalKitchenView />}

        {/* VIEW 12: COMMUNITY */}
        {activeTab === 'community' && <CulinaryCommunityView />}

        {/* VIEW 13: ADMIN */}
        {activeTab === 'admin' && <AdminPortalView />}
      </div>

      {/* QUICK COOKING MODE MODAL */}
      {cookingRecipe && (
        <CookingModeModal
          recipe={cookingRecipe}
          onClose={() => setCookingRecipe(null)}
          onAddMissingToShoppingList={handleAddMissingToShoppingList}
        />
      )}

      {/* RECIPE DETAIL MODAL (With full Macronutrient Breakdown, Circular Progress & Allergen Warning Indicator) */}
      {detailRecipe && (
        <RecipeDetailModal
          recipe={detailRecipe}
          onClose={() => setDetailRecipe(null)}
          onStartCooking={r => {
            setDetailRecipe(null);
            handleStartStudioCooking(r as ExtendedRecipe);
          }}
          onAddMissingToShoppingList={handleAddMissingToShoppingList}
          isMissingInShoppingList={isMissingInShoppingList}
        />
      )}

      {/* DOWNLOADABLE MASTERCLASS PDF MODAL (Prompt Requirement: 1000+ words, 16 images, Mama Mboga KSh budgeting) */}
      {isCookbookOpen && (
        <CookbookModal onClose={() => setIsCookbookOpen(false)} />
      )}
    </div>
  );
}
