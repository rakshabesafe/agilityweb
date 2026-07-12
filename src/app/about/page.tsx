"use client";

import { useSite } from "@/context/SiteContext";

export default function AboutPage() {
  const { aboutContent } = useSite();

  if (!aboutContent) return null;

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {aboutContent.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl mx-auto">
            {aboutContent.subtitle}
          </p>
        </div>
      </div>

      {/* Story Section - Split Layout */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:grid-cols-2 lg:items-center">
          
          {/* Image */}
          <div className="lg:order-last">
            <div className="aspect-[4/3] rounded-2xl bg-gray-50 overflow-hidden shadow-lg relative">
              {aboutContent.imageUrl ? (
                <img 
                  src={aboutContent.imageUrl} 
                  alt="Our Story" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                  Image Placeholder
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display mb-6">
              {aboutContent.storyTitle}
            </h2>
            <div className="h-1 w-20 bg-orange-500 rounded-full mb-8"></div>
            
            <div className="prose prose-lg prose-orange text-gray-600 max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">
                {aboutContent.storyText}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
