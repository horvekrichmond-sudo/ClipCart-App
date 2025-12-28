import * as React from 'react';
import { 
  X, TrendingUp, ShoppingCart, GraduationCap, Users, Target, Briefcase, Bell, UserCheck, 
  Upload, ChevronRight, MapPin, DollarSign, Tag, Globe, CheckCircle2, Plus, HelpCircle, 
  Copy, MessageSquare, Info, ShieldCheck, Monitor, Image as ImageIcon, ArrowUp, AlertCircle,
  ChevronDown, Edit2, Check, Calendar, Trash2, Cpu, Smartphone, Play, ExternalLink
} from 'lucide-react';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'Details' | 'Merchant Logic' | 'Checks' | 'Visibility';
type Stage = 'selection' | 'upload' | 'form';
type QualityStatus = 'pending' | 'processing' | 'done' | 'na';

const INDUSTRIES = [
  'Fashion & Luxury', 'Consumer Tech', 'Automotive', 
  'Food & Beverage', 'Travel & Stay', 'Real Estate', 
  'Health & Beauty', 'Entertainment', 'Financial Services',
  'Software/SaaS', 'Education', 'Non-Profit'
];

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [modalStage, setModalStage] = React.useState<Stage>('selection');
  const [currentStep, setCurrentStep] = React.useState<Step>('Details');
  
  // Form State
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedIndustry, setSelectedIndustry] = React.useState<string | null>(null);
  const [isIndustryOpen, setIsIndustryOpen] = React.useState(false);
  const [popoverDirection, setPopoverDirection] = React.useState<'up' | 'down'>('down');
  
  // Logic States
  const [techSpecs, setTechSpecs] = React.useState<{key: string, value: string}[]>([{key: '', value: ''}]);
  const [platforms, setPlatforms] = React.useState<string[]>([]);
  
  // Upload & Quality State
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [videoSrc, setVideoSrc] = React.useState<string | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [isValidating, setIsValidating] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  
  const [qualityInfo, setQualityInfo] = React.useState({ sd: true, hd: false, v4k: false });
  const [sdStatus, setSdStatus] = React.useState<QualityStatus>('pending');
  const [hdStatus, setHdStatus] = React.useState<QualityStatus>('pending');
  const [v4kStatus, setV4kStatus] = React.useState<QualityStatus>('pending');
  
  // Thumbnail State
  const [thumbnailSrc, setThumbnailSrc] = React.useState<string | null>(null);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const thumbInputRef = React.useRef<HTMLInputElement>(null);
  const industryBtnRef = React.useRef<HTMLButtonElement>(null);
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedFile && !title) {
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
  }, [selectedFile]);

  React.useEffect(() => {
    if (modalStage === 'form') {
      if (uploadProgress < 100) {
        const interval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 1, 100));
        }, 40);
        return () => clearInterval(interval);
      } else {
        const runProcessing = async () => {
          setSdStatus('processing');
          await new Promise(r => setTimeout(r, 2000));
          setSdStatus('done');
          if (qualityInfo.hd) {
            setHdStatus('processing');
            await new Promise(r => setTimeout(r, 3000));
            setHdStatus('done');
          }
          if (qualityInfo.v4k) {
            setV4kStatus('processing');
            await new Promise(r => setTimeout(r, 4000));
            setV4kStatus('done');
          }
        };
        runProcessing();
      }
    }
  }, [modalStage, uploadProgress, qualityInfo]);

  if (!isOpen) return null;

  const steps: Step[] = ['Details', 'Merchant Logic', 'Checks', 'Visibility'];

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setSelectedType(null);
    setModalStage('selection');
    setCurrentStep('Details');
    setSelectedFile(null);
    if (videoSrc) URL.revokeObjectURL(videoSrc);
    if (thumbnailSrc) URL.revokeObjectURL(thumbnailSrc);
    setVideoSrc(null);
    setThumbnailSrc(null);
    setUploadError(null);
    setUploadProgress(0);
    setTitle('');
    setDescription('');
    setSelectedIndustry(null);
    setSdStatus('pending');
    setHdStatus('pending');
    setV4kStatus('pending');
    setTechSpecs([{key: '', value: ''}]);
    setPlatforms([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsValidating(true);
    setUploadError(null);

    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;
      const aspectRatio = width / height;
      const is16by9 = Math.abs(aspectRatio - (16/9)) < 0.05;

      if (duration > 900) {
        setUploadError('Exceed recommended length');
        setIsValidating(false);
      } else if (!is16by9) {
        setUploadError('Incorrect aspect ratio');
        setIsValidating(false);
      } else {
        setQualityInfo({
          sd: true,
          hd: width >= 1280 || height >= 720,
          v4k: width >= 3840 || height >= 2160
        });
        setSelectedFile(file);
        setVideoSrc(objectUrl);
        setModalStage('form');
        setIsValidating(false);
      }
    };
    video.src = objectUrl;
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (thumbnailSrc) URL.revokeObjectURL(thumbnailSrc);
      setThumbnailSrc(URL.createObjectURL(file));
    }
  };

  const toggleIndustry = () => {
    if (!isIndustryOpen && industryBtnRef.current && modalContentRef.current) {
      const rect = industryBtnRef.current.getBoundingClientRect();
      const containerRect = modalContentRef.current.getBoundingClientRect();
      const spaceBelow = containerRect.bottom - rect.bottom;
      setPopoverDirection(spaceBelow < 300 ? 'up' : 'down');
    }
    setIsIndustryOpen(!isIndustryOpen);
  };

  const isNextDisabled = currentStep === 'Details' && (!thumbnailSrc || title.trim() === '');

  const QualityBadge = ({ label, status, available }: { label: string; status: QualityStatus; available: boolean }) => {
    if (!available) return null;
    let baseStyles = "w-6 h-5 rounded flex items-center justify-center text-[9px] font-black transition-all duration-500 border ";
    let content = label;
    switch (status) {
      case 'pending': baseStyles += "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-transparent opacity-40"; break;
      case 'processing': baseStyles += "bg-accent/10 text-accent border-accent/30 animate-pulse scale-105"; break;
      case 'done': baseStyles += "bg-green-500 text-white border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"; content = <Check size={10} strokeWidth={4} />; break;
    }
    return (
      <div className="flex flex-col items-center gap-0.5">
        <div className={baseStyles}>{content}</div>
        <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">{label}</span>
      </div>
    );
  };

  const inputClass = "w-full p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-all font-medium placeholder:text-zinc-400";
  const labelClass = "text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block";

  const renderMerchantLogic = () => {
    const sectionTitleClass = "text-sm font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white";

    switch(selectedType) {
      case 'flash':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><TrendingUp size={18} className="text-accent" /> Flash Deal Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Discount Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. SUMMER50" 
                  className={inputClass + " uppercase font-black tracking-widest"} 
                  onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />
              </div>
              <div>
                <label className={labelClass}>Discount Value</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="20" className={inputClass} />
                  <select className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 font-bold text-xs">
                    <option>% Off</option>
                    <option>$ Off</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Offer Expiration</label>
                <input type="datetime-local" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Inventory Limit (Optional)</label>
                <input type="number" placeholder="500 units" className={inputClass} />
              </div>
            </div>
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><MapPin size={18} className="text-blue-500" /> Local Event Detail</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Venue Name</label>
                <input type="text" placeholder="Madison Square Garden" className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Map Address</label>
                <div className="relative">
                  <input type="text" placeholder="Search for location..." className={inputClass + " pl-10"} />
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Event Date & Time</label>
                <input type="datetime-local" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Primary Action (CTA)</label>
                <div className="flex gap-2">
                  <select className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 font-bold text-xs min-w-[120px]">
                    <option>Get Tickets</option>
                    <option>RSVP</option>
                    <option>Register</option>
                  </select>
                  <input type="url" placeholder="URL" className={inputClass} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'product':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><ShoppingCart size={18} className="text-green-500" /> Product Showcase</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input type="number" placeholder="199.99" className={inputClass + " pl-8"} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select className={inputClass}>
                  <option>In Stock</option>
                  <option>Pre-Order</option>
                  <option>Sold Out</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Purchase URL</label>
                <input type="url" placeholder="https://store.brand.com/..." className={inputClass} />
              </div>
              
              <div className="md:col-span-2 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className={labelClass + " mb-0"}>Technical Specifications</label>
                  <button 
                    onClick={() => setTechSpecs([...techSpecs, {key: '', value: ''}])}
                    className="flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-widest hover:opacity-70"
                  >
                    <Plus size={14} /> Add Spec
                  </button>
                </div>
                <div className="space-y-3">
                  {techSpecs.map((spec, idx) => (
                    <div key={idx} className="flex gap-3 animate-in slide-in-from-left-2">
                      <input 
                        type="text" 
                        placeholder="Key (e.g. Weight)" 
                        className={inputClass} 
                        value={spec.key}
                        onChange={(e) => {
                          const newSpecs = [...techSpecs];
                          newSpecs[idx].key = e.target.value;
                          setTechSpecs(newSpecs);
                        }}
                      />
                      <input 
                        type="text" 
                        placeholder="Value (e.g. 1.2kg)" 
                        className={inputClass}
                        value={spec.value}
                        onChange={(e) => {
                          const newSpecs = [...techSpecs];
                          newSpecs[idx].value = e.target.value;
                          setTechSpecs(newSpecs);
                        }}
                      />
                      {techSpecs.length > 1 && (
                        <button 
                          onClick={() => setTechSpecs(techSpecs.filter((_, i) => i !== idx))}
                          className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'trailers':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><Bell size={18} className="text-purple-500" /> Trailer & Teasers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Launch Date</label>
                <input type="date" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>CTA Action</label>
                <input type="url" placeholder="Pre-Order / Pre-Save Link" className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {['Netflix', 'Steam', 'App Store', 'Cinema', 'YouTube', 'PlayStation'].map(plat => (
                    <button
                      key={plat}
                      onClick={() => setPlatforms(prev => prev.includes(plat) ? prev.filter(p => p !== plat) : [...prev, plat])}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        platforms.includes(plat)
                        ? 'bg-accent border-accent text-black'
                        : 'bg-zinc-100 dark:bg-zinc-800 border-transparent text-zinc-500'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'service':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><Target size={18} className="text-orange-500" /> Service Demo Logic</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Service Type</label>
                <select className={inputClass}>
                  <option>Consultation</option>
                  <option>Free Trial</option>
                  <option>Quote Request</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Price Model</label>
                <input type="text" placeholder="e.g. $50/hr or Free Quote" className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Booking Link (Calendly / Cal.com)</label>
                <input type="url" placeholder="https://calendly.com/brand/demo" className={inputClass} />
              </div>
            </div>
          </div>
        );

      case 'crowd':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><GraduationCap size={18} className="text-pink-500" /> Crowdfunding Tracker</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Funding Goal</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input type="number" placeholder="50,000" className={inputClass + " pl-8"} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Current Pledged</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input type="number" placeholder="12,500" className={inputClass + " pl-8"} />
                </div>
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input type="date" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Backer Count</label>
                <input type="number" placeholder="420" className={inputClass} />
              </div>
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><Briefcase size={18} className="text-blue-400" /> Jobs & Hiring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Job Title</label>
                <input type="text" placeholder="Creative Marketing Director" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Salary Range</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className={inputClass} />
                  <input type="number" placeholder="Max" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Frequency</label>
                <select className={inputClass}>
                  <option>per year</option>
                  <option>per hour</option>
                  <option>contract</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Location Type</label>
                <select className={inputClass}>
                  <option>Remote</option>
                  <option>On-Site</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Application Link</label>
                <input type="url" placeholder="https://careers.brand.com/..." className={inputClass} />
              </div>
            </div>
          </div>
        );

      case 'influencer':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h3 className={sectionTitleClass}><UserCheck size={18} className="text-accent" /> Influencer Promo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Sponsored Brand Name</label>
                <div className="relative">
                  <input type="text" placeholder="Search brands..." className={inputClass + " pl-10"} />
                  <CheckCircle2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Affiliate Code</label>
                <input type="text" placeholder="CHRIS20" className={inputClass + " uppercase font-black tracking-widest"} />
              </div>
              <div>
                <label className={labelClass}>Affiliate Link</label>
                <input type="url" placeholder="https://brand.com/?ref=..." className={inputClass} />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-10 text-center opacity-50 font-bold">Logic Module Error</div>;
    }
  };

  const createOptions = [
    { id: 'flash', name: 'Flash Deal', desc: 'Live countdown for limited offers', icon: TrendingUp },
    { id: 'product', name: 'Product Showcase', desc: 'Technical specifications and features', icon: ShoppingCart },
    { id: 'crowd', name: 'Crowdfunding', desc: 'Track goal progress and backers', icon: GraduationCap },
    { id: 'event', name: 'Local Event', desc: 'Pin interactive location for visitors', icon: Users },
    { id: 'service', name: 'Service Demo', desc: 'Direct booking link for clients', icon: Target },
    { id: 'jobs', name: 'Jobs & Hiring', desc: 'Quick application for active roles', icon: Briefcase },
    { id: 'trailers', name: 'Trailers & Teasers', desc: 'Set reminders for upcoming launches', icon: Bell },
    { id: 'influencer', name: 'Influencer Promo', desc: 'Verified tags for affiliate partners', icon: UserCheck },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={resetAndClose} />
      <div className="relative w-full h-full max-w-6xl bg-white dark:bg-zinc-950 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-20">
          <h2 className="text-lg font-bold truncate">
            {modalStage === 'selection' ? 'Upload videos' : selectedType ? `Creating: ${createOptions.find(o => o.id === selectedType)?.name}` : 'Upload videos'}
          </h2>
          <div className="flex items-center gap-4">
             <button className="text-zinc-500 hover:text-yt-textLight dark:hover:text-yt-textDark"><MessageSquare size={20} /></button>
             <button onClick={resetAndClose} className="text-zinc-500 hover:text-yt-textLight dark:hover:text-yt-textDark"><X size={24} /></button>
          </div>
        </div>

        {modalStage === 'form' && (
          <div className="flex items-center justify-center px-6 py-6 border-b border-zinc-50 dark:border-zinc-900 bg-white dark:bg-zinc-950">
            <div className="flex items-center w-full max-w-2xl relative">
              {steps.map((step, idx) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center relative z-10 flex-1">
                    <div className={`w-6 h-6 rounded-full border-[6px] transition-all duration-300 ${steps.indexOf(currentStep) >= idx ? 'border-zinc-900 dark:border-white bg-white dark:bg-black scale-110' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'}`} />
                    <span className={`absolute top-8 text-[11px] font-bold transition-colors ${currentStep === step ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>{step}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex-grow h-0.5 bg-zinc-200 dark:bg-zinc-800 relative -top-3">
                      <div className="h-full bg-zinc-400 transition-all duration-500" style={{ width: steps.indexOf(currentStep) > idx ? '100%' : '0%' }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div ref={modalContentRef} className="flex-grow overflow-y-auto custom-scrollbar px-6 py-4 md:px-12 bg-white dark:bg-zinc-950">
           {modalStage === 'selection' && (
             <div className="flex flex-col items-center justify-center h-full max-w-5xl mx-auto px-6 py-8 animate-in fade-in zoom-in-95 duration-300">
               <div className="text-center mb-10">
                 <h2 className="text-2xl font-bold font-heading mb-2 tracking-tight">Choose Campaign Type</h2>
                 <p className="text-zinc-500 text-sm font-medium">Select a commerce module to power your video signal.</p>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                 {createOptions.map((opt) => (
                   <button
                     key={opt.id}
                     onClick={() => { setSelectedType(opt.id); setModalStage('upload'); }}
                     className="flex flex-col items-center p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-accent hover:bg-accent/5 transition-all group"
                   >
                     <div className="mb-4 text-zinc-400 group-hover:text-accent transition-colors"><opt.icon className="w-8 h-8" /></div>
                     <h3 className="text-xs font-bold font-heading text-center mb-1">{opt.name}</h3>
                     <p className="text-[10px] text-zinc-500 text-center font-medium leading-relaxed">{opt.desc}</p>
                   </button>
                 ))}
               </div>
             </div>
           )}

           {modalStage === 'upload' && (
             <div className="flex flex-col items-center justify-center h-full py-16 animate-in fade-in duration-300">
               <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
               <div onClick={() => fileInputRef.current?.click()} className="w-32 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-8 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-2 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 group">
                 <ArrowUp size={48} className={`${isValidating ? "text-accent animate-bounce" : "text-zinc-400 group-hover:text-zinc-600"} transition-colors`} />
               </div>
               <h3 className="text-lg font-medium mb-1">Drag and drop video files to upload</h3>
               <p className="text-xs text-zinc-500 mb-8 font-medium">Your videos will be private until you publish them.</p>
               {uploadError && (
                 <div className="mb-6 flex items-center gap-2 text-red-500 text-sm font-bold animate-in slide-in-from-top-2">
                   <AlertCircle size={16} /><span>{uploadError}</span>
                 </div>
               )}
               <button onClick={() => fileInputRef.current?.click()} disabled={isValidating} className={`px-8 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-sm font-bold text-sm uppercase transition-all active:scale-95 shadow-lg ${isValidating ? 'opacity-50' : ''}`}>
                 {isValidating ? 'Validating...' : 'Select files'}
               </button>
             </div>
           )}

           {modalStage === 'form' && (
             <div className="flex flex-col lg:flex-row gap-8 pb-10">
               <div className="flex-grow">
                 {currentStep === 'Details' ? (
                   <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                     <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-bold font-heading">Details</h2>
                       <button className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700">Reuse details</button>
                     </div>

                     <div className="group relative">
                       <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                         Title (required) <HelpCircle size={12} className="cursor-help" />
                       </div>
                       <textarea 
                         placeholder="Describe your campaign..."
                         rows={2}
                         maxLength={100}
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         className="w-full pt-8 pb-3 px-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent outline-none transition-all resize-none font-medium"
                       />
                       <div className={`absolute bottom-2 right-3 text-[10px] font-bold ${title.length >= 100 ? 'text-red-500' : 'text-zinc-400'}`}>
                         {title.length}/100
                       </div>
                     </div>

                     <div className="group relative">
                       <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                         Description <HelpCircle size={12} className="cursor-help" />
                       </div>
                       <textarea 
                         placeholder="Tell viewers about your brand..."
                         rows={5}
                         maxLength={2000}
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         className="w-full pt-8 pb-3 px-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent outline-none transition-all resize-none font-medium"
                       />
                       <div className={`absolute bottom-2 right-3 text-[10px] font-bold ${description.length >= 2000 ? 'text-red-500' : 'text-zinc-400'}`}>
                         {description.length}/2000
                       </div>
                     </div>

                     <div className="space-y-3">
                       <div className="flex items-center gap-2">
                         <h3 className="text-sm font-bold">Thumbnail <span className="text-red-500">*</span></h3>
                         <HelpCircle size={14} className="text-zinc-400" />
                       </div>
                       <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Select or upload a high-impact cover for your video. A thumbnail is required to proceed.</p>
                       <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                         <input type="file" ref={thumbInputRef} className="hidden" accept="image/*" onChange={handleThumbnailChange} />
                         <button 
                           onClick={() => thumbInputRef.current?.click()}
                           className="aspect-video border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-accent transition-all group relative overflow-hidden"
                         >
                           {thumbnailSrc ? (
                             <>
                               <img src={thumbnailSrc} className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                 <Edit2 size={16} className="text-white" />
                                 <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
                               </div>
                             </>
                           ) : (
                             <>
                               <ImageIcon className="text-zinc-400 group-hover:text-accent" size={20} />
                               <span className="text-[10px] font-bold text-zinc-500 group-hover:text-accent">Upload file</span>
                             </>
                           )}
                         </button>
                         <div className="aspect-video bg-zinc-100 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 text-zinc-400">
                            <Monitor size={20} /><span className="text-[10px] font-bold">Auto-gen</span>
                         </div>
                         <div className="aspect-video bg-zinc-100 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 text-zinc-400">
                            <Monitor size={20} /><span className="text-[10px] font-bold">Test & Win</span>
                         </div>
                       </div>
                     </div>

                     <div className="space-y-3 relative">
                       <h3 className="text-sm font-bold">Industry Category</h3>
                       <div className="relative">
                         <button 
                           ref={industryBtnRef}
                           onClick={toggleIndustry}
                           className="w-full max-w-sm flex items-center justify-between p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-bold focus:border-accent transition-all group"
                         >
                           <span className={selectedIndustry ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}>
                             {selectedIndustry || 'Select Category'}
                           </span>
                           <ChevronDown size={18} className={`text-zinc-400 transition-transform ${isIndustryOpen ? 'rotate-180' : ''}`} />
                         </button>
                         {isIndustryOpen && (
                           <>
                             <div className="fixed inset-0 z-[80]" onClick={() => setIsIndustryOpen(false)} />
                             <div 
                               className={`absolute left-0 w-[480px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-[90] p-4 animate-in fade-in zoom-in-95 duration-200 
                               ${popoverDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
                             >
                               <div className="grid grid-cols-3 gap-2">
                                 {INDUSTRIES.map(ind => (
                                   <button 
                                     key={ind}
                                     onClick={() => { setSelectedIndustry(ind); setIsIndustryOpen(false); }}
                                     className={`text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                                       selectedIndustry === ind 
                                         ? 'bg-accent text-black' 
                                         : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                     }`}
                                   >
                                     {ind}
                                   </button>
                                 ))}
                               </div>
                             </div>
                           </>
                         )}
                       </div>
                     </div>
                   </div>
                 ) : currentStep === 'Merchant Logic' ? (
                   renderMerchantLogic()
                 ) : (
                   <div className="p-10 text-center opacity-50 font-bold">{currentStep} interface coming soon...</div>
                 )}
               </div>

               <div className="w-full lg:w-96 flex-shrink-0">
                 <div className="sticky top-0 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm">
                   <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center relative">
                     {videoSrc ? (
                       <video src={videoSrc} className="w-full h-full object-contain" controls={uploadProgress === 100} />
                     ) : (
                       <div className="text-xs font-bold text-zinc-500 flex flex-col items-center gap-3">
                         <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />Processing...
                       </div>
                     )}
                     {uploadProgress < 100 && (
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                         <div className="text-center">
                           <div className="text-white text-lg font-black">{uploadProgress}%</div>
                           <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Uploading</div>
                         </div>
                       </div>
                     )}
                   </div>
                   <div className="p-4 space-y-4">
                     <div>
                       <div className="text-[10px] font-bold text-zinc-500 mb-1">Video link</div>
                       <div className="flex items-center justify-between gap-2">
                         <span className="text-xs font-bold text-blue-500 truncate">https://clipcart.io/v/aHjHI0w</span>
                         <Copy size={16} className="text-zinc-400 hover:text-zinc-600 cursor-pointer" />
                       </div>
                     </div>
                     <div>
                       <div className="text-[10px] font-bold text-zinc-500 mb-1">Filename</div>
                       <div className="text-xs font-bold truncate">{selectedFile?.name || 'signal.mp4'}</div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}
        </div>

        {modalStage === 'form' && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 safe-bottom">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Upload size={20} className={uploadProgress === 100 ? "text-accent" : "text-zinc-400"} />
                <div className="flex flex-col">
                  <div className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    {uploadProgress < 100 ? 'Signal Upload' : sdStatus !== 'done' || (qualityInfo.hd && hdStatus !== 'done') || (qualityInfo.v4k && v4kStatus !== 'done') ? 'Optimizing Signal' : 'Signal Ready'}
                  </div>
                  <div className="text-[13px] font-black tabular-nums">
                    {uploadProgress < 100 ? `${uploadProgress}% Uploaded` : 'Processing Complete'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-zinc-100 dark:border-zinc-800">
                <QualityBadge label="SD" status={sdStatus} available={qualityInfo.sd} />
                <QualityBadge label="HD" status={hdStatus} available={qualityInfo.hd} />
                <QualityBadge label="4K" status={v4kStatus} available={qualityInfo.v4k} />
              </div>
            </div>
            
            <div className="flex gap-3">
               <button onClick={() => { const idx = steps.indexOf(currentStep); if (idx > 0) setCurrentStep(steps[idx-1]); else setModalStage('upload'); }} className="px-6 py-2 rounded-sm text-sm font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors uppercase">Back</button>
               <button onClick={handleNext} disabled={isNextDisabled} className={`px-8 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-sm text-sm font-bold shadow-lg uppercase transition-all ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'}`}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateModal;