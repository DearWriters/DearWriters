import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/stores/useStore';
import { Edit3, Layers, Users, Menu, ChevronLeft, FileText, Clock, Maximize2, AlignLeft, LayoutGrid, Layout, ChevronDown, PanelRightOpen, PanelRightClose, Inbox, Save, TreeDeciduous, Archive, Send, MessageSquare, CloudUpload, CloudDownload, Check, Loader2, RotateCcw, History, HelpCircle, Sparkles, Moon, Sun, Network } from 'lucide-react';
import { DataManager } from './DataManager';
import { cn } from '../lib/utils';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';
import { ConfirmationModal } from './ui/ConfirmationModal';
import { VersionHistoryModal } from './ui/VersionHistoryModal';

export function TopNav({ setMobileOpen, hideRightButtons }: { setMobileOpen?: (open: boolean) => void, hideRightButtons?: boolean }) {
  const { 
    fullScreenMode,
    darkMode,
    scenes,
    chapters: allChapters,
    activeDocumentId,
    activeTab,
    works,
    activeWorkId,
    rightSidebarMode,
    disguiseMode,
    lastInspectorTab,
    setActiveDocument, 
    setActiveTab, 
    setActiveWork,
    setDeadlineViewMode, 
    toggleFullScreenMode, 
    toggleDarkMode,
    setRightSidebarMode,
    supabaseSyncEnabled,
    saveHistoryVersion,
    pushToCloud,
    pullFromCloud,
    undoPull,
    checkCloudVersion,
    syncStatus,
    lastSynced,
    lastModified,
    cloudLastModified,
    isCheckingCloud
  } = useStore(useShallow(state => ({
    fullScreenMode: state.fullScreenMode,
    darkMode: state.darkMode,
    scenes: state.scenes,
    chapters: state.chapters,
    activeDocumentId: state.activeDocumentId,
    activeTab: state.activeTab,
    works: state.works,
    activeWorkId: state.activeWorkId,
    rightSidebarMode: state.rightSidebarMode,
    disguiseMode: state.disguiseMode,
    lastInspectorTab: state.lastInspectorTab,
    setActiveDocument: state.setActiveDocument,
    setActiveTab: state.setActiveTab,
    setActiveWork: state.setActiveWork,
    setDeadlineViewMode: state.setDeadlineViewMode,
    toggleFullScreenMode: state.toggleFullScreenMode,
    toggleDarkMode: state.toggleDarkMode,
    setRightSidebarMode: state.setRightSidebarMode,
    supabaseSyncEnabled: state.supabaseSyncEnabled,
    saveHistoryVersion: state.saveHistoryVersion,
    pushToCloud: state.pushToCloud,
    pullFromCloud: state.pullFromCloud,
    undoPull: state.undoPull,
    checkCloudVersion: state.checkCloudVersion,
    syncStatus: state.syncStatus,
    lastSynced: state.lastSynced,
    lastModified: state.lastModified,
    cloudLastModified: state.cloudLastModified,
    isCheckingCloud: state.isCheckingCloud
  })));
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isSyncingPush, setIsSyncingPush] = useState(false);
  const [isSyncingPull, setIsSyncingPull] = useState(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  const [showPullConfirm, setShowPullConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [hasSnapshot, setHasSnapshot] = useState(!!localStorage.getItem('prePullSnapshot'));
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Update snapshot status
  useEffect(() => {
    const checkSnapshot = () => setHasSnapshot(!!localStorage.getItem('prePullSnapshot'));
    window.addEventListener('storage', checkSnapshot);
    return () => window.removeEventListener('storage', checkSnapshot);
  }, []);

  const handleUndoPull = () => {
    if (undoPull()) {
      setHasSnapshot(false);
      toast.success('已撤销拉取');
    } else {
      toast.error('未找到快照');
    }
  };

  // Periodically check cloud version
  useEffect(() => {
    if (!supabaseSyncEnabled) return;
    
    checkCloudVersion();
    const interval = setInterval(checkCloudVersion, 60000); // Every 1 minute
    return () => clearInterval(interval);
  }, [supabaseSyncEnabled, checkCloudVersion]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMoreMenuOpen(false);
      }
    };

    if (isMoreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoreMenuOpen]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const allTabs = [
    { id: 'design', label: '写作', icon: Edit3 },
    { id: 'inbox', label: '笔记', icon: Inbox },
    { id: 'script', label: '剧本', icon: MessageSquare },
    { id: 'blockDescriptions', label: '段落描述', icon: AlignLeft },
    { id: 'lenses', label: '透镜', icon: LayoutGrid },
    { id: 'timelineEvents', label: '时间线事件', icon: Clock },
    { id: 'montage', label: '蒙太奇', icon: Layout },
    { id: 'metro', label: '故事树', icon: TreeDeciduous },
    { id: 'world', label: '世界观', icon: Users },
    { id: 'deadline', label: '死线', icon: Clock },
    { id: 'compile', label: '编译', icon: FileText },
    { id: 'dataManagement', label: '数据管理', icon: Archive },
    { id: 'publish', label: '发布', icon: Send },
    { id: 'lab', label: '实验室', icon: Sparkles },
  ] as const;

  const tabs = allTabs; // Show all tabs directly

  const tabIds = tabs.map(t => t.id).join(',');
  
  // Reset activeTab if it's no longer visible in the current mode
  useEffect(() => {
    if (!tabIds.split(',').includes(activeTab)) {
      setActiveTab('design');
    }
  }, [tabIds, activeTab, setActiveTab]);
  
  const isScene = scenes.some(s => s.id === activeDocumentId);
  const activeDocument = scenes.find(s => s.id === activeDocumentId) || allChapters.find(c => c.id === activeDocumentId);
  const chapterId = isScene ? (activeDocument as any)?.chapterId : activeDocumentId;

  const handleBack = () => {
    if (activeDocumentId) {
      setActiveDocument(null);
    } else if (activeWorkId) {
      setActiveWork(null);
    }
  };

  const hasUnsyncedChanges = lastModified > (lastSynced || 0);
  const hasCloudUpdates = (cloudLastModified || 0) > (lastSynced || 0);

  const handlePush = React.useCallback(async () => {
    setIsSyncingPush(true);
    const success = await pushToCloud();
    setIsSyncingPush(false);
    if (success) {
      setShowSyncSuccess(true);
      setTimeout(() => setShowSyncSuccess(false), 2000);
      toast.success('已保存到云端');
      checkCloudVersion(); // Refresh version after push
    } else {
      toast.error('保存到云端失败');
    }
  }, [pushToCloud, checkCloudVersion]);

  const handlePull = React.useCallback(async () => {
    setIsSyncingPull(true);
    const success = await pullFromCloud();
    setIsSyncingPull(false);
    if (success) {
      setShowSyncSuccess(true);
      setTimeout(() => setShowSyncSuccess(false), 2000);
      toast.success('已从云端拉取最新内容');
      checkCloudVersion(); // Refresh version after pull
    } else {
      toast.error('从云端拉取失败');
    }
  }, [pullFromCloud, checkCloudVersion]);

  // Shortcut for Save to Cloud
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (supabaseSyncEnabled) {
          handlePush();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [supabaseSyncEnabled, handlePush]);

  return (
    <>
      <ConfirmationModal
        isOpen={showPullConfirm}
        onClose={() => setShowPullConfirm(false)}
        onConfirm={handlePull}
        title="确认拉取"
        message="您有未保存的本地更改。从云端拉取将覆盖它们。您确定要继续吗？"
        confirmText="拉取并覆盖"
      />
      <VersionHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
      {/* Desktop Top Nav */}
      <div className={cn(
        "h-24 border-b-[6px] border-double border-[#8b7355] bg-[#eaddc5] flex flex-col items-center justify-center px-4 md:px-6 shrink-0 transition-all duration-700 z-[60] relative shadow-[0_4px_15px_rgba(0,0,0,0.1)]",
        fullScreenMode 
          ? "fixed top-0 left-0 right-0 opacity-0 hover:opacity-100" 
          : "relative"
      )}>
        <div className="absolute top-2 left-0 right-0 px-4 text-center pointer-events-none">
           <span className="font-display text-lg md:text-xl tracking-[0.3em] text-[#5c4a3d] font-bold opacity-80 whitespace-nowrap">✦ DEAR WRITERS ✦</span>
           <div className="w-32 h-px bg-[#8b7355] mx-auto mt-1 opacity-50"></div>
        </div>
        {fullScreenMode && (
          <div className="absolute top-full left-0 right-0 h-4 bg-transparent" />
        )}
        <div className="flex items-center w-full justify-between mt-6">
          <div className="flex items-center">
          {/* Combined Mobile/Desktop Back/Menu Button */}
          {activeWorkId ? (
            <button
              onClick={handleBack}
              className="mr-4 p-2 -ml-2 text-stone-500 hover:bg-stone-100 rounded-md"
              title={activeDocumentId ? "返回大纲" : "返回书架"}
            >
              <ChevronLeft size={20} />
            </button>
          ) : (
            !activeWorkId && (
              <button 
                className="md:hidden mr-4 p-2 -ml-2 text-stone-500 hover:bg-stone-100 rounded-md"
                onClick={() => setMobileOpen?.(true)}
              >
                <Menu size={20} />
              </button>
            )
          )}
          
          <div className="hidden md:flex items-center h-full max-w-[60vw]">
            {activeWorkId && (
              <>
                {/* Fixed Writing Tab */}
                <button
                  onClick={() => setActiveTab('design')}
                  className={cn(
                    "flex items-center space-x-2 h-10 px-4 border-2 transition-all duration-500 rounded-t-md font-serif text-sm tracking-widest uppercase shrink-0 z-10 mr-2",
                    activeTab === 'design'
                      ? "border-[#8b7355] border-b-transparent bg-[#f4ebd8] text-[#3b3024] shadow-[0_-2px_5px_rgba(0,0,0,0.05)]"
                      : "border-transparent text-[#8b7355] hover:text-[#5c4a3d] hover:bg-[#eaddc5]/50"
                  )}
                >
                  <Edit3 size={16} />
                  <span>写作</span>
                </button>

                {/* Left Scroll Button */}
                <button 
                  onClick={() => scrollTabs('left')}
                  className="p-1 text-[#8b7355] hover:bg-[#eaddc5] rounded-md shrink-0"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Scrollable Other Tabs */}
                <div 
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto space-x-2 px-2 h-full items-end pb-[2px] [&::-webkit-scrollbar]:hidden"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {tabs.filter(t => t.id !== 'design').map((tab, index) => (
                    <button
                      key={tab.id || `tab-desktop-${index}`}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        if (tab.id === 'deadline') {
                          setDeadlineViewMode('local');
                        }
                      }}
                      className={cn(
                        "flex items-center space-x-2 h-10 px-4 border-2 transition-all duration-500 rounded-t-md font-serif text-sm tracking-widest uppercase shrink-0",
                        activeTab === tab.id
                          ? "border-[#8b7355] border-b-transparent bg-[#f4ebd8] text-[#3b3024] shadow-[0_-2px_5px_rgba(0,0,0,0.05)]"
                          : "border-transparent text-[#8b7355] hover:text-[#5c4a3d] hover:bg-[#eaddc5]/50"
                      )}
                    >
                      <tab.icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Right Scroll Button */}
                <button 
                  onClick={() => scrollTabs('right')}
                  className="p-1 text-[#8b7355] hover:bg-[#eaddc5] rounded-md shrink-0"
                >
                  <ChevronLeft size={16} className="rotate-180" />
                </button>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center ml-8">
          </div>
          <div className="md:hidden font-display font-bold text-[#5c4a3d] tracking-widest">
            {works.find(w => w.id === activeWorkId)?.title || 'DearWriters'}
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          {supabaseSyncEnabled && (
            <div className="flex items-center bg-stone-100 rounded-full p-0.5 mr-2 border border-stone-200">
              {hasSnapshot && (
                <button
                  onClick={handleUndoPull}
                  className="p-1.5 text-stone-500 hover:text-stone-700 hover:bg-white hover:shadow-sm rounded-full transition-all"
                  title="撤销拉取 (恢复快照)"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                onClick={() => setShowHistory(true)}
                className="p-1.5 text-stone-500 hover:text-stone-700 hover:bg-white hover:shadow-sm rounded-full transition-all"
                title="版本历史"
              >
                <History size={16} />
              </button>
              <div className="w-px h-4 bg-stone-300 mx-0.5"></div>
              <button
                onClick={handlePush}
                disabled={isSyncingPush || isSyncingPull}
                className={cn(
                  "p-1.5 rounded-full transition-all flex items-center justify-center relative",
                  isSyncingPush ? "text-wood-600 bg-white shadow-sm" : 
                  hasUnsyncedChanges ? "text-wood-600 hover:bg-white hover:shadow-sm" : "text-stone-500 hover:text-stone-700 hover:bg-white hover:shadow-sm"
                )}
                title={`保存到云端 (Cmd/Ctrl+S)\n上次保存: ${lastSynced ? new Date(lastSynced).toLocaleTimeString() : '从未'}`}
              >
                {isSyncingPush ? <Loader2 size={16} className="animate-spin" /> : 
                 showSyncSuccess && !isSyncingPull ? <Check size={16} className="text-wood-500" /> : 
                 <CloudUpload size={16} />}
                {hasUnsyncedChanges && !isSyncingPush && !showSyncSuccess && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-wood-500 rounded-full border border-white"></span>
                )}
              </button>
              <div className="w-px h-4 bg-stone-300 mx-0.5"></div>
              <button
                onClick={() => hasCloudUpdates ? setShowPullConfirm(true) : handlePull()}
                disabled={isSyncingPush || isSyncingPull}
                className={cn(
                  "p-1.5 rounded-full transition-all flex items-center justify-center relative",
                  isSyncingPull ? "text-blue-600 bg-white shadow-sm" : 
                  hasCloudUpdates ? "text-blue-600 hover:bg-white hover:shadow-sm animate-pulse" : "text-stone-500 hover:text-stone-700 hover:bg-white hover:shadow-sm"
                )}
                title="从云端拉取最新内容"
              >
                {isSyncingPull ? <Loader2 size={16} className="animate-spin" /> : 
                 showSyncSuccess && !isSyncingPush ? <Check size={16} className="text-blue-500" /> : 
                 <CloudDownload size={16} />}
                {hasCloudUpdates && !isSyncingPull && !showSyncSuccess && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-wood-500 rounded-full border border-white"></span>
                )}
              </button>
            </div>
          )}

          {!hideRightButtons && (
            <>
              <button
                onClick={() => window.dispatchEvent(new Event('toggle-tutorial'))}
                className="p-2 rounded-md transition-colors text-stone-500 hover:bg-stone-100"
                title="使用教程"
              >
                <HelpCircle size={20} />
              </button>

              <button
                onClick={toggleFullScreenMode}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  fullScreenMode ? "text-wood-600 bg-wood-50" : "text-stone-500 hover:bg-stone-100"
                )}
                title={fullScreenMode ? "退出全屏模式" : "进入全屏模式"}
              >
                <Maximize2 size={20} />
              </button>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md transition-colors text-stone-500 hover:bg-stone-100"
                title={darkMode ? "切换至明亮模式" : "切换至暗黑模式"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setRightSidebarMode(rightSidebarMode === 'closed' ? (lastInspectorTab || 'inspector' as any) : 'closed')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  rightSidebarMode !== 'closed' ? "text-wood-600 bg-wood-50" : "text-stone-500 hover:bg-stone-100"
                )}
                title={rightSidebarMode !== 'closed' ? "关闭检查器" : "打开检查器"}
              >
                {rightSidebarMode !== 'closed' ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
              </button>
            </>
          )}
        </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-stone-200 flex items-center justify-around z-30 pb-safe">
          {tabs.slice(0, tabs.length > 5 ? 4 : 5).map((tab, index) => (
            <button
              key={tab.id || `tab-mobile-${index}`}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id === 'deadline') {
                  setDeadlineViewMode('local');
                }
              }}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1",
                activeTab === tab.id
                  ? "text-wood-600"
                  : "text-stone-400"
              )}
            >
              <tab.icon size={20} />
              <span className="text-[10px] font-medium truncate w-full text-center px-1">{tab.label}</span>
            </button>
          ))}
          
          {tabs.length > 5 && (
            <div className="relative w-full h-full">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1",
                  tabs.slice(4).some(t => t.id === activeTab) ? "text-wood-600" : "text-stone-400"
                )}
              >
                <Menu size={20} />
                <span className="text-[10px] font-medium truncate w-full text-center px-1">更多</span>
              </button>
              
              {isMoreMenuOpen && (
                <>
                  <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsMoreMenuOpen(false)} />
                  <div 
                    ref={moreMenuRef}
                    className="absolute bottom-full right-2 mb-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-bottom-2"
                  >
                    {tabs.slice(4).map((tab, index) => (
                      <button
                        key={tab.id || `tab-more-${index}`}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          if (tab.id === 'deadline') {
                            setDeadlineViewMode('local');
                          }
                          setIsMoreMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center px-4 py-3 space-x-3 transition-colors",
                          activeTab === tab.id ? "bg-wood-50 text-wood-700" : "text-stone-600 hover:bg-stone-50"
                        )}
                      >
                        <tab.icon size={18} />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
