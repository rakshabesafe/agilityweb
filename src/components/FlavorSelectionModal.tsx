"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useSite } from '@/context/SiteContext';
import { useCart, SelectedFlavor } from '@/context/CartContext';
import { Bundle } from '@/data/products';

interface FlavorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: Bundle | null;
}

export default function FlavorSelectionModal({ isOpen, onClose, bundle }: FlavorSelectionModalProps) {
  const { products } = useSite();
  const { addToCart } = useCart();
  
  const [selections, setSelections] = useState<{ [slug: string]: number }>({});
  
  // Reset selections when modal opens or bundle changes
  useEffect(() => {
    if (isOpen) {
      setSelections({});
    }
  }, [isOpen, bundle]);
  
  if (!isOpen || !bundle) return null;
  
  const totalSelected = Object.values(selections).reduce((sum, count) => sum + count, 0);
  const remaining = bundle.items - totalSelected;
  const isComplete = remaining === 0;

  const handleIncrement = (slug: string) => {
    if (remaining > 0) {
      setSelections(prev => ({ ...prev, [slug]: (prev[slug] || 0) + 1 }));
    }
  };

  const handleDecrement = (slug: string) => {
    setSelections(prev => {
      const current = prev[slug] || 0;
      if (current > 0) {
        return { ...prev, [slug]: current - 1 };
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    if (isComplete) {
      // Build selectedFlavors array
      const selectedFlavors: SelectedFlavor[] = [];
      for (const [slug, quantity] of Object.entries(selections)) {
        if (quantity > 0) {
          const product = products.find(p => p.slug === slug);
          if (product) {
            selectedFlavors.push({ slug, name: product.name, quantity });
          }
        }
      }
      
      addToCart(bundle, 'bundle', undefined, selectedFlavors);
      onClose();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/60 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold font-display">{bundle.name}</h2>
              <p className="text-gray-500 mt-1">Select exactly {bundle.items} bars</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-gray-50 p-4 border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between">
            <span className="font-medium text-gray-700">
              {totalSelected} / {bundle.items} selected
            </span>
            <div className="flex-1 max-w-xs ml-4 bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${isComplete ? 'bg-green-500' : 'bg-orange-500'}`}
                style={{ width: `${(totalSelected / bundle.items) * 100}%` }}
              />
            </div>
            {isComplete && <span className="ml-4 text-green-600 font-semibold text-sm">Great choice!</span>}
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {products.map(product => {
              const count = selections[product.slug] || 0;
              return (
                <div key={product.slug} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors bg-white">
                  <div className={`w-20 h-20 rounded-lg overflow-hidden relative flex-shrink-0 ${product.bgClass}`}>
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{product.shortDesc}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                    <button 
                      onClick={() => handleDecrement(product.slug)}
                      disabled={count === 0}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{count}</span>
                    <button 
                      onClick={() => handleIncrement(product.slug)}
                      disabled={remaining === 0}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button
              onClick={handleConfirm}
              disabled={!isComplete}
              className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed bg-orange-600 hover:bg-orange-700 focus:ring-orange-500"
            >
              {isComplete ? `Add ${bundle.name} to Cart` : `Select ${remaining} more bar${remaining !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
