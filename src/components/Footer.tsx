import React from 'react';
import { ArrowUp, Heart, GraduationCap } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand & Description */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-serif font-bold text-sm tracking-tight shadow-sm">
                M
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                My English Journey
              </span>
            </div>

            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              A personal English learning blog created as part of my SENA learning process.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <span>SENA Colombia · Regional Distrito Capital</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-200 block">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Me
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Evidence Summary */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-200 block">
              Assignment Focus
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Demonstrating B1-B2 CEFR language skills across personal life, technology studies, travel, current events, media literacy, and crime & punishment.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Required SENA Evidence Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <p>
            Created for SENA – English Learning Evidence GA7-240202501-AA1-EV03
          </p>

          <p className="flex items-center gap-1">
            <span>Authored by Maria Castañeda</span>
            <span aria-hidden="true">·</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
