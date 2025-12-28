
import * as React from 'react';
import { useState, useMemo } from 'react';
import { MapPin, Wallet, Zap, Sparkles, Ticket } from 'lucide-react';
import { Layout } from './components';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import VideoPlayerView from './views/VideoPlayerView';
import MerchantPortalView from './views/MerchantPortalView';
import CreateModal from './components/CreateModal';
import { MOCK_VIDEOS } from './constants';
import { Tab, Category, VideoAd } from './types';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredVideos = useMemo(() => {
    let result = [...MOCK_VIDEOS];

    if (selectedCategory === 'All') return result;

    switch (selectedCategory) {
      case '⚡ Ending Soon':
        return result.filter(v => !!v.timeLeft);
      case '✂️ Coupons':
        return result.filter(v => !!v.hasCoupon);
      case '🎬 Cinematic':
        return result.filter(v => v.style === 'Cinematic');
      case '📱 Tech':
        return result.filter(v => v.industry === 'Tech');
      case '👗 Fashion':
        return result.filter(v => v.industry === 'Fashion');
      case '🏠 Home':
        return result.filter(v => v.industry === 'Home');
      case '🚀 New Drops':
        return result.filter(v => !!v.isNewDrop);
      case '📍 Near Me':
        return result.filter(v => !!v.location);
      default:
        return result;
    }
  }, [selectedCategory]);

  const handleVideoClick = (id: string) => {
    setSelectedVideoId(id);
    setActiveTab('video-player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFeed = () => {
    setSelectedVideoId(null);
    setActiveTab('home');
  };

  const selectedVideo = useMemo(() => 
    MOCK_VIDEOS.find(v => v.id === selectedVideoId), 
  [selectedVideoId]);

  const relatedVideos = useMemo(() => 
    MOCK_VIDEOS.filter(v => v.id !== selectedVideoId), 
  [selectedVideoId]);

  const handleReset = () => setSelectedCategory('All');

  return (
    <>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('home');
          setSelectedVideoId(null);
        }}
        onLogoClick={handleBackToFeed}
        onCreateClick={() => setIsCreateModalOpen(true)}
      >
        {activeTab === 'home' && (
          <HomeView 
            videos={filteredVideos} 
            selectedCategory={selectedCategory} 
            onReset={handleReset} 
            onVideoClick={handleVideoClick}
          />
        )}

        {activeTab === 'video-player' && selectedVideo && (
          <VideoPlayerView 
            video={selectedVideo} 
            onBack={handleBackToFeed}
            relatedVideos={relatedVideos}
            onVideoClick={handleVideoClick}
          />
        )}

        {activeTab === 'merchant' && <MerchantPortalView />}

        {activeTab === 'nearby' && (
          <div className="max-w-4xl mx-auto p-8 text-center pt-10">
            <h2 className="text-zinc-900 dark:text-white text-4xl font-black mb-4 tracking-tighter uppercase font-heading">Happening Nearby</h2>
            <p className="text-zinc-500 text-lg font-medium font-body mb-10">Local drops and events in your area.</p>
            <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-[40px] aspect-[16/10] md:aspect-[21/9] border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 opacity-20 grayscale bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
               <div className="relative z-10 flex flex-col items-center">
                  <MapPin size={56} strokeWidth={3} className="text-accent mb-4 animate-bounce" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Map Interface Loading</span>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="max-w-4xl mx-auto p-8 text-center pt-10">
            <h2 className="text-zinc-900 dark:text-white text-4xl font-black mb-4 tracking-tighter uppercase font-heading">My Stash</h2>
            <p className="text-zinc-500 text-lg font-medium font-body mb-8">Ready to redeem? Your active rewards and tickets.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-accent to-[#faa307] p-8 rounded-[32px] text-left text-black shadow-2xl relative overflow-hidden group cursor-pointer border-2 border-white/20">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all duration-700" />
                <Wallet size={36} strokeWidth={3} className="mb-6" />
                <h3 className="text-2xl font-black uppercase font-heading">VIP Drop Pass</h3>
                <p className="text-black/70 text-sm mt-2 font-bold">Nike Phantom Series • NYC Pop-up</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-black/10 px-3 py-1 rounded-full">Expires in 2h</span>
                  <span className="text-lg font-black font-heading tracking-widest">#8291-XA</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] text-left border-2 border-zinc-200 dark:border-zinc-800 shadow-xl group cursor-pointer hover:border-accent transition-colors">
                <Zap size={36} strokeWidth={3} className="mb-6 text-accent" />
                <h3 className="text-2xl font-black uppercase font-heading dark:text-white">20% Off Sony</h3>
                <p className="text-zinc-500 text-sm mt-2 font-bold">Valid at all authorized retailers</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-500">Global Code</span>
                  <span className="text-lg font-black font-heading tracking-widest text-accent">SONY-CLIP20</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="max-w-4xl mx-auto p-8 pt-10">
             <div className="flex items-center justify-between mb-8">
              <h2 className="text-zinc-900 dark:text-white text-3xl font-black tracking-tighter uppercase font-heading">Direct Signal</h2>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Live Updates</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { brand: 'Nike', action: 'announced a new Drop', time: '2m ago', icon: <Sparkles size={18} strokeWidth={3} className="text-black" /> },
                { brand: 'Sony', action: 'updated your coupon status', time: '1h ago', icon: <Ticket size={18} strokeWidth={3} className="text-white" /> },
                { brand: 'Luxe Motors', action: 'invites you to a Test Drive', time: '5h ago', icon: <MapPin size={18} strokeWidth={3} className="text-white" /> }
              ].map((update, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900/50 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-accent transition-all cursor-pointer group">
                  <div className={`w-12 h-12 rounded-xl ${i === 0 ? 'bg-accent' : 'bg-zinc-900 dark:bg-zinc-800'} flex items-center justify-center shadow-sm`}>
                    {update.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-900 dark:text-white font-black text-sm font-heading">{update.brand}</span>
                      <span className="text-zinc-400 text-xs font-medium truncate">{update.action}</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-accent mt-1">{update.time}</div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && <ProfileView />}
      </Layout>

      <CreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
};

export default App;
