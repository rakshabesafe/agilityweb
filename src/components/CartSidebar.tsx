import { X } from 'lucide-react';

export default function CartSidebar() {
  return (
    <>
      {/* Overlay - hidden by default for mock */}
      <div className="fixed inset-0 z-50 bg-black/40 transition-opacity pointer-events-none opacity-0 hidden"></div>

      {/* Sidebar - translate-x-full by default to hide it, using hardcoded right side for now in demo */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform translate-x-full bg-white hidden">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-display text-xl font-bold">Your Cart</h3>
          <button className="rounded-full p-2 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="blob h-24 w-24 bg-secondary rounded-full bg-orange-100"></div>
            <p className="mt-4 font-display text-lg font-semibold">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted-foreground text-gray-500">Add a bar — or try the Discover Pack.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
