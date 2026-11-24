import React, { useState } from 'react';
import {
  Calculator,
  Scale,
  Coins,
  Timer as TimerIcon,
  RotateCcw,
  Play,
  Pause,
  Plus,
  Trash2,
  ArrowRightLeft,
  CheckCircle2,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import {
  CULINARY_DENSITY_DATABASE,
  SCALING_PRESETS,
  calculateCommercialCosting,
  CommercialCostInput,
} from '../data/calculatorsData.ts';

export const CalculatorsView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'converter' | 'scaler' | 'costing' | 'timers'>('converter');

  // CONVERTER STATE
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>(CULINARY_DENSITY_DATABASE[0].id);
  const [inputAmount, setInputAmount] = useState<number>(1);
  const [inputUnit, setInputUnit] = useState<'cups' | 'tbsp' | 'tsp' | 'grams' | 'ml'>('cups');

  const selectedIngredient = CULINARY_DENSITY_DATABASE.find(i => i.id === selectedIngredientId) || CULINARY_DENSITY_DATABASE[0];

  // Calculate conversions based on density
  let baseGrams = 0;
  if (inputUnit === 'cups') baseGrams = inputAmount * selectedIngredient.gramsPerCup;
  else if (inputUnit === 'tbsp') baseGrams = inputAmount * selectedIngredient.gramsPerTbsp;
  else if (inputUnit === 'tsp') baseGrams = inputAmount * selectedIngredient.gramsPerTsp;
  else if (inputUnit === 'grams') baseGrams = inputAmount;
  else if (inputUnit === 'ml') baseGrams = inputAmount * (selectedIngredient.gramsPerCup / 240);

  const convertedCups = (baseGrams / selectedIngredient.gramsPerCup).toFixed(2);
  const convertedTbsp = (baseGrams / selectedIngredient.gramsPerTbsp).toFixed(1);
  const convertedTsp = (baseGrams / selectedIngredient.gramsPerTsp).toFixed(1);
  const convertedGrams = Math.round(baseGrams);
  const convertedMl = Math.round(baseGrams / (selectedIngredient.gramsPerCup / 240));

  // SCALER STATE
  const [scalerBaseServings, setScalerBaseServings] = useState<number>(4);
  const [scalerTargetServings, setScalerTargetServings] = useState<number>(30);

  // COSTING STATE
  const [costingRecipe, setCostingRecipe] = useState<CommercialCostInput>({
    recipeTitle: 'Swahili Beef Pilau Batch',
    portionsYield: 25,
    ingredients: [
      { name: 'Pishori Basmati Rice (5kg)', quantity: '5 kg', costKSh: 1250 },
      { name: 'Beef Chuck (Nyama) (4kg)', quantity: '4 kg', costKSh: 2400 },
      { name: 'Red Onions (Kitunguu) (3kg)', quantity: '3 kg', costKSh: 360 },
      { name: 'Pure Garlic & Ginger Paste', quantity: '300 g', costKSh: 150 },
      { name: 'Pilau Masala Whole Spices', quantity: '100 g', costKSh: 180 },
      { name: 'Vegetable Cooking Oil', quantity: '1 Litre', costKSh: 320 },
      { name: 'Fresh Dania & Green Chillies', quantity: 'Bunch', costKSh: 80 },
    ],
    laborCostKSh: 800,
    overheadGasKSh: 450,
    targetGrossMarginPercent: 65,
  });

  const costAnalysis = calculateCommercialCosting(costingRecipe);

  // TIMERS STATE
  const [timers, setTimers] = useState([
    { id: 't_ugali', label: 'Ugali Steaming & Mingling', remainingSeconds: 600, totalSeconds: 600, isRunning: false },
    { id: 't_onions', label: 'Dark Pilau Caramelization', remainingSeconds: 480, totalSeconds: 480, isRunning: false },
    { id: 't_chapati', label: 'Chapati Dough Hydration Rest', remainingSeconds: 1800, totalSeconds: 1800, isRunning: false },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-stone-100">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Kenyan Culinary Laboratory & Engineering Suite</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Culinary Calculators & Timers
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Density-calibrated measurements for East African flours, banquet recipe scaling, Mama Mboga margin calculations, and multi-timer stations.
          </p>
        </div>

        {/* Sub-Tabs Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-950 border border-stone-800">
          <button
            onClick={() => setActiveSubTab('converter')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'converter' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Converter</span>
          </button>

          <button
            onClick={() => setActiveSubTab('scaler')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'scaler' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Scaling</span>
          </button>

          <button
            onClick={() => setActiveSubTab('costing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'costing' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Food Costing</span>
          </button>

          <button
            onClick={() => setActiveSubTab('timers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'timers' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <TimerIcon className="w-3.5 h-3.5" />
            <span>Timers</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: DENSITY-AWARE CONVERTER */}
      {activeSubTab === 'converter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-900/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              Density-Aware Measurement Input
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                  Ingredient (Calibrated specific gravity)
                </label>
                <select
                  value={selectedIngredientId}
                  onChange={e => setSelectedIngredientId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white"
                >
                  {CULINARY_DENSITY_DATABASE.map(ing => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={inputAmount}
                    onChange={e => setInputAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                    Unit
                  </label>
                  <select
                    value={inputUnit}
                    onChange={e => setInputUnit(e.target.value as any)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="cups">US Cups</option>
                    <option value="tbsp">Tablespoons (tbsp)</option>
                    <option value="tsp">Teaspoons (tsp)</option>
                    <option value="grams">Grams (g)</option>
                    <option value="ml">Millilitres (ml)</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-stone-400 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block text-[11px]">
                  Physical Calibration Data:
                </span>
                <p>1 Cup = {selectedIngredient.gramsPerCup}g • 1 Tbsp = {selectedIngredient.gramsPerTbsp}g • 1 Tsp = {selectedIngredient.gramsPerTsp}g</p>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-white/10 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Grams</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {convertedGrams} g
              </div>
              <span className="text-[10px] text-stone-500">Weight</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-white/10 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">US Cups</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                {convertedCups}
              </div>
              <span className="text-[10px] text-stone-500">Volume</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-white/10 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Millilitres</span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                {convertedMl} ml
              </div>
              <span className="text-[10px] text-stone-500">Liquid equiv</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-white/10 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Tablespoons</span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {convertedTbsp} tbsp
              </div>
              <span className="text-[10px] text-stone-500">15ml standard</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-white/10 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Teaspoons</span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {convertedTsp} tsp
              </div>
              <span className="text-[10px] text-stone-500">5ml standard</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-white/10 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Kilograms</span>
              <div className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">
                {(convertedGrams / 1000).toFixed(2)} kg
              </div>
              <span className="text-[10px] text-stone-500">Bulk market scale</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: RECIPE BATCH SCALER */}
      {activeSubTab === 'scaler' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
              Event & Banquet Recipe Scaling Multiplier
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SCALING_PRESETS.map(preset => (
                <div
                  key={preset.label}
                  onClick={() => setScalerTargetServings(preset.people)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition ${
                    scalerTargetServings === preset.people
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-stone-950/80 border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] font-mono text-emerald-400 font-bold">{preset.label}</div>
                  <div className="text-xl font-mono font-black text-white mt-1">
                    {preset.people} Guests
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{preset.description}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400">Scale factor from 4 portions:</span>
                <span className="text-lg font-mono font-black text-amber-300">
                  {(scalerTargetServings / 4).toFixed(2)}x Multiplier
                </span>
              </div>
              <div className="text-xs text-stone-400">
                Formula: <span className="font-mono text-emerald-400">New Amount = Base Amount × (Target Servings ÷ Base Servings)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FOOD COST & MARGIN CALCULATOR */}
      {activeSubTab === 'costing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold text-base text-white">
                  {costingRecipe.recipeTitle}
                </h3>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  Yield: {costingRecipe.portionsYield} Plates
                </span>
              </div>

              {/* Ingredient list */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-400 font-mono text-[11px] pb-1">
                  <span>Ingredient Item</span>
                  <span>Cost (KSh)</span>
                </div>
                {costingRecipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-stone-950 flex items-center justify-between border border-stone-800">
                    <span className="text-stone-200 font-medium">{ing.name} ({ing.quantity})</span>
                    <span className="font-mono text-amber-300 font-bold">KSh {ing.costKSh}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                  <span className="text-stone-400 text-[11px] block">Kitchen Labor (KSh)</span>
                  <span className="font-mono text-white font-bold text-sm">KSh {costingRecipe.laborCostKSh}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                  <span className="text-stone-400 text-[11px] block">Gas & Charcoal Overhead (KSh)</span>
                  <span className="font-mono text-white font-bold text-sm">KSh {costingRecipe.overheadGasKSh}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Profit Margin Analysis */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/95 to-stone-950 border border-emerald-500/30 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Margin & Selling Price
                </h4>
                <span className="text-xs font-mono font-bold text-white bg-emerald-600/30 px-2 py-0.5 rounded-md">
                  {costingRecipe.targetGrossMarginPercent}% Target Margin
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.03] flex items-center justify-between">
                  <span className="text-xs text-stone-400">Total Production Cost:</span>
                  <span className="font-mono font-bold text-white text-sm">KSh {costAnalysis.totalProductionCostKSh}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] flex items-center justify-between">
                  <span className="text-xs text-stone-400">Total Cost per Plate:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">KSh {costAnalysis.costPerServingKSh}</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Recommended Menu Selling Price
                  </span>
                  <div className="text-3xl font-mono font-black text-emerald-300">
                    KSh {costAnalysis.recommendedSellingPriceKSh}
                  </div>
                  <span className="text-[11px] text-stone-400">
                    Gross Profit per Plate: <strong className="text-white">KSh {costAnalysis.grossProfitPerServingKSh}</strong>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] space-y-1 text-xs">
                  <div className="flex justify-between text-stone-300">
                    <span>Batch Total Revenue:</span>
                    <span className="font-mono font-bold text-white">KSh {costAnalysis.totalRevenueKSh}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Net Batch Gross Profit:</span>
                    <span className="font-mono font-bold">KSh {costAnalysis.totalProfitKSh}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MULTI-TIMERS */}
      {activeSubTab === 'timers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timers.map(timer => {
              const mins = Math.floor(timer.remainingSeconds / 60);
              const secs = timer.remainingSeconds % 60;
              return (
                <div key={timer.id} className="p-6 rounded-3xl bg-stone-900 border border-white/10 space-y-4 text-center">
                  <h4 className="font-bold text-white text-sm">{timer.label}</h4>
                  <div className="text-4xl font-mono font-black text-emerald-400">
                    {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        setTimers(prev =>
                          prev.map(t => (t.id === timer.id ? { ...t, isRunning: !t.isRunning } : t))
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {timer.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{timer.isRunning ? 'Pause' : 'Start'}</span>
                    </button>
                    <button
                      onClick={() =>
                        setTimers(prev =>
                          prev.map(t => (t.id === timer.id ? { ...t, remainingSeconds: t.totalSeconds, isRunning: false } : t))
                        )
                      }
                      className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
