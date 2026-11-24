export interface IngredientDensity {
  id: string;
  name: string;
  gramsPerCup: number; // 1 US cup = 240ml
  gramsPerTbsp: number; // 1 tbsp = 15ml
  gramsPerTsp: number; // 1 tsp = 5ml
  category: string;
}

export const CULINARY_DENSITY_DATABASE: IngredientDensity[] = [
  { id: 'unga_ugali', name: 'Unga wa Ugali (Maize Meal)', gramsPerCup: 150, gramsPerTbsp: 9.5, gramsPerTsp: 3.2, category: 'Flours & Grains' },
  { id: 'atta_flour', name: 'All-Purpose Wheat Flour (Atta)', gramsPerCup: 125, gramsPerTbsp: 8, gramsPerTsp: 2.7, category: 'Flours & Grains' },
  { id: 'basmati_rice', name: 'Basmati Rice (Mchele)', gramsPerCup: 185, gramsPerTbsp: 11.5, gramsPerTsp: 3.8, category: 'Flours & Grains' },
  { id: 'green_grams', name: 'Green Grams (Dengu)', gramsPerCup: 200, gramsPerTbsp: 12.5, gramsPerTsp: 4.2, category: 'Legumes & Pulses' },
  { id: 'white_sugar', name: 'White Granulated Sugar (Sukari)', gramsPerCup: 200, gramsPerTbsp: 12.5, gramsPerTsp: 4.2, category: 'Baking & Sweeteners' },
  { id: 'cooking_oil', name: 'Vegetable Cooking Oil (Mafuta)', gramsPerCup: 218, gramsPerTbsp: 13.6, gramsPerTsp: 4.5, category: 'Oils & Fats' },
  { id: 'pure_butter', name: 'Pure Butter / Ghee (Samli)', gramsPerCup: 227, gramsPerTbsp: 14.2, gramsPerTsp: 4.7, category: 'Oils & Fats' },
  { id: 'coconut_milk', name: 'Coconut Cream / Milk (Tui la Nazi)', gramsPerCup: 240, gramsPerTbsp: 15, gramsPerTsp: 5, category: 'Liquids' },
  { id: 'table_salt', name: 'Fine Sea Salt (Chumvi)', gramsPerCup: 280, gramsPerTbsp: 18, gramsPerTsp: 6, category: 'Seasoning' },
  { id: 'royco_mix', name: 'Royco Mchuzi Mix Powder', gramsPerCup: 140, gramsPerTbsp: 9, gramsPerTsp: 3, category: 'Seasoning' },
];

export interface ScalingPreset {
  label: string;
  people: number;
  multiplier: number;
  description: string;
}

export const SCALING_PRESETS: ScalingPreset[] = [
  { label: 'Solo Chef', people: 1, multiplier: 0.25, description: 'Single portion calibration' },
  { label: 'Couples Dinner', people: 2, multiplier: 0.5, description: 'Intimate dinner for two' },
  { label: 'Kenyan Family', people: 4, multiplier: 1.0, description: 'Standard household batch (Default)' },
  { label: 'Extended Family', people: 8, multiplier: 2.0, description: 'Sunday family gathering' },
  { label: 'Dinner Party', people: 15, multiplier: 3.75, description: 'Holiday or birthday celebration' },
  { label: 'Small Event', people: 30, multiplier: 7.5, description: 'Chama meeting or corporate lunch' },
  { label: 'Community Feast', people: 50, multiplier: 12.5, description: 'Harambee or church fellowship' },
  { label: 'Grand Banquet', people: 100, multiplier: 25.0, description: 'Ruracio / Wedding reception scale' },
];

export interface CommercialCostInput {
  recipeTitle: string;
  portionsYield: number;
  ingredients: {
    name: string;
    quantity: string;
    costKSh: number;
  }[];
  laborCostKSh: number;
  overheadGasKSh: number;
  targetGrossMarginPercent: number; // e.g. 65% for restaurant
}

export function calculateCommercialCosting(input: CommercialCostInput) {
  const totalIngredientCostKSh = input.ingredients.reduce((sum, item) => sum + (item.costKSh || 0), 0);
  const totalProductionCostKSh = totalIngredientCostKSh + (input.laborCostKSh || 0) + (input.overheadGasKSh || 0);
  const costPerServingKSh = input.portionsYield > 0 ? Math.round(totalProductionCostKSh / input.portionsYield) : 0;
  const foodCostPerServingKSh = input.portionsYield > 0 ? Math.round(totalIngredientCostKSh / input.portionsYield) : 0;

  // Formula: Selling Price = Cost / (1 - Target Gross Margin %)
  const marginDecimal = (input.targetGrossMarginPercent || 60) / 100;
  const recommendedSellingPriceKSh = marginDecimal < 1 && marginDecimal > 0
    ? Math.round(costPerServingKSh / (1 - marginDecimal))
    : costPerServingKSh * 2;

  const grossProfitPerServingKSh = recommendedSellingPriceKSh - costPerServingKSh;
  const totalRevenueKSh = recommendedSellingPriceKSh * input.portionsYield;
  const totalProfitKSh = grossProfitPerServingKSh * input.portionsYield;

  return {
    totalIngredientCostKSh,
    totalProductionCostKSh,
    costPerServingKSh,
    foodCostPerServingKSh,
    recommendedSellingPriceKSh,
    grossProfitPerServingKSh,
    totalRevenueKSh,
    totalProfitKSh,
  };
}
