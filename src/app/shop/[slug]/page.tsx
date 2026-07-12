"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const { products } = useSite();
  
  const product = products.find((p) => p.slug === slug);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setCurrentImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="mt-4 text-orange-600 hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className={`aspect-square overflow-hidden rounded-2xl ${product.bgClass} flex items-center justify-center relative`}>
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
               <span className="text-3xl font-bold text-gray-500">{product.name}</span>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.backImage && (
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => setCurrentImage(product.image)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImage === product.image ? 'border-orange-500' : 'border-transparent'}`}
              >
                <Image src={product.image} alt="Front" fill className="object-cover" />
              </button>
              <button 
                onClick={() => setCurrentImage(product.backImage!)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImage === product.backImage ? 'border-orange-500' : 'border-transparent'}`}
              >
                <Image src={product.backImage} alt="Back" fill className="object-cover" />
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 lg:mt-0">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl tracking-tight text-gray-900">₹{product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-gray-700">
              <p className="font-medium">{product.tagline}</p>
              <p>{product.longDesc}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => addToCart(product, 'product', product.image)}
              className="flex max-w-xs flex-1 items-center justify-center rounded-full border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
            >
              Add to bag
            </button>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">Key Benefits</h3>
            <ul className="mt-4 list-disc pl-5 text-sm text-gray-600 space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
            <p className="mt-4 text-sm text-gray-600">
              {product.ingredients.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
