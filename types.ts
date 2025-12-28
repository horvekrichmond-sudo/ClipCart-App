
export type Category = 
  | 'All' 
  | '⚡ Ending Soon' 
  | '✂️ Coupons' 
  | '🎬 Cinematic' 
  | '📱 Tech' 
  | '👗 Fashion' 
  | '🏠 Home' 
  | '🚀 New Drops' 
  | '📍 Near Me';

export type ContentStyle = 'Cinematic' | 'UGC' | 'Minimalist' | 'Tutorial';

export interface VideoAd {
  id: string;
  title: string;
  brand: {
    name: string;
    logo: string;
  };
  thumbnail: string;
  videoUrl: string; // Added for real video playback
  duration: string;
  category: string;
  style: ContentStyle;
  ctaText: string;
  isShoppable?: boolean;
  hasCoupon?: boolean;
  industry?: 'Tech' | 'Fashion' | 'Home' | 'Auto' | 'Luxury';
  isNewDrop?: boolean;
  timeLeft?: string;
  location?: string;
  specs?: string[];
  isAffiliate?: boolean;
  fundingProgress?: {
    current: number;
    target: number;
  };
}

export type Tab = 'home' | 'nearby' | 'wallet' | 'updates' | 'profile' | 'video-player';
