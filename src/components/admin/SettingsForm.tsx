"use client";

import { useSite } from "@/context/SiteContext";

export default function SettingsForm() {
  const { config, setConfig } = useSite();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-6">Site Settings</h3>
      <div className="space-y-6 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            name="logoUrl"
            value={config.logoUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
          />
          <p className="mt-1 text-sm text-gray-500">Must be a valid URL. e.g., /assets/nutrio-logo.png or https://example.com/logo.png</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="bannerEnabled"
              name="bannerEnabled"
              checked={config.bannerEnabled}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
            />
            <label htmlFor="bannerEnabled" className="text-sm font-medium text-gray-700">Enable Top Banner</label>
          </div>
          <label className="block text-sm font-medium text-gray-700 mt-2">Banner Text</label>
          <input
            type="text"
            name="bannerText"
            value={config.bannerText}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
            disabled={!config.bannerEnabled}
          />
        </div>
      </div>
    </div>
  );
}
