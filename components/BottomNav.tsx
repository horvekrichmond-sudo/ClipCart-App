
import * as React from 'react';
import { Home, MapPin, Wallet, Zap } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const tabs: { id: Tab; label: string; icon: React.ElementType | null; isProfile?: boolean }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'updates', label: 'Updates', icon: Zap },
    { id: 'profile', label: 'You', icon: null, isProfile: true },
  ];

  const userAvatar = "https://picsum.photos/id/64/100/100";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-yt-dark border-t border-zinc-200 dark:border-zinc-800 safe-bottom md:hidden transition-colors duration-300">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map(({ id, label, icon: Icon, isProfile }) => {
          const isActive = activeTab === id;
          
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex flex-col items-center justify-center w-full h-full gap-1 transition-all relative pt-1 outline-none"
            >
              {isProfile ? (
                <div className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                  isActive 
                    ? 'border-yt-textLight dark:border-yt-textDark scale-110' 
                    : 'border-transparent'
                }`}>
                  <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                Icon && <Icon 
                  size={24} 
                  className={`transition-all duration-200 ${
                    isActive 
                      ? 'text-yt-textLight dark:text-yt-textDark' 
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`} 
                  strokeWidth={isActive ? 3 : 2.5}
                  fill="none"
                />
              )}
              
              <span className={`text-[10px] font-bold transition-colors duration-200 ${
                isActive 
                  ? 'text-yt-textLight dark:text-yt-textDark' 
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}>
                {label}
              </span>

              {/* Minimalist active brand indicator dot */}
              {isActive && !isProfile && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-accent rounded-full animate-in zoom-in duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
