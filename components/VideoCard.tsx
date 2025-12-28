import * as React from 'react';
import { useState } from 'react';
import { Bookmark, Play, MoreVertical, Timer, CheckCircle2, ExternalLink } from 'lucide-react';
import { VideoAd } from '../types';
import { useTimer } from '../hooks/useTimer';

interface VideoCardProps {
  ad: VideoAd;
  onClick?: (id: string) => void;
}

// Fixed: Explicitly typed as React.FC to include standard JSX attributes like 'key' in the props interface
const VideoCard: React.FC<VideoCardProps> = ({ ad, onClick }) => {
  const [isClipped, setIsClipped] = useState(false);
  const timer = useTimer(ad.timeLeft);

  return (
    <div className="bg-transparent overflow-hidden mb-6 md:mb-8 group relative flex flex-col h-full rounded-b-2xl md:rounded-none w-full max-w-md">
      {/* 16:9 Video Container */}
      <div 
        onClick={() => onClick?.(ad.id)}
        className="relative aspect-video bg-zinc-200 dark:bg-zinc-900 md:rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-sm group-hover:shadow-lg"
      >
        <img 
          src={ad.thumbnail} 
          alt={ad.title}
          className="w-full h-full object-cover transition-transform duration-700 opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {ad.category === 'Flash Deals' && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-accent rounded-md text-[11px] font-bold shadow-lg text-black font-heading">
              <Timer size={14} strokeWidth={3} className="animate-spin-slow" />
              <span className="tabular-nums">Ends: {timer}</span>
            </div>
          )}
          {ad.category === 'Influencer' && ad.isAffiliate && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-md text-[11px] font-bold text-yt-textLight dark:text-yt-textDark shadow-sm font-heading">
              <ExternalLink size={14} strokeWidth={3} className="text-accent" /> Partner
            </div>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white font-heading">
          {ad.duration}
        </div>
      </div>

      {/* Meta Content Area */}
      <div className="px-1 pt-3 pb-2 flex gap-3">
        <div className="flex-shrink-0 mt-1 cursor-pointer">
          <img src={ad.brand.logo} alt={ad.brand.name} className="w-10 h-10 rounded-full object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800" />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <h3 
              onClick={() => onClick?.(ad.id)}
              className="text-yt-textLight dark:text-yt-textDark font-bold leading-tight line-clamp-2 text-base tracking-tight font-heading cursor-pointer hover:text-accent transition-colors"
            >
              {ad.title}
            </h3>
            <button className="p-1 text-zinc-400 hover:text-yt-textLight dark:hover:text-yt-textDark rounded-full transition-all flex-shrink-0">
              <MoreVertical size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-zinc-600 dark:text-zinc-400 text-xs font-medium font-heading">{ad.brand.name}</span>
            <CheckCircle2 size={12} strokeWidth={3} className="text-accent" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-1 pb-2 mt-auto">
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={() => setIsClipped(!isClipped)} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all border-2 ${
              isClipped 
              ? 'bg-accent/10 border-accent text-accent' 
              : 'bg-zinc-100 dark:bg-zinc-900 border-transparent text-yt-textLight dark:text-yt-textDark hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Bookmark size={16} strokeWidth={3} fill={isClipped ? "currentColor" : "none"} />
            <span>{isClipped ? 'Clipped' : 'Clip'}</span>
          </button>
          <button className="flex-grow font-bold text-xs px-5 py-2.5 rounded-full bg-accent text-black hover:opacity-90 transition-all active:scale-95 font-heading shadow-md shadow-accent/20">
            {ad.ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;