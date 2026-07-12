import { LearnArticle } from "@/data/products";
import { X } from "lucide-react";

interface IngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: LearnArticle | null;
}

export default function IngredientModal({ isOpen, onClose, article }: IngredientModalProps) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="w-full sm:w-2/5 h-64 sm:h-auto bg-gray-100 relative shrink-0">
            {article.image ? (
              <img
                src={article.image}
                alt={article.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 sm:w-3/5">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
              {article.name}
            </h2>
            <div className="h-1 w-12 bg-orange-500 rounded-full mb-6"></div>
            
            <div className="prose prose-sm sm:prose-base prose-orange max-w-none text-gray-600">
              <p className="whitespace-pre-wrap leading-relaxed">{article.description}</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full rounded-full bg-orange-100 py-3 text-sm font-semibold text-orange-800 hover:bg-orange-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
