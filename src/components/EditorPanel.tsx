import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { SlashCommandMenu } from './SlashCommandMenu';
import { AlignLeft, Highlighter, Trash2, Maximize2, Minimize2, MoreVertical, Link as LinkIcon, Copy, Check, ChevronLeft, ArrowUpToLine, MessageSquare, CheckCircle2, Circle, List, PanelRightClose, PanelRightOpen, MessageSquareOff, Search, ExternalLink, Eye, FileText, ChevronRight, ChevronDown, Settings2, Plus, Folder, Info, X, RotateCcw, Clock, ArrowRight, ArrowLeft, Camera, Scissors, Keyboard, LayoutGrid, GitCompare, BookOpen, Coffee, Sparkles, Flame, Type, Focus, Save, Undo, Redo, Minus, Square, AlignCenter, AlignRight, AlignJustify, ListOrdered, ZoomIn, ZoomOut, Globe, BookOpen as BookOpenIcon, Combine } from 'lucide-react';
import { cn } from '../lib/utils';
import { FindReplaceBar } from './FindReplaceBar';
import { ConfirmDeleteButton } from './ConfirmDeleteButton';
import { DisguiseSettingsModal } from './DisguiseSettingsModal';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import { toast } from 'sonner';

import { LensesPanel } from './LensesPanel';
import { EventPoolPanel } from './EventPoolPanel';
import { AutoResizeTextarea } from './AutoResizeTextarea';
import { ChapterScenesList } from './ChapterScenesList';
import { SCENE_STATUS_COLORS } from '../store/constants';
import { CharacterAppearanceMatrix } from './CharacterAppearanceMatrix';
import { SnapshotTab } from './SnapshotTab';
import { NotesTab } from './NotesTab';
import { BlockCompareModal } from './BlockCompareModal';
import { TutorialModal } from './TutorialModal';
import { CoffeeStains } from './CoffeeStains';
import { InspirationParticles } from './InspirationParticles';
import { FireParticles } from './FireParticles';
import { CursorFireworks } from './CursorFireworks';
import { FluidBackground } from './FluidBackground';

const LENS_COLORS = {
  red: 'bg-red-50 border-red-200 text-red-900',
  blue: 'bg-blue-50 border-blue-200 text-blue-900',
  green: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  yellow: 'bg-amber-50 border-amber-200 text-amber-900',
  purple: 'bg-purple-50 border-purple-200 text-purple-900',
  brown: 'bg-orange-200 border-orange-200 text-orange-900',
  black: 'bg-stone-900 border-stone-700 text-stone-100',
};

