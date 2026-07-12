"use client";

import { useSite } from "@/context/SiteContext";

export default function AboutForm() {
  const { aboutContent, setAboutContent } = useSite();

  // If data is loading or missing
  if (!aboutContent) return <div className="p-4 text-gray-500">Loading...</div>;

  const handleChange = (field: keyof typeof aboutContent, value: string) => {
    setAboutContent({ ...aboutContent, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Edit About Page</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Page Title</label>
            <input 
              type="text" 
              value={aboutContent.title} 
              onChange={e => handleChange('title', e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input 
              type="text" 
              value={aboutContent.subtitle} 
              onChange={e => handleChange('subtitle', e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" 
            />
          </div>
          
          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <h4 className="text-md font-medium text-gray-800 mb-4">Our Story Section</h4>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Story Title</label>
            <input 
              type="text" 
              value={aboutContent.storyTitle} 
              onChange={e => handleChange('storyTitle', e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Story Image URL</label>
            <input 
              type="text" 
              value={aboutContent.imageUrl || ""} 
              onChange={e => handleChange('imageUrl', e.target.value)} 
              placeholder="/assets/about-us.jpg"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Story Content</label>
            <textarea 
              rows={8} 
              value={aboutContent.storyText} 
              onChange={e => handleChange('storyText', e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500 whitespace-pre-wrap" 
            />
            <p className="text-xs text-gray-500 mt-2">Note: Changes made here are saved to draft instantly. Click 'Commit & Push' in the header to publish.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
