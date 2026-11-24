import React from 'react';
import { Clock, Flame, Play, Plus, Check, AlertCircle, Sparkles, ChefHat } from 'lucide-react';
import { Recipe } from '../types.ts';

interface CompactRecipeCardProps {
  recipe: Recipe;
  onSelectForCooking: (recipe: Recipe) => void;
  onOpenDetails: (recipe: Recipe) => void;
  onAddMissingToShoppingList: (items: { name: string; amount?: string; recipeTitle: string }[]) => void;
  isMissingInShoppingList?: (name: string) => boolean;
}

export const CompactRecipeCard: React.FC<CompactRecipeCardProps> = ({
  recipe,
  onSelectForCooking,
  onOpenDetails,
  onAddMissingToShoppingList,
  isMissingInShoppingList,
}) => {
  const missingItems = recipe.missingIngredients || [];
  const matchScore = recipe.matchScore ?? 100;

  return (
    <div className="bg-stone-900/80 border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-stone-900 shadow-md">
      {/* Left: Info */}
      <div className="flex items-start space-x-3.5 flex-1 min-w-0">
        {/* Thumbnail or Badge */}
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover object-center flex-shrink-0 border border-stone-700 shadow-sm"
          />
        ) : (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center flex-shrink-0 text-emerald-400">
            <ChefHat className="w-6 h-6" />
          </div>
        )}

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                recipe.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : recipe.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}
            >
              {recipe.difficulty}
            </span>

            {(recipe.isKenyanDish || recipe.cuisine?.toLowerCase().includes('kenyan') || recipe.cuisine?.toLowerCase().includes('swahili')) && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🇰🇪 Kenyan
              </span>
            )}

            {recipe.estimatedCostKSh && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                KSh {recipe.estimatedCostKSh} (KSh {recipe.costPerServingKSh || Math.round(recipe.estimatedCostKSh / (recipe.servings || 3))}/serv)
              </span>
            )}

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-950 border border-stone-800 flex items-center gap-1 ${
                matchScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              {matchScore}% Match
            </span>
          </div>

          <h4
            onClick={() => onOpenDetails(recipe)}
            className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition cursor-pointer truncate"
          >
            {recipe.title}
          </h4>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              {recipe.totalTimeMinutes}m total
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              {recipe.calories} kcal
            </span>
            <span>{recipe.servings} servings</span>
          </div>

          {/* Missing Ingredients Compact Notice */}
          {missingItems.length > 0 ? (
            <div className="flex items-center gap-2 pt-0.5 flex-wrap text-[11px]">
              <span className="text-amber-300 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                Missing {missingItems.length}: {missingItems.slice(0, 3).join(', ')}{missingItems.length > 3 ? '...' : ''}
              </span>
              <button
                onClick={() => {
                  const items = missingItems.map(name => {
                    const found = recipe.ingredients.find(i => i.name === name);
                    return {
                      name,
                      amount: found?.amount,
                      recipeTitle: recipe.title,
                    };
                  });
                  onAddMissingToShoppingList(items);
                }}
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
              >
                + Add to Shopping List
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-0.5">
              <Check className="w-3 h-3" /> All ingredients in fridge
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 self-stretch sm:self-center justify-end flex-shrink-0">
        <button
          onClick={() => onOpenDetails(recipe)}
          className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition cursor-pointer"
        >
          Details
        </button>

        <button
          onClick={() => onSelectForCooking(recipe)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Cook</span>
        </button>
      </div>
    </div>
  );
};
