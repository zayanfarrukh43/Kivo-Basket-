import React, { useState } from 'react';
import { Plus, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(product.defaultVariantIndex || 0);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant = product.variants[selectedIdx] || product.variants[0];
  const discountPct = activeVariant.oldPrice
    ? Math.round(((activeVariant.oldPrice - activeVariant.price) / activeVariant.oldPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, activeVariant, 1, false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelectProduct(product.id, selectedIdx)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Real Product Photo Container */}
      <div className="relative h-44 sm:h-48 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {discountPct > 0 && (
            <span className="bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
              {discountPct}% OFF
            </span>
          )}
          {product.badge && (
            <span className="bg-emerald-700/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Brand Pill */}
        <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
          {product.brand}
        </span>
      </div>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviews})</span>
          </div>

          <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>

          {/* Interactive Pack Size Pills */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-2.5 flex flex-wrap gap-1.5"
          >
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-all ${
                  selectedIdx === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-400'
                }`}
              >
                {v.label.split(' ')[0]} {v.label.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add Button */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            {activeVariant.oldPrice && (
              <p className="text-[11px] text-slate-400 line-through">
                Rs. {activeVariant.oldPrice.toLocaleString()}
              </p>
            )}
            <p className="text-base font-extrabold text-slate-900">
              Rs. {activeVariant.price.toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}