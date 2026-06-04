"use client";

import { useState } from "react";
import { useSite } from "@/context/SiteContext";
import { Bundle } from "@/data/products";
import BundleForm from "./BundleForm";

export default function BundleList() {
  const { bundles, setBundles } = useSite();
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (bundle: Bundle) => {
    if (isAdding) {
      setBundles([...bundles, bundle]);
    } else {
      setBundles(bundles.map((b) => (b.slug === bundle.slug ? bundle : b)));
    }
    setEditingBundle(null);
    setIsAdding(false);
  };

  const handleDelete = (slug: string) => {
    setBundles(bundles.filter((b) => b.slug !== slug));
  };

  if (editingBundle || isAdding) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">{isAdding ? "Add Bundle" : "Edit Bundle"}</h3>
        <BundleForm bundle={editingBundle || undefined} onSave={handleSave} onCancel={() => { setEditingBundle(null); setIsAdding(false); }} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Bundles</h3>
        <button onClick={() => setIsAdding(true)} className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm">Add Bundle</button>
      </div>
      <ul className="divide-y divide-gray-200">
        {bundles.map((bundle) => (
          <li key={bundle.slug} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium text-gray-900">{bundle.name}</p>
                <p className="text-sm text-gray-500">₹{bundle.price} ({bundle.items} items)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingBundle(bundle)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
              <button onClick={() => handleDelete(bundle.slug)} className="text-red-600 hover:text-red-900 text-sm font-medium ml-4">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
