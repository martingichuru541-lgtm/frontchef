import test from 'node:test';
import assert from 'node:assert';
import { detectRecipeAllergens, checkNutritionalLimits, DEFAULT_NUTRITIONAL_LIMITS } from './allergens.ts';
import { Recipe } from '../types.ts';

const mockChapatiRecipe: Recipe = {
  id: 'test-chapati',
  title: 'Kenyan Soft Chapatis',
  description: 'Layered chapatis',
  difficulty: 'Medium',
  prepTimeMinutes: 20,
  cookTimeMinutes: 25,
  totalTimeMinutes: 45,
  calories: 590,
  servings: 4,
  proteinGrams: 18,
  carbsGrams: 78,
  fatGrams: 22,
  dietaryTags: ['Vegetarian'],
  ingredients: [
    { name: 'All-Purpose Wheat Flour (Atta/Ngano)', amount: '3 cups' },
    { name: 'Pure Vegetable Cooking Oil', amount: '3 tbsp' },
    { name: 'Warm Water & Salt', amount: '1 cup' },
  ],
  steps: [],
};

const mockTilapiaRecipe: Recipe = {
  id: 'test-tilapia',
  title: 'Fresh Tilapia Wet Fry',
  description: 'Pan fried tilapia',
  difficulty: 'Easy',
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  totalTimeMinutes: 30,
  calories: 420,
  servings: 3,
  proteinGrams: 42,
  carbsGrams: 12,
  fatGrams: 15,
  dietaryTags: ['Gluten-Free', 'High-Protein'],
  ingredients: [
    { name: 'Fresh Whole Tilapia Fish', amount: '1 large' },
    { name: 'Ripe Tomatoes', amount: '3' },
    { name: 'Cooking Oil', amount: '2 tbsp' },
  ],
  steps: [],
};

test('detectRecipeAllergens identifies Gluten in wheat flour', () => {
  const allergens = detectRecipeAllergens(mockChapatiRecipe);
  assert.strictEqual(allergens.some(a => a.type === 'Gluten / Wheat'), true);
  assert.strictEqual(allergens.some(a => a.type === 'Fish / Seafood'), false);
});

test('detectRecipeAllergens identifies Fish in Tilapia', () => {
  const allergens = detectRecipeAllergens(mockTilapiaRecipe);
  assert.strictEqual(allergens.some(a => a.type === 'Fish / Seafood'), true);
  assert.strictEqual(allergens.some(a => a.type === 'Gluten / Wheat'), false);
});

test('detectRecipeAllergens flags matched user allergies with high severity', () => {
  const allergens = detectRecipeAllergens(mockChapatiRecipe, ['Gluten']);
  const glutenFlag = allergens.find(a => a.type === 'Gluten / Wheat');
  assert.ok(glutenFlag);
  assert.strictEqual(glutenFlag.matchedUserAllergy, true);
  assert.strictEqual(glutenFlag.severity, 'high');
});

test('checkNutritionalLimits identifies exceeded calories, carbs, and fat', () => {
  const exceeded = checkNutritionalLimits(mockChapatiRecipe, DEFAULT_NUTRITIONAL_LIMITS);
  // Default limits: maxCalories: 550, maxCarbs: 65, maxFat: 20
  // Recipe has: 590 cal, 78g carbs, 22g fat
  assert.strictEqual(exceeded.length, 3);
  assert.strictEqual(exceeded.some(e => e.nutrient === 'Calories'), true);
  assert.strictEqual(exceeded.some(e => e.nutrient === 'Carbohydrates'), true);
  assert.strictEqual(exceeded.some(e => e.nutrient === 'Total Fat'), true);
});

test('checkNutritionalLimits returns empty when recipe within thresholds', () => {
  const exceeded = checkNutritionalLimits(mockTilapiaRecipe, DEFAULT_NUTRITIONAL_LIMITS);
  // Tilapia: 420 cal (<550), 12g carbs (<65), 15g fat (<20)
  assert.strictEqual(exceeded.length, 0);
});
