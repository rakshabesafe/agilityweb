"use client";

import { useSite } from "@/context/SiteContext";

export default function TopBanner() {
  const { config } = useSite();

  if (!config.bannerEnabled || !config.bannerText) return null;

  return (
    <div className="bg-gray-900 text-white px-4 py-2 text-center text-sm font-medium z-50">
      {config.bannerText}
    </div>
  );
}