export function EditorPanel({ compact, fullScreenMode }: { compact?: boolean, fullScreenMode?: boolean }) {
  const {
    setRightSidebarMode,
    undo,
    redo,
    updateBlock,
    setActiveDocument,
    setActiveLens,
    addBlock,
    removeLens,
    deleteBlock,
    mergeBlockUp,
    toggleSceneCharacter,
    updateSceneCharacterNote,
    updateScene,
    deleteScene,
    updateChapter,
    deleteChapter,
    addScene,
    moveScene,
    updateTimelineEventCharacterAction,
    splitSceneAtBlock,
    toggleDisguiseMode,
    addSnapshot,
    showDescriptions,
    activeDocumentId: activeDocId,
    activeWorkId,
    scenes,
    chapters: allChapters,
    blocks: allBlocks,
    characters: allCharacters,
    timelineEvents,
    fullScreenMode: storeFullScreenMode,
    scrollMode,
    typewriterMode,
    focusMode,
    toggleScrollMode,
    toggleTypewriterMode,
    toggleFocusMode,
    rightSidebarMode,
    lastInspectorTab,
    disguiseMode,
    disguiseBackgroundText,
    letterSpacing,
    editorMargin,
    activeTab
  } = useStore(useShallow(state => ({
    setRightSidebarMode: state.setRightSidebarMode,
    undo: state.undo,
    redo: state.redo,
    updateBlock: state.updateBlock,
    setActiveDocument: state.setActiveDocument,
    setActiveLens: state.setActiveLens,
    addBlock: state.addBlock,
    removeLens: state.removeLens,
    deleteBlock: state.deleteBlock,
    mergeBlockUp: state.mergeBlockUp,
    toggleSceneCharacter: state.toggleSceneCharacter,
    updateSceneCharacterNote: state.updateSceneCharacterNote,
    updateScene: state.updateScene,
    deleteScene: state.deleteScene,
    updateChapter: state.updateChapter,
    deleteChapter: state.deleteChapter,
    addScene: state.addScene,
    moveScene: state.moveScene,
    updateTimelineEventCharacterAction: state.updateTimelineEventCharacterAction,
    splitSceneAtBlock: state.splitSceneAtBlock,
    setLetterSpacing: state.setLetterSpacing,
    setEditorMargin: state.setEditorMargin,
    toggleDisguiseMode: state.toggleDisguiseMode,
    addSnapshot: state.addSnapshot,
    showDescriptions: state.showDescriptions,
    activeDocumentId: state.activeDocumentId,
    activeWorkId: state.activeWorkId,
    scenes: state.scenes,
    chapters: state.chapters,
    blocks: state.blocks,
    characters: state.characters,
    timelineEvents: state.timelineEvents,
    fullScreenMode: state.fullScreenMode,
    scrollMode: state.scrollMode,
    typewriterMode: state.typewriterMode,
    focusMode: state.focusMode,
    toggleScrollMode: state.toggleScrollMode,
    toggleTypewriterMode: state.toggleTypewriterMode,
    toggleFocusMode: state.toggleFocusMode,
    rightSidebarMode: state.rightSidebarMode,
    lastInspectorTab: state.lastInspectorTab,
    disguiseMode: state.disguiseMode,
    disguiseBackgroundText: state.disguiseBackgroundText,
    letterSpacing: state.letterSpacing,
    editorMargin: state.editorMargin,
    activeTab: state.activeTab
  })));

  const isFullScreenMode = fullScreenMode !== undefined ? fullScreenMode : storeFullScreenMode;

  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
  const [openMenuBlockId, setOpenMenuBlockId] = useState<string | null>(null);

  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState<{ blockId: string, position: { top: number, left: number } } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSniperActive, setIsSniperActive] = useState(false);
  const [showDisguiseSettings, setShowDisguiseSettings] = useState(false);
  const [isLateNightMode, setIsLateNightMode] = useState(false);
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Panic corner check (within 50px of screen edges)
    if (e.clientX < 50 || e.clientX > window.innerWidth - 50 || e.clientY < 50 || e.clientY > window.innerHeight - 50) {
      setIsSniperActive(false);
    } else {
      setIsSniperActive(true);
    }
  };

  const handleMouseLeave = () => {
    setIsSniperActive(false);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedTocSections, setCollapsedTocSections] = useState<Set<string> | null>(null);
  const [comparingBlockId, setComparingBlockId] = useState<string | null>(null);
  const preventScrollRef = useRef(false);

  // Cool but useless features
  const [stains, setStains] = useState<{ id: string, x: number, y: number, rotation: number, scale: number, opacity: number, type: number }[]>([]);
  const [isRaining, setIsRaining] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    const handleToggleInspirationMode = () => setIsRaining(prev => !prev);
    const handleToggleLateNightMode = () => setIsLateNightMode(prev => !prev);
    
    window.addEventListener('toggle-inspiration-mode', handleToggleInspirationMode);
    window.addEventListener('toggle-late-night-mode', handleToggleLateNightMode);
    
    return () => {
      window.removeEventListener('toggle-inspiration-mode', handleToggleInspirationMode);
      window.removeEventListener('toggle-late-night-mode', handleToggleLateNightMode);
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const addStain = () => {
      if (!isLateNightMode) return;
      setStains(prev => [...prev, {
        id: uuidv4(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.2,
        type: Math.floor(Math.random() * 3)
      }]);
      timeoutId = setTimeout(addStain, Math.random() * 2000 + 1000); // 1s to 3s
    };
    if (isLateNightMode) {
      addStain();
    }
    return () => clearTimeout(timeoutId);
  }, [isLateNightMode]);

  useEffect(() => {
    if (!rainAudioRef.current) {
      rainAudioRef.current = new Audio('https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg');
      rainAudioRef.current.loop = true;
    }
    if (isRaining) {
      rainAudioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else {
      rainAudioRef.current.pause();
    }
    return () => {
      if (rainAudioRef.current) {
        rainAudioRef.current.pause();
      }
    };
  }, [isRaining]);

  const activeDocument = scenes.find(s => s.id === activeDocId) || allChapters.find(c => c.id === activeDocId);
  const isScene = scenes.some(s => s.id === activeDocId);
  const chapterId = isScene ? (activeDocument as any).chapterId : activeDocId;
  const chapter = allChapters.find(c => c.id === chapterId);
  const isArchived = chapter?.archived;
  const activeDocBlocks = allBlocks.filter(b => b.documentId === activeDocId).sort((a, b) => a.order - b.order);
  const characters = allCharacters.filter(c => c.workId === activeWorkId).sort((a, b) => a.order - b.order);
  const chapters = allChapters.filter(c => c.workId === activeWorkId).sort((a, b) => a.order - b.order);
  
  const chapterScenes = scenes.filter(s => s.chapterId === chapterId).sort((a, b) => a.order - b.order);
  const currentSceneIndex = chapterScenes.findIndex(s => s.id === activeDocId);

  // TOC Data
  const tocSections: { title: string; documentId: string; entries: { id: string; description: string; content: string; completed: boolean; documentId: string }[] }[] = [];
  if (activeDocument) {
    const chapterId = isScene ? (activeDocument as any).chapterId : activeDocId;
    const chapter = allChapters.find(c => c.id === chapterId);
    
    if (chapter) {
      const chapterBlocks = allBlocks.filter(b => b.documentId === chapterId && b.description !== undefined).sort((a, b) => a.order - b.order);
      if (chapterBlocks.length > 0) {
        tocSections.push({
          title: chapter.title || 'Untitled Chapter',
          documentId: chapterId,
          entries: chapterBlocks.map(b => ({ id: b.id, description: b.description || '', content: b.content || '', completed: !!b.completed, documentId: b.documentId }))
        });
      }
      
      const chapterScenes = scenes.filter(s => s.chapterId === chapterId).sort((a, b) => a.order - b.order);
      for (const scene of chapterScenes) {
        const sceneBlocks = allBlocks.filter(b => b.documentId === scene.id && b.description !== undefined).sort((a, b) => a.order - b.order);
        if (sceneBlocks.length > 0) {
          tocSections.push({
            title: scene.title || 'Untitled Scene',
            documentId: scene.id,
            entries: sceneBlocks.map(b => ({ id: b.id, description: b.description || '', content: b.content || '', completed: !!b.completed, documentId: b.documentId }))
          });
        }
      }
    }
  }

  const isSectionCollapsed = (documentId: string) => {
    if (collapsedTocSections === null) return true;
    return collapsedTocSections.has(documentId);
  };

  const toggleTocSection = (documentId: string) => {
    setCollapsedTocSections(prev => {
      const current = prev === null ? new Set(tocSections.map(s => s.documentId)) : prev;
      const newSet = new Set(current);
      if (newSet.has(documentId)) {
        newSet.delete(documentId);
      } else {
        newSet.add(documentId);
      }
      return newSet;
    });
  };
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rightSidebarMode !== 'closed') {
      const canShowCurrentTab = isScene || (rightSidebarMode !== 'info' && rightSidebarMode !== 'macro');
      if (!canShowCurrentTab) {
        setRightSidebarMode('micro');
      }
    }
  }, [rightSidebarMode, isScene, setRightSidebarMode]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowBackToTop(container.scrollTop > 500);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (scrollMode && isScene) {
      if (preventScrollRef.current) {
        preventScrollRef.current = false;
        return;
      }
      const element = document.getElementById(`document-${activeDocId}`);
      if (element) {
        // Add a small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }, [activeDocId, scrollMode, isScene]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowFindReplace(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleBlockLens = React.useCallback((blockId: string) => {
    const blocks = useStore.getState().blocks;
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      if (block.isLens) {
        updateBlock({ id: blockId, isLens: false });
      } else {
        updateBlock({ id: blockId, isLens: true, lensColor: 'red' });
      }
      // Re-focus the block after the update
      setTimeout(() => {
        const el = document.getElementById(`block-${blockId}`);
        if (el) {
          const textarea = el.querySelector('textarea');
          if (textarea) {
            textarea.focus();
          }
        }
      }, 0);
    }
  }, [updateBlock]);

  const handleBlockChange = (id: string, updates: Partial<typeof allBlocks[0]>) => {
    updateBlock({ id, ...updates });
  };

  const handleAddBlock = React.useCallback((isLens?: boolean, afterBlockId?: string, targetDocumentId?: string) => {
    const newId = uuidv4();
    let docId = targetDocumentId || activeDocId;
    
    if (!targetDocumentId && afterBlockId) {
      const block = allBlocks.find(b => b.id === afterBlockId);
      if (block) {
        docId = block.documentId;
      }
    }
    
    if (!docId) return;
    addBlock({ id: newId, documentId: docId, type: 'text', isLens, lensColor: isLens ? 'red' : undefined, afterBlockId });
    setFocusedBlockId(newId);
  }, [addBlock, activeDocId, setFocusedBlockId, allBlocks]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Ctrl+/ Toggle Block/Lens
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        if (focusedBlockId) {
          toggleBlockLens(focusedBlockId);
        }
      }

      // Ctrl+Enter Add Block Below
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        // Find the focused block
        if (focusedBlockId) {
          handleAddBlock(false, focusedBlockId);
        } else {
          handleAddBlock(false);
        }
      }

      if (isInput) return; // Let native undo/redo handle text inputs

      // Undo: Ctrl+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') || 
          ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleAddBlock, focusedBlockId, toggleBlockLens]);

  if (!activeDocument) {
    return (
      <div className="hidden md:flex flex-1 flex-col items-center justify-center text-stone-400 bg-white">
        <AlignLeft size={48} className="mb-4 opacity-20" />
        <p>选择一个章节或场景开始写作。</p>
      </div>
    );
  }

  const navigateToBlock = (blockId: string) => {
    const block = allBlocks.find(b => b.id === blockId);
    if (block) {
      if (block.documentId !== activeDocId) {
        setActiveDocument(block.documentId);
      }
      
      // Auto-close inspector on mobile when jumping to text
      if (window.innerWidth < 768) {
        setRightSidebarMode('closed');
      }

      setTimeout(() => {
        const el = document.getElementById(`block-${blockId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-wood-500', 'ring-offset-2');
          setTimeout(() => el.classList.remove('ring-2', 'ring-wood-500', 'ring-offset-2'), 2000);
        }
      }, 100);
    }
  };

  const toggleBlockDescription = (block: typeof allBlocks[0]) => {
    if (block.description === undefined) {
      handleBlockChange(block.id, { description: '' });
    } else if (block.description === '') {
      handleBlockChange(block.id, { description: undefined });
    }
  };

  const handleLensColorChange = (id: string, color: string) => {
    updateBlock({ id, lensColor: color });
  };

  const handleRemoveLens = (id: string) => {
    removeLens(id);
  };

  const handleDeleteBlock = (id: string) => {
    deleteBlock(id);
    toast.success('已删除 1 个段落', {
      action: {
        label: '撤销',
        onClick: () => undo()
      },
      duration: 5000,
    });
  };

  const handleMergeUp = (id: string) => {
    mergeBlockUp(id);
  };

  const handleSplitScene = (blockId: string) => {
    if (isScene) {
      const block = allBlocks.find(b => b.id === blockId);
      if (block) {
        splitSceneAtBlock(block.documentId, blockId);
      }
    }
  };

  const toggleCharacter = (charId: string) => {
    if (isScene) {
      toggleSceneCharacter(activeDocId, charId);
    }
  };

  const handleCopyScene = (sceneId?: string | React.MouseEvent) => {
    const targetId = typeof sceneId === 'string' ? sceneId : activeDocId;
    const sceneBlocks = allBlocks.filter(b => b.documentId === targetId).sort((a, b) => a.order - b.order);
    const text = sceneBlocks
      .filter(b => !(b.isLens && b.lensColor?.toLowerCase() === 'black'))
      .map(b => b.content)
      .join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Calculate chapter stats if it's a chapter
  let chapterCharacters: string[] = [];
  if (!isScene) {
    const charIds = new Set<string>();
    chapterScenes.forEach(s => s.characterIds.forEach(id => charIds.add(id)));
    chapterCharacters = Array.from(charIds);
  }

  const countWords = (text: string) => {
    if (!text) return 0;
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
    const englishWords = text.match(/[a-zA-Z0-9]+/g) || [];
    return chineseChars.length + englishWords.length;
  };

  const totalWords = activeDocBlocks.reduce((sum, b) => sum + countWords(b.content || ''), 0);

  if (disguiseMode) {
    return (
      <div className="flex flex-col h-full w-full bg-[#E6E6E6] font-sans select-none overflow-hidden">
        {/* Title Bar */}
        <div className="h-10 bg-[#2B579A] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center h-full">
            <div className="flex items-center px-3 gap-3">
              <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center text-[#2B579A] font-bold text-xs">W</div>
              <Save size={16} className="opacity-80 hover:opacity-100 cursor-pointer" />
              <Undo size={16} className="opacity-80 hover:opacity-100 cursor-pointer" onClick={undo} />
              <Redo size={16} className="opacity-80 hover:opacity-100 cursor-pointer" onClick={redo} />
            </div>
            <div className="h-full w-px bg-white/20 mx-2"></div>
            <div className="text-xs">{activeDocument?.title || '文档1'} - Word</div>
          </div>
          <div className="flex items-center h-full">
            <div className="flex items-center bg-white/10 rounded px-2 py-1 mr-4">
              <Search size={14} className="mr-2 opacity-70" />
              <span className="text-xs opacity-70 w-32">搜索</span>
            </div>
            <div className="flex h-full">
              <button className="px-4 hover:bg-white/10 transition-colors"><Minus size={16} /></button>
              <button className="px-4 hover:bg-white/10 transition-colors"><Square size={14} /></button>
              <button onClick={toggleDisguiseMode} className="px-4 hover:bg-red-500 transition-colors" title="退出伪装模式 (Esc)"><X size={16} /></button>
            </div>
          </div>
        </div>

        {/* Ribbon Tabs */}
        <div className="bg-[#F3F2F1] flex flex-col shrink-0">
          <div className="flex px-2 pt-1 gap-1 text-sm text-[#444]">
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer text-white bg-[#2B579A]">文件</div>
            <div className="px-4 py-1.5 bg-white text-[#2B579A] border-t border-l border-r border-stone-200 relative top-[1px] z-10">开始</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer">插入</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer">设计</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer">布局</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer" onClick={() => setShowDisguiseSettings(true)}>伪装设置</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer">引用</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer">邮件</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer">审阅</div>
            <div className="px-4 py-1.5 hover:bg-stone-200 cursor-pointer">视图</div>
          </div>
          {/* Ribbon Toolbar */}
          <div className="bg-white border-b border-stone-300 h-24 flex items-center px-2 gap-4 shadow-sm z-0">
            {/* Clipboard */}
            <div className="flex flex-col items-center justify-center h-full border-r border-stone-200 pr-4 gap-1">
              <div className="flex items-center gap-1">
                <div className="flex flex-col items-center p-1 hover:bg-stone-100 rounded cursor-pointer">
                  <Copy size={24} className="text-stone-600" />
                  <span className="text-[10px] text-stone-600 mt-1">粘贴</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-600"><Scissors size={14} /> <span className="text-[10px]">剪切</span></div>
                  <div className="flex items-center gap-1 p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-600"><Copy size={14} /> <span className="text-[10px]">复制</span></div>
                  <div className="flex items-center gap-1 p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-600"><Highlighter size={14} /> <span className="text-[10px]">格式刷</span></div>
                </div>
              </div>
              <span className="text-[10px] text-stone-400">剪贴板</span>
            </div>

            {/* Font */}
            <div className="flex flex-col items-center justify-center h-full border-r border-stone-200 pr-4 gap-2">
              <div className="flex gap-2">
                <div className="flex items-center border border-stone-300 rounded px-2 py-0.5 bg-white hover:border-stone-400 cursor-pointer w-32 justify-between">
                  <span className="text-xs text-stone-700 font-serif">等线 (Light)</span>
                  <ChevronDown size={12} className="text-stone-500" />
                </div>
                <div className="flex items-center border border-stone-300 rounded px-2 py-0.5 bg-white hover:border-stone-400 cursor-pointer w-12 justify-between">
                  <span className="text-xs text-stone-700">11</span>
                  <ChevronDown size={12} className="text-stone-500" />
                </div>
                <div className="flex items-center border border-stone-300 rounded overflow-hidden">
                  <div className="px-1.5 py-0.5 hover:bg-stone-100 cursor-pointer text-stone-600 text-xs font-bold">A^</div>
                  <div className="px-1.5 py-0.5 hover:bg-stone-100 cursor-pointer text-stone-600 text-xs border-l border-stone-300">Av</div>
                </div>
              </div>
              <div className="flex gap-1 w-full">
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700 font-bold font-serif">B</div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700 italic font-serif">I</div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700 underline font-serif">U</div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700 line-through font-serif">ab</div>
                <div className="w-px h-4 bg-stone-300 mx-1 self-center"></div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700 flex items-center relative">
                  <Highlighter size={14} />
                  <div className="absolute bottom-0.5 left-1 right-1 h-0.5 bg-yellow-400"></div>
                </div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700 flex items-center relative">
                  <span className="font-bold text-sm">A</span>
                  <div className="absolute bottom-0.5 left-1 right-1 h-0.5 bg-red-500"></div>
                </div>
              </div>
              <span className="text-[10px] text-stone-400">字体</span>
            </div>

            {/* Paragraph */}
            <div className="flex flex-col items-center justify-center h-full border-r border-stone-200 pr-4 gap-2">
              <div className="flex gap-1">
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700"><List size={14} /></div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700"><ListOrdered size={14} /></div>
                <div className="w-px h-4 bg-stone-300 mx-1 self-center"></div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700"><AlignLeft size={14} /></div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700"><AlignCenter size={14} /></div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700"><AlignRight size={14} /></div>
                <div className="p-1 hover:bg-stone-100 rounded cursor-pointer text-stone-700"><AlignJustify size={14} /></div>
              </div>
              <span className="text-[10px] text-stone-400 mt-auto">段落</span>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto flex justify-center py-8 custom-scrollbar bg-[#E6E6E6]" ref={scrollContainerRef}>
          <div 
            className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] w-[794px] min-h-[1123px] relative cursor-text"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Fake Layer */}
            <div className="absolute inset-0 px-[96px] py-[96px] text-black font-serif text-[15px] leading-[1.8] whitespace-pre-wrap text-stone-600 pointer-events-none opacity-80">
              {disguiseBackgroundText}
            </div>

            {/* Real Layer */}
            <div 
              className="absolute inset-0 px-[96px] py-[96px] bg-white z-10 transition-opacity duration-300 flex flex-col"
              style={{
                maskImage: isSniperActive ? `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 50%, transparent 100%)` : 'none',
                WebkitMaskImage: isSniperActive ? `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 50%, transparent 100%)` : 'none',
                opacity: isSniperActive ? 1 : 0,
                pointerEvents: 'auto'
              }}
            >
              {/* Render Blocks */}
              {activeDocBlocks.map((block, index) => (
                <div key={block.id} className="relative group/block mb-4">
                  <AutoResizeTextarea
                    scrollContainerRef={scrollContainerRef}
                    value={block.content || ''}
                    onChange={(e: any) => updateBlock({ id: block.id, content: e.target.value })}
                    placeholder={index === 0 ? "在此处输入内容..." : ""}
                    blockId={block.id}
                    isFocused={focusedBlockId === block.id}
                    isWordMode={true}
                    alignment={block.alignment || 'left'}
                    onFocus={() => {
                      setFocusedBlockId(block.id);
                      setOpenMenuBlockId(null);
                    }}
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        addBlock({ documentId: activeDocId, type: 'text', afterBlockId: block.id });
                      } else if (e.key === 'Backspace' && block.content === '') {
                        e.preventDefault();
                        handleMergeUp(block.id);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-[#F3F2F1] border-t border-stone-300 flex items-center justify-between px-4 text-[11px] text-stone-600 shrink-0">
          <div className="flex items-center gap-4">
            <span className="hover:bg-stone-200 px-1 cursor-pointer">页面 1 / 1</span>
            <span className="hover:bg-stone-200 px-1 cursor-pointer">{totalWords} 个字</span>
            <span className="hover:bg-stone-200 px-1 cursor-pointer flex items-center gap-1"><Check size={10} /> 拼写和语法检查无误</span>
            <span className="hover:bg-stone-200 px-1 cursor-pointer">中文(中国)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpenIcon size={12} className="hover:text-stone-900 cursor-pointer" />
              <LayoutGrid size={12} className="text-[#2B579A] cursor-pointer" />
              <Globe size={12} className="hover:text-stone-900 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
              <span className="hover:bg-stone-200 px-1 cursor-pointer">100%</span>
              <ZoomOut size={12} className="hover:text-stone-900 cursor-pointer" />
              <div className="w-24 h-0.5 bg-stone-300 relative flex items-center">
                <div className="w-2 h-4 bg-stone-500 absolute left-1/2 -translate-x-1/2 cursor-pointer"></div>
              </div>
              <ZoomIn size={12} className="hover:text-stone-900 cursor-pointer" />
            </div>
          </div>
        </div>
        {showDisguiseSettings && <DisguiseSettingsModal onClose={() => setShowDisguiseSettings(false)} />}
      </div>
    );
  }

  return (
    <div className={cn(
      "flex-1 flex bg-[#f4ebd8] overflow-hidden relative transition-all duration-700",
      !activeDocId ? "hidden md:flex" : "flex"
    )}>
      <CoffeeStains stains={stains} onRemoveStain={(id) => setStains(prev => prev.filter(s => s.id !== id))} />
      <InspirationParticles isRaining={isRaining} />
      <FireParticles isBurning={isBurning} />
      {showDisguiseSettings && <DisguiseSettingsModal onClose={() => setShowDisguiseSettings(false)} />}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {showFindReplace && (
          <div className="absolute top-4 right-4 z-[100] bg-white/90 backdrop-blur-md shadow-xl rounded-xl border border-stone-200/50 p-2 animate-in fade-in slide-in-from-top-4">
            <FindReplaceBar 
              onClose={() => {
                setShowFindReplace(false);
                setSearchTerm('');
              }} 
              onSearchChange={setSearchTerm} 
            />
          </div>
        )}
        <div 
          ref={scrollContainerRef}
        className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden pb-32 md:pb-12 transition-all duration-300",
        isFullScreenMode 
          ? "px-0 py-0" 
          : compact
            ? "px-4 py-6 md:px-8 md:py-10"
            : "px-6 py-10 md:px-12 md:py-16 lg:px-16 xl:px-20"
      )}>
        <div 
          className={cn(
            "mx-auto transition-all duration-700 paper-sheet p-8 md:p-16 mt-0 mb-0 min-h-screen",
            isFullScreenMode ? "max-w-full w-full" : "max-w-4xl",
            isBurning && "burning-paper"
          )}
        >
          <div className="flex items-start justify-between mb-4 gap-4 flex-col md:flex-row">
            <div className="flex items-center flex-1 min-w-0 gap-2 w-full">
              <input
                type="text"
                value={(scrollMode && isScene ? chapter?.title : activeDocument.title) || ''}
                disabled={isArchived}
                onChange={(e) => {
                  if (scrollMode && isScene) {
                    updateChapter({ id: chapterId, title: e.target.value });
                  } else if (isScene) {
                    updateScene({ id: activeDocId, title: e.target.value });
                  } else {
                    updateChapter({ id: activeDocId, title: e.target.value });
                  }
                }}
                className={cn(
                  "w-full outline-none placeholder:text-[#8b7355]/50 bg-transparent whitespace-normal break-words caret-[#8b0000] text-center border-b-2 border-dotted border-[#8b7355] pb-4 mb-8",
                  disguiseMode 
                    ? "font-mono text-base leading-snug text-black font-normal" 
                    : "text-2xl md:text-3xl font-display font-bold text-[#3b3024] uppercase tracking-widest"
                )}
                placeholder="未命名..."
              />
            </div>
            <div className="flex items-center flex-wrap justify-end gap-1 md:gap-2 relative shrink-0 w-full md:w-auto">
              <button
                onClick={() => setShowFindReplace(!showFindReplace)}
                className={cn("p-2 rounded-md transition-colors", showFindReplace ? "text-wood-600 bg-wood-50 hover:bg-wood-100" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100")}
                title="查找与替换 (Ctrl+F)"
              >
                <Search size={20} />
              </button>

              {isScene && (
                <>
                  <button
                    onClick={handleCopyScene}
                    className={cn("p-2 rounded-md transition-colors", copied ? "text-wood-600 bg-wood-50 hover:bg-wood-100" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100")}
                    title="复制场景文本"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                  <button
                    onClick={() => {
                      setIsBurning(true);
                      setTimeout(() => {
                        const blocksToDelete = allBlocks.filter(b => b.documentId === activeDocId);
                        blocksToDelete.forEach(b => deleteBlock(b.id));
                        deleteScene(activeDocId);
                        setActiveDocument(null);
                        setIsBurning(false);
                      }, 2000);
                    }}
                    className="p-2 rounded-md transition-colors text-stone-400 hover:text-red-600 hover:bg-red-50"
                    title="焚毁手稿 (清空场景)"
                  >
                    <Flame size={20} />
                  </button>
                </>
              )}
              
              {!isScene && (
                <ConfirmDeleteButton
                  onConfirm={() => deleteChapter(activeDocId)}
                  className="p-2"
                  title="删除章节"
                  iconSize={20}
                />
              )}
            </div>
          </div>

          {/* Chapter Scenes List */}
          <ChapterScenesList
            isScene={isScene}
            disguiseMode={disguiseMode}
            activeDocId={activeDocId}
            scenes={scenes}
            allBlocks={allBlocks}
            addScene={addScene}
            setActiveDocument={setActiveDocument}
            updateScene={updateScene}
          />

          {/* Character Appearance Matrix */}
          {!isScene && !disguiseMode && chapterCharacters.length > 0 && (
            <div className="mb-12 space-y-6">
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 pb-2">角色出场矩阵</h3>
              <CharacterAppearanceMatrix
                scenes={chapterScenes}
                characters={characters.filter(c => chapterCharacters.includes(c.id))}
                selectedCharacterIds={chapterCharacters}
                onTogglePresence={toggleSceneCharacter}
                onUpdateNote={updateSceneCharacterNote}
              />
            </div>
          )}

          {/* Blocks */}
          <div className={cn("space-y-6", disguiseMode && "space-y-4")}>
            {(!isScene ? [{ id: activeDocId, isChapter: true, title: activeDocument.title }] : (scrollMode ? chapterScenes : [activeDocument as any])).map((doc, docIndex, docArray) => {
              const currentBlocks = doc.isChapter ? activeDocBlocks : allBlocks.filter(b => b.documentId === doc.id).sort((a, b) => a.order - b.order);
              const isLastDoc = docIndex === docArray.length - 1;
              
              return (
                <div key={doc.id} id={`document-${doc.id}`} className="flex flex-col">
                  {scrollMode && isScene && (
                    <div className="mb-6 mt-8 first:mt-0 flex items-center justify-between group/scene-header">
                      <input
                        type="text"
                        value={doc.title || ''}
                        disabled={isArchived}
                        onChange={(e) => updateScene({ id: doc.id, title: e.target.value })}
                        onFocus={() => {
                          if (doc.id !== activeDocId) {
                            preventScrollRef.current = true;
                            setActiveDocument(doc.id);
                          }
                        }}
                        className={cn(
                          "flex-1 min-w-0 outline-none placeholder:text-stone-300 bg-transparent whitespace-normal break-words caret-blue-500",
                          disguiseMode 
                            ? "font-mono text-lg leading-snug text-black font-bold" 
                            : "text-xl md:text-2xl font-serif font-semibold text-stone-800"
                        )}
                        placeholder="未命名场景..."
                      />
                      <button
                        onClick={() => handleCopyScene(doc.id)}
                        className="p-1.5 rounded-md text-stone-300 hover:text-stone-600 hover:bg-stone-100 opacity-0 group-hover/scene-header:opacity-100 transition-all"
                        title="复制场景文本"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  )}
                  
                  {currentBlocks.map((block, index) => {
                    const prevBlock = index > 0 ? currentBlocks[index - 1] : null;
                    const canMergeUp = !block.isLens && prevBlock && !prevBlock.isLens && !disguiseMode;

                    return (
                    <div key={block.id} id={`block-${block.id}`} className={cn(
                      "group relative flex flex-col transition-colors duration-500",
                      disguiseMode 
                        ? "bg-white shadow-md border border-stone-200 p-12 max-w-[800px] mx-auto my-8 min-h-[1000px] relative"
                        : "mb-6 last:mb-0"
                    )}>
                      {disguiseMode && block.description && (
                        <div className="absolute -right-48 top-0 w-40 bg-yellow-100 border border-yellow-200 p-3 text-xs text-yellow-900 rounded shadow-sm">
                          <span className="font-bold block mb-1">批注:</span>
                          {block.description}
                        </div>
                      )}
                      
                      {showSlashMenu?.blockId === block.id && (
                        <SlashCommandMenu
                          onClose={() => setShowSlashMenu(null)}
                          onSelect={(action) => {
                            if (action === 'convert') toggleBlockLens(block.id);
                            if (action === 'merge') handleMergeUp(block.id);
                            if (action === 'split') handleSplitScene(block.id);
                            if (action === 'compare') setComparingBlockId(block.id);
                            if (action === 'delete') handleDeleteBlock(block.id);
                            setShowSlashMenu(null);
                          }}
                          position={showSlashMenu.position}
                        />
                      )}

                      <div className="flex items-start gap-2" style={{
                        paddingLeft: `${disguiseMode ? 0 : (editorMargin || 0)}rem`,
                        paddingRight: `${disguiseMode ? 0 : (editorMargin || 0)}rem`,
                      }}>
                        <div className="flex-1 min-w-0">
                          {/* Block Content */}
                          <div className={cn(
                            "w-full rounded-lg transition-colors relative",
                            block.isComparing && "ring-2 ring-blue-500 shadow-sm",
                            block.isLens && !disguiseMode
                              ? cn("p-4 border-2", LENS_COLORS[block.lensColor as keyof typeof LENS_COLORS] || LENS_COLORS.red) 
                              : "px-4 border-2 border-transparent",
                            disguiseMode && "rounded-none p-0 border-0 bg-transparent"
                          )}>
                            {block.isComparing && !disguiseMode && (
                              <div 
                                className="absolute -top-3 -right-3 bg-wood-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md cursor-pointer hover:bg-wood-700 transition-colors flex items-center gap-1 z-10"
                                onClick={() => setComparingBlockId(block.id)}
                              >
                                <GitCompare size={12} />
                                比较中
                              </div>
                            )}
                            {block.isLens && !disguiseMode && (
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex space-x-1">
                                  {Object.keys(LENS_COLORS).map(color => (
                                    <button
                                      key={color}
                                      onClick={() => handleLensColorChange(block.id, color)}
                                      className={cn(
                                        "w-4 h-4 rounded-full border border-black/10 transition-transform hover:scale-110",
                                        color === 'red' && "bg-red-400",
                                        color === 'blue' && "bg-blue-400",
                                        color === 'green' && "bg-emerald-400",
                                        color === 'yellow' && "bg-amber-400",
                                        color === 'purple' && "bg-purple-400",
                                        color === 'brown' && "bg-orange-400",
                                        color === 'black' && "bg-stone-900",
                                        block.lensColor === color && "ring-2 ring-offset-1 ring-stone-400"
                                      )}
                                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                                    />
                                  ))}
                                </div>
                                <button
                                  onClick={() => {
                                    setRightSidebarMode('meso');
                                    setActiveLens(block.id);
                                  }}
                                  className="p-1 hover:bg-black/10 rounded transition-colors text-stone-600"
                                  title="在侧边栏中跳转到透镜"
                                >
                                  <ArrowRight size={14} />
                                </button>
                              </div>
                            )}
                            
                            <AutoResizeTextarea
                              scrollContainerRef={scrollContainerRef}
                              value={block.content || ''}
                              searchTerm={searchTerm}
                              blockId={block.id}
                              disabled={isArchived}
                              isFocused={focusedBlockId === block.id}
                              isDimmed={focusMode && focusedBlockId !== null && focusedBlockId !== block.id}
                              isDisguiseMode={disguiseMode}
                              typewriterMode={typewriterMode}
                              alignment={block.alignment || 'left'}
                              onFocus={() => {
                                setFocusedBlockId(block.id);
                                setOpenMenuBlockId(null);
                                if (block.documentId !== activeDocId) {
                                  preventScrollRef.current = true;
                                  setActiveDocument(block.documentId);
                                }
                              }}
                              onBlur={() => {
                                // Only clear if the focused block is still this one
                                setFocusedBlockId(prev => prev === block.id ? null : prev);
                              }}
                              onChange={(e: any) => handleBlockChange(block.id, { content: e.target.value })}
                              onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === '/') {
                                  const textarea = e.currentTarget as HTMLTextAreaElement;
                                  const pos = textarea.selectionStart;
                                  const isStartOfBlock = pos === 0;
                                  const isStartOfParagraph = pos > 0 && textarea.value[pos - 1] === '\n';
                                  
                                  if (isStartOfBlock || isStartOfParagraph) {
                                    e.preventDefault();
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setShowSlashMenu({ blockId: block.id, position: { top: rect.top + 20, left: rect.left } });
                                  }
                                }
                                if (e.key === 'Tab') {
                                  e.preventDefault();
                                  const currentIndex = currentBlocks.findIndex(b => b.id === block.id);
                                  
                                  if (e.shiftKey) {
                                    // Shift + Tab: Previous block
                                    if (currentIndex > 0) {
                                      const prevBlock = currentBlocks[currentIndex - 1];
                                      setFocusedBlockId(prevBlock.id);
                                    } else if (isScene) {
                                      const blockSceneIndex = chapterScenes.findIndex(s => s.id === block.documentId);
                                      if (blockSceneIndex > 0) {
                                        // Move to previous scene in same chapter
                                        const prevScene = chapterScenes[blockSceneIndex - 1];
                                        const prevSceneBlocks = allBlocks
                                          .filter(b => b.documentId === prevScene.id)
                                          .sort((a, b) => a.order - b.order);
                                        
                                        if (prevSceneBlocks.length > 0) {
                                          const lastBlock = prevSceneBlocks[prevSceneBlocks.length - 1];
                                          if (!scrollMode) setActiveDocument(prevScene.id);
                                          setFocusedBlockId(lastBlock.id);
                                        }
                                      }
                                    }
                                  } else {
                                    // Tab: Next block
                                    if (currentIndex < currentBlocks.length - 1) {
                                      const nextBlock = currentBlocks[currentIndex + 1];
                                      setFocusedBlockId(nextBlock.id);
                                    } else if (isScene) {
                                      const blockSceneIndex = chapterScenes.findIndex(s => s.id === block.documentId);
                                      if (blockSceneIndex < chapterScenes.length - 1) {
                                        // Move to next scene in same chapter
                                        const nextScene = chapterScenes[blockSceneIndex + 1];
                                        const nextSceneBlocks = allBlocks
                                          .filter(b => b.documentId === nextScene.id)
                                          .sort((a, b) => a.order - b.order);
                                        
                                        if (nextSceneBlocks.length > 0) {
                                          const firstBlock = nextSceneBlocks[0];
                                          if (!scrollMode) setActiveDocument(nextScene.id);
                                          setFocusedBlockId(firstBlock.id);
                                        }
                                      }
                                    }
                                  }
                                }
                              }}
                              placeholder={block.isLens ? (block.lensColor === 'black' ? "隐藏内容..." : "输入透镜内容...") : "开始写作..."}
                              className={cn(
                                "w-full outline-none bg-transparent p-0",
                                disguiseMode 
                                  ? "font-mono text-base leading-snug text-black" 
                                  : (block.isLens 
                                      ? "text-base md:text-sm font-medium leading-relaxed font-sans" 
                                      : "text-lg leading-[2.5] tracking-wide text-[#2c241b] font-mono"
                                    ),
                                block.isLens && block.lensColor === 'black' && !disguiseMode 
                                  ? "text-transparent focus:text-stone-900 placeholder:text-stone-400 focus:placeholder:text-stone-300 selection:bg-stone-200 selection:text-stone-900" 
                                  : ""
                              )}
                              style={{ letterSpacing: `${(letterSpacing || 0) * 0.05}em` }}
                            />
                          </div>

                          {/* Block Actions (Hover) */}
                          {!disguiseMode && !isArchived && (
                            <div className="transition-opacity flex items-center space-x-1 absolute -left-10 top-2 z-10 opacity-0 group-hover:opacity-100">
                              <button 
                                onClick={() => handleAddBlock(false, block.id, doc.id)}
                                className="p-1 text-stone-300 hover:text-wood-600 hover:bg-stone-100 rounded transition-colors"
                                title="在下方添加文本段落"
                              >
                                <Plus size={16} />
                              </button>
                              <div className="relative">
                                <button 
                                  onClick={() => setOpenMenuBlockId(openMenuBlockId === block.id ? null : block.id)}
                                  className={cn("p-1 rounded transition-colors", openMenuBlockId === block.id ? "text-stone-600 bg-stone-100" : "text-stone-300 hover:text-stone-600 hover:bg-stone-100")}
                                  title="更多操作"
                                >
                                  <MoreVertical size={16} />
                                </button>
                                {openMenuBlockId === block.id && (
                                  <div className="absolute left-full top-0 ml-1 flex items-center space-x-1 bg-white shadow-sm rounded-md border border-stone-200 p-1 z-20">
                                    <button 
                                      onClick={() => {
                                        handleBlockChange(block.id, { isLens: !block.isLens });
                                        setOpenMenuBlockId(null);
                                      }}
                                      className="p-1 text-stone-400 hover:text-wood-600 hover:bg-wood-50 rounded transition-colors"
                                      title={block.isLens ? "转换为普通段落" : "转换为透镜段落"}
                                    >
                                      <Highlighter size={14} />
                                    </button>
                                    {canMergeUp && (
                                      <button 
                                        onClick={() => {
                                          handleMergeUp(block.id);
                                          setOpenMenuBlockId(null);
                                        }}
                                        className="p-1 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded transition-colors"
                                        title="与上一个文本段落合并"
                                      >
                                        <ArrowUpToLine size={14} />
                                      </button>
                                    )}
                                    {isScene && (
                                      <button 
                                        onClick={() => {
                                          handleSplitScene(block.id);
                                          setOpenMenuBlockId(null);
                                        }}
                                        className="p-1 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded transition-colors"
                                        title="在此段落后拆分场景"
                                      >
                                        <Scissors size={14} />
                                      </button>
                                    )}
                                    <button 
                                      onClick={() => {
                                        setComparingBlockId(block.id);
                                        setOpenMenuBlockId(null);
                                      }}
                                      className="p-1 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                      title="比较与编辑"
                                    >
                                      <GitCompare size={14} />
                                    </button>
                                    <button 
                                      onClick={() => {
                                        handleDeleteBlock(block.id);
                                        setOpenMenuBlockId(null);
                                      }}
                                      className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                      title="删除段落"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right Side Actions for Text Blocks */}
                        {!disguiseMode && !isArchived && (
                          <div className="flex flex-col items-center space-y-2 transition-opacity pt-2 w-8 shrink-0 opacity-0 group-hover:opacity-100">
                            <button 
                              onClick={() => toggleBlockDescription(block)}
                              className={cn("p-1.5 rounded-md transition-colors", block.description !== undefined ? "text-wood-600 bg-wood-50" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100")}
                              title="段落描述"
                            >
                              <MessageSquare size={16} />
                            </button>
                            <button 
                              onClick={() => handleBlockChange(block.id, { completed: !block.completed })}
                              className={cn("p-1.5 rounded-md transition-colors", block.completed ? "text-emerald-600 bg-emerald-50" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100")}
                              title="切换完成状态"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    );
                  })}

                  {currentBlocks.length === 0 && !disguiseMode && (
                    <div className="flex space-x-4 mt-8">
                      <button 
                        onClick={() => handleAddBlock(false, undefined, doc.id)}
                        className="flex items-center px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors text-sm font-medium"
                      >
                        <AlignLeft size={16} className="mr-2" />
                        添加文本
                      </button>
                      <button 
                        onClick={() => handleAddBlock(true, undefined, doc.id)}
                        className="flex items-center px-4 py-2 bg-wood-50 hover:bg-wood-100 text-wood-700 rounded-md transition-colors text-sm font-medium"
                      >
                        <Highlighter size={16} className="mr-2" />
                        添加透镜
                      </button>
                    </div>
                  )}

                  {scrollMode && isScene && !isLastDoc && (
                    <hr className="border-t-2 border-dashed border-stone-200 my-16" />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="h-[50vh]" /> {/* Bottom padding for Scroll Past End */}
        </div>
      </div>
      </div>
      
      {/* Inspector Sidebar */}
      {rightSidebarMode !== 'closed' && !disguiseMode && !isFullScreenMode && (
        <div className={cn(
          "bg-[#eaddc5] border-l-[4px] border-double border-[#5c4a3d] shrink-0 flex transition-all duration-300",
          "fixed inset-0 w-full z-[60] md:relative md:w-80 md:inset-auto md:z-20"
        )}>
          {/* Vertical Tab Bar */}
          <div className="w-12 border-r-2 border-dashed border-[#5c4a3d] bg-[#2c241b] flex flex-col items-center py-4 space-y-4 shrink-0">
            {isScene && (
              <button
                onClick={() => setRightSidebarMode('info')}
                className={cn("p-2 rounded-lg transition-all", rightSidebarMode === 'info' ? "bg-[#eaddc5] text-[#5c4a3d] shadow-inner" : "text-[#8b7355] hover:text-[#eaddc5] hover:bg-[#5c4a3d]/50")}
                title="场景信息"
              >
                <Info size={18} />
              </button>
            )}
            <button
              onClick={() => setRightSidebarMode('micro')}
              className={cn("p-2 rounded-lg transition-all", rightSidebarMode === 'micro' ? "bg-[#eaddc5] text-[#5c4a3d] shadow-inner" : "text-[#8b7355] hover:text-[#eaddc5] hover:bg-[#5c4a3d]/50")}
              title="目录"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setRightSidebarMode('meso')}
              className={cn("p-2 rounded-lg transition-all", rightSidebarMode === 'meso' ? "bg-[#eaddc5] text-[#5c4a3d] shadow-inner" : "text-[#8b7355] hover:text-[#eaddc5] hover:bg-[#5c4a3d]/50")}
              title="透镜"
            >
              <LayoutGrid size={18} />
            </button>
            {isScene && (
              <button
                onClick={() => setRightSidebarMode('macro')}
                className={cn("p-2 rounded-lg transition-all", rightSidebarMode === 'macro' ? "bg-[#eaddc5] text-[#5c4a3d] shadow-inner" : "text-[#8b7355] hover:text-[#eaddc5] hover:bg-[#5c4a3d]/50")}
                title="事件"
              >
                <Clock size={18} />
              </button>
            )}
            {isScene && (
              <button
                onClick={() => setRightSidebarMode('snapshots')}
                className={cn("p-2 rounded-lg transition-all", rightSidebarMode === 'snapshots' ? "bg-[#eaddc5] text-[#5c4a3d] shadow-inner" : "text-[#8b7355] hover:text-[#eaddc5] hover:bg-[#5c4a3d]/50")}
                title="快照"
              >
                <Camera size={18} />
              </button>
            )}
            <button
              onClick={() => setRightSidebarMode('notes')}
              className={cn("p-2 rounded-lg transition-all", rightSidebarMode === 'notes' ? "bg-[#eaddc5] text-[#5c4a3d] shadow-inner" : "text-[#8b7355] hover:text-[#eaddc5] hover:bg-[#5c4a3d]/50")}
              title="笔记"
            >
              <FileText size={18} />
            </button>
            <div className="flex-1" />
            <button
              onClick={() => setRightSidebarMode('closed')}
              className="p-2 text-[#8b7355] hover:text-[#eaddc5] hover:bg-[#5c4a3d]/50 rounded-lg transition-colors"
              title="关闭检查器"
            >
              <PanelRightClose size={18} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#f4ebd8]">
            <div className="p-4 border-b-2 border-dashed border-[#5c4a3d] flex items-center justify-between shrink-0 bg-[#eaddc5]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#3b3024] font-display tracking-widest">
                  {rightSidebarMode === 'info' && '场景信息'}
                  {rightSidebarMode === 'micro' && '目录'}
                  {rightSidebarMode === 'meso' && '透镜'}
                  {rightSidebarMode === 'macro' && '事件'}
                  {rightSidebarMode === 'snapshots' && '快照'}
                  {rightSidebarMode === 'notes' && '笔记'}
                </h3>
                {rightSidebarMode === 'micro' && isScene && (activeDocument as any)?.chapterId && (
                  <button
                    onClick={() => setActiveDocument((activeDocument as any).chapterId)}
                    className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-[#5c4a3d] bg-[#eaddc5] hover:bg-[#d4af37]/20 border border-[#5c4a3d]/30 rounded transition-colors"
                    title="返回章节"
                  >
                    <ArrowLeft size={10} />
                    <span>返回章节</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => setRightSidebarMode('closed')}
                className="md:hidden p-1.5 text-[#5c4a3d] hover:text-[#3b3024] hover:bg-[#d4af37]/20 rounded-md transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
            {rightSidebarMode === 'notes' && (
              <NotesTab workId={activeWorkId} sceneId={isScene ? activeDocId : null} />
            )}
            {rightSidebarMode === 'snapshots' && activeDocId && isScene && (
              <SnapshotTab sceneId={activeDocId} />
            )}
            {rightSidebarMode === 'micro' && (
              <div className="p-2 space-y-2">
                {tocSections.length > 0 && (
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-[#5c4a3d] uppercase tracking-wider">目录</h3>
                    <button
                      onClick={() => {
                        const current = collapsedTocSections === null ? new Set(tocSections.map(s => s.documentId)) : collapsedTocSections;
                        const allCollapsed = tocSections.every(s => current.has(s.documentId));
                        if (allCollapsed) {
                          setCollapsedTocSections(new Set());
                        } else {
                          setCollapsedTocSections(new Set(tocSections.map(s => s.documentId)));
                        }
                      }}
                      className="text-[10px] font-medium text-[#8b7355] hover:text-[#3b3024] transition-colors"
                    >
                      {tocSections.every(s => isSectionCollapsed(s.documentId)) ? '全部展开' : '全部折叠'}
                    </button>
                  </div>
                )}
                {tocSections.length === 0 ? (
                  <div className="text-center text-xs text-[#5c4a3d]/60 py-4">未找到段落。</div>
                ) : (
                  tocSections.map((section, idx) => {
                    const isCollapsed = isSectionCollapsed(section.documentId);
                    const scene = scenes.find(s => s.id === section.documentId);
                    const statusColor = scene && scene.statusColor ? SCENE_STATUS_COLORS[scene.statusColor as keyof typeof SCENE_STATUS_COLORS] : null;
                    const isActive = section.documentId === activeDocId;
                    return (
                    <div key={`${section.documentId}-${idx}`} className={cn(
                      "rounded-lg border transition-colors",
                      isActive ? "border-[#8b7355] bg-[#eaddc5]/50" : "border-transparent"
                    )}>
                      <div 
                        className="flex items-center cursor-pointer mb-0 group p-1"
                        onClick={() => toggleTocSection(section.documentId)}
                      >
                        <button className="p-0.5 text-[#8b7355] group-hover:text-[#3b3024] transition-colors mr-1">
                          {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {statusColor && <div className={cn("w-2 h-2 rounded-full mr-2", statusColor.dot)} />}
                        <h4 className={cn(
                          "text-xs font-bold uppercase tracking-wider group-hover:text-[#3b3024] transition-colors",
                          isActive ? "text-[#3b3024]" : "text-[#5c4a3d]"
                        )}>{section.title}</h4>
                      </div>
                      {!isCollapsed && (
                        <div className="space-y-0.5">
                          {section.entries.map(entry => (
                            <div key={entry.id} className={cn(
                              "p-2 bg-[#f4ebd8] rounded-lg border shadow-sm transition-colors",
                              entry.completed ? "border-[#d4af37]/50" : "border-[#5c4a3d]/20"
                            )}>
                              <div className="flex justify-between items-start">
                                <textarea
                                  value={entry.description || ''}
                                  onChange={(e) => updateBlock({ id: entry.id, description: e.target.value })}
                                  className={cn(
                                    "w-full bg-transparent border-none outline-none text-sm font-medium focus:ring-0 p-0 resize-none",
                                    entry.completed ? "text-[#5c4a3d]" : "text-[#3b3024]",
                                    !entry.description ? "text-[#5c4a3d]/50 italic" : ""
                                  )}
                                  placeholder="未命名段落"
                                  rows={2}
                                />
                                <button
                                  onClick={() => navigateToBlock(entry.id)}
                                  className="p-1 hover:bg-[#5c4a3d]/10 rounded transition-colors ml-2 shrink-0"
                                  title="跳转到文本"
                                >
                                  <ArrowLeft size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )})
                )}
              </div>
            )}
            {rightSidebarMode === 'meso' && activeDocId && (
              <LensesPanel documentId={activeDocId} onClose={() => setRightSidebarMode('closed')} onNavigateToBlock={navigateToBlock} />
            )}
            {rightSidebarMode === 'macro' && activeDocId && isScene && (
              <EventPoolPanel documentId={activeDocId} onClose={() => setRightSidebarMode('closed')} />
            )}
            {rightSidebarMode === 'info' && activeDocId && isScene && (
              <div className="p-4 space-y-6">
                {/* Chapter & Status */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#5c4a3d] uppercase tracking-wider mb-1.5 block">所属章节</label>
                    <select
                      value={(activeDocument as any).chapterId || ''}
                      onChange={(e) => {
                        moveScene(activeDocId, e.target.value, 0);
                      }}
                      className="text-xs bg-[#f4ebd8] border border-[#5c4a3d]/30 rounded px-2 h-9 w-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 text-[#3b3024]"
                    >
                      {chapters.map(chap => (
                        <option key={chap.id} value={chap.id}>{chap.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#5c4a3d] uppercase tracking-wider mb-1.5 block">状态</label>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => updateScene({ id: activeDocId, statusColor: undefined })}
                        className={cn(
                          "px-2 py-1.5 rounded text-[10px] font-medium border transition-all flex items-center gap-1.5 justify-center whitespace-nowrap",
                          SCENE_STATUS_COLORS.none.bg, SCENE_STATUS_COLORS.none.border, SCENE_STATUS_COLORS.none.text,
                          !(activeDocument as any).statusColor ? "ring-2 ring-[#d4af37]/50 border-[#d4af37]" : "opacity-70 hover:opacity-100"
                        )}
                      >
                        <Circle size={10} className="text-[#5c4a3d]" />
                        {SCENE_STATUS_COLORS.none.label}
                      </button>
                      <button
                        onClick={() => updateScene({ id: activeDocId, statusColor: 'yellow' })}
                        className={cn(
                          "px-2 py-1.5 rounded text-[10px] font-medium border transition-all flex items-center gap-1.5 justify-center whitespace-nowrap",
                          SCENE_STATUS_COLORS.yellow.bg, SCENE_STATUS_COLORS.yellow.border, SCENE_STATUS_COLORS.yellow.text,
                          (activeDocument as any).statusColor === 'yellow' ? "ring-2 ring-[#d4af37]/50 border-[#d4af37]" : "opacity-70 hover:opacity-100"
                        )}
                      >
                        <FileText size={10} className="text-amber-700" />
                        {SCENE_STATUS_COLORS.yellow.label}
                      </button>
                      <button
                        onClick={() => updateScene({ id: activeDocId, statusColor: 'blue' })}
                        className={cn(
                          "px-2 py-1.5 rounded text-[10px] font-medium border transition-all flex items-center gap-1.5 justify-center whitespace-nowrap",
                          SCENE_STATUS_COLORS.blue.bg, SCENE_STATUS_COLORS.blue.border, SCENE_STATUS_COLORS.blue.text,
                          (activeDocument as any).statusColor === 'blue' ? "ring-2 ring-[#d4af37]/50 border-[#d4af37]" : "opacity-70 hover:opacity-100"
                        )}
                      >
                        <RotateCcw size={10} className="text-blue-700" />
                        {SCENE_STATUS_COLORS.blue.label}
                      </button>
                      <button
                        onClick={() => updateScene({ id: activeDocId, statusColor: 'red' })}
                        className={cn(
                          "px-2 py-1.5 rounded text-[10px] font-medium border transition-all flex items-center gap-1.5 justify-center whitespace-nowrap",
                          SCENE_STATUS_COLORS.red.bg, SCENE_STATUS_COLORS.red.border, SCENE_STATUS_COLORS.red.text,
                          (activeDocument as any).statusColor === 'red' ? "ring-2 ring-[#d4af37]/50 border-[#d4af37]" : "opacity-70 hover:opacity-100"
                        )}
                      >
                        <X size={10} className="text-red-700" />
                        {SCENE_STATUS_COLORS.red.label}
                      </button>
                      <button
                        onClick={() => updateScene({ id: activeDocId, statusColor: 'green' })}
                        className={cn(
                          "px-2 py-1.5 rounded text-[10px] font-bold border transition-all flex items-center justify-center gap-1.5 col-span-2",
                          SCENE_STATUS_COLORS.green.bg, SCENE_STATUS_COLORS.green.border, SCENE_STATUS_COLORS.green.text,
                          (activeDocument as any).statusColor === 'green' ? "ring-2 ring-[#d4af37]/50 border-[#d4af37]" : "opacity-70 hover:opacity-100"
                        )}
                      >
                        <Check size={14} className="text-emerald-700" />
                        {SCENE_STATUS_COLORS.green.label}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress & Deadline */}
                <div className="space-y-4 pt-4 border-t border-[#5c4a3d]/20">
                  <div>
                    <label className="text-[10px] font-bold text-[#5c4a3d] uppercase tracking-wider mb-1.5 block">进度</label>
                    <div className="relative h-9 overflow-hidden bg-[#f4ebd8] border border-[#5c4a3d]/30 rounded focus-within:ring-2 focus-within:ring-[#d4af37]/50 transition-all">
                      <div className="flex items-center gap-2 px-2 h-full">
                        <div className="text-xs font-bold text-[#3b3024] shrink-0">{totalWords}</div>
                        <div className="text-[#5c4a3d]/50 font-light text-xs">/</div>
                        <input 
                          type="number"
                          value={(activeDocument as any).goalWordCount || 0}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (isScene) {
                              updateScene({ id: activeDocId, goalWordCount: val });
                            }
                          }}
                          className="w-full bg-transparent outline-none text-xs text-[#5c4a3d] font-medium h-full"
                          placeholder="目标"
                        />
                      </div>
                      {((activeDocument as any).goalWordCount || 0) > 0 && (
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#5c4a3d]/10">
                          <div 
                            className="h-full bg-[#d4af37] transition-all duration-500"
                            style={{ 
                              width: `${Math.min(100, (totalWords / ((activeDocument as any).goalWordCount || 1)) * 100)}%` 
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#5c4a3d] uppercase tracking-wider mb-1.5 block">截止日期</label>
                    <input 
                      type="date" 
                      value={(activeDocument as any).deadline || ''} 
                      onChange={(e) => {
                        if (isScene) {
                          updateScene({ id: activeDocId, deadline: e.target.value });
                        }
                      }}
                      className="w-full h-9 bg-[#f4ebd8] border border-[#5c4a3d]/30 rounded px-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 text-[#3b3024]"
                    />
                  </div>
                </div>

                {/* Characters */}
                <div className="pt-4 border-t border-[#5c4a3d]/20">
                  <label className="text-[10px] font-bold text-[#5c4a3d] uppercase tracking-wider mb-2 block">角色</label>
                  <div className="flex flex-wrap gap-1">
                    {characters.map(char => {
                      const isIncluded = (activeDocument as any).characterIds?.includes(char.id);
                      return (
                        <button
                          key={char.id}
                          onClick={() => {
                            const currentIds = (activeDocument as any).characterIds || [];
                            const newIds = isIncluded 
                              ? currentIds.filter((id: string) => id !== char.id)
                              : [...currentIds, char.id];
                            updateScene({ id: activeDocId, characterIds: newIds });
                          }}
                          className={cn(
                            "px-2 py-1 rounded text-xs font-medium border transition-all",
                            isIncluded ? "bg-[#3b3024] border-[#3b3024] text-[#eaddc5]" : "bg-[#f4ebd8] border-[#5c4a3d]/30 text-[#5c4a3d] hover:border-[#5c4a3d]/60"
                          )}
                        >
                          {char.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <div className={cn(
          "fixed bottom-32 z-50 transition-all duration-300",
          rightSidebarMode !== 'closed' ? "right-[340px]" : "right-6",
          isFullScreenMode ? "opacity-0 hover:opacity-100" : "opacity-100"
        )}>
          <button
            onClick={scrollToTop}
            className="p-3 bg-white border border-stone-200 text-stone-500 hover:text-wood-600 hover:border-wood-200 rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center group"
            title="回到顶部"
          >
            <ArrowUpToLine size={24} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* Floating View Settings Button */}
      <div className={cn(
        "fixed bottom-16 z-50 transition-opacity duration-300 flex items-end justify-end",
        rightSidebarMode !== 'closed' ? "right-[340px]" : "right-6",
        isFullScreenMode ? "opacity-0 hover:opacity-100 w-32 h-32" : "opacity-100",
        "md:bottom-16 bottom-24"
      )}>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-3 bg-[#3b3024] text-[#eaddc5] hover:bg-[#5c4a3d] rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center border-2 border-[#d4af37]"
          title="视图设置"
        >
          <Settings2 size={24} />
        </button>
        
        {showSettings && (
          <div className="absolute bottom-full right-0 mb-4 w-72 bg-[#f4ebd8] rounded-lg shadow-xl border-2 border-[#5c4a3d] p-4 z-50 origin-bottom-right animate-in fade-in slide-in-from-bottom-2">
            


            {/* Toggles */}
            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-[#5c4a3d]/20">
              {/* Row 1 */}
              <button
                onClick={() => toggleFocusMode()}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                  focusMode ? "bg-[#d4af37]/20 border-[#d4af37] text-[#5c4a3d]" : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                )}
              >
                <Focus size={18} className="mb-1" />
                <span className="text-[10px] font-medium">专注模式</span>
              </button>
              <button
                onClick={() => toggleTypewriterMode()}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                  typewriterMode ? "bg-[#d4af37]/20 border-[#d4af37] text-[#5c4a3d]" : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                )}
              >
                <Type size={18} className="mb-1" />
                <span className="text-[10px] font-medium">打字机模式</span>
              </button>
              <button
                onClick={() => toggleScrollMode()}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                  scrollMode ? "bg-[#d4af37]/20 border-[#d4af37] text-[#5c4a3d]" : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                )}
              >
                <Combine size={18} className="mb-1" />
                <span className="text-[10px] font-medium">长文模式</span>
              </button>

              {/* Row 2 */}
              <div className="relative flex flex-col">
                <button
                  onClick={() => toggleDisguiseMode()}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg border transition-all h-full w-full",
                    disguiseMode ? "bg-[#d4af37]/20 border-[#d4af37] text-[#5c4a3d]" : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                  )}
                >
                  <Eye size={18} className="mb-1" />
                  <span className="text-[10px] font-medium">伪装模式</span>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowDisguiseSettings(true); setShowSettings(false); }}
                  className="absolute top-1 right-1 p-1 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
                  title="伪装内容设置"
                >
                  <Settings2 size={12} />
                </button>
              </div>
              <button
                onClick={() => setIsLateNightMode(!isLateNightMode)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                  isLateNightMode ? "bg-[#d4af37]/20 border-[#d4af37] text-[#5c4a3d]" : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                )}
              >
                <Coffee size={18} className="mb-1" />
                <span className="text-[10px] font-medium">熬夜模式</span>
              </button>
              <button
                onClick={() => setIsRaining(!isRaining)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                  isRaining ? "bg-[#d4af37]/20 border-[#d4af37] text-[#5c4a3d]" : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                )}
              >
                <Sparkles size={18} className="mb-1" />
                <span className="text-[10px] font-medium">求灵感模式</span>
              </button>
            </div>

            {/* Actions */}
            <div className="space-y-1">
              {isScene && (
                <>
                  <button
                    onClick={() => {
                      window.dispatchEvent(new Event('toggle-shortcut-modal'));
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center px-2 py-1.5 text-xs font-medium text-[#3b3024] hover:bg-[#eaddc5] rounded transition-colors"
                  >
                    <Keyboard size={14} className="text-[#5c4a3d] mr-2" />
                    键盘快捷键
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {comparingBlockId && (
        <BlockCompareModal
          blockId={comparingBlockId}
          onClose={() => setComparingBlockId(null)}
        />
      )}
      <CursorFireworks x={0} y={0} trigger={0} />
      <FluidBackground sentiment="neutral" />
    </div>
  );
}
