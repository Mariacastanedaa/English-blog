import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/blogPosts';
import { GalleryItem } from '../types/blog';
import { Camera, MapPin, ZoomIn, X, Sparkles, Filter } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Nature', 'Volunteering', 'Books', 'Running', 'Food & Coffee', 'Travel', 'Photography'];

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-stone-50/70 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-2">
            Visual Storytelling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Moments & Inspiration
          </h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            A visual chronicle of the places, nature, volunteering, books, and daily passions that inspire my English writing practice and personal journey.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10 p-1.5 bg-white border border-stone-200/90 rounded-2xl max-w-fit mx-auto shadow-sm">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry / Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isLarge = index === 0 || index === 5 || index === 11 || index === 16;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative overflow-hidden rounded-2xl bg-white border border-stone-200/80 shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 ${
                  isLarge ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container with smooth hover zoom */}
                <div className={`relative w-full overflow-hidden bg-stone-100 ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Scrim on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-stone-800 shadow-sm">
                    {item.category}
                  </div>

                  {/* Zoom Icon Button */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Bottom Information */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                    {item.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium mt-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl text-white animate-fadeIn">
              
              {/* Top Controls */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-900/90 backdrop-blur-sm">
                <div>
                  <span className="text-xs uppercase font-semibold text-amber-400">
                    {activeItem.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {activeItem.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveItem(null)}
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-res Image */}
              <div className="relative aspect-[16/10] bg-stone-950 flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              {/* Caption & Location Bar */}
              <div className="p-5 sm:p-6 bg-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-300 border-t border-stone-800">
                <p className="text-sm text-stone-200 leading-relaxed max-w-2xl">
                  {activeItem.caption}
                </p>

                {activeItem.location && (
                  <div className="flex items-center gap-1.5 text-amber-400 font-medium shrink-0">
                    <MapPin className="w-4 h-4" />
                    <span>{activeItem.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
