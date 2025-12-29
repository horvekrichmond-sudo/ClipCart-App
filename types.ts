
export type Category = 
  | 'All' 
  | 'Ending Soon' 
  | 'Coupons' 
  | 'Cinematic' 
  | 'Tech' 
  | 'Fashion' 
  | 'Home' 
  | 'New Drops' 
  | 'Near Me';

export type ContentStyle = 'Cinematic' | 'UGC' | 'Minimalist' | 'Tutorial';

export interface VideoAd {
  id: string;
  title: string;
  brand: {
    name: string;
    logo: string;
  };
  thumbnail: string;
  videoUrl: string; 
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

export type CampaignStatus = 'Active' | 'Draft' | 'Expired' | 'Sold Out';

export interface MerchantCampaign {
  id: string;
  title: string;
  type: string;
  status: CampaignStatus;
  views: string;
  clips: string;
  ctr: string;
  spend: string;
}

export type Tab = 'home' | 'nearby' | 'wallet' | 'updates' | 'profile' | 'video-player' | 'merchant';