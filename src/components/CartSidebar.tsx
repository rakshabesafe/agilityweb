"use client";

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h3 className="font-display text-xl font-bold">Your Cart</h3>
          <button
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            onClick={() => setIsCartOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <span className="text-4xl">🛒</span>
              </div>
              <p className="font-display text-lg font-semibold">Your cart is empty</p>
              <p className="mt-1 text-sm text-gray-500">Add a bar — or try the Discover Pack.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 text-orange-600 font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 relative">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">No Img</div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h4 className="line-clamp-2"><Link href={`/shop/${item.slug}`} onClick={() => setIsCartOpen(false)}>{item.name}</Link></h4>
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

                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center rounded-full border border-gray-200">
                        <button
                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-orange-600 hover:text-orange-500 flex items-center"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-6 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>₹{cartTotal}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex items-center justify-center rounded-full border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
