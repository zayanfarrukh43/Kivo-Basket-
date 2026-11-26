import React, { useState, useEffect } from 'react';
import {
  Zap,
  ShieldCheck,
  Truck,
  ArrowRight,
  Clock,
  Sparkles,
  Package,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, RASHAN_BUNDLES } from '../data/groceryCatalog';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function HomePage({ navigate, onSelectProduct }) {
  const { addBundleToCart } = useCart();
  const [secondsLeft, setSecondsLeft] = useState(5420);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 5420));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const oilProducts = PRODUCTS.filter((p) => p.category === 'oils');
  const stapleProducts = PRODUCTS.filter((p) =>
    ['atta', 'rice', 'tea'].includes(p.category)
  );

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 pt-5">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Primary Hero Card */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white p-6 sm:p-9 flex flex-col justify-between min-h-[290px] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
              alt="Pakistani Grocery Rashan"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="relative z-10 max-w-lg space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-white" />
                30-Minute Doorstep Delivery
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Ghar Ka Mukammal Rashan,{' '}
                <span className="text-orange-400">Seedha Kitchen Tak!</span>
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Authentic Meezan & Eva cooking oils, Sunridge chakki atta, Guard aged basmati rice, aur Tapal danedar patti — wholesale rates par.
              </p>
            </div>

            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('shop', { category: 'all' })}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all"
              >
                <span>Shop All Groceries</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('bundles')}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-xs text-white border border-white/25 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
              >
                Explore Monthly Rashan
              </button>
            </div>
          </div>

          {/* Secondary Promo Card */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 text-white p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
              alt="Cooking Oil Offer"
              className="absolute right-0 bottom-0 w-40 h-40 object-cover rounded-tl-3xl opacity-30"
            />
            <div className="relative z-10 space-y-2">
              <span className="inline-block bg-white/20 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                Oil & Ghee Mela
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
                Up to Rs. 470 OFF on 5 Ltr & 10 Ltr Cans
              </h2>
              <p className="text-xs text-orange-100">
                Meezan, Eva, Dalda & Sufi original sealed packs with expiry guarantee.
              </p>
            </div>

            <button
              onClick={() => navigate('shop', { category: 'oils' })}
              className="relative z-10 mt-6 w-fit bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>Shop Cooking Oils</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { icon: Zap, title: '30-Min Express', desc: 'Fast dark-store dispatch' },
            { icon: ShieldCheck, title: '100% Original Brands', desc: 'Direct distributor stock' },
            { icon: Truck, title: 'Free Delivery', desc: 'On orders above Rs. 2,500' },
            { icon: Sparkles, title: 'Cash on Delivery', desc: 'COD, JazzCash & EasyPaisa' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800">{item.title}</p>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop By Category (Real Photography Cards) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
              Daily Kitchen Essentials
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigate('shop', { category: 'all' })}
            className="text-xs font-extrabold text-emerald-700 hover:text-orange-600 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('shop', { category: cat.id })}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 overflow-hidden text-left shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <span className="absolute top-2 right-2 bg-white/95 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                  {cat.itemCount}
                </span>
                <p className="absolute bottom-2 left-2.5 text-white font-bold text-xs">
                  {cat.urdu}
                </p>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-700 leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{cat.tag}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Flash Deals: Cooking Oils & Ghee */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-emerald-900 rounded-3xl p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-white">
                  Cooking Oils & Ghee Shelf
                </h2>
                <p className="text-xs text-emerald-200">
                  Select 1 Ltr, 3 Ltr, 5 Ltr or 10 Ltr packs directly on card
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-700 px-3.5 py-2 rounded-xl text-white">
              <span className="text-xs text-emerald-300 font-semibold">Ends in:</span>
              <span className="font-mono font-extrabold text-sm text-orange-400">
                {hrs}:{mins}:{secs}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {oilProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Atta, Chawal & Chai Patti Shelf */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              Staples & Breakfast
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Chakki Atta, Basmati Rice & Patti
            </h2>
          </div>
          <button
            onClick={() => navigate('shop', { category: 'all' })}
            className="text-xs font-extrabold text-orange-600 hover:underline"
          >
            See All Staples →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stapleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Monthly Rashan Bundles Preview */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-600">
                <Package className="w-4 h-4" />
                1-Click Monthly Grocery
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Pre-Packed Monthly Rashan Boxes
              </h2>
            </div>
            <button
              onClick={() => navigate('bundles')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl"
            >
              Compare All Bundles
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {RASHAN_BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-white rounded-2xl border border-orange-200/80 p-5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                      {bundle.tag}
                    </span>
                    <span className="text-xs font-extrabold text-orange-600">
                      Save Rs. {bundle.savings.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">{bundle.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{bundle.subtitle}</p>
                  <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {bundle.items.slice(0, 4).map((line, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{line}</span>
                      </li>
                    ))}
                    <li className="text-[11px] font-bold text-orange-600">
                      + {bundle.items.length - 4} more essential items
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400 line-through">
                      Rs. {bundle.oldPrice.toLocaleString()}
                    </p>
                    <p className="text-lg font-extrabold text-slate-900">
                      Rs. {bundle.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => addBundleToCart(bundle)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-sm"
                  >
                    Add Full Box
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}