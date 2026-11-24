import React, { useState } from 'react';
import {
  X,
  Clock,
  Flame,
  ChefHat,
  Play,
  Plus,
  Check,
  AlertCircle,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { Recipe, NutritionalLimits } from '../types.ts';
import { NutritionalWarningBanner } from './NutritionalWarningBanner.tsx';
import {
  detectRecipeAllergens,
  checkNutritionalLimits,
  DEFAULT_NUTRITIONAL_LIMITS,
} from '../utils/allergens.ts';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
  onStartCooking: (recipe: Recipe) => void;
  onAddMissingToShoppingList: (items: { name: string; amount?: string; recipeTitle: string }[]) => void;
  isMissingInShoppingList?: (name: string) => boolean;
  userAllergies?: string[];
  setUserAllergies?: React.Dispatch<React.SetStateAction<string[]>>;
  nutritionalLimits?: NutritionalLimits;
  setNutritionalLimits?: React.Dispatch<React.SetStateAction<NutritionalLimits>>;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onStartCooking,
  onAddMissingToShoppingList,
  isMissingInShoppingList,
  userAllergies,
  setUserAllergies,
  nutritionalLimits,
  setNutritionalLimits,
}) => {
  const missingItems = recipe.missingIngredients || [];

  // Local state fallback if not passed from parent
  const [localAllergies, setLocalAllergies] = useState<string[]>(['Gluten / Wheat']);
  const [localLimits, setLocalLimits] = useState<NutritionalLimits>(DEFAULT_NUTRITIONAL_LIMITS);

  const activeAllergies = userAllergies ?? localAllergies;
  const handleSetAllergies = setUserAllergies ?? setLocalAllergies;

  const activeLimits = nutritionalLimits ?? localLimits;
  const handleSetLimits = setNutritionalLimits ?? setLocalLimits;

  // Evaluate warnings for top badge
  const allergens = detectRecipeAllergens(recipe, activeAllergies);
  const exceededNutrients = checkNutritionalLimits(recipe, activeLimits);
  const hasCriticalAllergen = allergens.some(a => a.matchedUserAllergy);
  const hasAnyWarning = allergens.length > 0 || exceededNutrients.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-stone-100 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {recipe.difficulty}
            </span>
            {recipe.cuisine && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700">
                {recipe.cuisine}
              </span>
            )}
            {(recipe.isKenyanDish || recipe.cuisine?.toLowerCase().includes('kenyan') || recipe.cuisine?.toLowerCase().includes('swahili')) && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                🇰🇪 Authentic Kenyan
              </span>
            )}
            {recipe.estimatedCostKSh && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Est. Budget: KSh {recipe.estimatedCostKSh} (KSh {recipe.costPerServingKSh || Math.round(recipe.estimatedCostKSh / (recipe.servings || 3))}/serv)
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-950 text-emerald-300 border border-stone-800">
              {recipe.matchScore ?? 100}% Fridge Match
            </span>

            {/* Visual Warning Status Pill in Top Header */}
            {hasAnyWarning && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1 shadow-sm ${
                  hasCriticalAllergen
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {hasCriticalAllergen ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>
                  {hasCriticalAllergen
                    ? 'Allergen Alert'
                    : exceededNutrients.length > 0
                    ? `Exceeds ${exceededNutrients.length} Limit${exceededNutrients.length > 1 ? 's' : ''}`
                    : 'Dietary Advisory'}
                </span>
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{recipe.title}</h2>
          <p className="text-sm text-stone-300 mt-2 leading-relaxed">{recipe.description}</p>
        </div>

        {/* Featured Dish Photo if available */}
        {recipe.imageUrl && (
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 h-56 sm:h-64 w-full shadow-lg">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-500/40">
              Freshly Prepared Kenyan Serving
            </div>
          </div>
        )}

        {/* VISUAL WARNING INDICATOR FOR ALLERGENS & NUTRITIONAL LIMITS (Prompt Requirement) */}
        <NutritionalWarningBanner
          recipe={recipe}
          userAllergies={activeAllergies}
          setUserAllergies={handleSetAllergies}
          limits={activeLimits}
          setLimits={handleSetLimits}
        />

        {/* Nutritional & Time Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-950/70 p-4 rounded-2xl border border-stone-800/80 text-center">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400">Prep Time</div>
            <div className="text-lg font-bold text-white mt-0.5">{recipe.prepTimeMinutes}m</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400">Cook Time</div>
            <div className="text-lg font-bold text-white mt-0.5">{recipe.cookTimeMinutes}m</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400">Total Calories</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{recipe.calories} kcal</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400">Portion Yield</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{recipe.servings} Servings</div>
          </div>
        </div>

        {/* DETAILED MACRONUTRIENT BREAKDOWN WITH CIRCULAR PROGRESS GAUGES (Prompt Requirement) */}
        <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-400" />
                Macronutrients & Daily Value Percentages (% DV)
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Based on standard dietary guidelines for a 2,000 kcal adult daily reference intake
              </p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 font-mono">
              Per Serving
            </span>
          </div>

          {/* 4 Circular Progress Rings */}
          {(() => {
            // Standard Daily Values
            const DV_CALORIES = 2000;
            const DV_PROTEIN = 50; // grams
            const DV_CARBS = 275; // grams
            const DV_FAT = 78; // grams

            const pDv = Math.round((recipe.proteinGrams / DV_PROTEIN) * 100);
            const cDv = Math.round((recipe.carbsGrams / DV_CARBS) * 100);
            const fDv = Math.round((recipe.fatGrams / DV_FAT) * 100);
            const calDv = Math.round((recipe.calories / DV_CALORIES) * 100);

            // Calorie ratios from macros
            const pCal = recipe.proteinGrams * 4;
            const cCal = recipe.carbsGrams * 4;
            const fCal = recipe.fatGrams * 9;
            const totalMacroCal = pCal + cCal + fCal || 1;

            const pRatio = Math.round((pCal / totalMacroCal) * 100);
            const cRatio = Math.round((cCal / totalMacroCal) * 100);
            const fRatio = Math.round((fCal / totalMacroCal) * 100);

            // Circular progress helper (r=28, circumference ≈ 175.9)
            const circumference = 2 * Math.PI * 28;

            const getOffset = (pct: number) => {
              const clamped = Math.min(100, Math.max(0, pct));
              return circumference - (clamped / 100) * circumference;
            };

            const isProteinExceeded = Boolean(activeLimits.maxProtein && recipe.proteinGrams > activeLimits.maxProtein);
            const isCarbsExceeded = recipe.carbsGrams > activeLimits.maxCarbs;
            const isFatExceeded = recipe.fatGrams > activeLimits.maxFat;
            const isCalExceeded = recipe.calories > activeLimits.maxCalories;

            const rings = [
              {
                label: 'Protein',
                amount: `${recipe.proteinGrams}g`,
                pct: pDv,
                dvLabel: `${pDv}% DV`,
                color: isProteinExceeded ? '#f43f5e' : '#10b981', // Rose if exceeded, else Emerald
                bgTrack: isProteinExceeded ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                calShare: `${pRatio}% of calories`,
                isExceeded: isProteinExceeded,
                limitLabel: activeLimits.maxProtein ? `Limit: ${activeLimits.maxProtein}g` : undefined,
              },
              {
                label: 'Carbohydrates',
                amount: `${recipe.carbsGrams}g`,
                pct: cDv,
                dvLabel: `${cDv}% DV`,
                color: isCarbsExceeded ? '#f43f5e' : '#06b6d4', // Rose if exceeded, else Cyan
                bgTrack: isCarbsExceeded ? 'rgba(244, 63, 94, 0.2)' : 'rgba(6, 182, 212, 0.15)',
                calShare: `${cRatio}% of calories`,
                isExceeded: isCarbsExceeded,
                limitLabel: `Limit: ${activeLimits.maxCarbs}g`,
              },
              {
                label: 'Total Fats',
                amount: `${recipe.fatGrams}g`,
                pct: fDv,
                dvLabel: `${fDv}% DV`,
                color: isFatExceeded ? '#f43f5e' : '#f59e0b', // Rose if exceeded, else Amber
                bgTrack: isFatExceeded ? 'rgba(244, 63, 94, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                calShare: `${fRatio}% of calories`,
                isExceeded: isFatExceeded,
                limitLabel: `Limit: ${activeLimits.maxFat}g`,
              },
              {
                label: 'Energy (Calories)',
                amount: `${recipe.calories}`,
                pct: calDv,
                dvLabel: `${calDv}% DV`,
                color: isCalExceeded ? '#f43f5e' : '#eab308', // Rose if exceeded, else Yellow
                bgTrack: isCalExceeded ? 'rgba(244, 63, 94, 0.2)' : 'rgba(234, 179, 8, 0.15)',
                calShare: '2,000 kcal target',
                isExceeded: isCalExceeded,
                limitLabel: `Limit: ${activeLimits.maxCalories} kcal`,
              },
            ];

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {rings.map((ring, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col items-center text-center space-y-2 transition-all relative ${
                        ring.isExceeded
                          ? 'bg-rose-950/20 border-rose-500/50 shadow-md shadow-rose-950/20'
                          : 'bg-stone-900 border-stone-800'
                      }`}
                    >
                      {/* Warning Badge if limit exceeded */}
                      {ring.isExceeded && (
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-black uppercase flex items-center gap-0.5">
                          <span>Over</span>
                        </div>
                      )}

                      {/* SVG Circular Progress Gauge */}
                      <div className="relative w-18 h-18 flex items-center justify-center">
                        <svg className="w-18 h-18 -rotate-90 transform" viewBox="0 0 68 68">
                          {/* Background Track */}
                          <circle
                            cx="34"
                            cy="34"
                            r="28"
                            stroke={ring.bgTrack}
                            strokeWidth="5"
                            fill="transparent"
                          />
                          {/* Animated Progress Indicator */}
                          <circle
                            cx="34"
                            cy="34"
                            r="28"
                            stroke={ring.color}
                            strokeWidth="5.5"
                            strokeDasharray={circumference}
                            strokeDashoffset={getOffset(ring.pct)}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-700 ease-out"
                          />
                        </svg>

                        {/* Centered % DV text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span
                            className="text-xs font-black font-mono leading-none"
                            style={{ color: ring.color }}
                          >
                            {ring.pct}%
                          </span>
                          <span className="text-[9px] text-stone-400 font-bold uppercase mt-0.5">
                            DV
                          </span>
                        </div>
                      </div>

                      {/* Labels */}
                      <div>
                        <div className="text-xs font-bold text-white flex items-center justify-center gap-1">
                          {ring.label}
                        </div>
                        <div className={`text-sm font-black font-mono mt-0.5 ${ring.isExceeded ? 'text-rose-300' : 'text-stone-100'}`}>
                          {ring.amount}
                        </div>
                        {ring.limitLabel && ring.isExceeded ? (
                          <div className="text-[10px] text-rose-400 font-mono font-bold mt-0.5">
                            {ring.limitLabel}
                          </div>
                        ) : (
                          <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                            {ring.calShare}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Caloric Energy Distribution Segmented Bar */}
                <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="font-semibold text-stone-300">
                      Caloric Energy Ratio (% of energy from macros):
                    </span>
                    <span className="font-mono">
                      {pRatio}% Protein • {cRatio}% Carbs • {fRatio}% Fat
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-stone-900 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${pRatio}%` }}
                      className="bg-emerald-500 h-full transition-all"
                      title={`Protein: ${pRatio}%`}
                    />
                    <div
                      style={{ width: `${cRatio}%` }}
                      className="bg-cyan-500 h-full transition-all"
                      title={`Carbohydrates: ${cRatio}%`}
                    />
                    <div
                      style={{ width: `${fRatio}%` }}
                      className="bg-rose-500 h-full transition-all"
                      title={`Fats: ${fRatio}%`}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 pt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Protein ({pCal} kcal)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      Carbs ({cCal} kcal)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Fats ({fCal} kcal)
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Ingredients Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Ingredients ({recipe.ingredients.length})
            </h3>
            {missingItems.length > 0 && (
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
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Missing ({missingItems.length}) to Shopping List
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients.map(ing => {
              const isMissing = missingItems.includes(ing.name);
              const inShoppingList = isMissingInShoppingList?.(ing.name);

              return (
                <div
                  key={ing.name}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    isMissing
                      ? 'bg-amber-950/20 border-amber-900/50 text-amber-200'
                      : 'bg-stone-950/50 border-stone-800 text-stone-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {isMissing ? (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                    )}
                    <div>
                      <span className="font-medium text-stone-100">{ing.name}</span>
                      <span className="text-stone-400 ml-1.5 font-mono">({ing.amount})</span>
                      {ing.estimatedPriceKSh && (
                        <span className="ml-1.5 text-[11px] font-mono text-emerald-400 font-semibold">
                          ~KSh {ing.estimatedPriceKSh}
                        </span>
                      )}
                      {ing.isOptional && (
                        <span className="text-[10px] text-stone-500 ml-1">(Optional)</span>
                      )}
                    </div>
                  </div>

                  {isMissing && (
                    <button
                      onClick={() =>
                        onAddMissingToShoppingList([
                          {
                            name: ing.name,
                            amount: ing.amount,
                            recipeTitle: recipe.title,
                          },
                        ])
                      }
                      className="p-1 rounded bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white transition"
                      title={inShoppingList ? 'In shopping list' : 'Add to shopping list'}
                    >
                      {inShoppingList ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chef's Note */}
        {recipe.chefNote && (
          <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-2xl text-xs text-emerald-200">
            <strong className="block font-bold uppercase tracking-wider mb-1 text-emerald-400">
              Chef's Technique Note:
            </strong>
            <p className="leading-relaxed">{recipe.chefNote}</p>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs"
          >
            Back to Recipes
          </button>

          <button
            onClick={() => {
              onClose();
              onStartCooking(recipe);
            }}
            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Step-by-Step Cooking Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
