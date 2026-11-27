import React, { useEffect, useState } from 'react';
import {
  ShoppingBasket,
  MapPin,
  Search,
  ChevronDown,
  Zap,
  Package,
  Truck,
  X,
  Home,
  LayoutGrid,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_AREAS, CATEGORIES } from '../data/groceryCatalog';

const MOBILE_LINKS = [
  { label: 'Home', icon: Home, page: 'home' },
  { label: 'All Groceries', icon: LayoutGrid, page: 'shop', params: { category: 'all' } },
  { label: 'Monthly Rashan Bundles', icon: Package, page: 'bundles' },
  { label: 'Track My Order', icon: Truck, page: 'track' },
];

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
  const [mobileAreaOpen, setMobileAreaOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const goTo = (page, params) => {
    navigate(page, params);
    closeMobileMenu();
  };

  // Lock page scroll and let Escape close the menu while it is open
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('shop');
  };

  return (
    <header className="relative z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Promo Ribbon */}
      <div className="bg-emerald-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400 shrink-0" />
            <span>
              Express 30-Min Delivery across Karachi • Free Delivery on Rs. 2,500+
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
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block w-5 h-3.5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
                  mobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 rounded-full bg-current transition-all duration-200 ${
                  mobileMenuOpen ? 'w-0 opacity-0' : 'w-3.5 opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
                  mobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
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
        <div className="relative">
          <button
            type="button"
            onClick={() => setMobileAreaOpen((open) => !open)}
            aria-expanded={mobileAreaOpen}
            aria-haspopup="listbox"
            className="w-full flex items-center justify-between gap-3 text-xs bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100 active:bg-emerald-100 transition-colors"
          >
            <span className="flex items-center gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="min-w-0 text-left">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-emerald-700 leading-none">
                  Delivering to
                </span>
                <span className="block font-bold text-slate-800 truncate mt-0.5">
                  {selectedArea}
                </span>
              </span>
            </span>
            <span className="flex items-center gap-0.5 text-orange-600 font-bold text-[11px] shrink-0">
              Change
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  mobileAreaOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>

          {mobileAreaOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMobileAreaOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute left-0 right-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <p className="px-4 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select your area
                </p>
                <ul role="listbox" className="max-h-64 overflow-y-auto pb-1.5">
                  {DELIVERY_AREAS.map((area) => {
                    const active = selectedArea === area;
                    return (
                      <li key={area}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setSelectedArea(area);
                            setMobileAreaOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] transition-colors ${
                            active
                              ? 'bg-emerald-50 text-emerald-700 font-bold'
                              : 'text-slate-700 font-medium active:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5 min-w-0">
                            <MapPin
                              className={`w-3.5 h-3.5 shrink-0 ${
                                active ? 'text-orange-500' : 'text-slate-300'
                              }`}
                            />
                            <span className="truncate">{area}</span>
                          </span>
                          {active && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
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

      {/* Mobile Slide-in Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={`absolute inset-y-0 left-0 w-[85%] max-w-xs bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
                <ShoppingBasket className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-emerald-800">Kivo</span>
                <span className="text-orange-500">Basket</span>
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {MOBILE_LINKS.map(({ label, icon: Icon, page, params }) => {
                const active = currentPage === page;
                return (
                  <button
                    key={label}
                    onClick={() => goTo(page, params)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="flex-1 text-left">{label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Shop by Category
            </p>
            <div className="space-y-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => goTo('shop', { category: cat.id })}
                  className="group w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-left">
                    <span className="block font-medium">{cat.name}</span>
                    <span className="block text-[11px] text-slate-400">{cat.urdu}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </nav>

          <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
            <p className="text-xs text-slate-500">
              Use code <strong className="text-orange-600">KIVO10</strong> for 10% off your order
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}