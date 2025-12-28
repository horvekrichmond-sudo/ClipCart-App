import * as React from 'react';
import VideoCard from '../components/VideoCard';
import { VideoAd, Category } from '../types';

interface HomeViewProps {
  videos: VideoAd[];
  selectedCategory: Category;
  onReset: () => void;
  onVideoClick: (id: string) => void;
}

const HomeView = ({ videos, selectedCategory, onReset, onVideoClick }: HomeViewProps) => {
  if (videos.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-32 text-zinc-500 px-10 text-center">
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <span className="text-4xl opacity-50 font-heading">🔭</span>
        </div>
        <h3 className="text-zinc-900 dark:text-white font-bold text-xl font-heading">Category empty</h3>
        <p className="text-sm mt-2 max-w-xs text-zinc-400 font-medium">No active campaigns for "{selectedCategory}" currently streaming.</p>
        <button 
          onClick={onReset}
          className="mt-8 bg-zinc-900 dark:bg-white px-8 py-3 rounded-full text-white dark:text-black font-bold text-sm border border-zinc-800 dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-lg active:scale-95 font-heading"
        >
          Reset explorer
        </button>
      </div>
    );
  }

  return (
    /* 
       Elastic Grid Update: 
       Enforcing exactly 3 columns on large screens (lg and above).
       - Mobile: 1 column (full width)
       - Tablet/Small Desktop: 2 columns
       - Desktop/Ultrawide: 3 columns
       This keeps thumbnails prominent and immersive even on 4K displays.
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      {videos.map(video => (
        <VideoCard key={video.id} ad={video} onClick={onVideoClick} />
      ))}
    </div>
  );
};

export default HomeView;