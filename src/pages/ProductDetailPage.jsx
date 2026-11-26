import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  ShoppingBasket,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCTS } from '../data/groceryCatalog';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage({
  productId,
  initialVariantIdx = 0,
  onBack,
  onSelectProduct,
}) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const { addToCart } = useCart();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(initialVariantIdx);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelectedVariantIdx(initialVariantIdx);
    setActiveImgIdx(0);
    setQty(1);
  }, [productId, initialVariantIdx]);

  const variant = product.variants[selectedVariantIdx] || product.variants[0];
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const savings = variant.oldPrice ? variant.oldPrice - variant.price : 0;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-16">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-600 hover:text-emerald-700 mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Groceries</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={gallery[activeImgIdx]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-extrabold px-3 py-1 rounded-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-2.5">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImgIdx === idx ? 'border-orange-500 scale-105' : 'border-slate-200 opacity-75'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Pack Size Selector */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-lg">
                  Brand: {product.brand}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviews} verified orders)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Dynamic Price Display */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  Rs. {variant.price.toLocaleString()}
                </span>
                {variant.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    Rs. {variant.oldPrice.toLocaleString()}
                  </span>
                )}
                {savings > 0 && (
                  <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-extrabold px-2.5 py-1 rounded-lg">
                    You Save Rs. {savings.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Pack Size / Weight Selection Cards */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Select Pack Size / Weight:
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    SKU: {variant.sku}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((v, idx) => {
                    const isSelected = idx === selectedVariantIdx;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                            : 'border-slate-200 hover:border-emerald-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute top-2.5 right-2.5" />
                        )}
                        <p className="text-xs font-extrabold text-slate-900">{v.label}</p>
                        <p className="text-xs font-bold text-orange-600 mt-0.5">
                          Rs. {v.price.toLocaleString()}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity + Add to Basket */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 bg-slate-100 px-3 py-2.5 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-extrabold text-sm w-6 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, variant, qty, true)}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBasket className="w-5 h-5" />
                  <span>
                    Add {qty} × {variant.label} — Rs. {(variant.price * qty).toLocaleString()}
                  </span>
                </button>
              </div>

              {/* Metadata */}
              <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-slate-600 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Origin: <strong>{product.origin}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Shelf Life: <strong>{product.shelfLife}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
            More in This Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
