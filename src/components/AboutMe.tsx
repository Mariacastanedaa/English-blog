import React, { useState } from 'react';
import {
  Camera,
  Trees,
  Plane,
  BookOpen,
  Laptop,
  Code2,
  TrendingUp,
  Activity,
  UtensilsCrossed,
  Sparkles,
  Award,
  Globe2,
  Heart
} from 'lucide-react';

interface AboutMeProps {
  onExplorePosts: (filterCategory?: string) => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onExplorePosts }) => {
  const [activeInterest, setActiveInterest] = useState<string | null>(null);

  const interests = [
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      color: 'hover:border-amber-300 hover:bg-amber-50/60',
      note: 'Capturing natural light, street moments, and architectural lines on 35mm film.',
      relatedCategory: 'Personal Life'
    },
    {
      id: 'nature',
      name: 'Nature',
      icon: Trees,
      color: 'hover:border-emerald-300 hover:bg-emerald-50/60',
      note: 'Hiking through Colombia’s green mountain landscapes and breathing fresh air.',
      relatedCategory: 'Travel'
    },
    {
      id: 'travel',
      name: 'Travel',
      icon: Plane,
      color: 'hover:border-sky-300 hover:bg-sky-50/60',
      note: 'Exploring diverse cultures, traditional towns, and meeting inspiring people.',
      relatedCategory: 'Travel'
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: BookOpen,
      color: 'hover:border-purple-300 hover:bg-purple-50/60',
      note: 'Discovering essays, biographies, and articles that spark curiosity and new ideas.',
      relatedCategory: 'Critical Thinking'
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: Laptop,
      color: 'hover:border-blue-300 hover:bg-blue-50/60',
      note: 'Learning modern tools, artificial intelligence workflows, and interactive devices.',
      relatedCategory: 'Current Events'
    },
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: Code2,
      color: 'hover:border-indigo-300 hover:bg-indigo-50/60',
      note: 'Building clean responsive interfaces with HTML, CSS, JavaScript and React.',
      relatedCategory: 'Studies & Career'
    },
    {
      id: 'marketing',
      name: 'Digital Marketing',
      icon: TrendingUp,
      color: 'hover:border-rose-300 hover:bg-rose-50/60',
      note: 'Understanding audience psychology, SEO strategy, and authentic brand storytelling.',
      relatedCategory: 'Studies & Career'
    },
    {
      id: 'tennis',
      name: 'Tennis',
      icon: Activity,
      color: 'hover:border-lime-300 hover:bg-lime-50/60',
      note: 'Weekend rallies on the court that sharpen focus, agility, and mental discipline.',
      relatedCategory: 'Personal Life'
    },
    {
      id: 'cooking',
      name: 'Cooking',
      icon: UtensilsCrossed,
      color: 'hover:border-orange-300 hover:bg-orange-50/60',
      note: 'Experimenting with fresh Colombian ingredients, savory dishes, and sweet treats.',
      relatedCategory: 'Personal Life'
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-stone-50/50 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-2">
            Personal Profile & Academic Background
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Hello! I’m Mafe
          </h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mt-4 mb-6 rounded-full" />
          
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            I’m a student of web and multimedia development, interested in technology, cooking, photography, nature, travelling, reading and learning new things. This blog is part of my English learning journey and allows me to practice the language while sharing some of the things that are important to me.
          </p>
        </div>

        {/* Two-Column Showcase: About Cards & Interactive Interests */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Academic & Vision Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">SENA Evidence Portfolio</h3>
                  <p className="text-xs text-stone-500">GA7-240202501-AA1-EV03 – Blog</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                <p>
                  As an apprentice at <strong className="text-stone-800">SENA (Servicio Nacional de Aprendizaje)</strong>, this blog documents my intermediate English communication skills across six required thematic areas: personal life, studies and careers, travel and culture, digital trends, critical media analysis, and ethical perspectives on justice.
                </p>
                <p>
                  My goal is to communicate with clarity, empathy, and natural tone, demonstrating how English empowers Colombian students to share their perspectives on a worldwide stage.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <Globe2 className="w-4 h-4 text-stone-400" />
                  Target: B1-B2 CEFR Level
                </span>
                <span className="flex items-center gap-1 text-rose-600 font-medium">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  Made with passion
                </span>
              </div>
            </div>

            {/* Quick Quote */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/60 rounded-2xl p-6">
              <p className="font-serif italic text-base text-stone-800 leading-relaxed">
                “Learning another language is not only learning different words for the same things, but learning another way to think about things.”
              </p>
              <span className="block mt-2 text-xs font-semibold text-amber-800 tracking-wide">
                — Flora Lewis
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Interest Cards */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">What Inspires Me</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Click any interest to discover how it shapes my writing</p>
                </div>
                <span className="text-xs font-medium text-stone-400">9 Interests</span>
              </div>

              {/* Interest Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {interests.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeInterest === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveInterest(isSelected ? null : item.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                          : `border-stone-200/80 bg-stone-50/40 text-stone-800 ${item.color}`
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isSelected ? 'text-amber-300' : 'text-stone-600 group-hover:text-stone-900'
                          }`}
                        />
                        <span className="text-xs font-semibold tracking-tight whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] leading-snug line-clamp-2 transition-colors ${
                          isSelected ? 'text-stone-300' : 'text-stone-500'
                        }`}
                      >
                        {item.note}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Interest Detail Callout */}
              {activeInterest && (
                <div className="mt-5 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                  <div>
                    <span className="font-semibold block text-amber-900">
                      Featured in blog stories:
                    </span>
                    <span className="text-amber-800">
                      {interests.find((i) => i.id === activeInterest)?.note}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const found = interests.find((i) => i.id === activeInterest);
                      if (found) onExplorePosts(found.relatedCategory);
                    }}
                    className="shrink-0 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg text-xs transition-colors"
                  >
                    View related post
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
