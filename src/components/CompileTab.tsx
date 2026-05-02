import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { Copy, Download, Upload, CheckSquare, Square, ChevronRight, ChevronDown, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toPng } from 'html-to-image';

const WaxSeal = ({ size = 64 }: { size?: number }) => {
  const waxColor = "#6b1111"; // Deep burgundy
  const goldColor = "#d4af37"; // Metallic gold
  
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 200 200" className="drop-shadow-2xl overflow-visible">
        <defs>
          {/* Wax Texture Gradient */}
          <radialGradient id="waxBase" cx="45%" cy="45%" r="55%">
            <stop offset="0%" style={{ stopColor: "#8b1a1a", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#4a0a0a", stopOpacity: 1 }} />
          </radialGradient>
          
          {/* Embossed Effect Filter */}
          <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
            <feOffset dx="-1" dy="-1" result="offset" />
            <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.8" specularExponent="20" lightingColor="#ffffff" result="specOut">
              <fePointLight x="-50" y="-50" z="100" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>

          {/* Inner Shadow for Stamped Look */}
          <filter id="stamped" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset dx="1" dy="1" result="offset" />
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadow" />
            <feFlood floodColor="black" floodOpacity="0.6" />
            <feComposite in2="shadow" operator="in" />
            <feComposite in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
        
        {/* Outer Irregular Wax Shape */}
        <path
          d="M100 15 C 130 14, 160 25, 175 50 C 190 75, 185 110, 170 140 C 155 170, 120 185, 90 180 C 60 175, 25 160, 15 125 C 5 90, 20 45, 50 25 C 70 15, 85 16, 100 15"
          fill="url(#waxBase)"
          filter="url(#emboss)"
        />
        
        {/* Raised Outer Rim */}
        <path
          d="M100 30 C 125 29, 150 38, 162 58 C 174 78, 170 105, 158 128 C 146 151, 118 163, 94 159 C 70 155, 42 143, 34 115 C 26 87, 38 53, 62 38 C 76 30, 88 31, 100 30"
          fill="none"
          stroke="#5a0a0a"
          strokeWidth="8"
          opacity="0.5"
        />
        
        {/* Inner Stamped Circle */}
        <circle cx="100" cy="100" r="65" fill="#5a0a0a" opacity="0.3" filter="url(#stamped)" />
        <circle cx="100" cy="100" r="62" fill="none" stroke={goldColor} strokeWidth="1.5" opacity="0.6" />
        
        {/* Detailed Golden Wheat Ears (Inside the seal) */}
        <g transform="translate(100, 105) scale(0.85)" opacity="0.9">
          {/* Left Wheat Ear */}
          <path 
            d="M-10 60 Q -65 55 -60 -10 Q -55 -60 -10 -65" 
            fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" 
          />
          {/* Left Grains */}
          {[-55, -40, -25, -10, 5, 20, 35, 50].map((y, i) => (
            <g key={`lg-${i}`} transform={`translate(-60, ${y}) rotate(${20 - i * 8})`}>
              <ellipse cx="0" cy="0" rx="3.5" ry="7" fill={goldColor} />
              <path d="M0 -7 L0 -12" stroke={goldColor} strokeWidth="0.5" />
            </g>
          ))}
          
          {/* Right Wheat Ear */}
          <path 
            d="M10 60 Q 65 55 60 -10 Q 55 -60 10 -65" 
            fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" 
          />
          {/* Right Grains */}
          {[-55, -40, -25, -10, 5, 20, 35, 50].map((y, i) => (
            <g key={`rg-${i}`} transform={`translate(60, ${y}) rotate(${-20 + i * 8})`}>
              <ellipse cx="0" cy="0" rx="3.5" ry="7" fill={goldColor} />
              <path d="M0 -7 L0 -12" stroke={goldColor} strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {/* Embossed Gothic DW Monogram */}
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fill={goldColor}
          style={{ 
            fontFamily: '"UnifrakturMaguntia", serif', 
            fontSize: '68px', 
            fontWeight: 'normal',
            filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))'
          }}
        >
          DW
        </text>
        
        {/* Small Texture Dots (Bubbles) */}
        <circle cx="45" cy="65" r="1.5" fill="black" opacity="0.2" />
        <circle cx="155" cy="125" r="2" fill="black" opacity="0.2" />
        <circle cx="85" cy="165" r="1" fill="black" opacity="0.2" />
      </svg>
    </div>
  );
};

export function CompileTab() {
  const { 
    works, 
    activeWorkId, 
    chapters, 
    scenes, 
    blocks, 
    activeDocumentId 
  } = useStore(useShallow(state => ({
    works: state.works,
    activeWorkId: state.activeWorkId,
    chapters: state.chapters,
    scenes: state.scenes,
    blocks: state.blocks,
    activeDocumentId: state.activeDocumentId
  })));

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewText, setPreviewText] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const longImageRef = useRef<HTMLDivElement>(null);

  const presets = [
    {
      name: '古典羊皮纸',
      bg: '#f4ebd8',
      text: '#3b3024',
      border: '#8b7355',
      pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
    },
    {
      name: '深邃午夜',
      bg: '#1a1a1a',
      text: '#d3c5b0',
      border: '#5c4a3d',
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    {
      name: '翡翠森林',
      bg: '#064e3b',
      text: '#ecfdf5',
      border: '#059669',
      pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
    },
    {
      name: '极简素白',
      bg: '#ffffff',
      text: '#1a1a1a',
      border: '#e5e7eb',
      pattern: 'none'
    },
    {
      name: '晚霞余晖',
      bg: '#fef2f2',
      text: '#991b1b',
      border: '#fecaca',
      pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23991b1b' fill-opacity='0.02' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
    }
  ];

  const currentPreset = presets[selectedPreset];

  const activeWork = works.find(w => w.id === activeWorkId);
  const workChapters = chapters
    .filter(c => c.workId === activeWorkId)
    .sort((a, b) => a.order - b.order);

  // Helper to get scenes for a chapter
  const getScenes = (chapterId: string) => 
    scenes
      .filter(s => s.chapterId === chapterId)
      .sort((a, b) => a.order - b.order);

  // Toggle selection
  const toggleSelection = (id: string, type: 'chapter' | 'scene') => {
    const newSelected = new Set(selectedIds);
    
    if (type === 'chapter') {
      const scenes = getScenes(id);
      const allSceneIds = scenes.map(s => s.id);
      
      if (newSelected.has(id)) {
        // Deselect chapter and all its scenes
        newSelected.delete(id);
        allSceneIds.forEach(sid => newSelected.delete(sid));
      } else {
        // Select chapter and all its scenes
        newSelected.add(id);
        allSceneIds.forEach(sid => newSelected.add(sid));
      }
    } else {
      // Toggle scene
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
    }
    setSelectedIds(newSelected);
  };

  // Quick Select Actions
  const selectWholeWork = () => {
    const newSelected = new Set<string>();
    workChapters.forEach(c => {
      newSelected.add(c.id);
      getScenes(c.id).forEach(s => newSelected.add(s.id));
    });
    setSelectedIds(newSelected);
  };

  const selectCurrentChapter = () => {
    if (!activeDocumentId) return;
    const scene = scenes.find(s => s.id === activeDocumentId);
    if (scene) {
      const chapterId = scene.chapterId;
      const newSelected = new Set<string>();
      newSelected.add(chapterId);
      getScenes(chapterId).forEach(s => newSelected.add(s.id));
      setSelectedIds(newSelected);
    }
  };

  const selectCurrentScene = () => {
    if (!activeDocumentId) return;
    const newSelected = new Set<string>();
    const scene = scenes.find(s => s.id === activeDocumentId);
    if (scene) {
      newSelected.add(scene.id);
      setSelectedIds(newSelected);
    }
  };

  // Generate Preview Text
  useEffect(() => {
    if (!activeWork) return;

    let text = '';
    
    workChapters.forEach(chapter => {
      const isChapterSelected = selectedIds.has(chapter.id);
      const chapterScenes = getScenes(chapter.id);
      const selectedScenes = chapterScenes.filter(s => selectedIds.has(s.id));

      if (selectedScenes.length > 0 || isChapterSelected) {
        if (isChapterSelected) {
          text += `${chapter.title}\n\n`;
        }

        selectedScenes.forEach((scene, index) => {
          const sceneBlocks = blocks
            .filter(b => b.documentId === scene.id)
            .sort((a, b) => a.order - b.order);
          
          sceneBlocks.forEach(block => {
            if (block.isLens && block.lensColor?.toLowerCase() === 'black') return;
            
            if (block.content.trim()) {
              text += block.content + '\n';
            }
          });

          if (index < selectedScenes.length - 1) {
            text += '\n'; 
          }
        });
        
        text += '\n'; 
      }
    });

    setPreviewText(text);
  }, [selectedIds, blocks, scenes, chapters, activeWork]);

  // Export to Word
  const handleExport = async () => {
    if (!activeWork) return;

    const docChildren: any[] = [];
    
    workChapters.forEach(chapter => {
      const isChapterSelected = selectedIds.has(chapter.id);
      const chapterScenes = getScenes(chapter.id);
      const selectedScenes = chapterScenes.filter(s => selectedIds.has(s.id));

      if (selectedScenes.length > 0 || isChapterSelected) {
        if (isChapterSelected) {
          docChildren.push(
            new Paragraph({
              text: chapter.title,
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            })
          );
        }

        selectedScenes.forEach((scene, index) => {
          const sceneBlocks = blocks
            .filter(b => b.documentId === scene.id)
            .sort((a, b) => a.order - b.order);
          
          sceneBlocks.forEach(block => {
            if (block.isLens && block.lensColor?.toLowerCase() === 'black') return;
            
            if (block.content.trim()) {
              const lines = block.content.split(/\r?\n/);
              lines.forEach(line => {
                docChildren.push(
                  new Paragraph({
                    children: line ? [new TextRun({ text: line })] : [],
                    spacing: { after: 200 },
                    alignment: AlignmentType.LEFT,
                  })
                );
              });
            }
          });
          
          if (index < selectedScenes.length - 1) {
            docChildren.push(
              new Paragraph({
                children: [],
                spacing: { after: 200 },
              })
            );
          }
        });
      }
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: docChildren,
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${activeWork.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_compiled.docx`);
  };

  // Generate Long Image
  const handleGenerateLongImage = async () => {
    if (!longImageRef.current || !activeWork) return;
    
    setIsGeneratingImage(true);
    try {
      // Wait a bit for the hidden element to be fully rendered if it was just shown
      // But here it's always in DOM but hidden
      const dataUrl = await toPng(longImageRef.current, {
        quality: 0.95,
        backgroundColor: currentPreset.bg,
        pixelRatio: 2, // Higher quality
      });
      
      saveAs(dataUrl, `${activeWork.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_long_image.png`);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(previewText);
  };

  const toggleChapterExpand = (id: string) => {
    const newSet = new Set(expandedChapters);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedChapters(newSet);
  };

  if (!activeWork) return <div className="p-8 text-stone-500">未选择活动作品。</div>;

  return (
    <div className={cn(
      "flex flex-col md:flex-row h-full bg-stone-50",
      "pb-16 md:pb-0"
    )}>
      {/* Hidden element for long image generation */}
      <div className="fixed -left-[9999px] top-0">
        <div 
          ref={longImageRef}
          className="w-[800px] p-20 font-sans relative overflow-hidden"
          style={{ 
            backgroundColor: currentPreset.bg,
            backgroundImage: currentPreset.pattern,
            color: currentPreset.text
          }}
        >
          {/* Decorative Border */}
          <div 
            className="absolute inset-10 border-4 border-double pointer-events-none" 
            style={{ borderColor: currentPreset.border }}
          />
          
          <div className="relative z-10">
            {/* Wax Seal Logo at Top-Left (Academic Style) */}
            <div className="absolute -top-12 -left-12 transform -rotate-12 opacity-95">
              <WaxSeal size={180} />
              <div className="text-center -mt-6">
                <span className="text-[12px] font-serif tracking-[0.5em] uppercase" style={{ color: '#d4af37' }}>Dear Writers</span>
              </div>
            </div>

            <h1 className="text-5xl font-serif font-bold text-center mb-24 tracking-widest uppercase pt-10">
              {activeWork.title}
            </h1>
            
            <div className="space-y-12">
              {workChapters.map(chapter => {
                const isChapterSelected = selectedIds.has(chapter.id);
                const chapterScenes = getScenes(chapter.id);
                const selectedScenes = chapterScenes.filter(s => selectedIds.has(s.id));

                if (selectedScenes.length === 0 && !isChapterSelected) return null;

                return (
                  <div key={chapter.id} className="space-y-8">
                    {isChapterSelected && (
                      <h2 className="text-3xl font-serif font-bold border-b-2 pb-4 mb-8" style={{ borderColor: `${currentPreset.border}4d` }}>
                        {chapter.title}
                      </h2>
                    )}
                    
                    <div className="space-y-6">
                      {selectedScenes.map(scene => {
                        const sceneBlocks = blocks
                          .filter(b => b.documentId === scene.id)
                          .sort((a, b) => a.order - b.order);
                        
                        return (
                          <div key={scene.id} className="space-y-4">
                            {sceneBlocks.map(block => {
                              if (block.isLens && block.lensColor?.toLowerCase() === 'black') return null;
                              if (!block.content.trim()) return null;
                              
                              return (
                                <p key={block.id} className="text-xl leading-relaxed font-serif indent-8">
                                  {block.content}
                                </p>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-20 pt-10 border-t text-center" style={{ borderColor: `${currentPreset.border}33` }}>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-serif italic opacity-60">Generated by DearWriters</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px opacity-30" style={{ backgroundColor: currentPreset.text }} />
                  <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Dear Writers</span>
                  <div className="w-8 h-px opacity-30" style={{ backgroundColor: currentPreset.text }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Sidebar: Selection */}
      <div className={cn(
        "bg-white border-b md:border-b-0 md:border-r border-stone-200 flex flex-col shrink-0 md:h-full h-full",
        showPreview ? "hidden md:flex md:w-80" : "w-full md:w-80"
      )}>
        <div className="p-4 border-b border-stone-200">
          <h2 className="font-serif text-lg font-medium text-stone-800 mb-4">编译选择</h2>
          
          <div className="space-y-2 mb-6">
            <button 
              onClick={selectWholeWork}
              className="w-full text-left px-3 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-md transition-colors"
            >
              选择整部作品
            </button>
            <button 
              onClick={selectCurrentChapter}
              className="w-full text-left px-3 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-md transition-colors"
            >
              选择当前章节
            </button>
            <button 
              onClick={selectCurrentScene}
              className="w-full text-left px-3 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-md transition-colors"
            >
              选择当前场景
            </button>
          </div>

          <h2 className="font-serif text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">长图预设</h2>
          <div className="grid grid-cols-5 gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPreset(idx)}
                className={cn(
                  "w-full aspect-square rounded-lg border-2 transition-all overflow-hidden relative",
                  selectedPreset === idx ? "border-wood-600 scale-105 shadow-md" : "border-transparent hover:border-stone-200"
                )}
                title={preset.name}
              >
                <div 
                  className="w-full h-full" 
                  style={{ backgroundColor: preset.bg, backgroundImage: preset.pattern, backgroundSize: 'cover' }}
                />
                {selectedPreset === idx && (
                  <div className="absolute inset-0 flex items-center justify-center bg-wood-600/10">
                    <CheckSquare size={16} className="text-wood-600" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {workChapters.map(chapter => {
              const scenes = getScenes(chapter.id);
              const isExpanded = expandedChapters.has(chapter.id);
              const isSelected = selectedIds.has(chapter.id);
              
              const someScenesSelected = scenes.some(s => selectedIds.has(s.id));

              return (
                <div key={chapter.id} className="select-none">
                  <div className="flex items-center group">
                    <button 
                      onClick={() => toggleChapterExpand(chapter.id)}
                      className="p-1 text-stone-400 hover:text-stone-600"
                    >
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    <div 
                      className="flex items-center flex-1 cursor-pointer py-1"
                      onClick={() => toggleSelection(chapter.id, 'chapter')}
                    >
                      <div className={cn(
                        "mr-2 w-4 h-4 border rounded flex items-center justify-center transition-colors shrink-0",
                        isSelected ? "bg-wood-500 border-wood-500 text-white" : 
                        (someScenesSelected && !isSelected) ? "bg-wood-100 border-wood-300" : "border-stone-300 bg-white"
                      )}>
                        {isSelected && <CheckSquare size={12} />}
                        {!isSelected && someScenesSelected && <div className="w-2 h-2 bg-wood-500 rounded-sm" />}
                      </div>
                      <span className="text-sm font-medium text-stone-700 truncate">{chapter.title}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="ml-6 pl-2 border-l border-stone-100 mt-1 space-y-1">
                      {scenes.map(scene => (
                        <div 
                          key={scene.id} 
                          className="flex items-center cursor-pointer py-1 hover:bg-stone-50 rounded px-1"
                          onClick={() => toggleSelection(scene.id, 'scene')}
                        >
                          <div className={cn(
                            "mr-2 w-3 h-3 border rounded flex items-center justify-center transition-colors shrink-0",
                            selectedIds.has(scene.id) ? "bg-wood-500 border-wood-500 text-white" : "border-stone-300 bg-white"
                          )}>
                            {selectedIds.has(scene.id) && <CheckSquare size={10} />}
                          </div>
                          <span className="text-sm text-stone-600 truncate">{scene.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 border-t border-stone-200 md:hidden">
          <button
            onClick={() => setShowPreview(true)}
            disabled={selectedIds.size === 0}
            className="w-full flex justify-center items-center px-4 py-2 bg-wood-600 text-white rounded-md text-sm hover:bg-wood-700 transition-colors disabled:opacity-50"
          >
            查看预览
          </button>
        </div>
      </div>

      {/* Right: Preview & Actions */}
      <div className={cn(
        "flex-1 flex flex-col h-full overflow-hidden",
        !showPreview && "hidden md:flex"
      )}>
        <div className="p-4 border-b border-stone-200 bg-white flex flex-col sm:flex-row justify-between sm:items-center gap-4 shrink-0">
          <h3 className="font-medium text-stone-800 flex items-center">
            <button onClick={() => setShowPreview(false)} className="md:hidden mr-2 p-1 text-stone-500">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <FileText size={18} className="mr-2 text-stone-400" />
            预览
          </h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={copyToClipboard}
              className="flex-1 sm:flex-none flex justify-center items-center px-3 py-1.5 bg-white border border-stone-300 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors"
            >
              <Copy size={14} className="mr-2" />
              复制文本
            </button>
            <button
              onClick={handleGenerateLongImage}
              disabled={selectedIds.size === 0 || isGeneratingImage}
              className="flex-1 sm:flex-none flex justify-center items-center px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-md text-sm hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingImage ? <Loader2 size={14} className="mr-2 animate-spin" /> : <ImageIcon size={14} className="mr-2" />}
              生成长图
            </button>
            <button
              onClick={handleExport}
              disabled={selectedIds.size === 0}
              className="flex-1 sm:flex-none flex justify-center items-center px-3 py-1.5 bg-wood-600 text-white rounded-md text-sm hover:bg-wood-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={14} className="mr-2" />
              导出 .docx
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-stone-100">
          <div 
            className="max-w-3xl mx-auto shadow-lg min-h-[800px] p-8 md:p-16 relative overflow-hidden transition-all duration-300"
            style={{ 
              backgroundColor: currentPreset.bg,
              backgroundImage: currentPreset.pattern,
              color: currentPreset.text
            }}
          >
            {/* Decorative Border in Preview */}
            <div 
              className="absolute inset-4 md:inset-8 border-2 border-double pointer-events-none opacity-40" 
              style={{ borderColor: currentPreset.border }}
            />

            {previewText ? (
              <div className="relative z-10">
                {/* Wax Seal Logo at Top-Left in Preview */}
                <div className="absolute -top-16 -left-16 transform -rotate-12 scale-75 opacity-90">
                  <WaxSeal size={140} />
                  <div className="text-center -mt-4">
                    <span className="text-[10px] font-serif tracking-[0.4em] uppercase" style={{ color: '#d4af37' }}>Dear Writers</span>
                  </div>
                </div>

                <h1 className="text-3xl font-serif font-bold text-center mb-16 tracking-widest uppercase pt-6">
                  {activeWork.title}
                </h1>

                <div className="space-y-8">
                  {workChapters.map(chapter => {
                    const isChapterSelected = selectedIds.has(chapter.id);
                    const chapterScenes = getScenes(chapter.id);
                    const selectedScenes = chapterScenes.filter(s => selectedIds.has(s.id));

                    if (selectedScenes.length === 0 && !isChapterSelected) return null;

                    return (
                      <div key={chapter.id} className="space-y-6">
                        {isChapterSelected && (
                          <h2 className="text-xl font-serif font-bold border-b pb-2 mb-4" style={{ borderColor: `${currentPreset.border}33` }}>
                            {chapter.title}
                          </h2>
                        )}
                        
                        <div className="space-y-4">
                          {selectedScenes.map(scene => {
                            const sceneBlocks = blocks
                              .filter(b => b.documentId === scene.id)
                              .sort((a, b) => a.order - b.order);
                            
                            return (
                              <div key={scene.id} className="space-y-3">
                                {sceneBlocks.map(block => {
                                  if (block.isLens && block.lensColor?.toLowerCase() === 'black') return null;
                                  if (!block.content.trim()) return null;
                                  
                                  return (
                                    <p key={block.id} className="text-base leading-relaxed font-serif indent-6">
                                      {block.content}
                                    </p>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer in Preview */}
                <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: `${currentPreset.border}22` }}>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs font-serif italic opacity-50">Generated by DearWriters</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px opacity-20" style={{ backgroundColor: currentPreset.text }} />
                      <span className="text-[8px] tracking-[0.4em] uppercase opacity-30">Dear Writers</span>
                      <div className="w-6 h-px opacity-20" style={{ backgroundColor: currentPreset.text }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 relative z-10">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>选择章节或场景以生成预览。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
