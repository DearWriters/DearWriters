import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, BookOpen, Info, HelpCircle, Settings, ZoomIn } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { TUTORIAL_DATA } from '../constants/tutorialData';
import { TutorialPage } from '../types/tutorial';

interface TutorialModalProps {
  onClose: () => void;
  initialCategory?: string;
}

export function TutorialModal({ onClose, initialCategory = 'design' }: TutorialModalProps) {
  const [currentCategoryId, setCurrentCategoryId] = useState(initialCategory);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  const { 
    toggleFocusMode, 
    toggleDisguiseMode,
    setActiveTab,
  } = useStore(useShallow(state => ({
    toggleFocusMode: state.toggleFocusMode,
    toggleDisguiseMode: state.toggleDisguiseMode,
    setActiveTab: state.setActiveTab,
  })));

  const currentCategory = TUTORIAL_DATA.categories.find(c => c.id === currentCategoryId) || TUTORIAL_DATA.categories[0];
  const currentPage = currentCategory.pages[currentPageIndex];

  const handlePrev = () => {
    setCurrentPageIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex(prev => Math.min(currentCategory.pages.length - 1, prev + 1));
  };

  const handleActionClick = (type: string, target: string) => {
    switch (target) {
      case 'focusMode':
        toggleFocusMode();
        onClose();
        break;
      case 'disguiseMode':
        toggleDisguiseMode();
        onClose();
        break;
      case 'inspirationMode':
        window.dispatchEvent(new Event('toggle-inspiration-mode'));
        onClose();
        break;
      case 'lateNightMode':
        window.dispatchEvent(new Event('toggle-late-night-mode'));
        onClose();
        break;
      case 'shortcuts':
        window.dispatchEvent(new Event('toggle-shortcut-modal'));
        onClose();
        break;
      case 'sidebar':
        onClose();
        break;
      case 'directory':
        setCurrentCategoryId('design');
        setCurrentPageIndex(2); // The directory page is index 2 in 'design'
        break;
      // Navigation actions
      case 'design':
      case 'blockDescriptions':
      case 'lenses':
      case 'montage':
      case 'metro':
      case 'world':
      case 'deadline':
      case 'compile':
      case 'dataManagement':
      case 'publish':
      case 'timelineEvents':
      case 'inbox':
      case 'lab':
        setCurrentCategoryId(target);
        setCurrentPageIndex(0);
        break;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-[#f4ebd8] w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl border-2 border-[#8b7355] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#8b7355]/20 bg-[#eaddc5] shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-[#8b7355] text-white p-1.5 rounded-lg">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-[#5c4a3d] tracking-widest">使用教程：{currentCategory.name}</h2>
                <p className="text-[10px] text-[#8b7355] font-medium uppercase tracking-tighter">Step {currentPageIndex + 1} of {currentCategory.pages.length}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-[#8b7355] hover:bg-[#d4af37]/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-7xl mx-auto h-full">
              
              {/* Left Side: Text Content */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
                {/* Title Section */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#3b3024] mb-6 leading-tight">{currentPage.title}</h1>
                  
                  {/* What Section (Introduction) */}
                  <div className="border-l-4 border-[#d4af37] pl-5 py-1">
                    <p className="text-lg text-[#5c4a3d] leading-relaxed font-medium whitespace-pre-wrap">
                      {currentPage.what}
                    </p>
                  </div>
                </div>

                {/* Why Section (Card) */}
                <section className="bg-white/60 p-6 rounded-2xl border border-[#8b7355]/10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#8b7355]/30"></div>
                  <div className="flex items-center gap-3 mb-3 text-[#8b7355]">
                    <div className="bg-[#8b7355]/10 p-2 rounded-full">
                      <HelpCircle size={20} />
                    </div>
                    <h3 className="font-bold text-base uppercase tracking-wider">设计初衷</h3>
                  </div>
                  <p className="text-[#5c4a3d] leading-relaxed text-[15px] whitespace-pre-wrap">{currentPage.why}</p>
                </section>

                {/* How Section (Card) */}
                <section className="bg-white/60 p-6 rounded-2xl border border-[#8b7355]/10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]/50"></div>
                  <div className="flex items-center gap-3 mb-3 text-[#d4af37]">
                    <div className="bg-[#d4af37]/10 p-2 rounded-full">
                      <Settings size={20} />
                    </div>
                    <h3 className="font-bold text-base uppercase tracking-wider">操作指南</h3>
                  </div>
                  <p className="text-[#5c4a3d] leading-relaxed text-[15px] whitespace-pre-wrap">{currentPage.how}</p>
                </section>

                {/* Interactive Actions */}
                {currentPage.actions && currentPage.actions.length > 0 && (
                  <div className="pt-4">
                    <div className="flex flex-wrap gap-3">
                      {currentPage.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action.type, action.target)}
                          className="group flex items-center gap-3 px-5 py-3 bg-[#5c4a3d] hover:bg-[#3b3024] text-white rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <Play size={16} fill="currentColor" className="opacity-80 group-hover:opacity-100" />
                          <span className="font-bold tracking-wide text-sm">{action.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Image */}
              <div className="lg:col-span-6 flex items-center justify-center">
                {currentPage.image ? (
                  <div 
                    className="relative w-full rounded-2xl overflow-hidden border border-[#8b7355]/15 shadow-xl group cursor-zoom-in bg-white/50 aspect-[4/3] flex items-center justify-center"
                    onClick={() => setIsImageZoomed(true)}
                  >
                    <img 
                      src={currentPage.image} 
                      alt={currentPage.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white/90 text-[#5c4a3d] px-4 py-2 rounded-full font-medium text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0">
                        <ZoomIn size={16} />
                        点击放大
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[#8b7355]/20 flex items-center justify-center bg-white/30">
                    <p className="text-[#8b7355]/50 font-medium">暂无配图</p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Footer / Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#8b7355]/20 bg-[#eaddc5] shrink-0">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={cn(
                "flex items-center px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm",
                currentPageIndex === 0 
                  ? "opacity-30 cursor-not-allowed text-[#8b7355] bg-transparent" 
                  : "text-[#5c4a3d] bg-white hover:bg-[#f4ebd8] border border-[#8b7355]/20"
              )}
            >
              <ChevronLeft size={20} className="mr-2" />
              上一页
            </button>
            
            <div className="flex gap-1.5">
              {currentCategory.pages.map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentPageIndex ? "w-8 bg-[#d4af37]" : "w-1.5 bg-[#8b7355]/30"
                  )}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPageIndex === currentCategory.pages.length - 1}
              className={cn(
                "flex items-center px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm",
                currentPageIndex === currentCategory.pages.length - 1
                  ? "opacity-30 cursor-not-allowed text-[#8b7355] bg-transparent" 
                  : "text-white bg-[#d4af37] hover:bg-[#b8962d]"
              )}
            >
              下一页
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isImageZoomed && currentPage.image && (
        <div 
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setIsImageZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageZoomed(false);
            }}
          >
            <X size={24} />
          </button>
          <img 
            src={currentPage.image} 
            alt={currentPage.title} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
