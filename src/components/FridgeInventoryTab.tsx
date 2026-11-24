import React, { useState } from 'react';
import { Refrigerator, Plus, Trash2, Sparkles, Check, Tag } from 'lucide-react';
import { IngredientItem } from '../types.ts';

interface FridgeInventoryTabProps {
  ingredients: IngredientItem[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientItem[]>>;
  onRescanFridge: () => void;
  onGoToRecipes: () => void;
  recipesCount: number;
}

export const FridgeInventoryTab: React.FC<FridgeInventoryTabProps> = ({
  ingredients,
  setIngredients,
  onRescanFridge,
  onGoToRecipes,
  recipesCount,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newCategory, setNewCategory] = useState<IngredientItem['category']>('Produce');
  const [newQuantity, setNewQuantity] = useState('');

  const removeIngredient = (id: string) => {
    setIngredients(prev => prev.filter(i => i.id !== id));
  };

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: IngredientItem = {
      id: 'custom_' + Date.now(),
      name: newItemName.trim(),
      category: newCategory,
      quantity: newQuantity.trim() || 'Available',
      confidence: 1.0,
      isDetected: false,
    };

    setIngredients(prev => [newItem, ...prev]);
    setNewItemName('');
    setNewQuantity('');
  };

  // Group by category
  const categories = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Condiments & Sauces', 'Pantry & Grains', 'Beverages', 'Other'] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-stone-100">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Refrigerator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Current Fridge Inventory</h2>
            <p className="text-xs text-stone-400">
              {ingredients.length} items tracked • Matched against {recipesCount} tailored recipes
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRescanFridge}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rescan Fridge</span>
          </button>

          <button
            onClick={onGoToRecipes}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
          >
            Cook from Inventory ({recipesCount})
          </button>
        </div>
      </div>

      {/* Manual Ingredient Add Bar */}
      <form
        onSubmit={addIngredient}
        className="bg-stone-900/60 border border-stone-800 p-3 rounded-2xl flex flex-col sm:flex-row gap-2"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add ingredient hiding in back of fridge (e.g. Sharp Cheddar, Mayo)..."
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="w-full sm:w-44">
          <select
            value={newCategory}
            onChange={e => setNewCategory(e.target.value as any)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-32">
          <input
            type="text"
            placeholder="Quantity (optional)"
            value={newQuantity}
            onChange={e => setNewQuantity(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Grouped Category Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => {
          const categoryItems = ingredients.filter(i => i.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div
              key={category}
              className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider pb-1 border-b border-stone-800/60">
                <span>{category}</span>
                <span className="font-mono text-emerald-400">{categoryItems.length} items</span>
              </div>

              <div className="space-y-2">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-center justify-between group hover:border-emerald-500/40 transition"
                  >
                    <div>
                      <span className="text-sm font-medium text-stone-200">{item.name}</span>
                      {item.quantity && (
                        <span className="ml-2 text-xs text-stone-400 font-mono">
                          • {item.quantity}
                        </span>
                      )}
                      {item.confidence && (
                        <span className="ml-2 px-1.5 py-0.2 text-[10px] bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                          {Math.round(item.confidence * 100)}% match
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeIngredient(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-rose-400 transition rounded"
                      title="Remove from inventory"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
