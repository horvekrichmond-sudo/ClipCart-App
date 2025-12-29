import * as React from 'react';
import { Home, MapPin, Wallet, Zap, Clock, ThumbsUp, ShoppingBag, Bookmark, LayoutDashboard, Store } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const primaryLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'wallet', label: 'My wallet', icon: Wallet },
    { id: 'updates', label: 'Updates', icon: Zap },
    { id: 'showroom', label: 'Featured Showroom', icon: Store },
    { id: 'merchant', label: 'Merchant Portal', icon: LayoutDashboard },
  ] as const;

  const secondaryLinks = [
    { id: 'history', label: 'History', icon: Clock },
    { id: 'liked', label: 'Liked ads', icon: ThumbsUp },
    { id: 'clips', label: 'Ad locker', icon: Bookmark },
    { id: 'shop', label: 'Direct shop', icon: ShoppingBag },
  ];

  return (
    <aside className="flex flex-col w-full h-full bg-white dark:bg-yt-dark overflow-y-auto scrollbar-hide py-6 px-3 transition-colors duration-300 border-r border-zinc-200 dark:border-zinc-800">
      <div className="space-y-1">
        {primaryLinks.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === id 
                ? 'bg-zinc-100 dark:bg-zinc-800 text-yt-textLight dark:text-yt-textDark font-bold text-sm' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-yt-textLight dark:hover:text-yt-textDark text-sm font-medium'
            }`}
          >
            <Icon 
              size={20} 
              className={activeTab === id ? 'text-yt-textLight dark:text-yt-textDark' : ''} 
              strokeWidth={activeTab === id ? 3 : 2.5}
              fill="none"
            />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
        <h4 className="px-4 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">Consumer hub</h4>
        {secondaryLinks.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-yt-textLight dark:hover:text-yt-textDark transition-all text-sm font-medium"
          >
            <Icon size={20} strokeWidth={2.5} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
            activeTab === 'profile' 
              ? 'bg-zinc-100 dark:bg-zinc-800 text-yt-textLight dark:text-yt-textDark border border-zinc-200 dark:border-zinc-700' 
              : 'text-zinc-400 hover:text-yt-textLight dark:hover:text-yt-textDark'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-black border-2 overflow-hidden shadow-sm transition-all ${
            activeTab === 'profile' ? 'border-yt-textLight dark:border-yt-textDark scale-105' : 'border-transparent'
          }`}>
            <img src="https://picsum.photos/id/64/100/100" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="text-xs font-bold truncate w-full tracking-tight">John Doe</span>
            <span className="text-[10px] font-bold text-accent">Pro member</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;