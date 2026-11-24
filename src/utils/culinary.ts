import { Recipe, ShoppingItem, IngredientItem } from '../types.ts';

/**
 * Normalizes ingredient names for fuzzy comparison (e.g. "fresh baby spinach" -> "spinach")
 */
export function normalizeIngredient(name: string): string {
  return name
    .toLowerCase()
    .replace(/[,\(\)\.\*]/g, '')
    .replace(/\b(fresh|dried|organic|baby|grated|shredded|chopped|diced|sliced|minced|large|small|medium|raw|cooked|boneless|skinless)\b/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Checks if a fridge ingredient satisfies a recipe ingredient
 */
export function isIngredientAvailable(recipeItemName: string, fridgeItems: (string | IngredientItem)[]): boolean {
  const normRecipe = normalizeIngredient(recipeItemName);
  if (!normRecipe) return false;

  return fridgeItems.some(item => {
    const rawName = typeof item === 'string' ? item : item.name;
    const normFridge = normalizeIngredient(rawName);
    if (!normFridge) return false;

    // Direct match or substring contains
    if (normRecipe === normFridge) return true;
    if (normRecipe.includes(normFridge) || normFridge.includes(normRecipe)) return true;

    // Common culinary equivalents including Kenyan staples
    if ((normRecipe.includes('egg') && normFridge.includes('egg')) ||
        (normRecipe.includes('cheese') && normFridge.includes('cheddar')) ||
        (normRecipe.includes('milk') && (normFridge.includes('milk') || normFridge.includes('maziwa'))) ||
        (normRecipe.includes('butter') && normFridge.includes('butter')) ||
        ((normRecipe.includes('onion') || normRecipe.includes('kitunguu')) && (normFridge.includes('onion') || normFridge.includes('kitunguu'))) ||
        (normRecipe.includes('garlic') && normFridge.includes('garlic')) ||
        ((normRecipe.includes('tomato') || normRecipe.includes('nyanya')) && (normFridge.includes('tomato') || normFridge.includes('nyanya'))) ||
        ((normRecipe.includes('chicken') || normRecipe.includes('kuku')) && (normFridge.includes('chicken') || normFridge.includes('kuku'))) ||
        ((normRecipe.includes('beef') || normRecipe.includes('nyama')) && (normFridge.includes('beef') || normFridge.includes('nyama'))) ||
        ((normRecipe.includes('sukuma') || normRecipe.includes('kale') || normRecipe.includes('collard')) && (normFridge.includes('sukuma') || normFridge.includes('kale') || normFridge.includes('spinach'))) ||
        ((normRecipe.includes('dhania') || normRecipe.includes('coriander') || normRecipe.includes('cilantro')) && (normFridge.includes('dhania') || normFridge.includes('coriander'))) ||
        ((normRecipe.includes('flour') || normRecipe.includes('unga')) && (normFridge.includes('flour') || normFridge.includes('unga'))) ||
        ((normRecipe.includes('rice') || normRecipe.includes('mchele') || normRecipe.includes('pilau')) && (normFridge.includes('rice') || normFridge.includes('mchele'))) ||
        ((normRecipe.includes('beans') || normRecipe.includes('maize') || normRecipe.includes('githeri')) && (normFridge.includes('beans') || normFridge.includes('maize') || normFridge.includes('githeri'))) ||
        (normRecipe.includes('yogurt') && normFridge.includes('yogurt'))) {
      return true;
    }

    return false;
  });
}

/**
 * Calculates match percentage and missing items for a recipe given current fridge contents
 */
export function calculateRecipeMatch(
  recipe: Recipe,
  fridgeItems: (string | IngredientItem)[]
): {
  matchScore: number;
  matchedCount: number;
  totalRequiredCount: number;
  missingIngredients: string[];
} {
  const required = recipe.ingredients.filter(i => !i.isOptional);
  const totalRequiredCount = required.length > 0 ? required.length : recipe.ingredients.length;

  let matchedCount = 0;
  const missingIngredients: string[] = [];

  recipe.ingredients.forEach(item => {
    const available = isIngredientAvailable(item.name, fridgeItems);
    item.isAvailable = available;
    if (available) {
      if (!item.isOptional) {
        matchedCount++;
      }
    } else {
      missingIngredients.push(item.name);
    }
  });

  const matchScore = totalRequiredCount > 0
    ? Math.round((matchedCount / totalRequiredCount) * 100)
    : 100;

  return {
    matchScore: Math.min(100, Math.max(0, matchScore)),
    matchedCount,
    totalRequiredCount,
    missingIngredients
  };
}

/**
 * Estimates reasonable Kenyan market price (in KSh) based on Nairobi Mama Mboga / market rates
 */
export function getEstimatedPriceKSh(ingredientName: string): number {
  const n = ingredientName.toLowerCase();
  if (/beef|nyama|steak|meat/i.test(n)) return 320;
  if (/chicken|kuku/i.test(n)) return 350;
  if (/fish|tilapia|samaki/i.test(n)) return 300;
  if (/bacon|pork/i.test(n)) return 280;
  if (/sukuma|kale|collard/i.test(n)) return 30;
  if (/spinach|mchicha|managu|terere/i.test(n)) return 40;
  if (/tomato|nyanya/i.test(n)) return 40;
  if (/onion|kitunguu/i.test(n)) return 35;
  if (/dhania|coriander|cilantro/i.test(n)) return 20;
  if (/garlic|ginger/i.test(n)) return 30;
  if (/unga|flour|maize meal/i.test(n)) return 95;
  if (/rice|mchele|basmati/i.test(n)) return 160;
  if (/beans|maize|githeri/i.test(n)) return 110;
  if (/dengu|ndengu|green gram|lentil/i.test(n)) return 130;
  if (/potato|waru/i.test(n)) return 70;
  if (/avocado/i.test(n)) return 40;
  if (/egg/i.test(n)) return 15;
  if (/milk|maziwa/i.test(n)) return 65;
  if (/butter|cheese/i.test(n)) return 180;
  if (/oil|cooking oil/i.test(n)) return 85;
  if (/royco|pilau masala|curry|spice/i.test(n)) return 40;
  if (/coconut milk/i.test(n)) return 140;
  return 50;
}

/**
 * Filters and sorts recipe cards based on user sidebar filters
 */
export interface RecipeFilterOptions {
  dietaryTags: string[];
  difficulty: 'All' | 'Easy' | 'Medium' | 'Hard';
  maxTotalMinutes: number; // 0 means any
  maxCalories: number; // 0 means any
  maxBudgetKSh?: number; // 0 means any
  kenyanOnly?: boolean;
  sortBy: 'match' | 'time' | 'calories' | 'difficulty' | 'budget';
  searchQuery?: string;
}

export function filterAndSortRecipes(
  recipes: Recipe[],
  filters: RecipeFilterOptions
): Recipe[] {
  let filtered = recipes.filter(recipe => {
    // Kenyan dish filter
    if (filters.kenyanOnly && !recipe.isKenyanDish && !recipe.cuisine?.toLowerCase().includes('kenyan') && !recipe.cuisine?.toLowerCase().includes('swahili')) {
      return false;
    }

    // Budget limit filter in Kenyan Shillings
    if (filters.maxBudgetKSh && filters.maxBudgetKSh > 0) {
      const cost = recipe.estimatedCostKSh ?? 400;
      if (cost > filters.maxBudgetKSh) return false;
    }

    // Dietary tags (must match all selected tags)
    if (filters.dietaryTags.length > 0) {
      const recipeTags = (recipe.dietaryTags || []).map(t => t.toLowerCase());
      const hasAllTags = filters.dietaryTags.every(selectedTag => {
        const tagLower = selectedTag.toLowerCase();
        return recipeTags.some(t => t.includes(tagLower) || tagLower.includes(t));
      });
      if (!hasAllTags) return false;
    }

    // Difficulty
    if (filters.difficulty !== 'All' && recipe.difficulty !== filters.difficulty) {
      return false;
    }

    // Max Total Minutes
    if (filters.maxTotalMinutes > 0 && recipe.totalTimeMinutes > filters.maxTotalMinutes) {
      return false;
    }

    // Max Calories
    if (filters.maxCalories > 0 && recipe.calories > filters.maxCalories) {
      return false;
    }

    // Search query
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      const titleMatch = recipe.title.toLowerCase().includes(q);
      const descMatch = recipe.description.toLowerCase().includes(q);
      const ingMatch = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !ingMatch) return false;
    }

    return true;
  });

  // Sort
  return filtered.sort((a, b) => {
    if (filters.sortBy === 'match') {
      return (b.matchScore ?? 0) - (a.matchScore ?? 0);
    }
    if (filters.sortBy === 'budget') {
      return (a.estimatedCostKSh ?? 400) - (b.estimatedCostKSh ?? 400);
    }
    if (filters.sortBy === 'time') {
      return a.totalTimeMinutes - b.totalTimeMinutes;
    }
    if (filters.sortBy === 'calories') {
      return a.calories - b.calories;
    }
    if (filters.sortBy === 'difficulty') {
      const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
      return (diffOrder[a.difficulty] || 2) - (diffOrder[b.difficulty] || 2);
    }
    return 0;
  });
}

