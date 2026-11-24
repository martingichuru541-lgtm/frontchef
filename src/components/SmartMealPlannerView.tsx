import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  ShoppingBag,
  Clock,
  Coins,
  ChevronRight,
  Plus,
  RotateCcw,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { ShoppingItem } from '../types.ts';

interface DayPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  dailyCostKSh: number;
}

interface SmartMealPlannerViewProps {
  onExportToShoppingList: (items: ShoppingItem[]) => void;
  onGoToShoppingTab: () => void;
}

export const SmartMealPlannerView: React.FC<SmartMealPlannerViewProps> = ({
  onExportToShoppingList,
  onGoToShoppingTab,
}) => {
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [weeklyBudgetLimitKSh, setWeeklyBudgetLimitKSh] = useState<number>(4500);

  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>([
    {
      day: 'Monday',
      breakfast: 'Mahamri & Spiced Masala Chai',
      lunch: 'Fried Ndengu & Soft Layered Chapatis',
      dinner: 'Ugali, Braised Beef Stew & Sukuma Wiki',
      dailyCostKSh: 520,
    },
    {
      day: 'Tuesday',
      breakfast: 'Millet & Sorghum Uji with Roasted Groundnuts',
      lunch: 'Traditional Kikuyu Mukimo with Beef Gravy',
      dinner: 'Kenyan Githeri Special with Avocado',
      dailyCostKSh: 440,
    },
    {
      day: 'Wednesday',
      breakfast: 'Sweet Potato (Ngwaci) & Spiced Tea',
      lunch: 'Kamba Muthokoi with Pigeon Peas & Spinach',
      dinner: 'Swahili Pilau ya Nyama & Fresh Kachumbari',
      dailyCostKSh: 580,
    },
    {
      day: 'Thursday',
      breakfast: 'Kenyan Mandazi & Ginger Chai',
      lunch: 'Quick Sukuma Wiki, Fried Eggs & Ugali',
      dinner: 'Luhya Ingokho (Kienyeji Chicken Stew) with Brown Ugali',
      dailyCostKSh: 680,
    },
    {
      day: 'Friday',
      breakfast: 'Boiled Nduma (Arrowroot) with Chai',
      lunch: 'Yellow Bean Stew & Chapatis',
      dinner: 'Luo Lake Tilapia Wet Fry with Ugali & Managu',
      dailyCostKSh: 720,
    },
    {
      day: 'Saturday',
      breakfast: 'Swahili Mahamri & Mbaazi za Nazi',
      lunch: 'Nairobi Smokie Pasua & Mayai Boiled with Kachumbari',
      dinner: 'Charcoal Pit Nyama Choma with Ugali & Kachumbari',
      dailyCostKSh: 950,
    },
    {
      day: 'Sunday',
      breakfast: 'Kenyan Sunday Breakfast: Eggs, Sausages & Sweet Tea',
      lunch: 'Festive Goat Biryani with Coconut Chutney',
      dinner: 'Light Managu Vegetable Broth with Soft Ugali',
      dailyCostKSh: 860,
    },
  ]);

  const portionFactor = householdSize / 4;
  const totalWeeklyCostKSh = Math.round(
    weeklyPlan.reduce((sum, d) => sum + d.dailyCostKSh * portionFactor, 0)
  );

  const budgetUsagePercent = Math.min(
    100,
    Math.round((totalWeeklyCostKSh / weeklyBudgetLimitKSh) * 100)
  );

  const handleExportShoppingList = () => {
    // Generate consolidated staple shopping items for this week
    const now = Date.now();
    const itemsToAdd: ShoppingItem[] = [
      { id: `sp_${now}_1`, name: 'Unga wa Ugali (Maize Flour)', amount: `${(3 * portionFactor).toFixed(1)} kg`, recipeTitle: 'Weekly Meal Plan', category: 'Pantry & Grains', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(220 * portionFactor) },
      { id: `sp_${now}_2`, name: 'All-Purpose Atta Flour', amount: `${(2 * portionFactor).toFixed(1)} kg`, recipeTitle: 'Weekly Meal Plan', category: 'Pantry & Grains', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(210 * portionFactor) },
      { id: `sp_${now}_3`, name: 'Fresh Sukuma Wiki (Collard Greens)', amount: `${Math.ceil(4 * portionFactor)} bundles`, recipeTitle: 'Weekly Meal Plan', category: 'Produce', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(80 * portionFactor) },
      { id: `sp_${now}_4`, name: 'Fresh Managu / Terere', amount: `${Math.ceil(3 * portionFactor)} bundles`, recipeTitle: 'Weekly Meal Plan', category: 'Produce', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(90 * portionFactor) },
      { id: `sp_${now}_5`, name: 'Beef Chuck (Nyama ya Ng\'ombe)', amount: `${(1.5 * portionFactor).toFixed(1)} kg`, recipeTitle: 'Weekly Meal Plan', category: 'Meat & Seafood', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(900 * portionFactor) },
      { id: `sp_${now}_6`, name: 'Whole Lake Tilapia Fish', amount: `${Math.ceil(2 * portionFactor)} large fish`, recipeTitle: 'Weekly Meal Plan', category: 'Meat & Seafood', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(700 * portionFactor) },
      { id: `sp_${now}_7`, name: 'Green Grams (Ndengu)', amount: `${(1 * portionFactor).toFixed(1)} kg`, recipeTitle: 'Weekly Meal Plan', category: 'Pantry & Grains', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(180 * portionFactor) },
      { id: `sp_${now}_8`, name: 'Red Onions (Kitunguu Maji)', amount: `${(2 * portionFactor).toFixed(1)} kg`, recipeTitle: 'Weekly Meal Plan', category: 'Produce', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(240 * portionFactor) },
      { id: `sp_${now}_9`, name: 'Ripe Red Tomatoes', amount: `${(2 * portionFactor).toFixed(1)} kg`, recipeTitle: 'Weekly Meal Plan', category: 'Produce', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(200 * portionFactor) },
      { id: `sp_${now}_10`, name: 'Royco Mchuzi Mix & Pilau Masala', amount: '2 sachets', recipeTitle: 'Weekly Meal Plan', category: 'Condiments & Sauces', isChecked: false, addedAt: now, estimatedPriceKSh: 70 },
      { id: `sp_${now}_11`, name: 'Fresh Dania (Coriander)', amount: '3 bunches', recipeTitle: 'Weekly Meal Plan', category: 'Produce', isChecked: false, addedAt: now, estimatedPriceKSh: 30 },
      { id: `sp_${now}_12`, name: 'Pure Vegetable Cooking Oil', amount: `${(1.5 * portionFactor).toFixed(1)} L`, recipeTitle: 'Weekly Meal Plan', category: 'Pantry & Grains', isChecked: false, addedAt: now, estimatedPriceKSh: Math.round(420 * portionFactor) },
    ];

    onExportToShoppingList(itemsToAdd);
    onGoToShoppingTab();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-stone-100">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Mama Mboga Budget & Weekly Nutrition Planner</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Smart Weekly Meal Planner
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Organize authentic Kenyan meals Monday to Sunday. Balance staple carbohydrates, indigenous greens, and protein while locking down local market budgets in KSh.
          </p>
        </div>

        <button
          onClick={handleExportShoppingList}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-amber-400/40 transition cursor-pointer active:scale-95 flex-shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Export 1-Click Grocery List</span>
        </button>
      </div>

      {/* Household Controls & Budget Meter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Household Size */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-white">
              <Users className="w-4 h-4 text-emerald-400" /> Household Size
            </span>
            <span className="font-mono text-emerald-300 font-bold">{householdSize} People</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {[1, 2, 4, 6, 8, 12].map(sz => (
              <button
                key={sz}
                onClick={() => setHouseholdSize(sz)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  householdSize === sz
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Budget Cap */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-white">
              <Coins className="w-4 h-4 text-amber-400" /> Weekly Target Budget
            </span>
            <span className="font-mono text-amber-300 font-bold">KSh {weeklyBudgetLimitKSh}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {[3000, 4500, 6000, 8000].map(amt => (
              <button
                key={amt}
                onClick={() => setWeeklyBudgetLimitKSh(amt)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  weeklyBudgetLimitKSh === amt
                    ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {amt}
              </button>
            ))}
          </div>
        </div>

        {/* Total Cost & Variance */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-bold uppercase tracking-wider text-white">Calculated Cost</span>
            <span className="font-mono text-xs font-bold text-emerald-400">
              {budgetUsagePercent}% of limit
            </span>
          </div>
          <div className="text-xl font-mono font-black text-white">
            KSh {totalWeeklyCostKSh}{' '}
            <span className="text-xs font-normal text-stone-400">
              (~KSh {Math.round(totalWeeklyCostKSh / (householdSize * 7 * 3))}/plate)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-300 ${
                budgetUsagePercent > 100
                  ? 'bg-red-500'
                  : budgetUsagePercent > 80
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${budgetUsagePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 7-Day Plan Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">
          Weekly Menu Breakdown (Monday – Sunday)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeklyPlan.map((d, idx) => (
            <div
              key={d.day}
              className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  {d.day}
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  Est. KSh {Math.round(d.dailyCostKSh * portionFactor)}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-stone-950/70 border border-white/5">
                  <div className="text-[10px] uppercase font-mono text-stone-500">Breakfast</div>
                  <div className="font-semibold text-stone-200 mt-0.5">{d.breakfast}</div>
                </div>

                <div className="p-2 rounded-xl bg-stone-950/70 border border-white/5">
                  <div className="text-[10px] uppercase font-mono text-stone-500">Lunch</div>
                  <div className="font-semibold text-stone-200 mt-0.5">{d.lunch}</div>
                </div>

                <div className="p-2 rounded-xl bg-stone-950/70 border border-white/5">
                  <div className="text-[10px] uppercase font-mono text-stone-500">Dinner</div>
                  <div className="font-semibold text-emerald-300 mt-0.5">{d.dinner}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
