"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Bundle } from '@/data/products';

export type CartItemType = 'product' | 'bundle';

export interface SelectedFlavor {
  slug: string;
  name: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  type: CartItemType;
  slug: string;
  selectedFlavors?: SelectedFlavor[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Product | Bundle, type: CartItemType, image?: string, selectedFlavors?: SelectedFlavor[]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: Product | Bundle, type: CartItemType, image?: string, selectedFlavors?: SelectedFlavor[]) => {
    setItems((prevItems) => {
      const selectionsStr = selectedFlavors 
        ? [...selectedFlavors].sort((a, b) => a.slug.localeCompare(b.slug)).map(f => `${f.slug}-${f.quantity}`).join('_')
        : '';
      const uniqueId = selectionsStr ? `${item.slug}_${selectionsStr}` : item.slug;

      const existingItem = prevItems.find((i) => i.id === uniqueId);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prevItems,
        {
          id: item.slug,
          name: item.name,
          price: item.price,
          quantity: 1,
          type,
          slug: item.slug,
          image,
          selectedFlavors,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
