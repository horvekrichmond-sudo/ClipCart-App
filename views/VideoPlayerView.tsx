import * as React from 'react';
import { 
  Share2, MoreHorizontal, CheckCircle2, 
  Bookmark, Wallet, Sparkles, Check, X,
  Star, MessageCircle, Copy, MapPin, Calendar, 
  Cpu, ChevronDown, Info, ShieldCheck, Plus,
  Play, Pause, Volume2, VolumeX, Maximize, Settings, 
  Captions, PictureInPicture, RectangleHorizontal,
  ChevronRight, Laptop, Monitor,
  Frown, Meh, Smile, Laugh, Heart,
  RotateCcw, RotateCw
} from 'lucide-react';
import { VideoAd } from '../types';
import { useTimer } from '../hooks/useTimer';
import VideoCard from '../components/VideoCard';

interface VideoPlayerViewProps {
  video: VideoAd;
  onBack: () => void;
  relatedVideos: VideoAd[];
  onVideoClick: (id: string) => void;
}

const VideoPlayerView = ({ video, onBack, relatedVideos, onVideoClick }: VideoPlayerViewProps) => {
  const [isTracked, setIsTracked] = React.useState(false);
  const [isClipped, setIsClipped] = React.useState(false);
  const [showDescription, setShowDescription] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [isRatingOpen, setIsRatingOpen] = React.useState(false);
  
  // Custom Player State
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const ratingRef = React.useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [autoplay, setAutoplay] = React.useState(true);
  const [isTheaterMode, setIsTheaterMode] = React.useState(false);
  
  const timer = useTimer(video.timeLeft);
  const controlsTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleTimeUpdate = () => setCurrentTime(v.currentTime);
    const handleLoadedMetadata = () => setDuration(v.duration);
    const handleEnded = () => setIsPlaying(false);

    v.addEventListener('timeupdate', handleTimeUpdate);
    v.addEventListener('loadedmetadata', handleLoadedMetadata);
    v.addEventListener('ended', handleEnded);

    if (video.videoUrl) {
      v.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }

    return () => {
      v.removeEventListener('timeupdate', handleTimeUpdate);
      v.removeEventListener('loadedmetadata', handleLoadedMetadata);
      v.removeEventListener('ended', handleEnded);
    };
  }, [video.videoUrl]);

  // Handle clicks outside for desktop popover
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ratingRef.current && !ratingRef.current.contains(event.target as Node)) {
        setIsRatingOpen(false);
      }
    };
    if (isRatingOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isRatingOpen]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skip = (seconds: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = videoRef.current?.parentElement;
    if (container?.requestFullscreen) {
      container.requestFullscreen();
    }
  };

  const handleTrackToggle = () => {
    if (!isTracked) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    setIsTracked(!isTracked);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const RatingEmojis = () => (
    <div className="flex items-center justify-between gap-2 md:gap-4">
      {[
        { icon: Frown, label: "Bad" },
        { icon: Meh, label: "Meh" },
        { icon: Smile, label: "Okay" },
        { icon: Laugh, label: "Good" },
        { icon: Heart, label: "Elite" }
      ].map((item) => (
        <button 
          key={item.label}
          onClick={() => setIsRatingOpen(false)}
          className="flex flex-col items-center gap-2 group transition-all active:scale-90"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-[2.5px] border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-all group-hover:border-accent group-hover:bg-accent/5 group-hover:-translate-y-1 shadow-sm">
            <item.icon className="w-6 h-6 md:w-7 md:h-7 text-zinc-900 dark:text-zinc-100 group-hover:text-accent group-hover:scale-110 transition-all" strokeWidth={3} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-accent transition-colors">{item.label}</span>
        </button>
      ))}
    </div>
  );

  const actionBtnClass = "flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12px] md:text-[13px] transition-all active:scale-95 whitespace-nowrap bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 h-[36px] md:h-[38px] flex-shrink-0 text-yt-textLight dark:text-yt-textDark";

  return (
    <div className={`w-full animate-in fade-in duration-500 relative bg-white dark:bg-yt-dark min-h-screen ${isTheaterMode ? 'pt-0' : ''}`}>
      
      {/* RATING DRAWER (MOBILE ONLY) */}
      <div className="md:hidden">
        {isRatingOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]" onClick={() => setIsRatingOpen(false)} />
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 z-[120] rounded-t-[40px] px-8 pt-10 pb-12 animate-in slide-in-from-bottom duration-300 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
              <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mb-8" />
              <h3 className="text-xl font-black uppercase font-heading text-center mb-10 tracking-tight text-yt-textLight dark:text-yt-textDark">How's the Signal?</h3>
              <RatingEmojis />
              <button 
                onClick={() => setIsRatingOpen(false)}
                className="mt-12 w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase font-heading text-xs tracking-widest rounded-full"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-yt-textLight dark:bg-yt-textDark text-yt-light dark:text-yt-textDark px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="bg-accent p-1 rounded-full">
              <Check size={14} strokeWidth={4} className="text-black" />
            </div>
            <span className="text-sm font-bold font-heading">{video.brand.name} Pass added to Wallet</span>
          </div>
        </div>
      )}

      <div className={`flex flex-col ${isTheaterMode ? 'lg:flex-col' : 'lg:flex-row'} gap-0 md:gap-8 lg:items-start`}>
        <div className={`flex-1 min-w-0 ${isTheaterMode ? 'w-full max-w-full' : ''}`}>
          
          {/* VIDEO PLAYER FRAME */}
          <div 
            className={`group relative bg-black overflow-hidden shadow-2xl transition-all duration-500 cursor-default
              ${isTheaterMode ? 'w-full aspect-video sm:aspect-[21/9]' : 'sm:rounded-2xl aspect-video'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onClick={togglePlay}
          >
            {video.videoUrl ? (
              <video 
                ref={videoRef}
                key={video.videoUrl}
                src={video.videoUrl} 
                className="w-full h-full object-contain"
                autoPlay
                playsInline
                muted={isMuted}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-accent rounded-full animate-spin" />
                <span className="text-sm font-bold uppercase tracking-widest">Waking signal...</span>
              </div>
            )}

            {/* OVERLAY CONTROLS */}
            <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 cursor-none pointer-events-none'}`}>
              
              {/* TOP BAR (MOBILE ONLY: AUTOPLAY, CAPTIONS, SETTINGS) */}
              <div className="md:hidden absolute top-0 left-0 right-0 flex items-center justify-end p-4 gap-4 z-10">
                <div className="flex items-center gap-1">
                   {/* Pill Autoplay Switch */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setAutoplay(!autoplay); }}
                    className="relative flex items-center px-1 group h-8"
                  >
                    <div className={`w-[34px] h-[14px] rounded-full transition-colors duration-200 ${autoplay ? 'bg-white/40' : 'bg-white/10'}`}>
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all duration-200 shadow-md
                          ${autoplay ? 'translate-x-[16px] bg-white' : 'translate-x-[-2px] bg-zinc-400 group-hover:bg-zinc-300'}
                        `}
                      >
                        {autoplay ? (
                          <Play size={9} fill="black" strokeWidth={0} className="ml-0.5" />
                        ) : (
                          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                        )}
                      </div>
                    </div>
                  </button>
                  <button className="p-2 text-white/90 drop-shadow-sm"><Captions size={22} strokeWidth={2.5} /></button>
                  <button className="p-2 text-white/90 drop-shadow-sm"><Settings size={22} strokeWidth={2.5} /></button>
                </div>
              </div>

              {/* CENTER CONTROLS (NETFLIX STYLE) - MOBILE FOCUS */}
              <div className="absolute inset-0 flex items-center justify-center gap-16 md:gap-24">
                <button 
                  onClick={(e) => skip(-10, e)} 
                  className="p-3 text-white transition-transform active:scale-90 hover:scale-110"
                >
                  <div className="relative flex items-center justify-center">
                    <RotateCcw size={40} strokeWidth={2} />
                    <span className="absolute text-[10px] font-black mt-1">10</span>
                  </div>
                </button>
                
                <button 
                  onClick={togglePlay} 
                  className="p-5 text-white transition-all active:scale-90 hover:scale-105 bg-black/20 rounded-full backdrop-blur-sm border border-white/10"
                >
                  {isPlaying ? <Pause size={48} fill="white" strokeWidth={0} /> : <Play size={48} fill="white" strokeWidth={0} className="ml-1" />}
                </button>
                
                <button 
                  onClick={(e) => skip(10, e)} 
                  className="p-3 text-white transition-transform active:scale-90 hover:scale-110"
                >
                  <div className="relative flex items-center justify-center">
                    <RotateCw size={40} strokeWidth={2} />
                    <span className="absolute text-[10px] font-black mt-1">10</span>
                  </div>
                </button>
              </div>

              {/* BOTTOM BAR (RESPONSIVE) */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end">
                {/* Progress Bar Area */}
                <div className="px-3 pb-0 group/progress relative">
                  <div className="relative h-1.5 w-full flex items-center group-hover/progress:h-2.5 transition-all cursor-pointer">
                    <input 
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="absolute inset-0 w-full opacity-0 z-20 cursor-pointer"
                    />
                    <div className="absolute inset-x-0 h-[4px] group-hover/progress:h-[6px] bg-white/30 transition-all rounded-full" />
                    <div 
                      className="absolute inset-y-0 left-0 h-[4px] group-hover/progress:h-[6px] bg-red-600 transition-all flex justify-end items-center rounded-full"
                      style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                    >
                      <div className="absolute right-0 w-3.5 h-3.5 bg-red-600 rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform origin-center translate-x-1/2" />
                    </div>
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between px-3 h-14">
                  {/* Left: Time only on mobile, Plus volume on desktop */}
                  <div className="flex items-center gap-1">
                    <div className="hidden md:flex items-center">
                      <button onClick={togglePlay} className="p-2 text-white hover:scale-110 transition-transform focus:outline-none">
                        {isPlaying ? <Pause size={28} fill="white" strokeWidth={0} /> : <Play size={28} fill="white" strokeWidth={0} />}
                      </button>
                      <div className="flex items-center gap-0 group/volume">
                        <button onClick={toggleMute} className="p-2 text-white hover:scale-110 transition-transform">
                          {isMuted || volume === 0 ? <VolumeX size={26} /> : <Volume2 size={26} />}
                        </button>
                      </div>
                    </div>
                    <div className="text-[13px] font-medium text-white px-2 tracking-tight font-body tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  {/* Right: Fullscreen only on mobile, Plus more on desktop */}
                  <div className="flex items-center gap-1">
                    <div className="hidden md:flex items-center gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setAutoplay(!autoplay); }}
                        className="relative flex items-center px-3 group h-full"
                        title={autoplay ? 'Autoplay is on' : 'Autoplay is off'}
                      >
                        <div className={`w-[34px] h-[14px] rounded-full transition-colors duration-200 ${autoplay ? 'bg-white/40' : 'bg-white/10'}`}>
                          <div 
                            className={`absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all duration-200 shadow-md
                              ${autoplay ? 'translate-x-[16px] bg-white' : 'translate-x-[-2px] bg-zinc-400 group-hover:bg-zinc-300'}
                            `}
                          >
                            {autoplay ? (
                              <Play size={9} fill="black" strokeWidth={0} className="ml-0.5" />
                            ) : (
                              <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                            )}
                          </div>
                        </div>
                      </button>
                      <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                        <Captions size={24} strokeWidth={2.5} />
                      </button>
                      <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                        <Settings size={24} strokeWidth={2.5} />
                      </button>
                    </div>
                    <button onClick={toggleFullscreen} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                      <Maximize size={24} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className={`mt-0 py-4 relative bg-white dark:bg-yt-dark ${isTheaterMode ? 'max-w-5xl mx-auto' : ''}`}>
            {/* Title Section */}
            <div className="px-4 md:px-0 flex flex-col gap-0.5 mb-3">
              <h1 className="text-lg md:text-2xl font-bold text-yt-textLight dark:text-yt-textDark leading-tight tracking-tight font-heading">
                {video.title}
              </h1>
              
              <div className="flex md:hidden flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1">
                <span className="text-zinc-900 dark:text-zinc-100">{video.brand.name}</span>
                <span className="text-zinc-200 dark:text-zinc-800">•</span>
                <span className="text-zinc-400">124K Trackers</span>
                <span className="text-zinc-200 dark:text-zinc-800">•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={10} className="text-accent" /> Verified
                </span>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="w-full overflow-x-auto scrollbar-hide md:overflow-visible pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3 px-4 md:px-0 min-w-max md:min-w-0 w-full">
                
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-accent bg-white dark:bg-zinc-900 flex-shrink-0">
                    <img src={video.brand.logo} alt={video.brand.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="hidden md:flex flex-col justify-center min-w-0 mr-1 md:mr-3">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-yt-textLight dark:text-yt-textDark font-black text-sm md:text-base font-heading tracking-tight truncate leading-tight">{video.brand.name}</span>
                      <CheckCircle2 size={14} strokeWidth={3} className="text-accent flex-shrink-0" />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-500 tracking-tight leading-tight">124K trackers</span>
                  </div>
                  <button 
                    onClick={handleTrackToggle}
                    className={`flex-shrink-0 h-[36px] md:h-[38px] flex items-center justify-center px-5 rounded-full font-bold text-[12px] md:text-[13px] transition-all active:scale-95 ${
                      isTracked 
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500' 
                      : 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                    }`}
                  >
                    {isTracked ? 'Tracked' : 'Track Brand'}
                  </button>
                </div>

                <div className="hidden md:block flex-grow" />

                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                  <div className="relative flex-shrink-0" ref={ratingRef}>
                    <button 
                      onClick={() => setIsRatingOpen(!isRatingOpen)}
                      className={actionBtnClass}
                    >
                      <Star size={16} strokeWidth={2.5} fill="#ffba08" className="text-accent" />
                      <span>4.9</span>
                    </button>

                    {isRatingOpen && (
                      <div className="hidden md:block absolute bottom-full right-0 mb-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[24px] border border-zinc-200 dark:border-zinc-800 shadow-2xl min-w-[340px]">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 text-center">Rate this Signal</h4>
                           <RatingEmojis />
                           <div className="absolute top-full right-6 -mt-1 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45" />
                        </div>
                      </div>
                    )}
                  </div>

                  <button className={actionBtnClass}>
                    <MessageCircle size={16} strokeWidth={2.5} />
                    <span>Ask</span>
                  </button>

                  <button className={actionBtnClass}>
                    <Share2 size={16} strokeWidth={2.5} />
                    <span>Share</span>
                  </button>

                  <button 
                    onClick={() => setIsClipped(!isClipped)}
                    className={`${actionBtnClass} ${isClipped ? 'bg-accent/10 border-accent/30 text-accent' : ''}`}
                  >
                    <Bookmark size={16} strokeWidth={2.5} fill={isClipped ? "currentColor" : "none"} />
                    <span>{isClipped ? 'Saved' : 'Clip'}</span>
                  </button>

                  <button className={`${actionBtnClass} hidden sm:flex`}>
                    <Info size={16} strokeWidth={2.5} />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>

            {/* BANNERS */}
            <div className="mt-4 space-y-4 px-4 md:px-0">
              {(video.category === 'Flash Deals' || video.hasCoupon) && (
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-[24px] border border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-black shadow-lg">
                        <Sparkles size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-base font-black uppercase font-heading tracking-tight leading-none text-yt-textLight dark:text-yt-textDark">Active Promo: 20% OFF</h3>
                        <p className="text-[11px] font-bold text-zinc-500 tabular-nums mt-1">Claim within {timer} • One per user</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopyCode('CLIP-SAVE20')}
                      className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-black text-xs font-heading transition-all ${
                        copied ? 'bg-green-500 text-white' : 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                      }`}
                    >
                      {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} strokeWidth={3} />}
                      <span>{copied ? 'Code Copied' : 'CLIP-SAVE20'}</span>
                    </button>
                  </div>
                </div>
              )}

              {video.location && (
                <div className="bg-white dark:bg-zinc-900/50 p-5 rounded-[24px] border border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <MapPin size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-base font-black uppercase font-heading tracking-tight leading-none text-yt-textLight dark:text-yt-textDark">Near You: {video.location}</h3>
                        <p className="text-[11px] font-bold text-zinc-500 mt-1">Available for in-person demo today</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 md:flex-none px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-full font-black text-[10px] font-heading border border-zinc-100 dark:border-zinc-700 hover:bg-white transition-all">
                        Directions
                      </button>
                      <button className="flex-1 md:flex-none px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-[10px] font-heading flex items-center justify-center gap-2 shadow-md">
                        <Calendar size={14} /> Schedule
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DESCRIPTION BOX */}
            <div className="mt-6 px-4 md:px-0">
              <div 
                className="p-5 bg-zinc-50 dark:bg-zinc-900/30 rounded-[24px] border border-zinc-100 dark:border-zinc-800 transition-all cursor-pointer" 
                onClick={() => setShowDescription(!showDescription)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    <span className="text-yt-textLight dark:text-yt-textDark">Details</span>
                    <span>•</span>
                    <span>#CC-{video.id}829</span>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 text-zinc-400 ${showDescription ? 'rotate-180' : ''}`} />
                </div>
                <div className={`text-sm leading-relaxed font-medium text-zinc-600 dark:text-zinc-400 ${showDescription ? '' : 'line-clamp-2'}`}>
                  Experience the official {video.brand.name} {video.industry} premiere. This technical showcase highlights our latest innovations in high-performance {video.industry} design. 
                  {showDescription && (
                    <div className="mt-6 space-y-6 animate-in slide-in-from-top-4 duration-300">
                      <div>
                        <h4 className="font-black uppercase text-[11px] tracking-widest text-zinc-500 mb-2">Merchant Guarantee</h4>
                        <p>All items featured in this Clip are 100% authentic and eligible for Brand Wallet warranty protection. Tracking the brand provides instant notifications for limited restocks.</p>
                      </div>
                      <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 group/link">
                        <span className="font-bold text-sm text-yt-textLight dark:text-yt-textDark">Full Product Catalog</span>
                        <Plus size={16} className="text-accent group-hover/link:rotate-90 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR: RELATED SIGNALS */}
        <div className={`w-full ${isTheaterMode ? 'w-full px-4' : 'lg:w-[380px] xl:w-[420px] px-4 md:px-0'} flex-shrink-0 flex flex-col gap-6 mt-8 lg:mt-0 relative z-10 bg-white dark:bg-yt-dark`}>
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 px-1">Recommended Signals</h4>
            <div className={`grid ${isTheaterMode ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6 pb-20`}>
              {relatedVideos.map((rv) => (
                <div 
                  key={rv.id} 
                  onClick={() => onVideoClick(rv.id)}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-[18px] overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-lg">
                    <img 
                      src={rv.thumbnail} 
                      alt={rv.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/80 text-[10px] font-bold text-white font-heading">
                      {rv.duration}
                    </div>
                  </div>
                  <div className="flex gap-3 px-1">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-800 flex-shrink-0">
                      <img src={rv.brand.logo} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-yt-textLight dark:text-yt-textDark text-[13px] font-bold line-clamp-2 leading-snug font-heading group-hover:text-accent transition-colors tracking-tight">
                        {rv.title}
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-zinc-500 text-[11px] font-bold truncate">{rv.brand.name}</span>
                        <CheckCircle2 size={10} strokeWidth={3} className="text-accent flex-shrink-0" />
                      </div>
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                        {rv.industry} • 2.4M Views
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerView;