"use client";

import { useState } from "react";
import { useSite } from "@/context/SiteContext";
import { Product } from "@/data/products";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const { products, setProducts } = useSite();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (product: Product) => {
    if (isAdding) {
      setProducts([...products, product]);
    } else {
      setProducts(products.map((p) => (p.slug === product.slug ? product : p)));
    }
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleDelete = (slug: string) => {
    setProducts(products.filter((p) => p.slug !== slug));
  };

  if (editingProduct || isAdding) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">{isAdding ? "Add Product" : "Edit Product"}</h3>
        <ProductForm product={editingProduct || undefined} onSave={handleSave} onCancel={() => { setEditingProduct(null); setIsAdding(false); }} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Products</h3>
        <button onClick={() => setIsAdding(true)} className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm">Add Product</button>
      </div>
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.slug} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <span className="text-xs text-gray-400">No Img</span>}
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">₹{product.price}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingProduct(product)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
              <button onClick={() => handleDelete(product.slug)} className="text-red-600 hover:text-red-900 text-sm font-medium ml-4">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
