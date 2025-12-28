import * as React from 'react';
import { 
  Search, Bell, Menu, User, Moon, Sun, 
  LogOut, Wallet, ChevronRight, Mic, Plus
} from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  onCreateClick?: () => void;
}

const Header = ({ onMenuClick, onLogoClick, onCreateClick }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false; // Default to Light Mode
  });

  const toggleTheme = () => {
    const html = document.documentElement;
    const metaTheme = document.getElementById('theme-color-meta');
    
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      if (metaTheme) metaTheme.setAttribute('content', '#ffffff');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
      if (metaTheme) metaTheme.setAttribute('content', '#0f0f0f');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-yt-dark border-b border-zinc-200 dark:border-zinc-800 safe-top transition-colors duration-300">
      <div className="flex items-center justify-between px-4 h-14 md:px-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-4 min-w-[140px] md:min-w-[180px]">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-yt-textLight dark:text-yt-textDark hover:opacity-70 transition-colors"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
          <h1 
            onClick={onLogoClick}
            className="text-xl font-bold tracking-tighter text-yt-textLight dark:text-yt-textDark flex items-center gap-0.5 cursor-pointer font-heading select-none active:scale-95 transition-transform"
          >
            <span className="text-accent">Clip</span>Cart
          </h1>
        </div>

        {/* Center: Search (YouTube Style) - Desktop Only */}
        <div className="hidden md:flex flex-grow max-w-[720px] mx-8 items-center gap-4">
          <div className="flex flex-grow bg-white dark:bg-black rounded-full border border-zinc-200 dark:border-zinc-800 overflow-hidden focus-within:ring-2 focus-within:ring-accent/30 transition-all shadow-sm">
            <input 
              type="text" 
              placeholder="Search commerce, events, deals..." 
              className="w-full bg-transparent px-5 py-2 text-sm focus:outline-none dark:text-white"
            />
            <button className="bg-zinc-50 dark:bg-zinc-900 px-5 border-l border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Search className="text-zinc-500 dark:text-zinc-400" size={18} strokeWidth={2.5} />
            </button>
          </div>
          <button className="p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all text-zinc-700 dark:text-zinc-300">
            <Mic size={18} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Right: User Tools */}
        <div className="flex items-center gap-1 md:gap-3 relative min-w-[140px] md:min-w-[180px] justify-end">
          {/* Mobile Tools */}
          <button className="md:hidden text-zinc-500 dark:text-zinc-400 p-2">
            <Search size={22} strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={onCreateClick}
            className="md:hidden text-yt-textLight dark:text-yt-textDark hover:text-accent transition-colors p-2"
          >
            <Plus size={22} strokeWidth={2.5} />
          </button>

          {/* Desktop Only Create Button */}
          <button 
            onClick={onCreateClick}
            className="hidden md:flex items-center gap-2 text-yt-textLight dark:text-yt-textDark hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-full transition-colors font-bold text-sm"
          >
            <Plus size={22} strokeWidth={2.5} />
            <span className="hidden lg:inline">Create</span>
          </button>

          <button className="text-yt-textLight dark:text-yt-textDark hover:text-accent transition-colors relative p-2">
            <Bell size={22} strokeWidth={2.5} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-yt-dark"></span>
          </button>

          <div className="relative ml-1 hidden md:block">
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-black cursor-pointer hover:opacity-90 transition-all shadow-lg select-none overflow-hidden border-2 border-accent"
            >
              <img src="https://picsum.photos/id/64/100/100" alt="JD" className="w-full h-full object-cover" />
            </div>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                  <div className="p-5 flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20">
                    <div className="w-12 h-12 rounded-full bg-accent flex-shrink-0 overflow-hidden border-2 border-accent shadow-sm">
                      <img src="https://picsum.photos/id/64/100/100" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-yt-textLight dark:text-yt-textDark font-bold text-sm font-heading truncate">John Doe</span>
                      <span className="text-accent text-[10px] font-bold flex items-center gap-1">
                        <span className="text-xs">✨</span> Pro member
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <button className="w-full flex items-center justify-between px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-left">
                      <div className="flex items-center gap-3">
                        <User size={18} strokeWidth={2.5} />
                        <span className="text-xs font-bold font-heading">Your channel</span>
                      </div>
                      <ChevronRight size={14} strokeWidth={3} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-left">
                      <div className="flex items-center gap-3">
                        <Wallet size={18} strokeWidth={2.5} />
                        <span className="text-xs font-bold font-heading">Brand wallet</span>
                      </div>
                      <div className="px-1.5 py-0.5 bg-accent text-black text-[9px] font-bold rounded-md">12</div>
                    </button>

                    <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2 mx-4" />

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        {isDarkMode ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
                        <span className="text-xs font-bold font-heading">
                          Appearance: {isDarkMode ? 'Dark' : 'Light'}
                        </span>
                      </div>
                      <div className={`w-9 h-5 rounded-full relative transition-all duration-300 ${isDarkMode ? 'bg-accent' : 'bg-zinc-300'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${isDarkMode ? 'left-5' : 'left-1'}`} />
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors group text-left">
                      <LogOut size={18} strokeWidth={2.5} />
                      <span className="text-xs font-bold font-heading">Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;