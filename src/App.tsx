/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from './data/blogPosts';
import { BlogPost } from './types/blog';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { BlogGrid } from './components/BlogGrid';
import { BlogPostModal } from './components/BlogPostModal';
import { GallerySection } from './components/GallerySection';
import { LearningJourneySection } from './components/LearningJourneySection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Update document title dynamically when reading a post for SEO and user experience
  useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost.title} – My English Journey`;
    } else {
      document.title =
        'My English Journey – Educational Personal Blog by Mafe (SENA GA7-240202501-AA1-EV03)';
    }
  }, [selectedPost]);

  // ScrollSpy to track active navigation section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'blog', 'gallery'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreBlog = () => {
    scrollToSection('blog');
  };

  const handleReadStories = () => {
    scrollToSection('blog');
  };

  const handleAboutMe = () => {
    scrollToSection('about');
  };

  const handleInterestFilter = (category?: string) => {
    if (category) {
      setCategoryFilter(category);
    }
    scrollToSection('blog');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-stone-800">
      {/* Sticky Top Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onExploreBlog={handleExploreBlog}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onReadStories={handleReadStories}
          onAboutMe={handleAboutMe}
        />

        {/* About Me Section */}
        <AboutMe
          onExplorePosts={handleInterestFilter}
        />

        {/* Blog Post Grid Section */}
        <BlogGrid
          onSelectPost={(post) => setSelectedPost(post)}
          activeCategoryFilter={categoryFilter}
          onClearCategoryFilter={() => setCategoryFilter(null)}
        />


        {/* Moments & Inspiration Gallery Section */}
        <GallerySection />

        {/* English Learning Journey (4 Skills) Section */}
        <LearningJourneySection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Full Blog Post View / Modal */}
      {selectedPost && (
        <BlogPostModal
          post={selectedPost}
          allPosts={BLOG_POSTS}
          onClose={() => setSelectedPost(null)}
          onNavigatePost={(post) => setSelectedPost(post)}
        />
      )}
    </div>
  );
}
