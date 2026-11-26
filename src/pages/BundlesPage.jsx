import React from 'react';
import { Package, CheckCircle2, ShoppingBasket, Sparkles } from 'lucide-react';
import { RASHAN_BUNDLES } from '../data/groceryCatalog';
import { useCart } from '../context/CartContext';

export default function BundlesPage() {
  const { addBundleToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-16">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 mb-8">
        <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Save up to Rs. 2,560 Every Month
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          Monthly Family Rashan Boxes
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-2">
          Curated specifically for Pakistani households with sealed Meezan/Eva oils, Sunridge chakki atta, Guard aged basmati rice, Tapal patti, sugar, and sortex-cleaned daal.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {RASHAN_BUNDLES.map((bundle) => (
          <div
            key={bundle.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-slate-100">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-extrabold px-3 py-1 rounded-lg">
                  {bundle.tag}
                </span>
                <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-lg">
                  Save Rs. {bundle.savings.toLocaleString()}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold mb-1">
                  <Package className="w-4 h-4" />
                  <span>{bundle.subtitle}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">{bundle.name}</h2>

                <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
                  {bundle.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 pt-4 bg-slate-50 border-t border-slate-200">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="text-xs text-slate-400 line-through block">
                    Rs. {bundle.oldPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    Rs. {bundle.price.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-emerald-700">
                  FREE Delivery Included
                </span>
              </div>

              <button
                onClick={() => addBundleToCart(bundle)}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBasket className="w-4 h-4" />
                <span>Add Full Bundle to Basket</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}