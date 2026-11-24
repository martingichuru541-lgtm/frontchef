import { Recipe, NutritionalLimits, AllergenFlag, NutritionExceededFlag } from '../types.ts';

export const COMMON_ALLERGEN_CATEGORIES = [
  { id: 'gluten', label: 'Gluten / Wheat', icon: '🌾' },
  { id: 'dairy', label: 'Dairy / Lactose', icon: '🥛' },
  { id: 'fish', label: 'Fish / Seafood', icon: '🐟' },
  { id: 'eggs', label: 'Eggs', icon: '🥚' },
  { id: 'nuts', label: 'Peanuts / Tree Nuts', icon: '🥜' },
  { id: 'soy', label: 'Soy / Soybeans', icon: '🫘' },
] as const;

export const DEFAULT_NUTRITIONAL_LIMITS: NutritionalLimits = {
  maxCalories: 550, // kcal per serving
  maxCarbs: 65,     // g per serving
  maxFat: 20,       // g per serving
  maxProtein: 45,   // g per serving
};

export const NUTRITIONAL_PRESETS = [
  {
    name: 'Standard Meal Balance',
    description: 'Based on 2,000 kcal daily reference split across 3 meals + snacks',
    limits: { maxCalories: 550, maxCarbs: 65, maxFat: 20, maxProtein: 45 },
  },
  {
    name: 'Low-Carb / Keto Target',
    description: 'Strict restriction on carbohydrate intake to support ketosis',
    limits: { maxCalories: 550, maxCarbs: 25, maxFat: 35, maxProtein: 50 },
  },
  {
    name: 'Heart-Healthy / Low-Fat',
    description: 'Reduced dietary fat and moderate calories for cardiovascular wellness',
    limits: { maxCalories: 480, maxCarbs: 65, maxFat: 12, maxProtein: 40 },
  },
  {
    name: 'High-Energy / Athletic',
    description: 'Increased calories and protein for active training or post-workout recovery',
    limits: { maxCalories: 750, maxCarbs: 95, maxFat: 28, maxProtein: 55 },
  },
];

/**
 * Detects common allergens present in a recipe based on explicit allergens list or ingredient scan
 */
