"use client";

import { useState } from "react";
import { useSite } from "@/context/SiteContext";
import { LearnArticle } from "@/data/products";
import IngredientModal from "@/components/IngredientModal";

export default function LearnPage() {
  const { learnArticles } = useSite();
  const [selectedArticle, setSelectedArticle] = useState<LearnArticle | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
          Learn about Ayurveda
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the ancient wisdom and powerful botanicals behind our functional bars. 
          Click on any ingredient to learn about its benefits.
        </p>
      </div>

      {learnArticles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500">Content coming soon...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {learnArticles.map((article) => (
            <div 
              key={article.slug} 
              onClick={() => setSelectedArticle(article)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {article.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Read more <span aria-hidden="true" className="ml-1">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <IngredientModal 
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />
    </div>
  );
}
