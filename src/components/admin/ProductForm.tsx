"use client";

import { useState } from "react";
import { Product } from "@/data/products";

interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      slug: "",
      name: "",
      tagline: "",
      shortDesc: "",
      longDesc: "",
      benefits: [],
      bestFor: [],
      hero: [],
      nutrition: [],
      ingredients: [],
      image: "",
      backImage: "",
      accent: "--default",
      bgClass: "bg-gray-100",
      price: 0,
      mrp: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
    const value = e.target.value.split(",").map((s) => s.trim());
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input required type="text" name="image" value={formData.image || ""} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Back Image URL</label>
        <input type="text" name="backImage" value={formData.backImage || ""} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Short Description</label>
        <input required type="text" name="shortDesc" value={formData.shortDesc || ""} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Long Description</label>
        <textarea required name="longDesc" value={formData.longDesc || ""} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
        <input type="text" value={formData.ingredients?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "ingredients")} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Key Benefits (comma separated)</label>
        <input type="text" value={formData.benefits?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "benefits")} className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black" />
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
      </div>
    </form>
  );
}
