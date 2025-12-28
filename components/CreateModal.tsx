import * as React from 'react';
import { 
  X, TrendingUp, ShoppingCart, GraduationCap, Users, Target, Briefcase, Bell, UserCheck 
} from 'lucide-react';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
  if (!isOpen) return null;

  const createOptions = [
    { 
      id: 'flash', 
      name: 'Flash Deal', 
      desc: 'Live countdown for limited offers', 
      icon: TrendingUp 
    },
    { 
      id: 'product', 
      name: 'Product Showcase', 
      desc: 'Technical specifications and product features', 
      icon: ShoppingCart 
    },
    { 
      id: 'crowd', 
      name: 'Crowdfunding', 
      desc: 'Track goal progress and backers', 
      icon: GraduationCap 
    },
    { 
      id: 'event', 
      name: 'Local Event', 
      desc: 'Pin interactive location for visitors', 
      icon: Users 
    },
    { 
      id: 'service', 
      name: 'Service Demo', 
      desc: 'Direct booking link for clients', 
      icon: Target 
    },
    { 
      id: 'jobs', 
      name: 'Jobs & Hiring', 
      desc: 'Quick application for active roles', 
      icon: Briefcase 
    },
    { 
      id: 'trailers', 
      name: 'Trailers & Teasers', 
      desc: 'Set reminders for upcoming launches', 
      icon: Bell 
    },
    { 
      id: 'influencer', 
      name: 'Influencer Promo', 
      desc: 'Verified tags for affiliate partners', 
      icon: UserCheck 
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center overflow-hidden">
      {/* Backdrop: Subtle Fade */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-500" 
        onClick={onClose}
      />
      
      {/* 
        Container: 
        Mobile: Full height (100dvh), slide from bottom, rounded top.
        Desktop: Fixed width/auto height, centered, zoom/fade.
      */}
      <div className="relative w-full h-[100dvh] sm:h-auto sm:max-w-5xl bg-white dark:bg-yt-dark rounded-t-[32px] sm:rounded-[48px] shadow-2xl border-t sm:border border-zinc-100 dark:border-zinc-800 flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 sm:fade-in duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        
        {/* Mobile Header / Drag Handle Area */}
        <div className="flex flex-col items-center pt-3 pb-2 sm:hidden sticky top-0 bg-white dark:bg-yt-dark z-20">
          <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4" />
          <div className="w-full flex items-center justify-between px-6">
            <h2 className="text-xl font-black uppercase italic font-heading dark:text-white tracking-tighter">Create</h2>
            <button 
              onClick={onClose}
              className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 transition-transform active:scale-90"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Desktop Header Area */}
        <div className="hidden sm:flex items-center justify-end p-8 pb-0">
          <button 
            onClick={onClose}
            className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-90"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Area: Scrollable grid */}
        <div className="flex-grow overflow-y-auto custom-scrollbar px-6 sm:px-16 pb-32 sm:pb-24 pt-6 sm:pt-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-y-16 gap-x-6 sm:gap-x-12">
            {createOptions.map((opt) => (
              <button
                key={opt.id}
                className="flex flex-col items-center group transition-all duration-300 outline-none"
              >
                {/* Icon Container */}
                <div className="mb-3 sm:mb-4 text-slate-800 dark:text-zinc-400 group-hover:text-accent group-hover:scale-110 transition-all duration-500 ease-out">
                  <opt.icon className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={1.8} />
                </div>
                
                {/* Title */}
                <h3 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white mb-1 font-heading tracking-tight text-center leading-tight">
                  {opt.name}
                </h3>
                
                {/* 5-Word Description */}
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 dark:text-zinc-500 max-w-[140px] sm:max-w-[180px] text-center leading-relaxed">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Safe Area Bottom Padding */}
        <div className="h-safe-bottom sm:hidden" />
      </div>
    </div>
  );
};

export default CreateModal;
