import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types/blog';
import { BlogCard } from './BlogCard';
import { Search, Filter, Sparkles, BookOpen } from 'lucide-react';

interface BlogGridProps {
  onSelectPost: (post: BlogPost) => void;
  activeCategoryFilter?: string | null;
  onClearCategoryFilter?: () => void;
}

export const BlogGrid: React.FC<BlogGridProps> = ({
  onSelectPost,
  activeCategoryFilter,
  onClearCategoryFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Personal Life',
    'Studies & Career',
    'Travel',
    'Current Events',
    'Critical Thinking',
    'Society',
  ];

  // Sync external category filter if passed
  React.useEffect(() => {
    if (activeCategoryFilter) {
      setSelectedCategory(activeCategoryFilter);
    }
  }, [activeCategoryFilter]);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-2">
            Academic English Articles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Explore My Stories
          </h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Six original blog posts, sharing reflections on life, digital technology, travel memories, media literacy, and justice.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs (interactive filters) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100/80 rounded-xl border border-stone-200/80 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (onClearCategoryFilter) onClearCategoryFilter();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-stone-950 shadow-sm'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posts or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Active Filter Pill indicator if filtered */}
        {selectedCategory !== 'All' && (
          <div className="mb-6 flex items-center justify-between text-xs text-stone-500 bg-amber-50/60 border border-amber-200/70 p-3 rounded-xl">
            <span>
              Showing posts in category: <strong className="text-amber-900">{selectedCategory}</strong>
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                if (onClearCategoryFilter) onClearCategoryFilter();
              }}
              className="font-semibold text-amber-800 hover:underline"
            >
              Show all 6 posts
            </button>
          </div>
        )}

        {/* Blog Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onReadMore={(p) => onSelectPost(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No blog posts found</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting your search query or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
