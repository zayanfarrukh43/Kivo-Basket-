import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { DELIVERY_AREAS } from './data/groceryCatalog';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BundlesPage from './pages/BundlesPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArea, setSelectedArea] = useState(DELIVERY_AREAS[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({
    id: 'meezan-canola-oil',
    variantIdx: 2,
  });
  const [lastOrder, setLastOrder] = useState(null);

  const navigate = (page, opts = {}) => {
    if (opts.category) setActiveCategory(opts.category);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (id, variantIdx = 0) => {
    setSelectedProduct({ id, variantIdx });
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-14 md:pb-0">
      <Header
        currentPage={currentPage}
        navigate={navigate}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage navigate={navigate} onSelectProduct={handleSelectProduct} />
        )}
        {currentPage === 'shop' && (
          <ShopPage
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {currentPage === 'product' && (
          <ProductDetailPage
            productId={selectedProduct.id}
            initialVariantIdx={selectedProduct.variantIdx}
            onBack={() => navigate('shop')}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {currentPage === 'bundles' && <BundlesPage />}
        {currentPage === 'checkout' && (
          <CheckoutPage
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            onBackToShop={() => navigate('shop')}
            onOrderSuccess={(order) => {
              setLastOrder(order);
              navigate('track');
            }}
          />
        )}
        {currentPage === 'track' && (
          <TrackOrderPage
            lastOrder={lastOrder}
            onBackHome={() => navigate('home')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200 py-10 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div>
            <p className="text-lg font-extrabold text-white">
              Kivo <span className="text-orange-400">Basket</span>
            </p>
            <p className="mt-2 text-emerald-300 leading-relaxed">
              Pakistan&apos;s trusted online rashan & quick-commerce grocery store delivering authentic oils, chakki atta, aged basmati rice & tea in 30 minutes.
            </p>
          </div>
          <div>
            <p className="font-extrabold text-white uppercase tracking-wider mb-2">
              Top Categories
            </p>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => navigate('shop', { category: 'oils' })}>
                  Cooking Oil & Ghee
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'atta' })}>
                  Chakki Atta & Flour
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'rice' })}>
                  Super Kernel Basmati Rice
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'tea' })}>
                  Tea & Doodh Patti
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-extrabold text-white uppercase tracking-wider mb-2">
              Featured Brands
            </p>
            <p className="leading-relaxed text-emerald-300">
              Meezan • Eva • Dalda • Sufi • Sunridge • Ashrafi • Guard • Falak • Tapal Danedar • Lipton
            </p>
          </div>
          <div>
            <p className="font-extrabold text-white uppercase tracking-wider mb-2">
              Customer Helpline
            </p>
            <p>WhatsApp & Call: 0300-820-KIVO</p>
            <p className="mt-1">Daily Timings: 8:00 AM – 12:00 AM</p>
            <p className="mt-1 text-orange-300 font-bold">
              Cash on Delivery • JazzCash • EasyPaisa • Raast
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer onCheckout={() => navigate('checkout')} />
      <MobileBottomNav currentPage={currentPage} navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}