import React, { useState, useMemo } from 'react';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { Check, Copy, Pencil, RotateCcw, Trash2, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import * as Diff from 'diff';

export function SnapshotTab({ sceneId }: { sceneId: string }) {
  const { snapshots, addSnapshot, deleteSnapshot, restoreSnapshot, renameSnapshot, blocks } = useStore(useShallow(state => ({
    snapshots: state.snapshots,
    addSnapshot: state.addSnapshot,
    deleteSnapshot: state.deleteSnapshot,
    restoreSnapshot: state.restoreSnapshot,
    renameSnapshot: state.renameSnapshot,
    blocks: state.blocks,
  })));

  const sceneSnapshots = useMemo(() => {
    return (snapshots || []).filter(s => s.sceneId === sceneId).sort((a, b) => b.createdAt - a.createdAt);
  }, [snapshots, sceneId]);

  const currentSceneBlocks = useMemo(() => {
    return blocks.filter(b => b.documentId === sceneId).sort((a, b) => a.order - b.order);
  }, [blocks, sceneId]);

  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(sceneSnapshots[0]?.id || null);
  const [isCreating, setIsCreating] = useState(false);
  const [newSnapshotName, setNewSnapshotName] = useState('');
  const [copied, setCopied] = useState(false);
  const [editingSnapshotId, setEditingSnapshotId] = useState<string | null>(null);
  const [editingSnapshotName, setEditingSnapshotName] = useState('');
  const [deletingSnapshotId, setDeletingSnapshotId] = useState<string | null>(null);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  const selectedSnapshot = sceneSnapshots.find(s => s.id === selectedSnapshotId);

  const handleCreateSnapshot = () => {
    const defaultName = new Date().toLocaleString();
    addSnapshot(sceneId, newSnapshotName || defaultName);
    setIsCreating(false);
    setNewSnapshotName('');
  };

  const handleCopy = () => {
    if (!selectedSnapshot) return;
    const text = selectedSnapshot.blocks.map(b => b.content).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestore = () => {
    if (!selectedSnapshot) return;
    restoreSnapshot(selectedSnapshot.id);
    setShowRestoreConfirm(false);
  };

  const handleRename = (id: string) => {
    if (editingSnapshotName.trim()) {
      renameSnapshot(id, editingSnapshotName.trim());
    }
    setEditingSnapshotId(null);
  };

  const handleDelete = (id: string) => {
    deleteSnapshot(id);
    if (selectedSnapshotId === id) {
      setSelectedSnapshotId(null);
    }
    setDeletingSnapshotId(null);
  };

  const diffResult = useMemo(() => {
    if (!selectedSnapshot) return null;
    
    const oldText = selectedSnapshot.blocks.map(b => b.content).join('\n\n');
    const newText = currentSceneBlocks.map(b => b.content).join('\n\n');
    
    return Diff.diffWords(oldText, newText);
  }, [selectedSnapshot, currentSceneBlocks]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Section: List of Snapshots */}
      <div className="flex-none border-b border-stone-200 max-h-[40%] flex flex-col bg-stone-50">
        <div className="p-3 border-b border-stone-200 shrink-0">
          {isCreating ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={newSnapshotName}
                onChange={(e) => setNewSnapshotName(e.target.value)}
                placeholder={new Date().toLocaleString()}
                className="w-full px-2 py-1.5 text-xs border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-stone-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateSnapshot();
                  if (e.key === 'Escape') setIsCreating(false);
                }}
              />
              <div className="flex gap-2">
                <button onClick={handleCreateSnapshot} className="flex-1 bg-stone-800 text-white px-2 py-1 rounded text-xs font-medium hover:bg-stone-700">保存</button>
                <button onClick={() => setIsCreating(false)} className="flex-1 bg-stone-200 text-stone-700 px-2 py-1 rounded text-xs font-medium hover:bg-stone-300">取消</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center justify-center gap-1 bg-stone-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-stone-700 transition-colors"
            >
              <Plus size={14} />
              创建快照
            </button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sceneSnapshots.length === 0 ? (
            <div className="text-center text-stone-500 text-xs py-4">暂无快照。</div>
          ) : (
            sceneSnapshots.map(snapshot => (
              <div
                key={snapshot.id}
                onClick={() => {
                  if (editingSnapshotId !== snapshot.id && deletingSnapshotId !== snapshot.id) {
                    setSelectedSnapshotId(snapshot.id);
                    setShowRestoreConfirm(false);
                  }
                }}
                className={cn(
                  "group flex flex-col p-2 rounded-md transition-colors",
                  selectedSnapshotId === snapshot.id ? "bg-stone-200" : "hover:bg-stone-100 cursor-pointer"
                )}
              >
                {deletingSnapshotId === snapshot.id ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-red-600">删除此快照？</span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(snapshot.id); }}
                        className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-red-700"
                      >
                        是
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeletingSnapshotId(null); }}
                        className="flex-1 bg-stone-300 text-stone-700 px-2 py-1 rounded text-xs font-medium hover:bg-stone-400"
                      >
                        否
                      </button>
                    </div>
                  </div>
                ) : editingSnapshotId === snapshot.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingSnapshotName}
                      onChange={(e) => setEditingSnapshotName(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-stone-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(snapshot.id);
                        if (e.key === 'Escape') setEditingSnapshotId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRename(snapshot.id); }}
                        className="flex-1 bg-stone-800 text-white px-2 py-1 rounded text-xs font-medium hover:bg-stone-700"
                      >
                        保存
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingSnapshotId(null); }}
                        className="flex-1 bg-stone-300 text-stone-700 px-2 py-1 rounded text-xs font-medium hover:bg-stone-400"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-medium text-stone-800 truncate">{snapshot.name}</span>
                      <span className="text-[10px] text-stone-500">{new Date(snapshot.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSnapshotName(snapshot.name);
                          setEditingSnapshotId(snapshot.id);
                        }}
                        className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-300 rounded"
                        title="重命名快照"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingSnapshotId(snapshot.id);
                        }}
                        className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-100 rounded"
                        title="删除快照"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Section: Diff View */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedSnapshot ? (
          <>
            <div className="flex flex-col gap-2 p-3 border-b border-stone-200 bg-stone-50/50 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[10px] text-stone-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-[#ffe6e6] border border-red-200"></div>
                    <span>已删除</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-wood-100 border border-wood-200"></div>
                    <span>已添加</span>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-50 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-wood-600" /> : <Copy className="w-3 h-3" />}
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
              
              {showRestoreConfirm ? (
                <div className="flex flex-col gap-2 bg-red-50 text-red-700 p-2 rounded border border-red-200 animate-in fade-in slide-in-from-top-2">
                  <span className="text-xs font-medium text-center">覆盖当前场景？</span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleRestore}
                      className="flex-1 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      是
                    </button>
                    <button
                      onClick={() => setShowRestoreConfirm(false)}
                      className="flex-1 py-1 bg-white text-stone-600 border border-stone-200 rounded text-xs font-medium hover:bg-stone-50 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowRestoreConfirm(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-white bg-stone-800 rounded-md hover:bg-stone-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  恢复此版本
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-serif text-sm leading-relaxed whitespace-pre-wrap">
              {diffResult?.map((part, index) => {
                if (part.added) {
                  return <span key={index} className="bg-wood-100 text-wood-900 font-medium">{part.value}</span>;
                }
                if (part.removed) {
                  return <span key={index} className="bg-[#ffe6e6] text-red-900 line-through opacity-80">{part.value}</span>;
                }
                return <span key={index} className="text-stone-800">{part.value}</span>;
              })}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-stone-400 text-xs p-4 text-center">
            选择一个快照以查看更改
          </div>
        )}
      </div>
    </div>
  );
}
