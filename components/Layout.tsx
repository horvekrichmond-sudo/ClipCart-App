import * as React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import CategoryBar from './CategoryBar';
import { Tab, Category } from '../types';

interface LayoutProps {
  children?: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  onLogoClick?: () => void;
  onCreateClick?: () => void;
}

const Layout = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  selectedCategory, 
  onSelectCategory,
  onLogoClick,
  onCreateClick
}: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = React.useState(false);
  
  const isVideoView = activeTab === 'video-player';
  const isShowroomView = activeTab === 'showroom';
  
  // Tabs should be hidden on Video Player and Showroom
  const hideCategoryBar = isVideoView || isShowroomView;

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const handleMenuToggle = () => {
    if (window.innerWidth >= 768) {
      setIsDesktopCollapsed(!isDesktopCollapsed);
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-yt-dark relative selection:bg-accent/30 transition-colors duration-300">
      
      {/* Header: Fixed and responsive */}
      <div className={`${isVideoView ? 'hidden md:block' : 'block'} z-50`}>
        <Header 
          onMenuClick={handleMenuToggle} 
          onLogoClick={onLogoClick} 
          onCreateClick={onCreateClick}
        />
      </div>

      <div className="flex flex-grow relative overflow-hidden">
        {/* Desktop Sidebar: Now visible on every page, but collapsible */}
        <div 
          className={`hidden md:block fixed top-16 left-0 bottom-0 bg-zinc-50/50 dark:bg-yt-dark/50 z-40 transition-all duration-300 ease-in-out ${
            isDesktopCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isCollapsed={isDesktopCollapsed}
          />
        </div>

        {/* Mobile/Overlay Sidebar Drawer */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-[60] w-64 animate-in slide-in-from-left duration-300 ease-out shadow-2xl">
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }} 
              />
            </div>
          </>
        )}

        {/* Main Content Area: Responsive padding based on sidebar state */}
        <main 
          className={`flex-grow overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out
            ${isDesktopCollapsed ? 'md:pl-20 pt-16' : 'md:pl-64 pt-16'} 
            ${!isVideoView ? 'pb-24 md:pb-10' : 'pb-0 pt-0 md:pt-16'}
          `}
        >
          {!hideCategoryBar && (
            <div className="sticky top-0 z-30">
              <CategoryBar 
                selectedCategory={selectedCategory} 
                onSelectCategory={onSelectCategory} 
              />
            </div>
          )}
          
          <div className={`w-full mx-auto ${isVideoView ? 'max-w-[1800px]' : 'max-w-[2400px]'}`}>
            <div className={`${isVideoView || isShowroomView ? 'px-0' : 'px-4 md:px-8'} ${!hideCategoryBar ? 'pt-6' : 'pt-0'}`}>
              {children}
            </div>
          </div>
        </main>
      </div>

      {!isVideoView && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default Layout;