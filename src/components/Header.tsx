"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, Palette } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSite } from '@/context/SiteContext';

export default function Header() {
  const { setIsCartOpen, cartCount } = useCart();
  const { config, setConfig } = useSite();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const handleThemeChange = (theme: string) => {
    setConfig({ ...config, theme });
    setIsThemeMenuOpen(false);
  };

  const themes = [
    { id: 'default', name: 'Default (Light)' },
    { id: 'ocean', name: 'Ocean Breeze' },
    { id: 'nature', name: 'Nature Green' },
    { id: 'dark', name: 'Dark Mode' }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {/* Use standard img tag as instructed in the plan */}
          <img
            src={config.logoUrl}
            alt="Nutrio"
            className="h-12 w-auto"
            style={{ objectFit: 'contain' }}
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
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-gray-100 transition-colors"
              title="Change Theme"
            >
              <Palette className="h-5 w-5" />
            </button>
            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`block w-full text-left px-4 py-2 text-sm ${config.theme === theme.id ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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
