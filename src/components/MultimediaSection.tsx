import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Eye,
  Play,
  Pause,
  FileText,
  ChevronRight
} from 'lucide-react';
import { MULTIMEDIA_CONFIG } from '../data/multimediaConfig';

export const MultimediaSection: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState('0:00');
  const [audioDuration, setAudioDuration] = useState('0:45');
  const [showAudioTranscript, setShowAudioTranscript] = useState(false);
  const [activeVocabCard, setActiveVocabCard] = useState(0);

  const realAudioRef = useRef<HTMLAudioElement | null>(null);

  // Audio timer for speech synthesis fallback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio && !MULTIMEDIA_CONFIG.speakingAudio.audioUrl) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const toggleAudioPlayback = () => {
    // If real audio file URL is configured
    if (MULTIMEDIA_CONFIG.speakingAudio.audioUrl && realAudioRef.current) {
      if (isPlayingAudio) {
        realAudioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        realAudioRef.current.play();
        setIsPlayingAudio(true);
      }
      return;
    }

    // Fallback: Speech Synthesis
    if (isPlayingAudio) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const text = MULTIMEDIA_CONFIG.speakingAudio.transcript;
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = 0.95;
        utter.onend = () => {
          setIsPlayingAudio(false);
          setAudioProgress(0);
        };
        utter.onerror = () => {
          setIsPlayingAudio(false);
          setAudioProgress(0);
        };
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const handleAudioTimeUpdate = () => {
    if (realAudioRef.current) {
      const cur = realAudioRef.current.currentTime;
      const dur = realAudioRef.current.duration || 1;
      setAudioProgress((cur / dur) * 100);
      const curMin = Math.floor(cur / 60);
      const curSec = Math.floor(cur % 60);
      setAudioCurrentTime(`${curMin}:${curSec < 10 ? '0' : ''}${curSec}`);
      if (!isNaN(dur)) {
        const durMin = Math.floor(dur / 60);
        const durSec = Math.floor(dur % 60);
        setAudioDuration(`${durMin}:${durSec < 10 ? '0' : ''}${durSec}`);
      }
    }
  };

  const vocabItems = [
    {
      word: 'Media Literacy',
      phonetic: '/ˈmiːdiə ˈlɪtərəsi/',
      definition: 'The ability to critically analyze, evaluate, and create media messages in various formats.',
      example: 'Media literacy helps students identify fake news before resharing it on social media.'
    },
    {
      word: 'Rehabilitation',
      phonetic: '/ˌriːhəˌbɪlɪˈteɪʃən/',
      definition: 'The process of helping someone recover and reintegrate into society through education and support.',
      example: 'Effective justice systems focus on rehabilitation to give individuals a second chance.'
    },
    {
      word: 'Curiosity',
      phonetic: '/ˌkjʊəriˈɒsəti/',
      definition: 'A strong desire to know, discover, or learn something new about the world.',
      example: 'Curiosity is an essential mindset when travelling through new cultures.'
    },
    {
      word: 'Wireframe',
      phonetic: '/ˈwaɪəfreɪm/',
      definition: 'A visual schematic or skeletal blueprint used in web development and UX design.',
      example: 'I sketch wireframes to organize page layouts before writing HTML and CSS.'
    }
  ];

  return (
    <section id="multimedia" className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-2">
            Multimodal Learning Strategy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Learning English Through Multimedia
          </h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Combining auditory exercises and visual association helps me internalize vocabulary, enhance fluency, and express complex ideas naturally.
          </p>
        </div>

        {/* Multimedia Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Speaking Practice */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-amber-300 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Speaking Practice
                </h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  Short audio recordings help me practice pronunciation, rhythm and intonation.
                </p>
              </div>

              {/* Interactive Audio Player */}
              <div className="mt-5 p-4 bg-white rounded-xl border border-stone-200 shadow-inner space-y-3">
                {MULTIMEDIA_CONFIG.speakingAudio.audioUrl && (
                  <audio
                    ref={realAudioRef}
                    src={MULTIMEDIA_CONFIG.speakingAudio.audioUrl}
                    onTimeUpdate={handleAudioTimeUpdate}
                    onEnded={() => {
                      setIsPlayingAudio(false);
                      setAudioProgress(0);
                    }}
                    onError={() => {
                      setIsPlayingAudio(false);
                    }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleAudioPlayback}
                      className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-amber-700 transition-colors shadow-sm active:scale-95"
                      aria-label={isPlayingAudio ? 'Pause Audio' : 'Play Audio'}
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <span className="text-xs font-semibold text-stone-800 block line-clamp-1">
                        {MULTIMEDIA_CONFIG.speakingAudio.title}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {isPlayingAudio
                          ? 'Playing...'
                          : MULTIMEDIA_CONFIG.speakingAudio.durationLabel}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-stone-500 shrink-0">
                    {MULTIMEDIA_CONFIG.speakingAudio.audioUrl
                      ? `${audioCurrentTime} / ${audioDuration}`
                      : `${Math.round((audioProgress / 100) * 45)}s / 45s`}
                  </span>
                </div>

                {/* Progress Bar & Waveform Visualization */}
                <div className="space-y-1.5">
                  <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-1 h-4 pt-1">
                    {[30, 60, 45, 80, 50, 90, 70, 40, 85, 95, 60, 40, 75, 55, 30].map(
                      (h, i) => (
                        <span
                          key={i}
                          className={`w-1 rounded-full transition-all ${
                            isPlayingAudio ? 'bg-amber-500 animate-pulse' : 'bg-stone-200'
                          }`}
                          style={{ height: `${isPlayingAudio ? Math.max(20, h) : 25}%` }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Transcript Toggle */}
                <button
                  onClick={() => setShowAudioTranscript(!showAudioTranscript)}
                  className="text-[11px] font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1 mt-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>{showAudioTranscript ? 'Hide audio transcript' : 'Show audio transcript'}</span>
                </button>

                {showAudioTranscript && (
                  <p className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200/80 italic leading-relaxed">
                    “{MULTIMEDIA_CONFIG.speakingAudio.transcript}”
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200/60 mt-4 flex items-center justify-between text-xs text-stone-500">
              <span>Format: MP3 Audio Log</span>
              <span className="text-amber-700 font-medium">SENA Aligned</span>
            </div>
          </div>

          {/* Card 2: Visual Learning */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-amber-300 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Visual Learning
                </h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  Images and visual resources help me connect vocabulary with real experiences.
                </p>
              </div>

              {/* Interactive Flashcard Explorer */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">
                    Flashcard {activeVocabCard + 1} of {vocabItems.length}
                  </span>
                  <span className="text-amber-700 font-medium">Interactive Card</span>
                </div>

                <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-100 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      {vocabItems[activeVocabCard].word}
                    </h4>
                    <span className="text-xs font-mono text-stone-500">
                      {vocabItems[activeVocabCard].phonetic}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-snug">
                    {vocabItems[activeVocabCard].definition}
                  </p>
                  <p className="text-[11px] text-stone-500 italic pt-1 border-t border-stone-200/60">
                    “{vocabItems[activeVocabCard].example}”
                  </p>
                </div>

                {/* Card Selector dots */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-1.5">
                    {vocabItems.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveVocabCard(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeVocabCard === i ? 'w-5 bg-amber-600' : 'bg-stone-300'
                        }`}
                        aria-label={`View card ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setActiveVocabCard((prev) => (prev + 1) % vocabItems.length)
                    }
                    className="text-xs font-semibold text-stone-700 hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>Next Card</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200/60 mt-4 flex items-center justify-between text-xs text-stone-500">
              <span>Contextual Memory</span>
              <span className="text-emerald-700 font-medium">B2 Vocabulary</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
