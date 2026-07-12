"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSite } from '@/context/SiteContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, cartTotal, removeFromCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const orderId = `order_${Math.random().toString(36).substring(7)}`;

      // 1. Process Payment
      const paymentRes = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartTotal,
          currency: 'INR',
          orderId
        })
      });

      if (!paymentRes.ok) throw new Error('Payment failed');

      // 2. Create Shipping Label
      const shippingRes = await fetch('/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          billing_customer_name: `${formData.firstName} ${formData.lastName}`,
          billing_address: formData.address,
          pickup_location: 'nutrio-warehouse-1'
        })
      });

      if (!shippingRes.ok) throw new Error('Shipping creation failed');

      // 3. Clear cart
      items.forEach(item => removeFromCart(item.id));

      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 5000);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred during checkout');
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <button onClick={() => router.push('/shop')} className="text-orange-600 font-semibold hover:underline">
          Go to shop
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <div className="h-24 w-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-4xl mb-6">
          ✓
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Thank you for your purchase. We&apos;ve received your order and are processing it with our simulated payment and shipping gateways.
        </p>
        <button onClick={() => router.push('/')} className="rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
        {/* Checkout Form */}
        <div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">Checkout</h2>

          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Contact & Shipping Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input required type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input required type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input required type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input required type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
                </div>
                <div className="col-span-1">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <input required type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
                </div>
                <div className="col-span-1">
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP</label>
                  <input required type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payment Details (Mock)</h3>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
                <input required type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiration date</label>
                  <input required type="text" id="expiry" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                  <input required type="text" id="cvc" name="cvc" value={formData.cvc} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-orange-500 focus:ring-orange-500" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 rounded-full bg-orange-600 px-4 py-4 text-base font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Processing...' : `Pay ₹${cartTotal}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 h-fit sticky top-24">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Order summary</h2>
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={80} height={80} className="h-full w-full object-cover object-center" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400 bg-gray-100 text-xs">No img</div>
                    )}
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{item.price * item.quantity}</p>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                        {item.selectedFlavors && (
                          <ul className="mt-2 space-y-1.5">
                            {item.selectedFlavors.map((flavor) => (
                              <li key={flavor.slug} className="text-xs text-gray-500 flex items-center gap-2">
                                <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-700">{flavor.quantity}</span>
                                <span className="truncate">{flavor.name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 mt-6 pt-6 space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-medium text-gray-900">₹{cartTotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p className="font-medium text-gray-900">Free</p>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 text-base">
              <p className="font-semibold text-gray-900">Total</p>
              <p className="font-semibold text-gray-900">₹{cartTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
