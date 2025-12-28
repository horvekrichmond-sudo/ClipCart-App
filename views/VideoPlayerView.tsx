import * as React from 'react';
import { 
  Share2, MoreHorizontal, CheckCircle2, 
  Bookmark, Wallet, Sparkles, Plus, Check, X,
  Star, MessageCircle, Copy, MapPin, Calendar, 
  Cpu, ChevronDown, Info, ShieldCheck
} from 'lucide-react';
import { VideoAd } from '../types';
import { useTimer } from '../hooks/useTimer';

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
  const timer = useTimer(video.timeLeft);

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

  // Standard height and padding class for all commerce buttons
  const buttonBaseClass = "flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm font-heading transition-all active:scale-95 whitespace-nowrap border h-[40px]";

  return (
    <div className="max-w-[1700px] mx-auto px-0 md:px-6 lg:px-8 py-0 md:py-4 animate-in fade-in duration-500 relative bg-white dark:bg-yt-dark min-h-screen">
      
      {/* COMMERCE TOAST */}
      {showToast && (
        <div className="fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-yt-textLight dark:bg-yt-textDark text-yt-light dark:text-yt-dark px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="bg-accent p-1 rounded-full">
              <Check size={14} strokeWidth={4} className="text-black" />
            </div>
            <span className="text-sm font-bold font-heading">{video.brand.name} Pass added to Wallet</span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Main Player & Commerce Info */}
        <div className="flex-grow lg:w-[68%]">
          {/* Sticky Video Player */}
          <div className="sticky top-0 z-40 sm:relative aspect-video bg-black sm:rounded-2xl overflow-hidden shadow-2xl border-b sm:border border-zinc-200 dark:border-zinc-800 group">
            <video 
              key={video.videoUrl}
              src={video.videoUrl} 
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </div>

          <div className="mt-4 px-4 md:px-0 relative z-10 bg-white dark:bg-yt-dark">
            {/* Title & Trust Signals */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xl md:text-2xl font-bold text-yt-textLight dark:text-yt-textDark leading-tight tracking-tight font-heading">
                {video.title}
              </h1>
              <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-accent" /> Verified Merchant</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1"><Info size={12} /> Response: &lt; 15m</span>
              </div>
            </div>

            {/* Brand Header & Primary CTA */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 shadow-lg shadow-accent/10">
                  <img src={video.brand.logo} alt={video.brand.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-yt-textLight dark:text-yt-textDark font-black text-lg font-heading tracking-tight">{video.brand.name}</span>
                    <CheckCircle2 size={16} strokeWidth={3} className="text-accent" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#ffba08" className="text-accent" />)}
                    </div>
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-tighter">4.9 (12k Orders)</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleTrackToggle}
                  className={`${buttonBaseClass} ml-2 border-transparent uppercase tracking-wider ${
                    isTracked 
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500' 
                    : 'bg-yt-textLight dark:bg-yt-textDark text-yt-light dark:text-yt-dark hover:bg-accent hover:text-black shadow-md'
                  }`}
                >
                  {isTracked ? <Wallet size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
                  <span>{isTracked ? 'Tracked' : 'Track Brand'}</span>
                </button>
              </div>

              {/* COMMERCE ACTIONS (Replacing social ones) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button className={`${buttonBaseClass} bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800`}>
                  <Star size={18} strokeWidth={2.5} className="text-accent" />
                  <span>Rate</span>
                </button>

                <button className={`${buttonBaseClass} bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800`}>
                  <MessageCircle size={18} strokeWidth={2.5} />
                  <span>Ask</span>
                </button>

                <button className={`${buttonBaseClass} bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800`}>
                  <Share2 size={18} strokeWidth={2.5} />
                  <span>Send Deal</span>
                </button>

                <button 
                  onClick={() => setIsClipped(!isClipped)}
                  className={`${buttonBaseClass} ${
                    isClipped 
                    ? 'bg-accent border-accent text-black' 
                    : 'bg-zinc-100 dark:bg-zinc-900 border-transparent hover:bg-accent/10'
                  }`}
                >
                  <Bookmark size={18} strokeWidth={3} fill={isClipped ? "currentColor" : "none"} />
                  <span>{isClipped ? 'Clipped' : 'Save Deal'}</span>
                </button>

                <button className="flex items-center justify-center w-10 h-10 flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800">
                  <MoreHorizontal size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* DYNAMIC COMMERCE CARDS */}
            <div className="mt-8 space-y-4">
              
              {/* Card type A: Flash Deal / Coupon */}
              {(video.category === 'Flash Deals' || video.hasCoupon) && (
                <div className="bg-gradient-to-r from-accent/20 to-transparent p-6 rounded-3xl border-l-4 border-accent">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-black shadow-xl">
                        <Sparkles size={24} strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black uppercase italic font-heading tracking-tight">Active Promo: 20% OFF</h3>
                        <p className="text-sm font-bold text-zinc-500 tabular-nums">Claim within {timer} • One per user</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopyCode('CLIP-SAVE20')}
                      className={`flex items-center gap-2 px-8 py-3 rounded-full font-black text-sm font-heading transition-all ${
                        copied ? 'bg-green-500 text-white' : 'bg-black dark:bg-white text-white dark:text-black hover:scale-105 shadow-lg'
                      }`}
                    >
                      {copied ? <Check size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={3} />}
                      <span>{copied ? 'Code Copied' : 'CLIP-SAVE20'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Card type B: Local Event / Location */}
              {video.location && (
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <MapPin size={24} strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black uppercase italic font-heading tracking-tight">Near You: {video.location}</h3>
                        <p className="text-sm font-bold text-zinc-500">Available for in-person demo today</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-6 py-3 bg-white dark:bg-zinc-800 rounded-full font-black text-xs font-heading border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 transition-all">
                        Get Directions
                      </button>
                      <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-xs font-heading flex items-center gap-2 shadow-md">
                        <Calendar size={14} /> Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Card type C: Technical Specs */}
              {video.specs && (
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                   <div className="flex items-center gap-3 mb-4">
                      <Cpu size={20} className="text-accent" strokeWidth={3} />
                      <h3 className="font-black uppercase italic font-heading tracking-wider">Technical Specifications</h3>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {video.specs.map(spec => (
                        <div key={spec} className="bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold border border-zinc-100 dark:border-zinc-700 flex items-center justify-between">
                          <span>{spec}</span>
                          <Check size={12} className="text-green-500" strokeWidth={3} />
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>

            {/* Description Expander */}
            <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl cursor-pointer group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all" onClick={() => setShowDescription(!showDescription)}>
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    <span>Campaign Details</span>
                    <span>•</span>
                    <span>Official ID: #{video.id}829</span>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`} />
                </div>
                <div className={`text-sm leading-relaxed font-medium text-zinc-600 dark:text-zinc-400 ${showDescription ? '' : 'line-clamp-2'}`}>
                  Experience the official {video.brand.name} {video.industry} premiere. This technical showcase highlights our latest innovations in high-performance {video.industry} design.
                  {showDescription && (
                    <div className="mt-6 space-y-6 animate-in slide-in-from-top-4 duration-300">
                      <div>
                        <h4 className="font-black uppercase text-[11px] tracking-widest text-zinc-500 mb-2">Merchant Guarantee</h4>
                        <p>All items featured in this Clip are 100% authentic and eligible for Brand Wallet warranty protection. Tracking the brand provides instant notifications for limited restocks.</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 group/link">
                          <span className="font-bold text-sm">Full Product Catalog</span>
                          <Plus size={16} className="text-accent group-hover/link:rotate-90 transition-transform" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 group/link">
                          <span className="font-bold text-sm">Sustainability & Ethics Report</span>
                          <Plus size={16} className="text-accent group-hover/link:rotate-90 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Related Content */}
        <div className="lg:w-[32%] flex flex-col gap-6 px-4 md:px-0 mt-4 lg:mt-0 relative z-10 bg-white dark:bg-yt-dark">
          
          {/* Up Next / Related Clips */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 px-2">Related Signals</h4>
            <div className="flex flex-col gap-4">
              {relatedVideos.map((rv) => (
                <div 
                  key={rv.id} 
                  onClick={() => onVideoClick(rv.id)}
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="relative w-40 h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-accent transition-all shadow-sm">
                    <img src={rv.thumbnail} alt={rv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white font-heading">{rv.duration}</div>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="text-yt-textLight dark:text-yt-textDark text-sm font-bold line-clamp-2 leading-tight font-heading group-hover:text-accent transition-colors tracking-tight">
                      {rv.title}
                    </h4>
                    <div className="flex flex-col mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-500 text-xs font-bold truncate">{rv.brand.name}</span>
                        <CheckCircle2 size={12} strokeWidth={3} className="text-accent" />
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                         <div className="flex">
                           <Star size={8} fill="#ffba08" className="text-accent" />
                           <Star size={8} fill="#ffba08" className="text-accent" />
                         </div>
                         <span className="text-zinc-400 text-[9px] font-bold">Recommended Signal</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-20 lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerView;