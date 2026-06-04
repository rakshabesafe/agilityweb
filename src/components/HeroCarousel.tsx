"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";

interface HeroCarouselProps {
  products: Product[];
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!products || products.length === 0) return null;

  const currentProduct = products[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <section className={`relative overflow-hidden ${currentProduct.bgClass} transition-colors duration-500 min-h-[85vh] flex flex-col pt-20 pb-16`}>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8 relative z-10 gap-12">

        {/* Left Side: Text and Actions */}
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0 z-20 w-full">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-1.5 text-sm font-medium mb-6">
            <span className="text-[#0D6236]">✨ Ayurveda × Modern Nutrition</span>
          </div>

          <h1 className="font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-4 leading-tight">
            Functional bars, <br />
            <span className="text-[#0D6236]">not just protein.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0 mb-10">
            {currentProduct.longDesc ? currentProduct.longDesc : currentProduct.shortDesc}
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
            <Link
              href={`/product/${currentProduct.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#1b7f43] px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#156334] transition-colors"
            >
              Try {currentProduct.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/why-functional"
              className="rounded-full bg-white/80 backdrop-blur border border-black/10 px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-white transition-colors"
            >
              Why functional?
            </Link>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-[#1b7f43]">🌱</span> {currentProduct.nutrition.find(n => n.label === "Plant Protein")?.value || "5g Plant Protein"}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#1b7f43]">🚫</span> No Refined Sugar
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#1b7f43]">🧪</span> No Preservatives
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#1b7f43]">🍃</span> 100% Natural Extracts
            </div>
          </div>
        </div>

        {/* Right Side: Image and 6 Benefits badge */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-xl mx-auto z-10 flex justify-center mt-8 lg:mt-0">
          <div className="absolute top-0 right-0 lg:-top-10 lg:-right-10 rounded-full bg-[#1b7f43] text-white p-4 lg:p-6 w-28 h-28 lg:w-36 lg:h-36 flex flex-col items-center justify-center text-center shadow-lg transform rotate-6 z-30">
            <span className="text-xs lg:text-sm font-medium uppercase opacity-90 tracking-wider">Made with</span>
            <span className="text-sm lg:text-base font-bold leading-tight">Ancient herbs</span>
          </div>

          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
            <Image
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="absolute bottom-0 left-0 lg:-bottom-10 lg:-left-10 rounded-2xl bg-[#0D6236] text-white p-6 w-32 h-32 lg:w-40 lg:h-40 flex flex-col justify-center shadow-lg z-30">
            <span className="text-5xl lg:text-6xl font-bold mb-1">6</span>
            <span className="text-xs font-semibold uppercase tracking-wider leading-tight">Functional<br/>Benefits</span>
          </div>
        </div>
      </div>

      {/* Controls and Bottom Navigation */}
      <div className="mt-auto pt-16 w-full z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {products.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-gray-900' : 'w-4 bg-gray-400/50'}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Bottom Category Bar */}
        <div className="w-full bg-[#111111] overflow-x-auto no-scrollbar">
          <div className="flex w-max min-w-full items-center justify-between px-4 sm:px-8 py-5">
            {products.map((prod, idx) => (
              <button
                key={prod.slug}
                onClick={() => setCurrentIndex(idx)}
                className={`group flex items-center gap-3 px-4 py-2 transition-opacity ${idx === currentIndex ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                <span className="text-base sm:text-lg font-bold tracking-wide text-white uppercase">{prod.name.replace('Bar', '')}</span>
                <span className="text-[#a8cf45]">🍃</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
