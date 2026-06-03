import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu } from 'lucide-react';

export default function Header() {
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
          <button className="relative inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 bg-orange-600 text-white">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
