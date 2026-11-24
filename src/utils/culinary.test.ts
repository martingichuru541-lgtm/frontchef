import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeIngredient,
  isIngredientAvailable,
  calculateRecipeMatch,
  filterAndSortRecipes,
  addIngredientsToShoppingList,
  guessIngredientCategory,
  getEstimatedPriceKSh,
} from './culinary.ts';
import { Recipe, ShoppingItem } from '../types.ts';

test('normalizeIngredient cleans prefixes and casing', () => {
  assert.equal(normalizeIngredient('Fresh Baby Spinach'), 'spinach');
  assert.equal(normalizeIngredient('Grated Cheddar Cheese'), 'cheddar cheese');
  assert.equal(normalizeIngredient('Boneless Skinless Chicken Breast'), 'chicken breast');
});

test('isIngredientAvailable handles synonyms and fuzzy matches including Kenyan staples', () => {
  const fridge = ['Sukuma Wiki (Fresh Collard Greens)', 'Fresh Beef (Nyama)', 'Unga wa Ugali', 'Fresh Dhania'];
  assert.equal(isIngredientAvailable('Collard Greens', fridge), true);
  assert.equal(isIngredientAvailable('Nyama ya Ng\'ombe', fridge), true);
  assert.equal(isIngredientAvailable('Maize flour for ugali', fridge), true);
  assert.equal(isIngredientAvailable('Coriander / Cilantro', fridge), true);
  assert.equal(isIngredientAvailable('Salmon Fillet', fridge), false);
});

test('calculateRecipeMatch returns accurate match percentage and missing items', () => {
  const mockRecipe: Recipe = {
    id: 'r1',
    title: 'Sukuma Wiki & Beef Nyama Fry with Hot Ugali',
    description: 'Kenyan comfort classic',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    calories: 520,
    servings: 4,
    proteinGrams: 38,
    carbsGrams: 64,
    fatGrams: 16,
    dietaryTags: ['High-Protein', 'Gluten-Free'],
    ingredients: [
      { name: 'Fresh Beef (Nyama ya Ng\'ombe)', amount: '500g' },
      { name: 'Sukuma Wiki (Collard Greens)', amount: '2 bunches' },
      { name: 'Unga wa Ugali', amount: '2 cups' },
      { name: 'Royco Mchuzi Mix', amount: '1 tbsp', isOptional: true }
    ],
    steps: []
  };

  const fridge = ['Sukuma Wiki', 'Unga wa Ugali'];
  const result = calculateRecipeMatch(mockRecipe, fridge);

  // 2 out of 3 required ingredients present (Sukuma Wiki, Unga wa Ugali), Beef is missing, Royco is optional
  assert.equal(result.matchedCount, 2);
  assert.equal(result.totalRequiredCount, 3);
  assert.equal(result.matchScore, 67);
  assert.deepEqual(result.missingIngredients, ['Fresh Beef (Nyama ya Ng\'ombe)', 'Royco Mchuzi Mix']);
});

test('filterAndSortRecipes filters by Kenyan preference and budget in KSh', () => {
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Sukuma Wiki & Beef Fry with Ugali',
      description: 'Kenyan home meal',
      cuisine: 'Kenyan National Classic',
      isKenyanDish: true,
      estimatedCostKSh: 380,
      difficulty: 'Easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      totalTimeMinutes: 30,
      calories: 520,
      servings: 4,
      proteinGrams: 38,
      carbsGrams: 64,
      fatGrams: 16,
      dietaryTags: ['Traditional'],
      ingredients: [],
      steps: [],
      matchScore: 90
    },
    {
      id: '2',
      title: 'French Duck Confit with Truffle Potatoes',
      description: 'Expensive French delicacy',
      cuisine: 'French Fine Dining',
      isKenyanDish: false,
      estimatedCostKSh: 1800,
      difficulty: 'Hard',
      prepTimeMinutes: 30,
      cookTimeMinutes: 90,
      totalTimeMinutes: 120,
      calories: 780,
      servings: 2,
      proteinGrams: 40,
      carbsGrams: 30,
      fatGrams: 55,
      dietaryTags: ['Gourmet'],
      ingredients: [],
      steps: [],
      matchScore: 60
    }
  ];

  // Filter for Kenyan only
  const kenyanOnly = filterAndSortRecipes(recipes, {
    dietaryTags: [],
    difficulty: 'All',
    maxTotalMinutes: 0,
    maxCalories: 0,
    kenyanOnly: true,
    sortBy: 'match'
  });
  assert.equal(kenyanOnly.length, 1);
  assert.equal(kenyanOnly[0].id, '1');

  // Filter for budget <= KSh 400
  const budgetFiltered = filterAndSortRecipes(recipes, {
    dietaryTags: [],
    difficulty: 'All',
    maxTotalMinutes: 0,
    maxCalories: 0,
    maxBudgetKSh: 400,
    sortBy: 'budget'
  });
  assert.equal(budgetFiltered.length, 1);
  assert.equal(budgetFiltered[0].id, '1');
});

test('getEstimatedPriceKSh returns reasonable Kenyan market price benchmarks', () => {
  assert.equal(getEstimatedPriceKSh('Sukuma Wiki'), 30);
  assert.equal(getEstimatedPriceKSh('Fresh Beef (Nyama)'), 320);
  assert.equal(getEstimatedPriceKSh('Unga wa Ugali'), 95);
  assert.equal(getEstimatedPriceKSh('Fresh Dhania'), 20);
  assert.equal(getEstimatedPriceKSh('Whole Tilapia Fish'), 300);
});

test('addIngredientsToShoppingList attaches estimated KSh prices', () => {
  const initial: ShoppingItem[] = [];

  const updated = addIngredientsToShoppingList(initial, [
    { name: 'Sukuma Wiki', amount: '2 bunches', recipeTitle: 'Ugali Sukuma' },
    { name: 'Nyama ya Ng\'ombe', amount: '500g', recipeTitle: 'Beef Fry' }
  ]);

  assert.equal(updated.length, 2);
  const sukuma = updated.find(i => i.name === 'Sukuma Wiki');
  const beef = updated.find(i => i.name === 'Nyama ya Ng\'ombe');

  assert.equal(sukuma?.estimatedPriceKSh, 30);
  assert.equal(beef?.estimatedPriceKSh, 320);
});
