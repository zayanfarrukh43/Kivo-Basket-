import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {
      cartKey: 'meezan-canola-oil-5ltr',
      productId: 'meezan-canola-oil',
      name: 'Meezan Canola Cooking Oil',
      brand: 'Meezan',
      variantLabel: '5 Ltr Jerry Can',
      price: 2590,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      qty: 1,
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const addToCart = (product, variant, qty = 1, openDrawer = true) => {
    const cartKey = `${product.id}-${variant.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          variantLabel: variant.label,
          price: variant.price,
          image: product.image,
          qty,
        },
      ];
    });
    if (openDrawer) setIsDrawerOpen(true);
  };

  const addBundleToCart = (bundle) => {
    const cartKey = `bundle-${bundle.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          productId: bundle.id,
          name: bundle.name,
          brand: 'Kivo Bundle',
          variantLabel: bundle.subtitle,
          price: bundle.price,
          image: bundle.image,
          qty: 1,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const updateQty = (cartKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountApplied(false);
    setPromoCode('');
  };

  const applyPromo = (code) => {
    if (code.trim().toUpperCase() === 'KIVO10') {
      setDiscountApplied(true);
      return true;
    }
    return false;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const freeDeliveryThreshold = 2500;
  const deliveryFee = subtotal === 0 || subtotal >= freeDeliveryThreshold ? 0 : 149;
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        addBundleToCart,
        updateQty,
        removeItem,
        clearCart,
        subtotal,
        totalCount,
        freeDeliveryThreshold,
        deliveryFee,
        promoCode,
        setPromoCode,
        discountApplied,
        applyPromo,
        discountAmount,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};