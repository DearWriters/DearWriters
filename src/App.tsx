import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from './store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { WorksLibrary } from './components/WorksLibrary';
import { TopNav } from './components/TopNav';
import { OutlinePanel } from './components/OutlinePanel';
import { EditorPanel } from './components/EditorPanel';
import { LensesTab } from './components/LensesTab';
import { TimelineTab } from './components/TimelineTab';
import { MetroTab } from './components/MetroTab';
import { MontageTab } from './components/MontageTab';
import { BlockManagementTab } from './components/BlockManagementTab';
import { WorldTab } from './components/WorldTab';
import { DeadlineTab } from './components/DeadlineTab';
import { CompileTab } from './components/CompileTab';
import { InboxTab } from './components/InboxTab';
import { ScriptTab } from './components/ScriptTab';
import { DataManager } from './components/DataManager';
import { PublishManager } from './components/PublishManager';
import { LabTab } from './components/LabTab';
import { QuickCapture } from './components/QuickCapture';
import { BackupProvider } from './context/BackupContext';
import { SyncManager } from './components/SyncManager';
import { ShortcutModal } from './components/ShortcutModal';
import { TutorialModal } from './components/TutorialModal';
import { Toaster, toast } from 'sonner';
import { cn } from './lib/utils';

function MainContent({ setMobileOpen, isOutlineOpen, setIsOutlineOpen }: { setMobileOpen: (open: boolean) => void, isOutlineOpen: boolean, setIsOutlineOpen: (open: boolean) => void }) {
  const { 
    disguiseMode, 
    fullScreenMode, 
    activeTab, 
    activeDocumentId, 
    rightSidebarMode, 
    lastInspectorTab, 
    scenes, 
    activeWorkId, 
    deadlineViewMode,
    toggleDisguiseMode,
    toggleFullScreenMode,
    setRightSidebarMode,
    supabaseSyncEnabled,
    saveHistoryVersion,
    darkMode
  } = useStore(useShallow(state => ({
    disguiseMode: state.disguiseMode,
    fullScreenMode: state.fullScreenMode,
    activeTab: state.activeTab,
    activeDocumentId: state.activeDocumentId,
    rightSidebarMode: state.rightSidebarMode,
    lastInspectorTab: state.lastInspectorTab,
    scenes: state.scenes,
    activeWorkId: state.activeWorkId,
    deadlineViewMode: state.deadlineViewMode,
    toggleDisguiseMode: state.toggleDisguiseMode,
    toggleFullScreenMode: state.toggleFullScreenMode,
    setRightSidebarMode: state.setRightSidebarMode,
    supabaseSyncEnabled: state.supabaseSyncEnabled,
    saveHistoryVersion: state.saveHistoryVersion,
    darkMode: state.darkMode
  })));

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [showShortcutModal, setShowShortcutModal] = React.useState(false);
  const [showTutorial, setShowTutorial] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (disguiseMode) {
          e.preventDefault();
          toggleDisguiseMode();
        } else if (fullScreenMode) {
          e.preventDefault();
          toggleFullScreenMode();
        }
      }

      // Ctrl+I toggle Inspector
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        if (activeTab === 'design' && activeDocumentId && !disguiseMode) {
          e.preventDefault();
          if (rightSidebarMode === 'closed') {
            setRightSidebarMode('micro');
          } else {
            setRightSidebarMode('closed');
          }
        }
      }

      // Ctrl + Shift + K (Shortcut Modal)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowShortcutModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    const handleToggleShortcutModal = () => {
      setShowShortcutModal(prev => !prev);
    };
    window.addEventListener('toggle-shortcut-modal', handleToggleShortcutModal);

    const handleToggleTutorial = () => {
      setShowTutorial(prev => !prev);
    };
    window.addEventListener('toggle-tutorial', handleToggleTutorial);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-shortcut-modal', handleToggleShortcutModal);
      window.removeEventListener('toggle-tutorial', handleToggleTutorial);
    };
  }, [disguiseMode, fullScreenMode, activeTab, activeDocumentId, rightSidebarMode, lastInspectorTab, scenes, toggleDisguiseMode, toggleFullScreenMode, setRightSidebarMode, supabaseSyncEnabled, saveHistoryVersion]);

  return (
    <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden bg-white relative">
      {showShortcutModal && <ShortcutModal onClose={() => setShowShortcutModal(false)} />}
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} initialCategory={activeTab} />}
      {!disguiseMode && <TopNav setMobileOpen={setMobileOpen} hideRightButtons={!activeWorkId} />}
      <div className="flex-1 flex overflow-hidden relative">
        {!activeWorkId ? (
          <WorksLibrary />
        ) : (
          <>
            {activeTab === 'design' && (
              <>
                {!disguiseMode && !fullScreenMode && (
                  <>
                    <div className={cn("transition-all duration-300 border-stone-200 h-full shrink-0", isOutlineOpen ? "w-64 border-r" : "w-0 overflow-hidden border-r-0")}>
                      <OutlinePanel setMobileOpen={setMobileOpen} />
                    </div>
                    <button
                      onClick={() => setIsOutlineOpen(!isOutlineOpen)}
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 z-50 flex items-center justify-center bg-white border border-stone-200 shadow-sm transition-all duration-300 text-stone-500 hover:text-stone-700 hover:bg-stone-50",
                        isOutlineOpen 
                          ? "left-[256px] -translate-x-1/2 w-6 h-6 rounded-full" 
                          : "left-0 w-5 h-10 rounded-r-md border-l-0"
                      )}
                    >
                      {isOutlineOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </button>
                  </>
                )}
                <EditorPanel fullScreenMode={fullScreenMode} />
              </>
            )}
            {activeTab === 'blockDescriptions' && <BlockManagementTab />}
            {activeTab === 'lenses' && <LensesTab />}
            {activeTab === 'timelineEvents' && <TimelineTab />}
            {activeTab === 'montage' && <MontageTab />}
            {activeTab === 'metro' && <MetroTab />}
            {activeTab === 'world' && <WorldTab />}
            {activeTab === 'deadline' && (
              <DeadlineTab workId={deadlineViewMode === 'local' ? (activeWorkId || undefined) : undefined} />
            )}
            {activeTab === 'compile' && <CompileTab />}
            {activeTab === 'inbox' && <InboxTab />}
            {activeTab === 'script' && <ScriptTab />}
            {activeTab === 'dataManagement' && <DataManager isTab />}
            {activeTab === 'publish' && <PublishManager isTab />}
            {activeTab === 'lab' && <LabTab />}
          </>
        )}
      </div>
    </div>
  );
}

function Layout() {
  const { disguiseMode, activeWorkId } = useStore(useShallow(state => ({
    disguiseMode: state.disguiseMode,
    activeWorkId: state.activeWorkId
  })));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isOutlineOpen, setIsOutlineOpen] = React.useState(true);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden font-sans text-stone-900 bg-stone-900 selection:bg-wood-200 selection:text-wood-900">
      <Toaster position="top-right" richColors />
      <MainContent setMobileOpen={setMobileOpen} isOutlineOpen={isOutlineOpen} setIsOutlineOpen={setIsOutlineOpen} />
      <QuickCapture />
      <SyncManager />
    </div>
  );
}

export default function App() {
  return (
    <BackupProvider>
      <Layout />
    </BackupProvider>
  );
}

