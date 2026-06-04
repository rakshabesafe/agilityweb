"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { setIsCartOpen, cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/nutrio-logo.png"
            alt="Nutrio"
            width={100}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/shop" className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Shop Bars
          </Link>
          <Link href="/bundles" className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Bundles &amp; Gifting
          </Link>
          <Link href="/learn" className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Learn
          </Link>
          <Link href="/coming-soon" className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Coming Soon
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 bg-orange-600 text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#FAF5E6] border-b border-border/60 flex flex-col p-6 gap-6 shadow-md shadow-black/5 z-50">
          <Link
            href="/shop"
            className="text-base font-medium text-foreground transition-colors hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop Bars
          </Link>
          <Link
            href="/bundles"
            className="text-base font-medium text-foreground transition-colors hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bundles &amp; Gifting
          </Link>
          <Link
            href="/learn"
            className="text-base font-medium text-foreground transition-colors hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Learn
          </Link>
          <Link
            href="/coming-soon"
            className="text-base font-medium text-foreground transition-colors hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Coming Soon
          </Link>
          <Link
            href="/about"
            className="text-base font-medium text-foreground transition-colors hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