export function detectRecipeAllergens(recipe: Recipe, userAllergies: string[] = []): AllergenFlag[] {
  const flags: AllergenFlag[] = [];
  const normalizedUserAllergies = userAllergies.map(a => a.toLowerCase().trim());

  // Check explicit allergens if specified on the recipe
  if (recipe.allergens && recipe.allergens.length > 0) {
    recipe.allergens.forEach(all => {
      const isUserAllergy = normalizedUserAllergies.some(ua => all.toLowerCase().includes(ua) || ua.includes(all.toLowerCase()));
      flags.push({
        type: all,
        ingredient: 'Recipe recipe metadata',
        severity: isUserAllergy ? 'high' : 'moderate',
        matchedUserAllergy: isUserAllergy,
      });
    });
  }

  // Scan ingredients list
  recipe.ingredients.forEach(ing => {
    const name = ing.name.toLowerCase();

    // 1. Gluten / Wheat
    const isGluten =
      (name.includes('wheat') ||
        name.includes('flour') ||
        name.includes('atta') ||
        name.includes('ngano') ||
        name.includes('bread') ||
        name.includes('pasta') ||
        name.includes('semolina') ||
        name.includes('barley') ||
        name.includes('rye') ||
        (name.includes('royco') && !recipe.dietaryTags?.includes('Gluten-Free'))) &&
      !name.includes('gluten-free');

    if (isGluten && !flags.some(f => f.type === 'Gluten / Wheat' && f.ingredient === ing.name)) {
      const isUserAllergy = normalizedUserAllergies.some(ua => ua.includes('gluten') || ua.includes('wheat'));
      flags.push({
        type: 'Gluten / Wheat',
        ingredient: ing.name,
        severity: isUserAllergy ? 'high' : 'moderate',
        matchedUserAllergy: isUserAllergy,
      });
    }

    // 2. Dairy / Lactose
    const isDairy =
      name.includes('milk') ||
      name.includes('cheese') ||
      name.includes('butter') ||
      name.includes('cream') ||
      name.includes('ghee') ||
      name.includes('yogurt') ||
      name.includes('maziwa') ||
      name.includes('lala') ||
      name.includes('paneer');

    if (isDairy && !flags.some(f => f.type === 'Dairy / Lactose' && f.ingredient === ing.name)) {
      const isUserAllergy = normalizedUserAllergies.some(ua => ua.includes('dairy') || ua.includes('milk') || ua.includes('lactose'));
      flags.push({
        type: 'Dairy / Lactose',
        ingredient: ing.name,
        severity: isUserAllergy ? 'high' : 'moderate',
        matchedUserAllergy: isUserAllergy,
      });
    }

    // 3. Fish / Seafood
    const isFish =
      name.includes('tilapia') ||
      name.includes('fish') ||
      name.includes('salmon') ||
      name.includes('tuna') ||
      name.includes('omena') ||
      name.includes('prawn') ||
      name.includes('shrimp') ||
      name.includes('seafood') ||
      name.includes('crab');

    if (isFish && !flags.some(f => f.type === 'Fish / Seafood' && f.ingredient === ing.name)) {
      const isUserAllergy = normalizedUserAllergies.some(ua => ua.includes('fish') || ua.includes('seafood'));
      flags.push({
        type: 'Fish / Seafood',
        ingredient: ing.name,
        severity: isUserAllergy ? 'high' : 'moderate',
        matchedUserAllergy: isUserAllergy,
      });
    }

    // 4. Eggs
    const isEgg = name.includes('egg') || name.includes('mayai');
    if (isEgg && !flags.some(f => f.type === 'Eggs' && f.ingredient === ing.name)) {
      const isUserAllergy = normalizedUserAllergies.some(ua => ua.includes('egg'));
      flags.push({
        type: 'Eggs',
        ingredient: ing.name,
        severity: isUserAllergy ? 'high' : 'moderate',
        matchedUserAllergy: isUserAllergy,
      });
    }

    // 5. Peanuts / Tree Nuts
    const isNuts =
      name.includes('peanut') ||
      name.includes('njugu') ||
      name.includes('almond') ||
      name.includes('walnut') ||
      name.includes('cashew') ||
      name.includes('pecan') ||
      name.includes('pistachio') ||
      name.includes('hazelnut');

    if (isNuts && !flags.some(f => f.type === 'Peanuts / Tree Nuts' && f.ingredient === ing.name)) {
      const isUserAllergy = normalizedUserAllergies.some(ua => ua.includes('nut') || ua.includes('peanut'));
      flags.push({
        type: 'Peanuts / Tree Nuts',
        ingredient: ing.name,
        severity: isUserAllergy ? 'high' : 'moderate',
        matchedUserAllergy: isUserAllergy,
      });
    }

    // 6. Soy
    const isSoy = name.includes('soy') || name.includes('tofu') || name.includes('edamame') || name.includes('tempeh');
    if (isSoy && !flags.some(f => f.type === 'Soy' && f.ingredient === ing.name)) {
      const isUserAllergy = normalizedUserAllergies.some(ua => ua.includes('soy'));
      flags.push({
        type: 'Soy',
        ingredient: ing.name,
        severity: isUserAllergy ? 'high' : 'moderate',
        matchedUserAllergy: isUserAllergy,
      });
    }
  });

  return flags;
}

/**
 * Checks if a recipe exceeds the user's daily/meal nutritional limits
 */
export function checkNutritionalLimits(recipe: Recipe, limits: NutritionalLimits): NutritionExceededFlag[] {
  const flags: NutritionExceededFlag[] = [];

  // Calories Check
  if (limits.maxCalories > 0 && recipe.calories > limits.maxCalories) {
    const diff = recipe.calories - limits.maxCalories;
    flags.push({
      nutrient: 'Calories',
      value: recipe.calories,
      limit: limits.maxCalories,
      unit: 'kcal',
      difference: diff,
      percentageOver: Math.round((diff / limits.maxCalories) * 100),
    });
  }

  // Carbohydrates Check
  if (limits.maxCarbs > 0 && recipe.carbsGrams > limits.maxCarbs) {
    const diff = recipe.carbsGrams - limits.maxCarbs;
    flags.push({
      nutrient: 'Carbohydrates',
      value: recipe.carbsGrams,
      limit: limits.maxCarbs,
      unit: 'g',
      difference: diff,
      percentageOver: Math.round((diff / limits.maxCarbs) * 100),
    });
  }

  // Fat Check
  if (limits.maxFat > 0 && recipe.fatGrams > limits.maxFat) {
    const diff = recipe.fatGrams - limits.maxFat;
    flags.push({
      nutrient: 'Total Fat',
      value: recipe.fatGrams,
      limit: limits.maxFat,
      unit: 'g',
      difference: diff,
      percentageOver: Math.round((diff / limits.maxFat) * 100),
    });
  }

  // Protein Check (optional limit if specified, e.g. for low-protein diets)
  if (limits.maxProtein && limits.maxProtein > 0 && recipe.proteinGrams > limits.maxProtein) {
    const diff = recipe.proteinGrams - limits.maxProtein;
    flags.push({
      nutrient: 'Protein',
      value: recipe.proteinGrams,
      limit: limits.maxProtein,
      unit: 'g',
      difference: diff,
      percentageOver: Math.round((diff / limits.maxProtein) * 100),
    });
  }

  return flags;
}
