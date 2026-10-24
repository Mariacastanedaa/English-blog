import React, { useState } from 'react';
import { BlogPost } from '../types/blog';
import { Clock, ArrowRight, BookOpen, Headphones } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full">
      {/* Featured Image with measured contrast and aspect ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={post.featuredImage}
            alt={post.altText || post.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-stone-100 text-stone-500">
            <BookOpen className="w-8 h-8 text-amber-600/70 mb-2" />
            <span className="text-xs font-serif font-medium text-stone-700">{post.category}</span>
          </div>
        )}

        {/* Category kicker overlay tag */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-stone-800 shadow-sm">
          {post.category}
        </div>

        {/* Audio badge if oral evidence audio exists */}
        {post.audioUrl && (
          <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-medium text-amber-300 flex items-center gap-1 shadow-sm">
            <Headphones className="w-3 h-3 text-amber-400" />
            <span>Audio</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>{post.date}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {post.readingTime}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{post.wordCount} words</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Card Footer: Read More Action */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => onReadMore(post)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:text-amber-900 transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          {post.audioUrl ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Headphones className="w-3 h-3 text-amber-600" />
              <span>Audio</span>
            </span>
          ) : (
            <span className="text-[11px] text-stone-400">
              SENA Evidence
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
