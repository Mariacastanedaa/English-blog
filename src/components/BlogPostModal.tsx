import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../types/blog';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Volume2,
  VolumeX,
  Share2,
  Camera,
  Footprints,
  BookMarked,
  Compass,
  HelpCircle,
  Check,
  Quote,
  Play,
  Pause,
  RotateCcw,
  Headphones
} from 'lucide-react';

interface BlogPostModalProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onClose: () => void;
  onNavigatePost: (post: BlogPost) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  allPosts,
  onClose,
  onNavigatePost,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Reset audio state when post changes
  useEffect(() => {
    setIsPlayingAudio(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [post.id, playbackRate]);

  // Handle escape key and arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevPost) onNavigatePost(prevPost);
      if (e.key === 'ArrowRight' && nextPost) onNavigatePost(nextPost);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevPost, nextPost, onClose, onNavigatePost]);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((err) => {
        console.error('Audio playback error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 0.9];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackRate(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlayingAudio) {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const travelEssentials = [
    {
      title: 'Camera',
      desc: 'To capture natural light, local architecture, and unscripted moments.',
      icon: Camera,
    },
    {
      title: 'Comfortable shoes',
      desc: 'Essential for walking historic streets, colonial alleys, and mountain trails.',
      icon: Footprints,
    },
    {
      title: 'A good book',
      desc: 'A companion for quiet train rides, bus journeys, and cafe afternoons.',
      icon: BookMarked,
    },
    {
      title: 'Curiosity',
      desc: 'The open mindset that turns every trip into a genuine learning experience.',
      icon: Compass,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
    >
      {/* Hidden audio element */}
      {post.audioUrl && (
        <audio
          ref={audioRef}
          src={post.audioUrl}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlayingAudio(false)}
        />
      )}

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto">
        
        {/* Sticky Top Header Inside Modal */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-stone-100">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-950 active:scale-95 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Posts</span>
          </button>

          <div className="flex items-center gap-2">
            {post.audioUrl && (
              <button
                onClick={togglePlayAudio}
                title={isPlayingAudio ? 'Pause Narration' : 'Listen to Maria’s Audio'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  isPlayingAudio
                    ? 'bg-amber-600 text-white border-amber-700 shadow-sm animate-pulse'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>Listen in English</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
              title="Copy Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Body */}
        <article className="p-6 sm:p-10 md:p-12 space-y-8">
          
          {/* Metadata & Headline Area */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="font-semibold text-amber-800 uppercase tracking-wider">
                {post.category}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {post.date}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {post.readingTime}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{post.wordCount} words (B1-B2 Level)</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-[1.2] text-balance">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 italic border-l-2 border-amber-600 pl-4 py-1">
              {post.excerpt}
            </p>
          </div>

          {/* Interactive Audio Player Component */}
          {post.audioUrl && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-stone-50 to-amber-50/40 border border-amber-200/80 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-600/10 text-amber-800 flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">
                      Oral Evidence Audio · Maria’s Voice
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      GA7-240202501-AA1-EV03 · Speaking Evidence in English
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleSpeed}
                    className="px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
                    title="Change speed"
                  >
                    {playbackRate}x
                  </button>

                  <button
                    onClick={restartAudio}
                    className="p-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-white/80 transition-colors"
                    title="Restart Audio"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-white/80 transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Player Controls & Scrubber */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={togglePlayAudio}
                  className="w-10 h-10 rounded-full bg-stone-900 hover:bg-amber-700 text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all"
                  aria-label={isPlayingAudio ? 'Pause audio' : 'Play audio'}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5 fill-white" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    aria-label="Seek audio"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-stone-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-stone-200/90 aspect-[16/9] bg-stone-100 shadow-sm relative">
            <img
              src={post.featuredImage}
              alt={post.altText || post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {post.altText && (
              <div className="absolute bottom-0 inset-x-0 bg-stone-900/60 backdrop-blur-sm p-3 text-[11px] text-stone-200 text-center">
                {post.altText}
              </div>
            )}
          </div>

          {/* Full Article Text */}
          <div className="prose prose-stone max-w-none text-base sm:text-lg text-stone-700 leading-relaxed space-y-6">
            {post.fullContent.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlighted Quote Callout */}
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-amber-50/70 border-l-4 border-amber-600 relative overflow-hidden">
            <Quote className="w-10 h-10 text-amber-200 absolute -top-1 -right-1 pointer-events-none" />
            <blockquote className="font-serif italic text-lg sm:text-xl text-stone-900 font-medium leading-snug">
              “{post.highlightQuote}”
            </blockquote>
            <span className="block mt-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              — Personal Reflection · Maria Castañeda
            </span>
          </div>

          {/* Special Component 1: Travel Essentials (Post 3) */}
          {post.specialComponentType === 'travel-essentials' && (
            <div className="mt-8 pt-8 border-t border-stone-200">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Curated Travel Gear
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  My Travel Essentials
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Four non-negotiable items I pack for every journey across Colombia and beyond.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {travelEssentials.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-white hover:border-amber-300 hover:shadow-sm transition-all text-center sm:text-left space-y-2"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto sm:mx-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Highlight Question: Crime & Punishment (Post 6) */}
          {post.specialComponentType === 'crime-reflection' && (
            <div className="mt-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-amber-50 border border-amber-200/80 text-center">
                <HelpCircle className="w-8 h-8 text-amber-700 mx-auto mb-2" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  “Should punishment only punish, or should it also help people change?”
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-2">
                  Ethical discussion prompt reflecting on restorative justice, victim dignity, and community safety.
                </p>
              </div>
            </div>
          )}

          {/* Academic Evidence Footer Box */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
            <div>
              <span className="font-semibold text-stone-800">SENA English Learning Evidence:</span>
              <span className="ml-1 text-stone-500">GA7-240202501-AA1-EV03 – Blog Post</span>
            </div>
            <span className="text-stone-400">Word Count: {post.wordCount} words</span>
          </div>

          {/* Navigation Controls: Prev / Next / Return */}
          <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevPost ? (
              <button
                onClick={() => onNavigatePost(prevPost)}
                className="flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-900 group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-[10px] text-stone-400 block uppercase">Previous Post</span>
                  <span className="font-serif line-clamp-1">{prevPost.title}</span>
                </div>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm"
            >
              Back to Blog Grid
            </button>

            {nextPost ? (
              <button
                onClick={() => onNavigatePost(nextPost)}
                className="flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-900 group text-right"
              >
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block uppercase">Next Post</span>
                  <span className="font-serif line-clamp-1">{nextPost.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div />
            )}
          </div>

        </article>
      </div>
    </div>
  );
};
