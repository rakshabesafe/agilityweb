"use client";

import { useState } from "react";
import { Bundle } from "@/data/products";

interface BundleFormProps {
  bundle?: Bundle;
  onSave: (bundle: Bundle) => void;
  onCancel: () => void;
}

export default function BundleForm({ bundle, onSave, onCancel }: BundleFormProps) {
  const [formData, setFormData] = useState<Partial<Bundle>>(
    bundle || {
      slug: "",
      name: "",
      desc: "",
      items: 0,
      price: 0,
      mrp: 0,
      badge: "",
      image: "",
      longDesc: "",
      allowedFlavours: []
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Bundle) => {
    const value = e.target.value.split(",").map((s) => s.trim());
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Bundle);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input required type="text" name="name" value={formData.name || ""} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input required type="text" name="slug" value={formData.slug || ""} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input required type="number" name="price" value={formData.price || 0} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">MRP</label>
          <input required type="number" name="mrp" value={formData.mrp || 0} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Items (Count)</label>
          <input required type="number" name="items" value={formData.items || 0} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Badge Text</label>
          <input type="text" name="badge" value={formData.badge || ""} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input type="text" name="image" value={formData.image || ""} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Short Description</label>
        <textarea required name="desc" value={formData.desc || ""} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Long Description</label>
        <textarea name="longDesc" value={formData.longDesc || ""} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Allowed Flavours (comma separated slugs)</label>
        <input type="text" value={formData.allowedFlavours?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "allowedFlavours")} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
      </div>
    </form>
  );
}
