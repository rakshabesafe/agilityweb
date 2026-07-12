"use client";

import { useState } from 'react';
import ProductList from '@/components/admin/ProductList';
import BundleList from '@/components/admin/BundleList';
import SettingsForm from '@/components/admin/SettingsForm';
import ShiprocketForm from '@/components/admin/ShiprocketForm';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Nutrio Admin</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'products' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('bundles')}
            className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'bundles' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            Bundles
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'settings' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab('shiprocket')}
            className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'shiprocket' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            Shiprocket Config
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <a href="/api/auth/signout" className="block w-full text-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors">
            Sign Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab} Management</h2>
          <button
            onClick={async () => {
              if (confirm("Are you sure you want to commit all changes to GitHub?")) {
                const res = await fetch('/api/github/commit', { method: 'POST' });
                const data = await res.json();
                if (data.error) alert(`Error: ${data.error}`);
                else alert(data.message);
              }
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <span>Commit & Push to Git</span>
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'products' && <ProductList />}
          {activeTab === 'bundles' && <BundleList />}
          {activeTab === 'settings' && <SettingsForm />}
          {activeTab === 'shiprocket' && <ShiprocketForm />}
        </main>
      </div>
    </div>
  );
}
