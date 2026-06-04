"use client";

import { useSite } from "@/context/SiteContext";

export default function ShiprocketForm() {
  const { config, setConfig } = useSite();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-6">Shiprocket Configuration</h3>
      <p className="mb-6 text-sm text-gray-500">
        Enter your Shiprocket account credentials to enable real order pushing during checkout.
        If left blank, the system will use a mock simulation. Credentials are saved locally.
      </p>
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="shiprocketEmail"
            value={config.shiprocketEmail || ""}
            onChange={handleChange}
            placeholder="admin@example.com"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="shiprocketPassword"
            value={config.shiprocketPassword || ""}
            onChange={handleChange}
            placeholder="••••••••"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
          />
        </div>
      </div>
    </div>
  );
}
