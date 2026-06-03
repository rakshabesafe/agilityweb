import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 text-sm text-muted-foreground md:flex-row text-gray-500">
          <p className="text-center md:text-left">© 2026 Nutrio. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-primary">Privacy</Link>
            <span className="text-border">•</span>
            <Link href="/" className="hover:text-primary">Terms</Link>
            <span className="text-border">•</span>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="hover:text-primary">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-primary">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-primary">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="mailto:hello@nutrio.in" aria-label="Email" className="hover:text-primary">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="text-center md:text-right">
            Designed &amp; developed by <a href="#" className="font-semibold text-foreground hover:text-primary text-black">Steed 26</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
