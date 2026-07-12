"use client";

import { useState } from "react";
import { useSite } from "@/context/SiteContext";
import { Bundle } from "@/data/products";
import FlavorSelectionModal from "@/components/FlavorSelectionModal";

export default function BundlesPage() {
  const { bundles } = useSite();
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Bundles &amp; Offers
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Stock up on your favorites or give the gift of health.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {bundles.map((bundle) => (
          <div key={bundle.slug} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800 mb-4">
                  {bundle.badge}
                </span>
                <h3 className="font-display text-xl font-bold text-gray-900">
                  {bundle.name}
                </h3>
              </div>
              <p className="mb-6 flex-1 text-sm text-gray-600">{bundle.desc}</p>

              <div className="mb-6 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">₹{bundle.price}</p>
                {bundle.mrp > bundle.price && (
                  <p className="text-sm text-gray-500 line-through">₹{bundle.mrp}</p>
                )}
              </div>

              <button
                onClick={() => setSelectedBundle(bundle)}
                className="w-full rounded-full bg-gray-900 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Choose Flavors
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <FlavorSelectionModal 
        isOpen={!!selectedBundle} 
        onClose={() => setSelectedBundle(null)} 
        bundle={selectedBundle} 
      />
    </div>
  );
}
