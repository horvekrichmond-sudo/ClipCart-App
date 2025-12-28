import * as React from 'react';
import { useState } from 'react';
import { Bookmark, Play, MoreVertical, Timer, CheckCircle2, ExternalLink } from 'lucide-react';
import { VideoAd } from '../types';
import { useTimer } from '../hooks/useTimer';

interface VideoCardProps {
  ad: VideoAd;
  onClick?: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ ad, onClick }) => {
  const [isClipped, setIsClipped] = useState(false);
  const timer = useTimer(ad.timeLeft);

  return (
    /* 
       Elastic Container: 
       Removed max-w-md to allow the card to expand and fill the grid track perfectly.
       Added 'min-w-0' to prevent flexbox/grid layout blowouts.
    */
    <div className="bg-transparent overflow-hidden mb-2 group relative flex flex-col h-full rounded-b-2xl md:rounded-none w-full min-w-0">
      {/* 16:9 Video Container */}
      <div 
        onClick={() => onClick?.(ad.id)}
        className="relative aspect-video bg-zinc-200 dark:bg-zinc-900 md:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-sm group-hover:shadow-xl group-hover:-translate-y-1"
      >
        <img 
          src={ad.thumbnail} 
          alt={ad.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-sm text-[11px] font-bold text-white font-heading tracking-wide">
          {ad.duration}
        </div>
      </div>

      {/* Meta Content Area */}
      <div className="px-1 pt-4 pb-2 flex gap-4">
        <div className="flex-shrink-0 mt-0.5 cursor-pointer">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-transparent hover:border-accent transition-all shadow-md">
            <img src={ad.brand.logo} alt={ad.brand.name} className="w-full h-full object-cover bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <h3 
              onClick={() => onClick?.(ad.id)}
              className="text-yt-textLight dark:text-yt-textDark font-bold leading-tight line-clamp-2 text-[17px] tracking-tight font-heading cursor-pointer hover:text-accent transition-colors"
            >
              {ad.title}
            </h3>
            <button className="p-1.5 -mr-1.5 text-zinc-400 hover:text-yt-textLight dark:hover:text-yt-textDark rounded-full transition-all flex-shrink-0">
              <MoreVertical size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-zinc-600 dark:text-zinc-400 text-sm font-semibold font-heading hover:text-yt-textLight dark:hover:text-yt-textDark transition-colors cursor-pointer">{ad.brand.name}</span>
            <CheckCircle2 size={13} strokeWidth={3} className="text-accent" />
          </div>
          <div className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {ad.industry} • 2.4M Views
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-1 pb-4 mt-2">
        <div className="flex items-center justify-between gap-3">
          <button 
            onClick={() => setIsClipped(!isClipped)} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs transition-all border-2 ${
              isClipped 
              ? 'bg-accent/10 border-accent text-accent' 
              : 'bg-zinc-100 dark:bg-zinc-900 border-transparent text-yt-textLight dark:text-yt-textDark hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Bookmark size={18} strokeWidth={3} fill={isClipped ? "currentColor" : "none"} />
            <span>{isClipped ? 'Clipped' : 'Clip'}</span>
          </button>
          <button className="flex-grow font-bold text-sm px-6 py-2.5 rounded-full bg-accent text-black hover:bg-accent-hover transition-all active:scale-95 font-heading shadow-lg shadow-accent/10 flex items-center justify-center gap-2">
            <span>{ad.ctaText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;