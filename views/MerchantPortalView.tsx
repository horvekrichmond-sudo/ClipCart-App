
import * as React from 'react';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  MoreHorizontal, ChevronRight, Plus, Eye, 
  MousePointer2, Bookmark, BarChart3, Wallet
} from 'lucide-react';
import { MerchantCampaign } from '../types';

const MOCK_CAMPAIGNS: MerchantCampaign[] = [
  { id: '1', title: 'Summer Collection 2024', type: 'Flash Deal', status: 'Active', views: '1.2M', clips: '8.4k', ctr: '12.4%', spend: '$4,200' },
  { id: '2', title: 'Phantom Series Launch', type: 'Showcase', status: 'Active', views: '2.4M', clips: '12k', ctr: '18.2%', spend: '$8,900' },
  { id: '3', title: 'Soho Pop-up Event', type: 'Event', status: 'Draft', views: '0', clips: '0', ctr: '0%', spend: '$0' },
  { id: '4', title: 'Q1 Tech Teasers', type: 'Trailer', status: 'Expired', views: '840k', clips: '4.2k', ctr: '9.8%', spend: '$2,100' },
];

const MerchantPortalView = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Views', value: '4.8M', icon: Eye, change: '+12%', color: 'blue' },
          { label: 'Signal Clips', value: '24.6k', icon: Bookmark, change: '+18%', color: 'accent' },
          { label: 'Avg CTR', value: '14.2%', icon: MousePointer2, change: '+3.4%', color: 'green' },
          { label: 'Active Spend', value: '$13.1k', icon: DollarSign, change: '+5%', color: 'purple' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between group hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-accent transition-colors`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-black text-green-500 font-heading">{stat.change}</span>
            </div>
            <div>
               <div className="text-3xl font-black uppercase font-heading tracking-tighter mb-1">{stat.value}</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-grow flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
             <h2 className="text-2xl font-black uppercase font-heading tracking-tighter flex items-center gap-3">
               Active Campaigns
               <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black text-zinc-400">04 Total</span>
             </h2>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-accent text-black rounded-full text-xs font-black uppercase font-heading shadow-xl shadow-accent/10 hover:scale-105 active:scale-95 transition-all">
                <Plus size={16} strokeWidth={3} />
                Create New
             </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Campaign Details</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Clips</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">CTR</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Spend</th>
                    <th className="px-8 py-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                  {MOCK_CAMPAIGNS.map((c) => (
                    <tr key={c.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                              <img src={`https://picsum.photos/id/${parseInt(c.id)+10}/100/100`} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <div className="text-sm font-bold font-heading">{c.title}</div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{c.type}</div>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          c.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-500/10' :
                          c.status === 'Draft' ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800' :
                          'bg-red-100 text-red-600 dark:bg-red-500/10'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center text-sm font-bold tabular-nums">{c.clips}</td>
                      <td className="px-8 py-6 text-center text-sm font-bold text-accent tabular-nums">{c.ctr}</td>
                      <td className="px-8 py-6 text-right text-sm font-bold tabular-nums">{c.spend}</td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 text-zinc-300 hover:text-yt-textLight dark:hover:text-yt-textDark transition-colors">
                           <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-96 flex flex-col gap-6">
           {/* Merchant Wallet Card */}
           <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[48px] text-white border-2 border-zinc-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                  <Wallet size={24} className="text-accent" />
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Verified Merchant</div>
                   <div className="text-xs font-bold text-accent">Tier 2 Agency</div>
                </div>
              </div>
              <div className="mb-8">
                 <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Advertising Balance</div>
                 <div className="text-4xl font-black font-heading tracking-tighter">$24,850.40</div>
              </div>
              <button className="w-full py-4 bg-white text-black rounded-full font-black uppercase font-heading text-sm hover:bg-accent transition-colors active:scale-95 shadow-lg">
                 Add Credits
              </button>
           </div>

           {/* Quick CRM */}
           <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 flex-grow">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-sm font-black uppercase tracking-widest font-heading">Merchant Tracker</h3>
                 <Users size={18} className="text-zinc-400" />
              </div>
              <div className="space-y-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                         <img src={`https://picsum.photos/id/${i+40}/100/100`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                         <div className="text-xs font-bold font-heading truncate">User_{i}928</div>
                         <div className="text-[9px] font-black uppercase text-zinc-400">Clipped 3 deals</div>
                      </div>
                      <ChevronRight size={14} className="text-zinc-300 group-hover:text-accent transition-colors" />
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:border-accent hover:text-accent transition-all">
                 View All Trackers (12,402)
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantPortalView;