/**
 * Categorizes an ingredient for grocery grouping
 */
export function guessIngredientCategory(name: string): ShoppingItem['category'] {
  const n = name.toLowerCase();
  if (/spinach|lettuce|kale|tomato|onion|garlic|pepper|lemon|lime|avocado|mushroom|carrot|herb|parsley|cilantro|basil|zucchini|broccoli/i.test(n)) {
    return 'Produce';
  }
  if (/milk|cheese|cheddar|parmesan|mozzarella|butter|cream|yogurt|egg/i.test(n)) {
    return 'Dairy & Eggs';
  }
  if (/chicken|beef|pork|bacon|turkey|salmon|shrimp|fish|steak|sausage/i.test(n)) {
    return 'Meat & Seafood';
  }
  if (/oil|olive oil|vinegar|sauce|soy sauce|mustard|mayo|dressing|hot sauce|paste/i.test(n)) {
    return 'Condiments & Oils';
  }
  if (/flour|sugar|rice|pasta|oats|quinoa|beans|lentil|spice|salt|pepper|yeast|broth/i.test(n)) {
    return 'Pantry & Grains';
  }
  return 'Other Essentials';
}

/**
 * Adds missing items to shopping list without duplicates
 */
export function addIngredientsToShoppingList(
  currentList: ShoppingItem[],
  newItems: { name: string; amount?: string; recipeTitle?: string }[]
): ShoppingItem[] {
  const result = [...currentList];

  newItems.forEach(item => {
    const norm = normalizeIngredient(item.name);
    const existingIndex = result.findIndex(existing => normalizeIngredient(existing.name) === norm);

    if (existingIndex >= 0) {
      // If already present and was checked, uncheck it
      result[existingIndex] = {
        ...result[existingIndex],
        isChecked: false,
        amount: item.amount || result[existingIndex].amount,
        recipeTitle: item.recipeTitle || result[existingIndex].recipeTitle,
      };
    } else {
      result.push({
        id: 'shop_' + Math.random().toString(36).substring(2, 9),
        name: item.name,
        amount: item.amount,
        recipeTitle: item.recipeTitle,
        category: guessIngredientCategory(item.name),
        isChecked: false,
        addedAt: Date.now(),
        estimatedPriceKSh: getEstimatedPriceKSh(item.name),
      });
    }
  });

  return result;
}
