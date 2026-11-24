import React, { useState } from 'react';
import {
  Refrigerator,
  Camera,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Utensils,
  Search,
  Filter,
} from 'lucide-react';
import { IngredientItem } from '../types.ts';

interface DigitalPantryViewProps {
  ingredients: IngredientItem[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientItem[]>>;
  onOpenScanner: () => void;
  onGoToRecipes: () => void;
}

export const DigitalPantryView: React.FC<DigitalPantryViewProps> = ({
  ingredients,
  setIngredients,
  onOpenScanner,
  onGoToRecipes,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Vegetables');
  const [newItemExpiryDays, setNewItemExpiryDays] = useState('7');

  const categories = [
    'All',
    'Vegetables',
    'Grains & Unga',
    'Meat & Fish',
    'Spices & Pantry',
    'Dairy & Eggs',
  ];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const days = parseInt(newItemExpiryDays) || 7;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    const newItem: IngredientItem = {
      id: `pantry_${Date.now()}`,
      name: newItemName.trim(),
      amount: newItemAmount.trim() || '1 portion',
      category: newItemCategory,
      expiryDate: expiryDate.toISOString().split('T')[0],
      isLow: false,
    };

    setIngredients(prev => [newItem, ...prev]);
    setNewItemName('');
    setNewItemAmount('');
  };

  const handleRemoveItem = (id: string) => {
    setIngredients(prev => prev.filter(i => i.id !== id));
  };

  const filteredIngredients = ingredients.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' ||
      (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-stone-100">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Refrigerator className="w-4 h-4" />
            <span>Smart Fridge & Digital Pantry Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            My Digital Pantry
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Live inventory of your kitchen staples, fresh Mama Mboga greens, and seasonings. Track shelf life and generate zero-waste recipes instantly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenScanner}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-cyan-400/30 transition cursor-pointer active:scale-95"
          >
            <Camera className="w-4 h-4" />
            <span>AI Fridge Scan</span>
          </button>

          <button
            onClick={onGoToRecipes}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition cursor-pointer active:scale-95"
          >
            <Utensils className="w-4 h-4" />
            <span>Cook From Pantry</span>
          </button>
        </div>
      </div>

      {/* Quick Add Form & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quick Add Bar (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-stone-900/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            Add Pantry Item
          </h3>

          <form onSubmit={handleAddItem} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-stone-300 block mb-1">
                Item Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sukuma Wiki, Unga wa Ugali, Nyama"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-stone-300 block mb-1">
                  Quantity / Size
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 bundles / 1 kg"
                  value={newItemAmount}
                  onChange={e => setNewItemAmount(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-300 block mb-1">
                  Category
                </label>
                <select
                  value={newItemCategory}
                  onChange={e => setNewItemCategory(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2 py-2 text-xs text-white"
                >
                  <option value="Vegetables">Vegetables / Mboga</option>
                  <option value="Grains & Unga">Grains & Unga</option>
                  <option value="Meat & Fish">Meat & Fish</option>
                  <option value="Spices & Pantry">Spices & Pantry</option>
                  <option value="Dairy & Eggs">Dairy & Eggs</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              Add To Pantry
            </button>
          </form>
        </div>

        {/* Current Items List & Filters (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pantry items..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder:text-stone-600"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-stone-900/80 border border-white/5 hover:border-white/15 flex items-center justify-between transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                      <Refrigerator className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white capitalize">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-stone-400">
                        {item.amount || 'In stock'} • <span className="text-stone-500">{item.category || 'Pantry'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {item.expiryDate && (
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-800">
                        Exp: {item.expiryDate}
                      </span>
                    )}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-stone-800 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-stone-500 bg-stone-900/40 rounded-2xl border border-stone-800">
                No ingredients found matching "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
