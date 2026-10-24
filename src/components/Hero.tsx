import React from 'react';
import { BookOpen, User, MapPin, GraduationCap } from 'lucide-react';

interface HeroProps {
  onReadStories: () => void;
  onAboutMe: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReadStories, onAboutMe }) => {

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-stone-50 via-white to-stone-50/60">
      {/* Subtle background blur accents */}
      <div className="absolute top-10 left-1/4 -z-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-3xl">
          {/* Academic Credential Label (Unboxed text with separators) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 tracking-wide">
            <span className="flex items-center gap-1.5 text-stone-800 font-semibold">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              SENA Colombia
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Evidence GA7-240202501-AA1-EV03</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              Bogotá, Colombia
            </span>
          </div>

          {/* Main Single H1 Headline */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              My English <span className="italic font-normal text-amber-700">Journey</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-stone-700 tracking-tight">
              Learning, exploring and sharing my world through English.
            </p>
          </div>

          {/* Short Introduction */}
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
            Welcome to my English blog! This is a space where I share stories about my life, interests, experiences, travels, professional journey and thoughts about the world around us.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onReadStories}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-95 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Read My Stories</span>
            </button>

            <button
              onClick={onAboutMe}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200/80 active:scale-95 border border-stone-200/80 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              <User className="w-4 h-4 text-stone-600" />
              <span>About Me</span>
            </button>
          </div>

          {/* Quick Metrics / Key Pillars */}
          <div className="pt-6 border-t border-stone-200/70 grid grid-cols-3 gap-4 text-stone-700 max-w-lg">
            <div>
              <span className="block font-serif text-2xl font-bold text-stone-900">6</span>
              <span className="text-xs text-stone-500 font-medium">Original Stories</span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold text-stone-900">B1-B2</span>
              <span className="text-xs text-stone-500 font-medium">English Level</span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold text-stone-900">100%</span>
              <span className="text-xs text-stone-500 font-medium">Authentic Voice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
