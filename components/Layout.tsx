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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const isVideoView = activeTab === 'video-player';

  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-yt-dark relative selection:bg-blue-500/30 transition-colors duration-300">
      
      {/* Header: Fixed and responsive */}
      <div className={`${isVideoView ? 'hidden md:block' : 'block'} z-50`}>
        <Header 
          onMenuClick={toggleSidebar} 
          onLogoClick={onLogoClick} 
          onCreateClick={onCreateClick}
        />
      </div>

      <div className="flex flex-grow relative overflow-hidden">
        {/* 
           Desktop Sidebar: Fixed width to provide stability,
           Synchronized with h-16 header (top-16).
        */}
        {!isVideoView && (
          <div className="hidden md:block fixed top-16 left-0 bottom-0 w-64 border-r border-zinc-200 dark:border-zinc-900 bg-white dark:bg-yt-dark z-40">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}

        {/* 
           Mobile/Overlay Sidebar
        */}
        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 z-[55] bg-black/10 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-[60] w-64 animate-in slide-in-from-left duration-300 ease-out shadow-2xl">
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsSidebarOpen(false);
                }} 
              />
            </div>
          </>
        )}

        {/* 
           Elastic Main Content: 
           Updated pt-16 to match new header height.
        */}
        <main 
          className={`flex-grow overflow-y-auto custom-scrollbar transition-all duration-300 
            ${!isVideoView ? 'md:pl-64 pt-16' : 'pt-0 md:pt-16'} 
            ${!isVideoView ? 'pb-24 md:pb-10' : 'pb-0'}`}
        >
          {!isVideoView && (
            <div className="sticky top-0 z-30">
              <CategoryBar 
                selectedCategory={selectedCategory} 
                onSelectCategory={onSelectCategory} 
              />
            </div>
          )}
          
          <div className={`w-full mx-auto ${isVideoView ? 'max-w-[1800px]' : 'max-w-[2400px]'}`}>
            <div className={`${isVideoView ? 'px-0 md:px-6' : 'px-4 md:px-8'} ${!isVideoView ? 'pt-6' : 'pt-0 md:pt-4'}`}>
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