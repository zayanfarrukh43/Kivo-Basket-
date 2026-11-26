import React, { useState } from 'react';
import { CheckCircle2, PackageCheck, Bike, Home, PhoneCall } from 'lucide-react';

export default function TrackOrderPage({ lastOrder, onBackHome }) {
  const [step, setStep] = useState(2);

  const steps = [
    {
      title: 'Order Confirmed',
      desc: 'Received at nearest Kivo Dark Store',
      icon: CheckCircle2,
    },
    {
      title: 'Packing & Quality Check',
      desc: 'Seals & expiry dates verified',
      icon: PackageCheck,
    },
    {
      title: 'Rider Out for Delivery',
      desc: 'Rider Usman (Honda CD-70) is 12 mins away',
      icon: Bike,
    },
    {
      title: 'Delivered at Doorstep',
      desc: 'Enjoy your fresh rashan!',
      icon: Home,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
          <div>
            <span className="text-xs font-extrabold uppercase text-orange-500">
              Live Rider Dispatch
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Order #{lastOrder?.orderId || 'KVO-849210'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Delivering to: {lastOrder?.address || 'DHA Phase 6, Karachi'}
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-right">
            <p className="text-[11px] font-bold text-emerald-700">Estimated Arrival</p>
            <p className="text-lg font-extrabold text-emerald-900">12–18 Mins</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="py-6 space-y-5">
          {steps.map((s, idx) => {
            const done = idx <= step;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    done
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 pt-1">
                  <p
                    className={`text-sm font-extrabold ${
                      done ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Demo Controls */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-extrabold text-sm">
              UK
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">
                Rider: Usman Khan (4.9 ★)
              </p>
              <p className="text-[11px] text-slate-500">
                Payable: Rs. {(lastOrder?.total || 2590).toLocaleString()} (
                {lastOrder?.paymentMethod?.toUpperCase() || 'COD'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep((s) => (s < 3 ? s + 1 : 0))}
              className="px-3.5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
            >
              Simulate Next Step
            </button>
            <a
              href="tel:03000000000"
              className="p-2 rounded-xl bg-orange-500 text-white"
              aria-label="Call Rider"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>

        <button
          onClick={onBackHome}
          className="mt-6 w-full py-3 bg-slate-900 text-white text-xs font-extrabold rounded-xl"
        >
          Continue Shopping on Kivo Basket
        </button>
      </div>
    </div>
  );
}