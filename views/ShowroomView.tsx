import * as React from 'react';
import { 
  CheckCircle2, Store, Package, MapPin, 
  HelpCircle, Wallet, Bookmark, ArrowRight,
  ExternalLink, Sparkles, ChevronLeft, ChevronRight,
  ShieldCheck, Clock, Navigation, Camera, AlertCircle,
  Upload, Volume2, VolumeX
} from 'lucide-react';
import { VideoAd } from '../types';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../constants';

interface ShowroomViewProps {
  brandId?: string;
  onVideoClick: (id: string) => void;
}

const ShowroomView = ({ brandId, onVideoClick }: ShowroomViewProps) => {
  const [activeTab, setActiveTab] = React.useState<'Showroom' | 'Catalog' | 'Locations' | 'Q&A'>('Showroom');
  const [isClipped, setIsClipped] = React.useState(false);
  const [isTracked, setIsTracked] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  
  // Custom Media State
  const [customBannerUrl, setCustomBannerUrl] = React.useState<string | null>(null);
  const [customLogoUrl, setCustomLogoUrl] = React.useState<string | null>(null);
  const [bannerError, setBannerError] = React.useState<string | null>(null);
  
  const bannerInputRef = React.useRef<HTMLInputElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Filter videos for the brand
  const brandVideos = MOCK_VIDEOS.filter(v => brandId ? v.brand.id === brandId : true);
  
  // Showcase Brand (Defaulting to Nike for demo)
  const brand = {
    name: 'Nike Performance',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=128&q=80',
    headerVideo: 'https://player.vimeo.com/external/494163966.hd.mp4?s=56e6d1c92b95b866c1e550c609c13554b726b216&profile_id=174',
    type: 'global',
    industry: 'Fashion & Sports',
    trackers: '1.2M',
    activeCoupon: 'SUMMER20',
    description: 'Pushing the boundaries of human potential through high-performance footwear and apparel.'
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setBannerError('Please upload a valid video file.');
      return;
    }

    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);
    
    video.onloadedmetadata = () => {
      const width = video.videoWidth;
      const height = video.videoHeight;
      
      if (height > width) {
        setBannerError('Please upload a landscape video.');
        URL.revokeObjectURL(objectUrl);
      } else {
        setBannerError(null);
        setCustomBannerUrl(objectUrl);
      }
    };
    video.src = objectUrl;
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setCustomLogoUrl(objectUrl);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const tabs = [
    { id: 'Showroom', icon: Store },
    { id: 'Catalog', icon: Package },
    { id: 'Locations', icon: MapPin },
    { id: 'Q&A', icon: HelpCircle },
  ] as const;

  const Shelf = ({ title, videos }: { title: string, videos: VideoAd[] }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    };

    return (
      <div className="mb-12 last:mb-20">
        <div className="flex items-center justify-between px-4 md:px-0 mb-4">
          <h3 className="text-lg font-black uppercase font-heading tracking-tight flex items-center gap-2">
            {title}
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
          </h3>
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide snap-x px-4 md:px-0 scroll-smooth"
        >
          {videos.map((v) => (
            <div key={v.id} className="w-[300px] md:w-[400px] flex-shrink-0 snap-start">
              <VideoCard ad={v} onClick={onVideoClick} />
            </div>
          ))}
          <button className="w-[200px] md:w-[300px] flex-shrink-0 snap-start aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-accent transition-all group">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <ArrowRight size={20} className="text-accent" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">View Catalog</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-yt-dark animate-in fade-in duration-700">
      
      {/* 1. CINEMATIC STOREFRONT HEADER - Taller Desktop Aspect Ratio (2.4/1) */}
      <div className="relative w-full aspect-[16/9] md:aspect-[2.4/1] bg-black overflow-hidden md:rounded-b-[40px] group shadow-2xl">
        <input 
          type="file" 
          ref={bannerInputRef}
          className="hidden" 
          accept="video/*" 
          onChange={handleBannerUpload} 
        />
        
        <video 
          ref={videoRef}
          key={customBannerUrl || brand.headerVideo}
          src={customBannerUrl || brand.headerVideo}
          className="w-full h-full object-cover opacity-60 scale-105"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 md:from-black/90 md:to-black/40" />
        
        {/* Sound Toggle Button (Top Left) */}
        <button 
          onClick={toggleSound}
          className="absolute top-4 left-4 md:top-6 md:left-6 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/80 transition-all hover:text-white hover:scale-110 shadow-lg z-10 md:opacity-0 group-hover:opacity-100"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Banner Edit Button (Desktop Only Absolute) */}
        <div className="absolute top-6 right-6 hidden md:flex flex-col items-end gap-2">
          <button 
            onClick={() => bannerInputRef.current?.click()}
            className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/50 opacity-0 group-hover:opacity-100 transition-all hover:text-white hover:scale-110 shadow-lg"
            title="Upload Showroom Banner"
          >
            <Camera size={20} />
          </button>
          {bannerError && (
            <div className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-right-4 flex items-center gap-2 shadow-2xl">
              <AlertCircle size={14} />
              {bannerError}
            </div>
          )}
        </div>

        {/* Brand Overlay (DESKTOP) */}
        <div className="absolute bottom-12 left-12 right-12 hidden md:flex items-end justify-between gap-6 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center gap-6">
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="w-32 h-32 rounded-full border-4 border-accent overflow-hidden shadow-2xl bg-white dark:bg-zinc-900 flex-shrink-0 cursor-pointer group/logo relative"
            >
              <img src={customLogoUrl || brand.logo} alt={brand.name} className="w-full h-full object-cover transition-transform group-hover/logo:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity">
                <Upload size={24} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-5xl font-black text-white font-heading tracking-tighter leading-none drop-shadow-lg">{brand.name}</h1>
                <CheckCircle2 className="text-accent w-8 h-8 drop-shadow-lg" strokeWidth={3} />
              </div>
              <div className="flex items-center gap-3 mt-2 text-zinc-300 text-xs font-black uppercase tracking-widest">
                <span>{brand.industry}</span>
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></span>
                <span className="text-accent font-black">{brand.trackers} Trackers</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsTracked(!isTracked)}
              className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full font-black uppercase font-heading text-xs tracking-widest transition-all ${
                isTracked ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' : 'bg-accent text-black shadow-xl shadow-accent/20 hover:scale-105 active:scale-95'
              }`}
            >
              <Wallet size={18} strokeWidth={3} />
              {isTracked ? 'Tracked' : 'Track Brand'}
            </button>
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-all">
              <ExternalLink size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Mobile Banner Edit Button Overlay */}
        <button 
          onClick={() => bannerInputRef.current?.click()}
          className="md:hidden absolute top-4 right-4 p-2.5 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-white/80 active:scale-95"
        >
          <Camera size={18} />
        </button>
      </div>

      {/* 1b. BRAND DETAILS BELOW BANNER (MOBILE ONLY) */}
      <div className="md:hidden px-4 pt-5 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="w-16 h-16 rounded-full border-2 border-accent bg-white dark:bg-zinc-900 overflow-hidden flex-shrink-0 relative active:scale-95 transition-transform"
            >
              <img src={customLogoUrl || brand.logo} alt="" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 left-0 bg-black/40 h-1/3 flex items-center justify-center">
                <Camera size={10} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-black text-yt-textLight dark:text-yt-textDark font-heading tracking-tight leading-none">{brand.name}</h1>
                <CheckCircle2 className="text-accent w-4 h-4" strokeWidth={3} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1.5">
                <span className="text-accent">{brand.trackers} Trackers</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsTracked(!isTracked)}
            className={`flex items-center justify-center p-2.5 rounded-full transition-all active:scale-90 ${
              isTracked ? 'bg-zinc-100 dark:bg-zinc-800 text-accent' : 'bg-accent text-black shadow-lg shadow-accent/20'
            }`}
          >
            <Wallet size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-8">
        
        {/* 2. ACTIVE DEAL TICKER */}
        {brand.activeCoupon && (
          <div className="mt-4 md:-mt-6 relative z-10 px-4 md:px-0">
            <div className="bg-accent rounded-2xl md:rounded-full p-1 shadow-2xl overflow-hidden border border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 md:py-2 gap-4">
                <div className="flex items-center gap-4 text-black">
                  <div className="bg-black text-accent p-1.5 rounded-lg animate-pulse">
                    <Sparkles size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="font-black font-heading text-sm uppercase tracking-tight">Active Drop Alert: {brand.activeCoupon}</span>
                    <p className="text-[10px] font-bold opacity-70 leading-none mt-0.5">Valid for the next 48 hours on all new arrivals.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => setIsClipped(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg"
                  >
                    {isClipped ? 'Clipped' : 'Clip Coupon'}
                    <Bookmark size={14} fill={isClipped ? 'currentColor' : 'none'} />
                  </button>
                  <button className="hidden md:flex items-center gap-1.5 text-black font-black text-[10px] uppercase tracking-widest ml-4 hover:translate-x-1 transition-transform">
                    Shop Now <ArrowRight size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SMART TABS */}
        <div className="mt-8 md:mt-10 px-4 md:px-0">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-all whitespace-nowrap px-1 ${
                  activeTab === tab.id 
                    ? 'border-accent text-yt-textLight dark:text-yt-textDark font-black' 
                    : 'border-transparent text-zinc-400 font-bold hover:text-zinc-600'
                }`}
              >
                <tab.icon size={18} strokeWidth={activeTab === tab.id ? 3 : 2.5} />
                <span className="text-xs uppercase tracking-widest">{tab.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. CONTENT SHELVES */}
        <div className="py-8 md:py-12 min-h-[500px]">
          {activeTab === 'Showroom' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Shelf title="New Drops" videos={MOCK_VIDEOS.filter(v => v.isNewDrop)} />
              <Shelf title="Showcase & Trailers" videos={MOCK_VIDEOS.filter(v => v.style === 'Cinematic')} />
              <Shelf title="Tutorials & Guides" videos={MOCK_VIDEOS.filter(v => v.style === 'Tutorial')} />
              <Shelf title="Influencer Signals" videos={MOCK_VIDEOS.filter(v => v.style === 'UGC')} />
            </div>
          )}

          {activeTab === 'Catalog' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
              {brandVideos.map(v => (
                <VideoCard key={v.id} ad={v} onClick={onVideoClick} />
              ))}
            </div>
          )}

          {activeTab === 'Locations' && (
            <div className="px-4 md:px-0 animate-in fade-in duration-500">
              <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-[40px] aspect-video border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
                 <div className="relative z-10 flex flex-col items-center text-center px-12">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-black shadow-xl mb-6">
                      <Navigation size={32} strokeWidth={3} className="animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-black uppercase font-heading tracking-tight mb-2">Nearby Stores</h3>
                    <p className="text-zinc-500 text-sm font-medium mb-8 max-w-sm">We've found 3 physical locations near your current signal.</p>
                    <div className="flex gap-4">
                      <button className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">Open Map</button>
                      <button className="px-6 py-2.5 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full font-black text-[10px] uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">List View</button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'Q&A' && (
            <div className="max-w-3xl mx-auto px-4 md:px-0 space-y-4">
              {[
                { q: "Do the Phantom Series run true to size?", a: "Yes, we recommend ordering your standard athletic shoe size. If you have wide feet, half a size up is suggested for maximum comfort." },
                { q: "What is the return policy for Drops?", a: "All Showroom Drops can be returned within 30 days if clipped with a valid ClipCart signal. Keep the digital receipt in your wallet." },
                { q: "When is the next colorway releasing?", a: "Track our brand to get an instant notification! We have a new colorway dropping next Friday at 10 AM EST." }
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2 flex items-center gap-3">
                    <span className="text-accent">Q:</span> {faq.q}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    <span className="text-zinc-400 font-black mr-2">A:</span> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. STICKY SHOP FOOTER (MOBILE ONLY) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 md:hidden bg-gradient-to-t from-white dark:from-yt-dark via-white/80 dark:via-yt-dark/80 to-transparent">
        <button className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase font-heading text-sm tracking-widest shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
          Visit Website
          <ExternalLink size={18} strokeWidth={3} />
        </button>
      </div>

    </div>
  );
};

export default ShowroomView;