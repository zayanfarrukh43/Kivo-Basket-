import React, { useState } from 'react';
import {
  Banknote,
  Smartphone,
  Landmark,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  Tag,
  ArrowLeft,
  Phone,
  User,
  Home,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_AREAS } from '../data/groceryCatalog';

export default function CheckoutPage({
  selectedArea,
  setSelectedArea,
  onOrderSuccess,
  onBackToShop,
}) {
  const {
    cart,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    promoCode,
    setPromoCode,
    discountApplied,
    applyPromo,
    clearCart,
  } = useCart();

  // Customer & Delivery State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState(selectedArea || DELIVERY_AREAS[0]);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('express');
  const [deliveryNote, setDeliveryNote] = useState('Call on arrival');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [walletNumber, setWalletNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [promoError, setPromoError] = useState(false);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    const ok = applyPromo(promoCode);
    setPromoError(!ok);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = `KVO-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderPayload = {
      orderId,
      fullName,
      phone,
      area,
      address: `${address}${landmark ? ` (Near ${landmark})` : ''}, ${area}`,
      deliverySlot,
      deliveryNote,
      paymentMethod,
      walletNumber,
      transactionId,
      items: cart,
      total: grandTotal,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    clearCart();
    onOrderSuccess(orderPayload);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <h2 className="text-xl font-extrabold text-slate-900">Your Kivo Basket is Empty</h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Add cooking oil, chakki atta, basmati rice, or monthly rashan bundles to checkout.
          </p>
          {onBackToShop && (
            <button
              onClick={onBackToShop}
              className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl"
            >
              Browse Groceries
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 pb-20">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          {onBackToShop && (
            <button
              onClick={onBackToShop}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-orange-600 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Checkout — <span className="text-emerald-700">Kivo</span>{' '}
            <span className="text-orange-500">Basket</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Sealed & Expiry-Verified Dispatch</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Customer Info, Delivery & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Contact & Delivery Address */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center">
                1
              </span>
              <h2 className="font-extrabold text-base text-slate-900">
                Contact & Delivery Address
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Zayan Farrukh"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number (WhatsApp / Rider Call) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  City & Sector / Area *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-orange-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      if (setSelectedArea) setSelectedArea(e.target.value);
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-sm font-semibold outline-none"
                  >
                    {DELIVERY_AREAS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nearest Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Jamia Masjid / Park"
                  className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Complete House / Flat / Street Address *
              </label>
              <div className="relative">
                <Home className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House # 14-C, Street 5, Phase 6..."
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            {/* Rider Instructions Pills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Rider Delivery Instruction
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Call on arrival',
                  'Ring doorbell',
                  'Leave with guard / gate',
                  'Do not ring bell (WhatsApp only)',
                ].map((note) => (
                  <button
                    key={note}
                    type="button"
                    onClick={() => setDeliveryNote(note)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      deliveryNote === note
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Speed */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center">
                2
              </span>
              <h2 className="font-extrabold text-base text-slate-900">
                Delivery Speed
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliverySlot('express')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                  deliverySlot === 'express'
                    ? 'border-emerald-600 bg-emerald-50/70'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-extrabold text-slate-900">
                      Express 30-Min Delivery
                    </p>
                    <span className="bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                      FASTEST
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Immediate rider dispatch from nearest Kivo Dark Store
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliverySlot('evening')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                  deliverySlot === 'evening'
                    ? 'border-emerald-600 bg-emerald-50/70'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">
                    Evening Rashan Slot (6 PM – 9 PM)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ideal for heavy monthly flour, oil & rice cartons
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center">
                3
              </span>
              <h2 className="font-extrabold text-base text-slate-900">
                Payment Method
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'cod',
                  title: 'Cash on Delivery',
                  desc: 'Pay cash when rider arrives',
                  icon: Banknote,
                },
                {
                  id: 'wallet',
                  title: 'JazzCash / EasyPaisa',
                  desc: 'Instant mobile wallet',
                  icon: Smartphone,
                },
                {
                  id: 'raast',
                  title: 'Raast / IBFT Transfer',
                  desc: 'Zero-fee bank transfer',
                  icon: Landmark,
                },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    paymentMethod === method.id
                      ? 'border-emerald-600 bg-emerald-50/70'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <method.icon className="w-5 h-5 text-orange-500 mb-2" />
                  <p className="text-xs font-extrabold text-slate-900">{method.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{method.desc}</p>
                </button>
              ))}
            </div>

            {/* Conditional JazzCash / EasyPaisa Fields */}
            {paymentMethod === 'wallet' && (
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3">
                <p className="text-xs font-bold text-slate-800">
                  Send Rs. {grandTotal.toLocaleString()} to Kivo Basket Merchant Account:{' '}
                  <span className="text-orange-600 font-extrabold">0300-8205486 (Kivo Retail)</span>
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    type="tel"
                    value={walletNumber}
                    onChange={(e) => setWalletNumber(e.target.value)}
                    placeholder="Your JazzCash / EasyPaisa Number"
                    className="px-3.5 py-2 bg-white border border-orange-200 rounded-xl text-xs outline-none"
                  />
                  <input
                    required
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Transaction ID (TID)"
                    className="px-3.5 py-2 bg-white border border-orange-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>
            )}

            {/* Conditional Raast / IBFT Details */}
            {paymentMethod === 'raast' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                <p className="font-extrabold text-emerald-900">
                  Meezan Bank Limited — Kivo Basket Pakistan
                </p>
                <p className="text-slate-700">
                  IBAN: <strong className="font-mono">PK36MEZN0001010105582910</strong> • Raast ID:{' '}
                  <strong>03008205486</strong>
                </p>
                <input
                  required
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter Raast / IBFT Reference Number"
                  className="w-full sm:w-80 px-3.5 py-2 bg-white border border-emerald-200 rounded-xl text-xs outline-none mt-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm h-fit lg:sticky lg:top-24 space-y-4">
          <h2 className="font-extrabold text-base text-slate-900">
            Order Summary ({cart.reduce((sum, i) => sum + i.qty, 0)} items)
          </h2>

          {/* Cart Items */}
          <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartKey} className="py-3 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold text-slate-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {item.variantLabel} × {item.qty}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-slate-900">
                  Rs. {(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError(false);
                  }}
                  placeholder="Promo code (KIVO10)"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="button"
                onClick={handlePromoSubmit}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Try <strong>KIVO10</strong> for 10% off
              </p>
            )}
            {discountApplied && (
              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                ✓ KIVO10 applied (-Rs. {discountAmount.toLocaleString()})
              </p>
            )}
          </div>

          {/* Totals */}
          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Basket Subtotal</span>
              <span className="font-bold">Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Promo Discount (10%)</span>
                <span>- Rs. {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Rider Delivery Fee</span>
              <span className="font-bold text-emerald-700">
                {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
              </span>
            </div>
            <div className="pt-2.5 border-t border-slate-200 flex justify-between text-lg font-extrabold text-slate-900">
              <span>Total Payable</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Place Order • Rs. {grandTotal.toLocaleString()}</span>
          </button>

          <p className="text-[11px] text-center text-slate-500">
            By placing this order, you agree to Kivo Basket&apos;s doorstep quality check guarantee.
          </p>
        </div>
      </form>
    </div>
  );
}