
import * as React from 'react';
import { CheckCircle2, Moon, Sun, Settings, ChevronRight, ShieldCheck, Bell } from 'lucide-react';

const ProfileView = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
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

  const menuItems = [
    { icon: ShieldCheck, label: 'Account protection' },
    { icon: Bell, label: 'Notification settings' },
    { icon: Settings, label: 'Preferences' },
  ];

  return (
    <div className="p-4 md:p-16 text-center text-zinc-500 max-w-2xl mx-auto min-h-screen">
      {/* Profile Header */}
      <div className="relative inline-block mb-10">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-100 dark:bg-zinc-900 rounded-full mx-auto border-4 border-accent flex items-center justify-center shadow-2xl shadow-accent/20 overflow-hidden">
           <img src="https://picsum.photos/id/64/200/200" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 md:w-10 md:h-10 bg-accent rounded-full border-4 border-white dark:border-yt-dark flex items-center justify-center text-black">
          <CheckCircle2 size={18} strokeWidth={4} fill="currentColor" />
        </div>
      </div>
      
      <h2 className="text-zinc-900 dark:text-white text-3xl md:text-4xl font-black tracking-tighter uppercase italic font-heading">John Doe</h2>
      <p className="text-accent font-black text-sm uppercase tracking-widest mt-2 font-heading">Elite Curator • 100% Signal</p>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 mt-12">
        {[
          { val: '124', label: 'Clips' },
          { val: '8.2k', label: 'Reach' },
          { val: '12', label: 'Drops' }
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900/50 p-4 md:p-6 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 transition-all shadow-sm">
            <div className="text-zinc-900 dark:text-white font-black text-2xl md:text-3xl italic font-heading">{stat.val}</div>
            <div className="text-[9px] md:text-[10px] uppercase font-black text-zinc-400 dark:text-zinc-500 mt-1 md:mt-2 tracking-widest font-heading">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Settings Section */}
      <div className="mt-12 text-left space-y-3">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4 mb-4">Device settings</h3>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-5 bg-zinc-50 dark:bg-zinc-900/30 rounded-[32px] border-2 border-transparent hover:border-accent/20 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-200 dark:border-zinc-700">
              {isDarkMode ? (
                <Moon size={20} strokeWidth={3} className="text-accent" />
              ) : (
                <Sun size={20} strokeWidth={3} className="text-accent" />
              )}
            </div>
            <div>
              <div className="text-zinc-900 dark:text-white font-bold text-sm">Appearance</div>
              <div className="text-zinc-500 text-xs font-medium">{isDarkMode ? 'Dark' : 'Light'} mode active</div>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isDarkMode ? 'bg-accent' : 'bg-zinc-300'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white dark:bg-black rounded-full shadow-sm transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`} />
          </div>
        </button>

        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className="w-full flex items-center justify-between p-5 bg-zinc-50 dark:bg-zinc-900/30 rounded-[32px] border-2 border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-200 dark:border-zinc-700">
                <item.icon size={20} strokeWidth={3} className="text-zinc-400 group-hover:text-yt-textLight dark:group-hover:text-yt-textDark transition-colors" />
              </div>
              <div className="text-zinc-900 dark:text-white font-bold text-sm">{item.label}</div>
            </div>
            <ChevronRight size={18} strokeWidth={3} className="text-zinc-300 dark:text-zinc-700 group-hover:text-accent transition-all" />
          </button>
        ))}
      </div>

      {/* Logout button */}
      <button className="mt-12 text-red-500 font-black text-xs uppercase tracking-[0.3em] hover:opacity-70 transition-opacity">
        Terminate session
      </button>
    </div>
  );
};

export default ProfileView;
