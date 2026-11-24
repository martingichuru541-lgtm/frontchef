import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  FileText,
  BadgePercent,
  Coins,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { ShoppingItem } from '../types.ts';
import { guessIngredientCategory, getEstimatedPriceKSh } from '../utils/culinary.ts';

interface ShoppingListTabProps {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  onGoToRecipes: () => void;
  onOpenCookbookModal?: () => void;
}

export const ShoppingListTab: React.FC<ShoppingListTabProps> = ({
  items,
  setItems,
  onGoToRecipes,
  onOpenCookbookModal,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [budgetLimitKSh, setBudgetLimitKSh] = useState(1000);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const toggleItemCheck = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItemPrice = (id: string, newPrice: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, estimatedPriceKSh: newPrice } : item))
    );
  };

  const clearCompleted = () => {
    setItems(prev => prev.filter(item => !item.isChecked));
  };

  const clearAll = () => {
    if (confirm('Clear all items from your shopping list?')) {
      setItems([]);
    }
  };

  const handleAddManualItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const estimated = newItemPrice
      ? Number(newItemPrice)
      : getEstimatedPriceKSh(newItemName.trim());

    const newItem: ShoppingItem = {
      id: 'shop_man_' + Math.random().toString(36).substring(2, 9),
      name: newItemName.trim(),
      amount: newItemAmount.trim() || undefined,
      category: guessIngredientCategory(newItemName.trim()),
      isChecked: false,
      addedAt: Date.now(),
      estimatedPriceKSh: estimated,
    };

    setItems(prev => [newItem, ...prev]);
    setNewItemName('');
    setNewItemAmount('');
    setNewItemPrice('');
  };

  const copyToClipboard = () => {
    if (items.length === 0) return;
    const lines = items.map(
      item =>
        `${item.isChecked ? '[x]' : '[ ]'} ${item.name}${item.amount ? ` (${item.amount})` : ''} - ~KSh ${
          item.estimatedPriceKSh || 50
        }${item.recipeTitle ? ` [for ${item.recipeTitle}]` : ''}`
    );
    const total = items.reduce((acc, i) => acc + (i.estimatedPriceKSh || 50), 0);
    const text = `🛒 FrostChef Kenya Grocery List (Est. Total: KSh ${total}):\n` + lines.join('\n');
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  // Group items by category
  const categories = Array.from(new Set(items.map(i => i.category))).sort();
  const checkedCount = items.filter(i => i.isChecked).length;
  const uncheckCount = items.length - checkedCount;

  // Budget calculations
  const totalEstimatedCostKSh = items.reduce(
    (sum, item) => sum + (item.estimatedPriceKSh || 50),
    0
  );
  const remainingCostKSh = items
    .filter(i => !i.isChecked)
    .reduce((sum, item) => sum + (item.estimatedPriceKSh || 50), 0);

  const budgetProgress = budgetLimitKSh > 0
    ? Math.min(100, Math.round((totalEstimatedCostKSh / budgetLimitKSh) * 100))
    : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-stone-100">
      {/* Tab Header Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Market Shopping List</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Mama Mboga KSh Rates
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {items.length === 0
                  ? 'No missing ingredients currently queued.'
                  : `${uncheckCount} item${uncheckCount === 1 ? '' : 's'} to buy • Est. Total: KSh ${totalEstimatedCostKSh}`}
              </p>
            </div>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
              aria-label="Copy list to clipboard"
            >
              {copiedNotice ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNotice ? 'Copied!' : 'Copy List'}</span>
            </button>

            {checkedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 text-xs font-semibold border border-stone-700 transition"
                aria-label="Clear checked items"
              >
                Clear Checked ({checkedCount})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Budget Calculator & Limit Tracker */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white uppercase tracking-wider">
              Shopping Budget Calculator
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-stone-400">Budget Limit:</span>
            <div className="flex items-center bg-stone-950 px-2 py-1 rounded-lg border border-stone-800 font-mono text-emerald-400 font-bold">
              <span>KSh</span>
              <input
                type="number"
                value={budgetLimitKSh}
                onChange={e => setBudgetLimitKSh(Number(e.target.value) || 0)}
                className="w-16 bg-transparent text-right ml-1 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
            <div
              className={`h-full transition-all duration-300 ${
                totalEstimatedCostKSh > budgetLimitKSh
                  ? 'bg-rose-500'
                  : totalEstimatedCostKSh > budgetLimitKSh * 0.8
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, budgetProgress)}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-stone-400 font-mono">
            <span>
              Estimated Cost: <strong className="text-emerald-400 font-bold">KSh {totalEstimatedCostKSh}</strong>
            </span>
            <span>
              {totalEstimatedCostKSh > budgetLimitKSh ? (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Over budget by KSh {totalEstimatedCostKSh - budgetLimitKSh}
                </span>
              ) : (
                <span className="text-stone-400">
                  Remaining budget: <strong className="text-stone-200">KSh {budgetLimitKSh - totalEstimatedCostKSh}</strong>
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Manual Quick Add Form */}
      <form
        onSubmit={handleAddManualItem}
        className="bg-stone-900/60 border border-stone-800 p-3.5 rounded-2xl flex flex-col sm:flex-row gap-2"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Add missing item (e.g. Sukuma Wiki, Royco, Nyama)..."
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="w-full sm:w-28">
          <input
            type="text"
            placeholder="Qty (e.g. 2 bunches)"
            value={newItemAmount}
            onChange={e => setNewItemAmount(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="w-full sm:w-24">
          <input
            type="number"
            placeholder="KSh Est."
            value={newItemPrice}
            onChange={e => setNewItemPrice(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow"
          aria-label="Add item to shopping list"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="bg-stone-900/40 border border-stone-800/80 rounded-3xl p-10 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-stone-800/60 text-stone-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-200">Your shopping list is clear!</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
              Select missing ingredients from any recipe card to queue them here with live Kenyan Shillings pricing.
            </p>
          </div>
          <button
            onClick={onGoToRecipes}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 text-xs font-semibold border border-stone-700 transition inline-flex items-center gap-1.5"
          >
            <span>Browse Kenyan Recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Categorized Shopping List */
        <div className="space-y-5">
          {categories.map(category => {
            const categoryItems = items.filter(i => i.category === category);
            const categoryTotalKSh = categoryItems.reduce(
              (acc, it) => acc + (it.estimatedPriceKSh || 50),
              0
            );

            return (
              <div
                key={category}
                className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>{category}</span>
                    <span className="font-mono text-emerald-400 text-[11px] font-semibold">
                      (~KSh {categoryTotalKSh})
                    </span>
                  </div>
                  <span className="font-mono text-stone-500">
                    {categoryItems.filter(i => i.isChecked).length}/{categoryItems.length}
                  </span>
                </div>

                <div className="divide-y divide-stone-800/60">
                  {categoryItems.map(item => (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-center justify-between group"
                    >
                      <label className="flex items-center space-x-3 cursor-pointer flex-1 select-none">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                            item.isChecked
                              ? 'bg-emerald-500 border-emerald-400 text-stone-950'
                              : 'border-stone-700 bg-stone-950 hover:border-emerald-500'
                          }`}
                        >
                          {item.isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span
                            className={`text-sm font-medium transition-all ${
                              item.isChecked
                                ? 'line-through text-stone-500'
                                : 'text-stone-200 group-hover:text-white'
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.amount && (
                            <span className="ml-2 text-xs text-stone-400 font-mono">
                              ({item.amount})
                            </span>
                          )}
                          {item.recipeTitle && (
                            <span className="block text-[11px] text-emerald-400/80 mt-0.5">
                              needed for: {item.recipeTitle}
                            </span>
                          )}
                        </div>
                      </label>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          KSh {item.estimatedPriceKSh || 50}
                        </span>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-stone-800 transition"
                          title="Delete item"
                          aria-label={`Remove ${item.name} from list`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-end pt-2">
            <button
              onClick={clearAll}
              className="text-xs text-rose-400/80 hover:text-rose-300 transition"
            >
              Clear Entire List
            </button>
          </div>
        </div>
      )}

      {/* Mama Mboga Pro-Shopping Tip Box */}
      <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-2xl text-xs text-emerald-200 space-y-1">
        <div className="flex items-center space-x-1.5 text-emerald-400 font-bold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4" />
          <span>Mama Mboga Market Budgeting Advice</span>
        </div>
        <p className="leading-relaxed text-stone-300">
          Buy sukuma wiki and fresh dhania together for a friendly volume discount. When preparing pilau or beef fry, ask the butchery for soup bones (mifupa ya supu) to prepare rich broth at almost zero extra cost!
        </p>
      </div>

      {/* PDF Cookbook Banner */}
      {onOpenCookbookModal && (
        <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-stone-900 to-teal-950/40 border border-emerald-500/30 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Downloadable Kenyan Culinary Masterclass PDF</h4>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Includes 1,200+ words of culinary theory, complete step-by-step cooking techniques, and 16 high-resolution illustrated cooking steps.
            </p>
          </div>
          <button
            onClick={onOpenCookbookModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md flex-shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open PDF Guide</span>
          </button>
        </div>
      )}
    </div>
  );
};
