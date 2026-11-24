export interface IngredientItem {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Condiments & Sauces' | 'Pantry & Grains' | 'Beverages' | 'Other' | string;
  confidence?: number;
  quantity?: string;
  amount?: string;
  expiryDate?: string;
  isLow?: boolean;
  isDetected?: boolean;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  isOptional?: boolean;
  category?: string;
  isAvailable?: boolean;
  estimatedPriceKSh?: number;
  kenyanMarketName?: string;
  scaledAmount?: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  title?: string;
  description?: string;
  tip?: string;
  proTip?: string;
  timerMinutes?: number;
  durationMinutes?: number;
  temperatureGuidance?: string;
  imageUrl?: string;
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface NutritionalLimits {
  maxCalories: number;
  maxCarbs: number;
  maxFat: number;
  maxProtein?: number;
}

export interface AllergenFlag {
  type: string;
  ingredient: string;
  severity: 'high' | 'moderate';
  matchedUserAllergy?: boolean;
}

export interface NutritionExceededFlag {
  nutrient: 'Calories' | 'Carbohydrates' | 'Total Fat' | 'Protein';
  value: number;
  limit: number;
  unit: string;
  difference: number;
  percentageOver: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine?: string;
  region?: string;
  countyOrigin?: string;
  difficulty: DifficultyLevel;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  calories: number;
  servings: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  dietaryTags: string[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  chefNote?: string;
  matchScore?: number;
  missingIngredients?: string[];
  matchedCount?: number;
  totalRequiredCount?: number;
  estimatedCostKSh?: number;
  costPerServingKSh?: number;
  budgetTier?: 'Budget' | 'Moderate' | 'Special';
  isKenyanDish?: boolean;
  imageUrl?: string;
  allergens?: string[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount?: string;
  recipeTitle?: string;
  category?: string;
  isChecked: boolean;
  addedAt?: number;
  estimatedPriceKSh?: number;
  estimatedCostKSh?: number;
}

export interface AnalysisResult {
  detectedIngredients: IngredientItem[];
  summary: string;
  fridgeObservations: string[];
  recipes: Recipe[];
}
