import React from 'react';
import { ChefHat, Clock, Flame, Play, Plus, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Recipe } from '../types.ts';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectForCooking: (recipe: Recipe) => void;
  onOpenDetails: (recipe: Recipe) => void;
  onAddMissingToShoppingList: (items: { name: string; amount?: string; recipeTitle: string }[]) => void;
  isMissingInShoppingList?: (name: string) => boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectForCooking,
  onOpenDetails,
  onAddMissingToShoppingList,
  isMissingInShoppingList,
}) => {
  const getDifficultyBadge = (diff: Recipe['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'Medium':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'Hard':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400',
        };
      default:
        return {
          bg: 'bg-stone-500/10 text-stone-400 border-stone-500/30',
          dot: 'bg-stone-400',
        };
    }
  };

  const diffBadge = getDifficultyBadge(recipe.difficulty);
  const missingItems = recipe.missingIngredients || [];
  const matchScore = recipe.matchScore ?? 100;

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-lg hover:border-emerald-500/40 hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <div className="flex items-center space-x-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 ${diffBadge.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${diffBadge.dot}`} />
              {recipe.difficulty}
            </span>

            {recipe.cuisine && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-800 text-stone-300 border border-stone-700">
                {recipe.cuisine}
              </span>
            )}

            {(recipe.isKenyanDish || recipe.cuisine?.toLowerCase().includes('kenyan') || recipe.cuisine?.toLowerCase().includes('swahili')) && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                🇰🇪 Kenyan Dish
              </span>
            )}
          </div>

          {/* Match Score Badge & Budget Tag */}
          <div className="flex items-center space-x-1.5 flex-wrap gap-1">
            {recipe.estimatedCostKSh && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                KSh {recipe.estimatedCostKSh}
              </span>
            )}

            <div className="flex items-center space-x-1.5 bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span
                className={`text-xs font-bold ${
                  matchScore >= 80
                    ? 'text-emerald-400'
                    : matchScore >= 50
                    ? 'text-amber-400'
                    : 'text-stone-400'
                }`}
              >
                {matchScore}% Match
              </span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3
          onClick={() => onOpenDetails(recipe)}
          className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-emerald-300 transition cursor-pointer leading-snug"
        >
          {recipe.title}
        </h3>
        <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Stats Row (Prep time, Calories & Budget per serving) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-800/80 text-xs">
          <div className="flex items-center space-x-1.5 text-stone-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong className="text-white">{recipe.prepTimeMinutes}m</strong> prep /{' '}
              <strong className="text-white">{recipe.totalTimeMinutes}m</strong> total
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-stone-300">
            <Flame className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>
              <strong className="text-white">{recipe.calories}</strong> kcal / serv
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-stone-300 font-mono text-[11px]">
            <span className="text-emerald-300 font-bold">
              KSh {recipe.costPerServingKSh || Math.round((recipe.estimatedCostKSh || 350) / (recipe.servings || 3))}/serv
            </span>
          </div>
        </div>

        {/* Dietary Tag Badges */}
        {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {recipe.dietaryTags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium bg-stone-950 text-stone-400 rounded-md border border-stone-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Missing Ingredients Alert & One-Click Shopping List Addition (Required by Prompt) */}
        {missingItems.length > 0 ? (
          <div className="mt-3.5 p-2.5 bg-amber-950/20 border border-amber-900/40 rounded-xl">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-amber-300/90 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Missing {missingItems.length} ingredient{missingItems.length > 1 ? 's' : ''}:
              </span>
              <button
                onClick={() => {
                  const itemsToAdd = missingItems.map(name => {
                    const found = recipe.ingredients.find(i => i.name === name);
                    return {
                      name,
                      amount: found?.amount,
                      recipeTitle: recipe.title,
                    };
                  });
                  onAddMissingToShoppingList(itemsToAdd);
                }}
                className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
                aria-label={`Add all missing ingredients for ${recipe.title} to shopping list`}
              >
                <Plus className="w-3 h-3" /> Add all to List
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {missingItems.map(item => {
                const alreadyInList = isMissingInShoppingList?.(item);
                return (
                  <span
                    key={item}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                      alreadyInList
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                        : 'bg-stone-900 border-stone-800 text-stone-300'
                    }`}
                  >
                    {item}
                    {alreadyInList ? (
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                    ) : (
                      <button
                        onClick={() => {
                          const found = recipe.ingredients.find(i => i.name === item);
                          onAddMissingToShoppingList([
                            {
                              name: item,
                              amount: found?.amount,
                              recipeTitle: recipe.title,
                            },
                          ]);
                        }}
                        className="text-stone-400 hover:text-emerald-400"
                        title="Add to shopping list"
                        aria-label={`Add ${item} to shopping list`}
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-3.5 px-3 py-1.5 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-[11px] text-emerald-300 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            100% ingredients ready in your fridge!
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenDetails(recipe)}
          className="text-xs font-semibold text-stone-400 hover:text-white px-3 py-2 rounded-xl hover:bg-stone-800 transition"
        >
          View Ingredients
        </button>

        <button
          onClick={() => onSelectForCooking(recipe)}
          className="flex-1 max-w-[190px] py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all border border-emerald-400/30 active:scale-95"
          aria-label={`Start step-by-step cooking for ${recipe.title}`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Cooking</span>
        </button>
      </div>
    </div>
  );
};
