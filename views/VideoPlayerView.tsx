import * as React from 'react';
import { 
  ThumbsUp, ThumbsDown, Share2, MoreHorizontal, CheckCircle2, 
  Bookmark, Download, Wallet, Sparkles, Plus, Check, X
} from 'lucide-react';
import { VideoAd } from '../types';

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

  const handleTrackToggle = () => {
    if (!isTracked) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    setIsTracked(!isTracked);
  };

  return (
    <div className="max-w-[1700px] mx-auto px-0 md:px-6 lg:px-8 py-0 md:py-4 animate-in fade-in duration-500 relative bg-white dark:bg-yt-dark min-h-screen">
      
      {/* BRAND WALLET TOAST */}
      {showToast && (
        <div className="fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-yt-textLight dark:bg-yt-textDark text-yt-light dark:text-yt-dark px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="bg-accent p-1 rounded-full">
              <Check size={14} strokeWidth={4} className="text-black" />
            </div>
            <span className="text-sm font-bold font-heading">{video.brand.name} Pass added to your Wallet</span>
            <button onClick={() => setShowToast(false)} className="ml-2 opacity-50 hover:opacity-100 p-1">
              <X size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Main Video & Details */}
        <div className="flex-grow lg:w-[68%]">
          {/* 
            Video Player Container:
            - Mobile: Sticky top, z-index 40, full width.
            - Desktop: Relative, rounded, margin-top.
          */}
          <div className="sticky top-0 z-40 sm:relative aspect-video bg-black sm:rounded-xl overflow-hidden shadow-2xl border-b sm:border border-zinc-200 dark:border-zinc-800 group">
            <video 
              key={video.videoUrl}
              src={video.videoUrl} 
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </div>

          {/* Video Meta Information - Padded on mobile */}
          <div className="mt-4 px-4 md:px-0 relative z-10 bg-white dark:bg-yt-dark">
            <h1 className="text-xl md:text-2xl font-bold text-yt-textLight dark:text-yt-textDark leading-tight tracking-tight font-heading">
              {video.title}
            </h1>

            {/* Brand Bar & Actions */}
            <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 shadow-sm">
                  <img src={video.brand.logo} alt={video.brand.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col mr-2 md:mr-4 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-yt-textLight dark:text-yt-textDark font-bold text-base font-heading truncate">{video.brand.name}</span>
                    <CheckCircle2 size={14} strokeWidth={3} className="text-accent" />
                  </div>
                  <span className="text-zinc-500 text-xs font-medium truncate">1.2M Wallet Holders</span>
                </div>
                
                <button 
                  onClick={handleTrackToggle}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 font-heading flex items-center gap-2 whitespace-nowrap shadow-sm border-2 ${
                    isTracked 
                    ? 'bg-zinc-100 dark:bg-zinc-800 border-transparent text-yt-textLight dark:text-yt-textDark' 
                    : 'bg-yt-textLight dark:bg-yt-textDark border-transparent text-yt-light dark:text-yt-dark hover:opacity-90'
                  }`}
                >
                  {isTracked ? (
                    <>
                      <Wallet size={16} strokeWidth={3} className="text-accent" />
                      <span>Tracked</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} strokeWidth={3} />
                      <span>Track Brand</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-800 transition-colors">
                    <ThumbsUp size={18} strokeWidth={2.5} />
                    <span className="text-sm font-bold">1.2K</span>
                  </button>
                  <button className="px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                    <ThumbsDown size={18} strokeWidth={2.5} />
                  </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800">
                  <Share2 size={18} strokeWidth={2.5} />
                  <span className="text-sm font-bold">Share</span>
                </button>

                <button 
                  onClick={() => setIsClipped(!isClipped)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border-2 ${
                    isClipped ? 'bg-accent/10 border-accent text-accent' : 'bg-zinc-100 dark:bg-zinc-900 border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Bookmark size={18} strokeWidth={3} fill={isClipped ? "currentColor" : "none"} />
                  <span className="text-sm font-bold">Clip</span>
                </button>

                <button className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800">
                  <MoreHorizontal size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer group border border-transparent dark:border-zinc-800" onClick={() => setShowDescription(!showDescription)}>
              <div className="flex flex-col">
                <div className="flex items-center gap-3 text-sm font-bold mb-1">
                  <span>820K views</span>
                  <span>Jan 15, 2025</span>
                  <span className="text-accent font-heading tracking-tight">#{video.industry}</span>
                </div>
                <div className={`text-sm leading-relaxed font-medium ${showDescription ? '' : 'line-clamp-2'}`}>
                  Experience the latest high-fidelity commerce directly from {video.brand.name}. {video.title} is part of our official {video.industry} collection. 
                  {showDescription && (
                    <div className="mt-4 space-y-4">
                      <p>Stay ahead of the curve. Tracking {video.brand.name} in your Brand Wallet gives you exclusive early access to drops, member-only pricing, and direct support.</p>
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="font-black uppercase text-[10px] tracking-widest text-zinc-500">Official Links</span>
                        <a href="#" className="text-accent font-bold hover:underline flex items-center gap-1">Shop the Full Collection <Plus size={12} strokeWidth={3} /></a>
                        <a href="#" className="text-accent font-bold hover:underline flex items-center gap-1">Brand Sustainability Report <Plus size={12} strokeWidth={3} /></a>
                      </div>
                    </div>
                  )}
                </div>
                <button className="mt-2 text-sm font-bold text-zinc-500 group-hover:text-yt-textLight dark:group-hover:text-yt-textDark transition-colors">
                  {showDescription ? 'Show less' : '...more'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Recommendations - Padded on mobile */}
        <div className="lg:w-[32%] flex flex-col gap-4 px-4 md:px-0 mt-4 lg:mt-0 relative z-10 bg-white dark:bg-yt-dark">
          
          {/* Featured Deal Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border-2 border-accent shadow-xl shadow-accent/5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent rounded-xl flex-shrink-0 flex items-center justify-center text-black font-black text-2xl italic font-heading shadow-xl ring-2 ring-accent/20">
                DM
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles size={12} strokeWidth={3} className="text-accent" />
                  <span className="text-[10px] font-black uppercase text-accent tracking-widest">Sponsored Drop</span>
                </div>
                <h4 className="text-[15px] font-bold text-yt-textLight dark:text-yt-textDark truncate font-heading leading-none">The Creative Ad Summit</h4>
                <p className="text-xs text-zinc-500 mt-1 truncate">VIP access starts in 12 hours.</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-accent text-black py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity font-heading shadow-lg shadow-accent/20">
              Secure Invite
            </button>
          </div>

          {/* Recommendations List */}
          <div className="flex flex-col gap-3 mt-2">
            {relatedVideos.map((rv) => (
              <div 
                key={rv.id} 
                onClick={() => onVideoClick(rv.id)}
                className="flex gap-2 group cursor-pointer"
              >
                <div className="relative w-40 md:w-44 h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-transparent dark:border-zinc-800">
                  <img src={rv.thumbnail} alt={rv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white font-heading">{rv.duration}</div>
                </div>
                <div className="flex flex-col justify-start min-w-0 py-0.5">
                  <h4 className="text-yt-textLight dark:text-yt-textDark text-sm font-bold line-clamp-2 leading-snug group-hover:text-accent transition-colors font-heading tracking-tight">
                    {rv.title}
                  </h4>
                  <div className="flex flex-col mt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-zinc-500 text-xs font-medium truncate">{rv.brand.name}</span>
                      <CheckCircle2 size={12} strokeWidth={3} className="text-accent" />
                    </div>
                    <span className="text-zinc-500 text-xs font-medium mt-0.5">420K views • 2 weeks ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Extra bottom padding for mobile to ensure last items aren't cut off by navbar logic in Layout */}
          <div className="h-20 lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerView;