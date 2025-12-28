
import { VideoAd, Category } from './types';

// Curated high-fidelity cinematic clips for a premium "Netflix for Commercials" feel
// These are direct HD MP4 links from professional stock sources (Vimeo CDN)
export const MOCK_VIDEOS: VideoAd[] = [
  {
    id: '1',
    title: 'The New Speed: Nike Phantom Series',
    brand: { name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=64&q=80' },
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://player.vimeo.com/external/494163966.hd.mp4?s=56e6d1c92b95b866c1e550c609c13554b726b216&profile_id=174',
    duration: '00:15',
    category: 'Flash Deals',
    industry: 'Fashion',
    style: 'Cinematic',
    ctaText: 'Shop the Collection',
    isShoppable: true,
    hasCoupon: true,
    timeLeft: '01:15:30',
    isNewDrop: true
  },
  {
    id: '2',
    title: 'Precision Craft: The 2024 Roadster Edit',
    brand: { name: 'Luxe Motors', logo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=64&q=80' },
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://player.vimeo.com/external/434045526.hd.mp4?s=c27cf341d7676443f5daec9317b9df38e6f1f44a&profile_id=174',
    duration: '00:45',
    category: 'Cinematic',
    industry: 'Auto',
    style: 'Cinematic',
    ctaText: 'Book Test Drive',
    isNewDrop: true
  },
  {
    id: '3',
    title: 'Beyond Visuals: Aura Phone 2.0 Launch',
    brand: { name: 'Aura', logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=64&q=80' },
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://player.vimeo.com/external/459389137.hd.mp4?s=910839e564d720b064c6ed89c646b14243640b72&profile_id=174',
    duration: '01:05',
    category: 'Tech Showcase',
    industry: 'Tech',
    style: 'Cinematic',
    ctaText: 'Pre-Order Now',
    specs: ['OLED Retina X', 'Quantum Chip', 'Titanium Frame'],
    isShoppable: true
  },
  {
    id: '4',
    title: 'Summer Essence: The Minimalist Wardrobe',
    brand: { name: 'Vogue', logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=64&q=80' },
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://player.vimeo.com/external/372335199.hd.mp4?s=554f67623916298ef922b947a505b82e1436df95&profile_id=174',
    duration: '00:30',
    category: 'Fashion',
    industry: 'Fashion',
    style: 'Minimalist',
    ctaText: 'Explore Lookbook',
    isNewDrop: true
  },
  {
    id: '5',
    title: 'Art of the Brew: Home Barista Masterclass',
    brand: { name: 'BeanCo', logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=64&q=80' },
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://player.vimeo.com/external/363820251.hd.mp4?s=d0092301844e1388701e19d08e5a7ecb7b255956&profile_id=174',
    duration: '02:15',
    category: 'Tutorials',
    industry: 'Home',
    style: 'Tutorial',
    ctaText: 'Shop Equipment',
    isShoppable: true
  },
  {
    id: '6',
    title: 'Urban Explorer: Rugged Gear for the City',
    brand: { name: 'Wilder', logo: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=64&q=80' },
    thumbnail: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://player.vimeo.com/external/351608226.hd.mp4?s=8096f48f4951016757656910793b86027a4d469d&profile_id=174',
    duration: '00:50',
    category: 'Near Me',
    industry: 'Luxury',
    style: 'UGC',
    ctaText: 'Find Store',
    location: 'SOHO, New York'
  }
];

export const CATEGORIES: Category[] = [
  'All',
  '⚡ Ending Soon',
  '✂️ Coupons',
  '🎬 Cinematic',
  '📱 Tech',
  '👗 Fashion',
  '🏠 Home',
  '🚀 New Drops',
  '📍 Near Me'
];
