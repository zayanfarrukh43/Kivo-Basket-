import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/groceryCatalog';
import ProductCard from '../components/ProductCard';

export default function ShopPage({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
}) {
  const allBrands = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.brand))),
    []
  );

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(11000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const basePrice = p.variants[p.defaultVariantIndex || 0].price;
      const priceMatch = basePrice <= maxPrice;
      const q = searchQuery.trim().toLowerCase();
      const searchMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return catMatch && brandMatch && priceMatch && searchMatch;
    }).sort((a, b) => {
      const priceA = a.variants[a.defaultVariantIndex || 0].price;
      const priceB = b.variants[b.defaultVariantIndex || 0].price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, selectedBrands, maxPrice, searchQuery, sortBy]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeCategory === 'all'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-700 hover:bg-emerald-50'
            }`}
          >
            All Groceries ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 hover:bg-emerald-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="pt-4 border-t border-slate-200">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
          Pakistani Brands
        </h3>
        <div className="space-y-2">
          {allBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-slate-500">Max Pack Price</span>
          <span className="text-emerald-700">Rs. {maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={300}
          max={11000}
          step={250}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
      </div>

      <button
        onClick={() => {
          setActiveCategory('all');
          setSelectedBrands([]);
          setMaxPrice(11000);
          setSearchQuery('');
        }}
        className="w-full py-2 text-xs font-bold text-orange-600 border border-orange-200 rounded-xl hover:bg-orange-50"
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-16">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {activeCategory === 'all'
              ? 'All Grocery & Rashan Items'
              : CATEGORIES.find((c) => c.id === activeCategory)?.name}
          </h1>
          <p className="text-xs text-slate-500">
            Showing {filteredProducts.length} authentic packs • Click any pack size to update price
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <span>Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block bg-white p-5 rounded-2xl border border-slate-200 h-fit sticky top-28">
          <FilterSidebar />
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <h3 className="font-extrabold text-slate-800">No matching groceries found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try clearing your search or adjusting brand/price filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-slate-900/50"
          />
          <div className="relative w-72 max-w-full bg-white h-full p-5 overflow-y-auto z-10">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h2 className="font-extrabold text-sm">Filter Groceries</h2>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
}