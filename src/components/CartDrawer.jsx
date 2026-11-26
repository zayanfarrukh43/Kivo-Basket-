import React, { useState } from 'react';
import {
  X,
  ShoppingBasket,
  Trash2,
  Plus,
  Minus,
  Truck,
  Tag,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onCheckout }) {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQty,
    removeItem,
    subtotal,
    freeDeliveryThreshold,
    deliveryFee,
    promoCode,
    setPromoCode,
    discountApplied,
    applyPromo,
    discountAmount,
    grandTotal,
  } = useCart();

  const [promoError, setPromoError] = useState(false);

  if (!isDrawerOpen) return null;

  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPct = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const ok = applyPromo(promoCode);
    setPromoError(!ok);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="px-5 py-4 bg-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBasket className="w-5 h-5 text-orange-300" />
            <div>
              <h2 className="font-extrabold text-base">Your Kivo Basket</h2>
              <p className="text-[11px] text-emerald-100">
                Express 30-Minute Rider Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-900 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Progress Bar */}
        <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <Truck className="w-4 h-4 text-orange-500" />
              {remainingForFree === 0 ? (
                <span className="text-emerald-700">
                  Unlocked FREE Express Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-orange-600">Rs. {remainingForFree.toLocaleString()}</strong> more for FREE Delivery
                </span>
              )}
            </span>
            <span className="text-emerald-700">{progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-emerald-200/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-orange-500 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <ShoppingBasket className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-extrabold text-slate-800">Your basket is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Add Meezan oil, Sunridge chakki atta, Guard basmati rice, or monthly rashan bundles.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartKey}
                className="flex gap-3 p-3 rounded-2xl border border-slate-200 bg-white shadow-2xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-emerald-700">
                        {item.brand}
                      </p>
                      <h4 className="text-xs font-extrabold text-slate-800 truncate">
                        {item.name}
                      </h4>
                      <span className="inline-block mt-0.5 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.variantLabel}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartKey)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <p className="text-sm font-extrabold text-slate-900">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQty(item.cartKey, -1)}
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.cartKey, 1)}
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3.5">
            {/* Promo Code */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError(false);
                  }}
                  placeholder="Promo code (try KIVO10)"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Apply
              </button>
            </form>

            {promoError && (
              <p className="text-[11px] text-red-500 font-semibold">
                Invalid code. Try <strong>KIVO10</strong> for 10% off!
              </p>
            )}
            {discountApplied && (
              <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Code KIVO10 applied! You saved Rs. {discountAmount.toLocaleString()}
              </p>
            )}

            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount (10%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Rider Delivery Fee</span>
                <span className="font-bold text-emerald-700">
                  {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Payable</span>
                <span>Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsDrawerOpen(false);
                onCheckout();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout (COD / JazzCash)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}