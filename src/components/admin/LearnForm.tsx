"use client";

import { useState } from "react";
import { LearnArticle } from "@/data/products";

export default function LearnForm({ article, onSave, onCancel }: { article?: LearnArticle, onSave: (a: LearnArticle) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState<LearnArticle>({
    slug: article?.slug || "",
    name: article?.name || "",
    description: article?.description || "",
    image: article?.image || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.name || !formData.description) {
      alert("Slug, Name, and Description are required.");
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (e.g. ashwagandha)</label>
          <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" required disabled={!!article} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image URL (e.g. /assets/learn/ashwagandha.jpg)</label>
          <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" required />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Save</button>
      </div>
    </form>
  );
}
