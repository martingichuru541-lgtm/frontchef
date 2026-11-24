import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { ShoppingItem } from '../types.ts';

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: string;
  priceKSh: number;
  image: string;
  unit: string;
  vendor: string;
}

export const FEATURED_MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'mp_1',
    name: 'Mama Mboga Fresh Vegetable Weekpack',
    category: 'Fresh Produce',
    priceKSh: 650,
    unit: 'Full Crate (Sukuma, Managu, Terere, Dania, Onions, Tomatoes)',
    vendor: 'Wakulima Market Collective',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mp_2',
    name: 'Grade 1 Premium Hostess Unga wa Ugali Bale (12x2kg)',
    category: 'Flours & Grains',
    priceKSh: 2400,
    unit: '24 kg Bundle',
    vendor: 'Unga Farm Care Kenya',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mp_3',
    name: 'Mombasa Old Town Whole Pilau Masala Spice Box',
    category: 'Spices & Seasoning',
    priceKSh: 450,
    unit: '500g Glass Jar',
    vendor: 'Swahili Spice Guild, Fort Jesus',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mp_4',
    name: 'Heavy-Gauge Aluminum 5-Piece Kenyan Sufuria Set with Lids',
    category: 'Cookware',
    priceKSh: 3200,
    unit: 'Sizes 18cm to 30cm',
    vendor: 'Kenya Aluminum Crafts Ltd',
    image: 'https://images.unsplash.com/photo-1584990347449-39943264c74f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mp_5',
    name: 'Pure Cold-Pressed Virgin Coastal Coconut Oil',
    category: 'Oils & Fats',
    priceKSh: 850,
    unit: '1 Litre Bottle',
    vendor: 'Kilifi Coconut Cooperative',
    image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=600&q=80',
  },
];

interface MarketplaceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ShoppingItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddToCart: (product: MarketplaceProduct) => void;
}

export const MarketplaceDrawer: React.FC<MarketplaceDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'mpesa' | 'success'>('cart');
  const [mpesaPhone, setMpesaPhone] = useState('0712345678');
  const [isProcessingMpesa, setIsProcessingMpesa] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  if (!isOpen) return null;

  const subtotalKSh = cartItems.reduce(
    (sum, item) => sum + (item.estimatedPriceKSh || 150),
    0
  );
  const deliveryFeeKSh = subtotalKSh > 2000 || subtotalKSh === 0 ? 0 : 150;
  const totalKSh = subtotalKSh + deliveryFeeKSh;

  const handleTriggerMpesa = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingMpesa(true);

    setTimeout(() => {
      setIsProcessingMpesa(false);
      setTransactionRef(`MP${Math.floor(10000000 + Math.random() * 90000000)}KE`);
      setCheckoutStep('success');
      onClearCart();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-lg bg-stone-900 border-l border-white/10 h-full flex flex-col justify-between text-stone-100 shadow-2xl animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">KenyaOne Marketplace</h3>
              <p className="text-[11px] text-stone-400">Authentic Kenyan Groceries & Cookware</p>
            </div>
          </div>

          <button
            onClick={() => {
              setCheckoutStep('cart');
              onClose();
            }}
            className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
          {checkoutStep === 'cart' && (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-bold uppercase tracking-wider text-white">Your Cart Items ({cartItems.length})</span>
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-stone-400 hover:text-red-400 text-xs underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-stone-950/80 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs text-white line-clamp-1">{item.name}</h4>
                        <div className="text-[11px] text-stone-400">
                          {item.amount || '1 unit'} • <span className="font-mono text-amber-300 font-bold">KSh {item.estimatedPriceKSh || 150}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-stone-800 transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-stone-500 bg-stone-950/40 rounded-2xl border border-stone-800">
                    Your cart is currently empty. Add fresh ingredients or marketplace bundles below!
                  </div>
                )}
              </div>

              {/* Featured Marketplace Supplies Quick-Add */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Top Kenyan Supplies & Bundles:
                </span>

                <div className="space-y-2.5">
                  {FEATURED_MARKETPLACE_PRODUCTS.map(prod => (
                    <div
                      key={prod.id}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 flex items-center justify-between gap-3 transition"
                    >
                      <div className="space-y-0.5">
                        <h5 className="font-semibold text-xs text-white">{prod.name}</h5>
                        <p className="text-[10px] text-stone-400">{prod.unit} • {prod.vendor}</p>
                        <div className="text-xs font-mono font-bold text-emerald-400">
                          KSh {prod.priceKSh}
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(prod)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer flex-shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* M-PESA CHECKOUT STEP */}
          {checkoutStep === 'mpesa' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-1">
                <div className="flex items-center justify-center space-x-2 text-emerald-400 font-bold text-sm">
                  <Smartphone className="w-5 h-5" />
                  <span>Lipa Na M-Pesa Online (STK Push)</span>
                </div>
                <p className="text-xs text-stone-300">
                  Instant prompt sent directly to your Safaricom phone.
                </p>
              </div>

              <form onSubmit={handleTriggerMpesa} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                    M-Pesa Mobile Number (+254)
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={mpesaPhone}
                    onChange={e => setMpesaPhone(e.target.value)}
                    placeholder="0712345678"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Format: 07XXXXXXXX or 01XXXXXXXX
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Order Subtotal:</span>
                    <span className="font-mono text-white">KSh {subtotalKSh}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Nairobi Delivery:</span>
                    <span className="font-mono text-white">
                      {deliveryFeeKSh === 0 ? 'FREE' : `KSh ${deliveryFeeKSh}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-sm text-white">
                    <span>Total Amount to Pay:</span>
                    <span className="font-mono text-emerald-400">KSh {totalKSh}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="flex-1 py-3 rounded-2xl bg-stone-800 text-stone-300 hover:text-white font-bold text-xs"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessingMpesa || totalKSh === 0}
                    className="flex-[2] py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer active:scale-95"
                  >
                    {isProcessingMpesa ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending M-Pesa STK Push...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay KSh {totalKSh} via M-Pesa</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SUCCESS STEP */}
          {checkoutStep === 'success' && (
            <div className="p-6 rounded-3xl bg-stone-950 border border-emerald-500/40 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-black text-xl text-white">Payment Confirmed!</h3>
                <p className="text-xs text-stone-300 mt-1">
                  M-Pesa reference: <strong className="font-mono text-emerald-400">{transactionRef}</strong>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-stone-400 space-y-1 text-left font-mono">
                <div>Recipient: KenyaOne Wakulima Hub</div>
                <div>Customer: Martin Gichuru (0712345678)</div>
                <div>Status: Dispatched for same-day delivery in Nairobi</div>
              </div>

              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
              >
                Done / Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {checkoutStep === 'cart' && (
          <div className="p-5 border-t border-white/10 bg-stone-950/90 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white">KSh {subtotalKSh}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Delivery:</span>
                <span className="font-mono text-white">
                  {deliveryFeeKSh === 0 ? 'FREE (Orders > KSh 2,000)' : `KSh ${deliveryFeeKSh}`}
                </span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-sm text-white">
                <span>Total:</span>
                <span className="font-mono text-emerald-400 text-base">KSh {totalKSh}</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep('mpesa')}
              disabled={cartItems.length === 0}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl disabled:opacity-40 cursor-pointer active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Checkout via M-Pesa (KSh {totalKSh})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
