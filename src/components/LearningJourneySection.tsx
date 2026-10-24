import React, { useState } from 'react';
import { ENGLISH_SKILLS } from '../data/blogPosts';
import { BookOpen, Mic, PenTool, Headphones, Check, Sparkles, Target, ArrowRight } from 'lucide-react';

export const LearningJourneySection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>(ENGLISH_SKILLS[0].id);

  const getIcon = (id: string) => {
    switch (id) {
      case 'skill-vocab':
        return BookOpen;
      case 'skill-speaking':
        return Mic;
      case 'skill-writing':
        return PenTool;
      case 'skill-listening':
        return Headphones;
      default:
        return Sparkles;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-2">
            Skill Development & Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            My English Learning Journey
          </h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Consistently practicing the four core linguistic dimensions allows me to transition from passive comprehension to active, expressive communication.
          </p>
        </div>

        {/* 4 Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGLISH_SKILLS.map((skill) => {
            const Icon = getIcon(skill.id);
            const isSelected = selectedSkill === skill.id;

            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-lg -translate-y-1'
                    : 'bg-stone-50/60 text-stone-800 border-stone-200/80 hover:bg-white hover:border-amber-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Header with Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : 'bg-amber-100/70 text-amber-800'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md ${
                        isSelected ? 'bg-stone-800 text-amber-300' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`font-serif text-xl font-bold transition-colors ${
                        isSelected ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {skill.title}
                    </h3>
                    <p
                      className={`text-xs mt-2 leading-relaxed transition-colors ${
                        isSelected ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Practical routine highlight */}
                <div
                  className={`mt-6 pt-4 border-t text-xs space-y-2 ${
                    isSelected ? 'border-stone-800' : 'border-stone-200/70'
                  }`}
                >
                  <div>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider block ${
                        isSelected ? 'text-amber-400' : 'text-amber-800'
                      }`}
                    >
                      My Practice Routine:
                    </span>
                    <p
                      className={`text-[11px] leading-snug mt-0.5 ${
                        isSelected ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      {skill.myRoutine}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider block ${
                        isSelected ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      Key Resource:
                    </span>
                    <p
                      className={`text-[11px] italic ${
                        isSelected ? 'text-stone-200' : 'text-stone-700 font-medium'
                      }`}
                    >
                      {skill.favoriteResource}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SENA Competency Reflection Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>SENA Academic Competency Target</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              Interacting in English in Personal, Academic and Professional Contexts
            </h4>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              Demonstrating B1-B2 CEFR language performance through natural storytelling, reasoned critical thinking on media, and thoughtful reflection on justice and second chances.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-center shadow-xs">
              <span className="block font-serif text-xl font-bold text-stone-900">B1-B2</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">CEFR Level</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-center shadow-xs">
              <span className="block font-serif text-xl font-bold text-amber-700">6 Topics</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">Evidence Scope</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
