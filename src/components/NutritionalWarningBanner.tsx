import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  AlertCircle,
  Sliders,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  Info,
  Sparkles,
} from 'lucide-react';
import { Recipe, NutritionalLimits } from '../types.ts';
import {
  detectRecipeAllergens,
  checkNutritionalLimits,
  COMMON_ALLERGEN_CATEGORIES,
  NUTRITIONAL_PRESETS,
} from '../utils/allergens.ts';

interface NutritionalWarningBannerProps {
  recipe: Recipe;
  userAllergies: string[];
  setUserAllergies: React.Dispatch<React.SetStateAction<string[]>>;
  limits: NutritionalLimits;
  setLimits: React.Dispatch<React.SetStateAction<NutritionalLimits>>;
}

export const NutritionalWarningBanner: React.FC<NutritionalWarningBannerProps> = ({
  recipe,
  userAllergies,
  setUserAllergies,
  limits,
  setLimits,
}) => {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const allergens = detectRecipeAllergens(recipe, userAllergies);
  const exceededNutrients = checkNutritionalLimits(recipe, limits);

  const hasCriticalAllergen = allergens.some(a => a.matchedUserAllergy);
  const hasAnyWarning = allergens.length > 0 || exceededNutrients.length > 0;

  const toggleAllergy = (allergyLabel: string) => {
    setUserAllergies(prev => {
      if (prev.includes(allergyLabel)) {
        return prev.filter(a => a !== allergyLabel);
      } else {
        return [...prev, allergyLabel];
      }
    });
  };

  return (
    <div className="space-y-3">
      {/* Visual Warning Banner / Indicator */}
      {hasAnyWarning ? (
        <div
          className={`rounded-2xl border p-4 transition-all duration-300 shadow-xl ${
            hasCriticalAllergen
              ? 'bg-gradient-to-br from-rose-950/60 via-stone-900 to-rose-950/30 border-rose-500/60 shadow-rose-950/40'
              : 'bg-gradient-to-br from-amber-950/45 via-stone-900 to-amber-950/20 border-amber-500/50 shadow-amber-950/30'
          }`}
        >
          {/* Top Warning Alert Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-xl flex-shrink-0 mt-0.5 border ${
                  hasCriticalAllergen
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}
              >
                {hasCriticalAllergen ? (
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`font-black text-sm tracking-wide uppercase ${
                      hasCriticalAllergen ? 'text-rose-300' : 'text-amber-300'
                    }`}
                  >
                    {hasCriticalAllergen
                      ? 'Critical Allergen Alert Detected'
                      : 'Nutritional Limit & Allergen Advisory'}
                  </h3>
                  {hasCriticalAllergen && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-stone-950 text-[10px] font-black uppercase tracking-wider animate-pulse">
                      High Priority
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {hasCriticalAllergen
                    ? 'This dish contains ingredients that match your personal allergen profile. Review carefully before consuming.'
                    : 'This recipe contains common allergens or exceeds your personal nutritional threshold per meal.'}
                </p>
              </div>
            </div>

            {/* Quick Button to toggle Customize Limits Drawer */}
            <button
              onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
              className="px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 transition cursor-pointer"
              title="Customize your allergens and daily nutrient limits"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Adjust Limits</span>
              {isCustomizeOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Warning Items Grid */}
          <div className="mt-3.5 space-y-2.5 pt-3 border-t border-stone-800/80">
            {/* 1. Flagged Allergens */}
            {allergens.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <span>Detected Allergens ({allergens.length}):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allergens.map((all, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                        all.matchedUserAllergy
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-sm'
                          : 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">
                        {all.matchedUserAllergy ? '🚨' : '⚠️'} {all.type}
                      </span>
                      <span className="text-[11px] text-stone-300">
                        in <span className="font-semibold text-white underline decoration-dotted">{all.ingredient}</span>
                      </span>
                      {all.matchedUserAllergy && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-md bg-rose-500 text-stone-950 text-[10px] font-black uppercase">
                          Your Allergy
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Exceeded Nutritional Limits */}
            {exceededNutrients.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <span>Exceeded Nutrient Limits ({exceededNutrients.length}):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {exceededNutrients.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800/90 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-200 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                          {item.nutrient}
                        </span>
                        <span className="font-mono text-rose-300 font-bold">
                          +{item.difference} {item.unit} (+{item.percentageOver}%)
                        </span>
                      </div>

                      {/* Visual limit vs actual bar */}
                      <div className="space-y-1">
                        <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden flex relative">
                          <div
                            style={{
                              width: `${Math.min(100, (item.limit / item.value) * 100)}%`,
                            }}
                            className="bg-emerald-500 h-full"
                            title={`Limit: ${item.limit} ${item.unit}`}
                          />
                          <div
                            style={{
                              width: `${Math.max(0, 100 - (item.limit / item.value) * 100)}%`,
                            }}
                            className="bg-rose-500 h-full animate-pulse"
                            title={`Exceeded by: ${item.difference} ${item.unit}`}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                          <span>
                            Recipe: <strong className="text-white">{item.value} {item.unit}</strong>
                          </span>
                          <span>
                            Target Limit: <strong className="text-amber-300">{item.limit} {item.unit}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Reassurance Banner when within limits and allergen-free */
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>All Nutritional Limits Respected:</strong> No common allergens or exceeded dietary limits detected for this serving.
            </span>
          </div>
          <button
            onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-200 underline whitespace-nowrap cursor-pointer"
          >
            Adjust Limits
          </button>
        </div>
      )}

      {/* Interactive Customization Drawer */}
      {isCustomizeOpen && (
        <div className="p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                Personalize Dietary Limits & Allergen Sensitivities
              </h4>
            </div>
            <button
              onClick={() => setIsCustomizeOpen(false)}
              className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Dietary Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-stone-400">Target Presets:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NUTRITIONAL_PRESETS.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => setLimits(preset.limits)}
                  className={`p-2 rounded-xl text-left border text-xs transition cursor-pointer ${
                    limits.maxCalories === preset.limits.maxCalories &&
                    limits.maxCarbs === preset.limits.maxCarbs &&
                    limits.maxFat === preset.limits.maxFat
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="font-bold truncate">{preset.name}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5 font-mono">
                    {preset.limits.maxCalories} kcal • {preset.limits.maxCarbs}g C
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders for Nutritional Limits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Calories Slider */}
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-medium">Max Calories:</span>
                <span className="font-mono font-bold text-amber-400">{limits.maxCalories} kcal</span>
              </div>
              <input
                type="range"
                min="350"
                max="900"
                step="25"
                value={limits.maxCalories}
                onChange={e => setLimits(prev => ({ ...prev, maxCalories: Number(e.target.value) }))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>350</span>
                <span>600</span>
                <span>900</span>
              </div>
            </div>

            {/* Carbs Slider */}
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-medium">Max Carbohydrates:</span>
                <span className="font-mono font-bold text-cyan-400">{limits.maxCarbs}g</span>
              </div>
              <input
                type="range"
                min="15"
                max="110"
                step="5"
                value={limits.maxCarbs}
                onChange={e => setLimits(prev => ({ ...prev, maxCarbs: Number(e.target.value) }))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>15g (Keto)</span>
                <span>65g</span>
                <span>110g</span>
              </div>
            </div>

            {/* Fat Slider */}
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-medium">Max Total Fats:</span>
                <span className="font-mono font-bold text-rose-400">{limits.maxFat}g</span>
              </div>
              <input
                type="range"
                min="8"
                max="45"
                step="2"
                value={limits.maxFat}
                onChange={e => setLimits(prev => ({ ...prev, maxFat: Number(e.target.value) }))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>8g (Low-Fat)</span>
                <span>20g</span>
                <span>45g</span>
              </div>
            </div>
          </div>

          {/* User Allergens Checkbox Toggles */}
          <div className="space-y-1.5 pt-2 border-t border-stone-800">
            <span className="text-[11px] font-semibold text-stone-400">
              Select Your Allergies (triggers high-priority alerts):
            </span>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGEN_CATEGORIES.map(category => {
                const isSelected = userAllergies.includes(category.label);
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleAllergy(category.label)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                    {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
