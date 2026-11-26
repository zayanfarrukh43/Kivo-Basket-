import React from 'react';
import { Home, LayoutGrid, Package, ShoppingBasket, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MobileBottomNav({ currentPage, navigate }) {
  const { totalCount, setIsDrawerOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_15px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center text-[10px] font-bold">
        <button
          onClick={() => navigate('home')}
          className={`flex flex-col items-center gap-0.5 py-1 ${
            currentPage === 'home' ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate('shop', { category: 'all' })}
          className={`flex flex-col items-center gap-0.5 py-1 ${
            currentPage === 'shop' ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Categories</span>
        </button>

        <button
          onClick={() => navigate('bundles')}
          className={`flex flex-col items-center gap-0.5 py-1 ${
            currentPage === 'bundles' ? 'text-orange-500' : 'text-slate-500'
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Rashan</span>
        </button>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 text-slate-600 relative"
        >
          <div className="relative">
            <ShoppingBasket className="w-5 h-5 text-emerald-700" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <span>Basket</span>
        </button>

        <button
          onClick={() => navigate('track')}
          className={`flex flex-col items-center gap-0.5 py-1 ${
            currentPage === 'track' ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span>Track</span>
        </button>
      </div>
    </div>
  );
}