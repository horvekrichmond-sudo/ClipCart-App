import * as React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import CategoryBar from './CategoryBar';
import { Tab, Category } from '../types';

interface LayoutProps {
  // Marked children as optional to prevent TypeScript from throwing an error
  // when the content inside the Layout component is conditionally rendered.
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

  // Auto-close sidebar when switching views
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-950 relative selection:bg-blue-500/30 transition-colors duration-300">
      
      {/* Header: z-50 to stay on top */}
      <div className={`${isVideoView ? 'hidden md:block' : 'block'} z-50`}>
        <Header 
          onMenuClick={toggleSidebar} 
          onLogoClick={onLogoClick} 
          onCreateClick={onCreateClick}
        />
      </div>

      <div className="flex flex-grow relative overflow-hidden">
        {/* 
           Desktop Sidebar: Fixed positioning to prevent shifting issues.
           Starts below header (top-14).
        */}
        {!isVideoView && (
          <div className="hidden md:block fixed top-14 left-0 bottom-0 w-64 border-r border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 z-40">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}

        {/* 
           Overlay Sidebar: For Video View OR Mobile toggle.
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
           Main Content Area: 
           - Uses pl-64 only when sidebar is fixed and visible.
           - pt-14 accounts for fixed header.
        */}
        <main 
          className={`flex-grow overflow-y-auto custom-scrollbar transition-all duration-300 
            ${!isVideoView ? 'md:pl-64 pt-14' : 'pt-0 md:pt-14'} 
            ${!isVideoView ? 'pb-24 md:pb-10' : 'pb-10'}`}
        >
          {/* Category Tabs: Sticky below header inside main scroll */}
          {!isVideoView && (
            <div className="sticky top-0 z-30">
              <CategoryBar 
                selectedCategory={selectedCategory} 
                onSelectCategory={onSelectCategory} 
              />
            </div>
          )}
          
          <div className={`mx-auto ${isVideoView ? 'max-w-none' : 'max-w-[1800px]'}`}>
            <div className={`${isVideoView ? 'px-0' : 'px-4'} md:px-8 ${!isVideoView ? 'pt-6' : 'pt-0 md:pt-4'}`}>
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      {!isVideoView && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default Layout;