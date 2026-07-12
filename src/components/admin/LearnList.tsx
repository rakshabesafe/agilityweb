"use client";

import { useState } from "react";
import { useSite } from "@/context/SiteContext";
import { LearnArticle } from "@/data/products";
import LearnForm from "./LearnForm";

export default function LearnList() {
  const { learnArticles, setLearnArticles } = useSite();
  const [editingArticle, setEditingArticle] = useState<LearnArticle | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (article: LearnArticle) => {
    if (isAdding) {
      setLearnArticles([...learnArticles, article]);
    } else {
      setLearnArticles(learnArticles.map((a) => (a.slug === article.slug ? article : a)));
    }
    setEditingArticle(null);
    setIsAdding(false);
  };

  const handleDelete = (slug: string) => {
    setLearnArticles(learnArticles.filter((a) => a.slug !== slug));
  };

  if (editingArticle || isAdding) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">{isAdding ? "Add Learn Article" : "Edit Learn Article"}</h3>
        <LearnForm article={editingArticle || undefined} onSave={handleSave} onCancel={() => { setEditingArticle(null); setIsAdding(false); }} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Learn Articles / Ingredients</h3>
        <button onClick={() => setIsAdding(true)} className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm">Add Content</button>
      </div>
      <ul className="divide-y divide-gray-200">
        {learnArticles.length === 0 ? (
          <li className="p-4 text-gray-500 text-sm">No articles added yet.</li>
        ) : null}
        {learnArticles.map((article) => (
          <li key={article.slug} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                {article.image ? <img src={article.image} alt={article.name} className="h-full w-full object-cover" /> : <span className="text-xs text-gray-400">No Img</span>}
              </div>
              <div>
                <p className="font-medium text-gray-900">{article.name}</p>
                <p className="text-sm text-gray-500">{article.slug}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingArticle(article)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
              <button onClick={() => handleDelete(article.slug)} className="text-red-600 hover:text-red-900 text-sm font-medium ml-4">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
