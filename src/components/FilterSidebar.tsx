import React from 'react';
import { Filter, X, Clock, Flame, ChefHat, Check, RotateCcw } from 'lucide-react';
import { RecipeFilterOptions } from '../utils/culinary.ts';

interface FilterSidebarProps {
  filters: RecipeFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<RecipeFilterOptions>>;
  totalRecipesCount: number;
  filteredCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const DIETARY_OPTIONS = [
  { id: 'Vegetarian', label: 'Vegetarian', icon: '🥗' },
  { id: 'Keto', label: 'Keto (Low-Carb)', icon: '🥑' },
  { id: 'Vegan', label: 'Vegan (Plant)', icon: '🌱' },
  { id: 'Gluten-Free', label: 'Gluten-Free', icon: '🌾' },
  { id: 'High-Protein', label: 'High-Protein', icon: '🥩' },
  { id: 'Dairy-Free', label: 'Dairy-Free', icon: '🥛' },
  { id: 'Low-Carb', label: 'Low-Carb', icon: '🥦' },
];

const DIFFICULTY_OPTIONS: ('All' | 'Easy' | 'Medium' | 'Hard')[] = ['All', 'Easy', 'Medium', 'Hard'];

const TIME_OPTIONS = [
  { value: 0, label: 'Any Duration' },
  { value: 15, label: '⚡ Quick (≤ 15 mins)' },
  { value: 25, label: '≤ 25 mins' },
  { value: 40, label: '≤ 40 mins' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  totalRecipesCount,
  filteredCount,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const toggleDietTag = (tag: string) => {
    setFilters(prev => {
      const exists = prev.dietaryTags.includes(tag);
      return {
        ...prev,
        dietaryTags: exists
          ? prev.dietaryTags.filter(t => t !== tag)
          : [...prev.dietaryTags, tag],
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      dietaryTags: [],
      difficulty: 'All',
      maxTotalMinutes: 0,
      maxCalories: 0,
      sortBy: 'match',
      searchQuery: '',
    });
  };

  const activeFiltersCount =
    filters.dietaryTags.length +
    (filters.difficulty !== 'All' ? 1 : 0) +
    (filters.maxTotalMinutes > 0 ? 1 : 0) +
    (filters.maxCalories > 0 ? 1 : 0);

  const content = (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm tracking-tight text-white">Culinary Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-stone-950 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Results counter indicator */}
      <div className="px-3 py-2 bg-stone-950/60 rounded-xl border border-stone-800/80 flex items-center justify-between text-xs">
        <span className="text-stone-400">Available Recipes:</span>
        <span className="font-semibold text-emerald-300">
          {filteredCount} of {totalRecipesCount}
        </span>
      </div>

      {/* Kenyan Dishes Priority Toggle */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
          Regional Preference
        </label>
        <button
          onClick={() => setFilters(prev => ({ ...prev, kenyanOnly: !prev.kenyanOnly }))}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
            filters.kenyanOnly
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
              : 'bg-stone-950/40 text-stone-400 border-stone-800/80 hover:text-stone-200'
          }`}
          aria-pressed={Boolean(filters.kenyanOnly)}
        >
          <div className="flex items-center space-x-2">
            <span className="text-base">🇰🇪</span>
            <span>Kenyan Dishes Only</span>
          </div>
          <div
            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
              filters.kenyanOnly
                ? 'bg-amber-500 border-amber-400 text-stone-950'
                : 'border-stone-700 bg-stone-900'
            }`}
          >
            {filters.kenyanOnly && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </button>
      </div>

      {/* Max Recipe Budget (KSh) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center justify-between">
          <span>Max Recipe Budget</span>
          <span className="font-mono text-emerald-400 font-bold">
            {filters.maxBudgetKSh ? `≤ KSh ${filters.maxBudgetKSh}` : 'Any KSh'}
          </span>
        </label>
        <div className="grid grid-cols-2 gap-1.5 bg-stone-950/70 p-1 rounded-xl border border-stone-800">
          {[
            { val: 0, label: 'Any' },
            { val: 250, label: '≤ KSh 250' },
            { val: 400, label: '≤ KSh 400' },
            { val: 600, label: '≤ KSh 600' },
          ].map(b => (
            <button
              key={b.val}
              onClick={() => setFilters(prev => ({ ...prev, maxBudgetKSh: b.val }))}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition ${
                (filters.maxBudgetKSh || 0) === b.val
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions (Required by Prompt) */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
          Dietary Restrictions
        </label>
        <div className="space-y-1.5">
          {DIETARY_OPTIONS.map(option => {
            const isChecked = filters.dietaryTags.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleDietTag(option.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isChecked
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                    : 'bg-stone-950/40 text-stone-400 border border-stone-800/60 hover:text-stone-200 hover:border-stone-700'
                }`}
                aria-pressed={isChecked}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-base">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-stone-950'
                      : 'border-stone-700 bg-stone-900'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Rating */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
          <ChefHat className="w-3.5 h-3.5 text-emerald-400" />
          Cooking Difficulty
        </label>
        <div className="grid grid-cols-4 gap-1.5 bg-stone-950/70 p-1 rounded-xl border border-stone-800">
          {DIFFICULTY_OPTIONS.map(diff => (
            <button
              key={diff}
              onClick={() => setFilters(prev => ({ ...prev, difficulty: diff }))}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition ${
                filters.difficulty === diff
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Prep & Cook Time */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          Max Prep & Cook Time
        </label>
        <div className="space-y-1.5">
          {TIME_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilters(prev => ({ ...prev, maxTotalMinutes: opt.value }))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                filters.maxTotalMinutes === opt.value
                  ? 'bg-stone-800 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calorie Ceiling */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Max Calories
          </span>
          <span className="text-stone-400 font-mono">
            {filters.maxCalories === 0 ? 'No limit' : `≤ ${filters.maxCalories} kcal`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="800"
          step="50"
          value={filters.maxCalories}
          onChange={e => setFilters(prev => ({ ...prev, maxCalories: Number(e.target.value) }))}
          className="w-full accent-emerald-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-500 font-mono">
          <span>Any</span>
          <span>400 kcal</span>
          <span>800 kcal</span>
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2 pt-2 border-t border-stone-800">
        <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
          Sort Recipes By
        </label>
        <select
          value={filters.sortBy}
          onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="match">Highest Fridge Match %</option>
          <option value="budget">Lowest Cost First (KSh)</option>
          <option value="time">Shortest Total Time</option>
          <option value="calories">Lowest Calorie Count</option>
          <option value="difficulty">Easiest Difficulty</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-5 backdrop-blur-sm self-start sticky top-24">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto w-full max-w-xs bg-stone-900 border-l border-stone-800 p-6 overflow-y-auto h-full shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white">Filters</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>
            <button
              onClick={onCloseMobile}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md"
            >
              Apply Filters ({filteredCount})
            </button>
          </div>
        </div>
      )}
    </>
  );
};
