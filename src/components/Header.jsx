import React, { useState } from 'react';
import {
  ShoppingBasket,
  MapPin,
  Search,
  ChevronDown,
  Zap,
  Package,
  Truck,
  Menu,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_AREAS, CATEGORIES } from '../data/groceryCatalog';

export default function Header({
  currentPage,
  navigate,
  selectedArea,
  setSelectedArea,
  searchQuery,
  setSearchQuery,
}) {
  const { totalCount, subtotal, setIsDrawerOpen } = useCart();
  const [areaMenuOpen, setAreaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('shop');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Promo Ribbon */}
      <div className="bg-emerald-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400 shrink-0" />
            <span>
              Express 30-Min Delivery across Karachi, Lahore & Islamabad • Free Delivery on Rs. 2,500+
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-emerald-100">
            <span>
              Use Code <strong className="text-orange-300">KIVO10</strong> for 10% OFF
            </span>
            <span>•</span>
            <button
              onClick={() => navigate('track')}
              className="hover:text-white underline underline-offset-2"
            >
              Track Rider
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 md:gap-5">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <ShoppingBasket className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-emerald-800">
                  Kivo
                </span>
                <span className="text-xl font-extrabold tracking-tight text-orange-500">
                  Basket
                </span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 -mt-1">
                Pakistan&apos;s Rashan Store
              </p>
            </div>
          </button>
        </div>

        {/* Location Selector */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setAreaMenuOpen(!areaMenuOpen)}
            className="flex items-center gap-2 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/80 px-3 py-2 rounded-xl text-left transition-colors"
          >
            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase text-emerald-700 leading-none">
                Delivering in 30 mins to
              </p>
              <p className="text-xs font-bold text-slate-800 truncate max-w-[175px] mt-0.5">
                {selectedArea}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {areaMenuOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
              <p className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Your Area
              </p>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {DELIVERY_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      setSelectedArea(area);
                      setAreaMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-emerald-50 ${
                      selectedArea === area
                        ? 'text-emerald-700 bg-emerald-50/70'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{area}</span>
                    {selectedArea === area && (
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-xl relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentPage !== 'shop' && e.target.value.trim().length > 0) {
                navigate('shop');
              }
            }}
            placeholder="Search Meezan Oil, Sunridge Atta, Guard Rice, Tapal..."
            className="w-full pl-10 pr-24 py-2.5 bg-slate-100/90 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-sm outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors"
          >
            Search
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('bundles')}
            className={`hidden xl:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              currentPage === 'bundles'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Monthly Rashan</span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
          >
            <div className="relative">
              <ShoppingBasket className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-[10px] text-emerald-100 font-medium">My Basket</p>
              <p className="text-xs font-extrabold">Rs. {subtotal.toLocaleString()}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search & Area Strip */}
      <div className="sm:hidden px-4 pb-3 space-y-2">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentPage !== 'shop' && e.target.value.trim().length > 0) {
                navigate('shop');
              }
            }}
            placeholder="Search oil, atta, chawal, patti..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
          />
        </form>
        <div className="flex items-center justify-between text-xs bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
          <span className="flex items-center gap-1.5 text-emerald-800 font-semibold truncate">
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            {selectedArea}
          </span>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="bg-transparent text-orange-600 font-bold text-[11px] outline-none"
          >
            {DELIVERY_AREAS.map((area) => (
              <option key={area} value={area}>
                Change
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Category Bar */}
      <nav className="hidden lg:block bg-slate-50/90 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-11 text-xs font-bold">
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('shop', { category: 'all' })}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentPage === 'shop'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              All Groceries
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate('shop', { category: cat.id })}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('track')}
            className="flex items-center gap-1.5 text-emerald-700 hover:text-orange-600 transition-colors"
          >
            <Truck className="w-4 h-4" />
            <span>Live Order Tracking</span>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => {
              navigate('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg font-bold text-sm text-slate-800 hover:bg-emerald-50"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate('shop', { category: 'all' });
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg font-bold text-sm text-slate-800 hover:bg-emerald-50"
          >
            All Groceries
          </button>
          <button
            onClick={() => {
              navigate('bundles');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg font-bold text-sm text-orange-600 bg-orange-50"
          >
            Monthly Rashan Bundles
          </button>
          <div className="pt-2 border-t border-slate-100">
            <p className="px-3 text-[11px] font-bold uppercase text-slate-400 mb-1">
              Categories
            </p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  navigate('shop', { category: cat.id });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-emerald-50"
              >
                {cat.name} ({cat.urdu})
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}