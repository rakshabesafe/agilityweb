"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden relative aspect-square">
        {/* Placeholder image if the real one isn't in public dir yet */}
        <div className={`w-full h-full flex items-center justify-center ${product.bgClass}`}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-xl font-bold text-gray-500">{product.name}</span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-orange-600">
              {product.name}
            </h3>
          </Link>
          <p className="font-semibold text-gray-900">₹{product.price}</p>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{product.shortDesc}</p>

        <div className="mt-auto">
          <button
            onClick={() => addToCart(product, 'product', product.image)}
            className="w-full rounded-full bg-orange-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
