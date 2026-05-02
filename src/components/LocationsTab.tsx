import React, { useState } from 'react';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, GripVertical, MapPin, AlignLeft, List, Map } from 'lucide-react';
import { cn } from '../lib/utils';
import { ConfirmDeleteButton } from './ConfirmDeleteButton';
import { TerrainMap } from './TerrainMap';

export function LocationsTab({ isSubTab }: { isSubTab?: boolean }) {
  const { 
    activeWorkId, 
    locations: allLocations, 
    addLocation, 
    updateLocation, 
    deleteLocation, 
    reorderLocations 
  } = useStore(useShallow(state => ({
    activeWorkId: state.activeWorkId,
    locations: state.locations,
    addLocation: state.addLocation,
    updateLocation: state.updateLocation,
    deleteLocation: state.deleteLocation,
    reorderLocations: state.reorderLocations
  })));

  const [newLocationName, setNewLocationName] = useState('');
  const [viewMode, setViewMode] = useState<'list' | '3d'>('list');

  const locations = allLocations.filter(l => l.workId === activeWorkId).sort((a, b) => (a.order || 0) - (b.order || 0));

  if (!activeWorkId) return null;

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocationName.trim()) {
      addLocation(activeWorkId, newLocationName.trim());
      setNewLocationName('');
    }
  };

  const handleAddLocation3D = (name: string, coordinates: { x: number, y: number, z: number }) => {
    // Add location and then update it with coordinates
    addLocation(activeWorkId, name);
    // Since addLocation doesn't return the ID, we need to find the newly added location
    // A better way is to update the store to support adding with coordinates, but for now
    // we can use a small timeout to find the latest added location without coordinates
    setTimeout(() => {
      const latestLocations = useStore.getState().locations.filter(l => l.workId === activeWorkId);
      const newLoc = latestLocations.find(l => l.name === name && !l.coordinates);
      if (newLoc) {
        updateLocation({ id: newLoc.id, coordinates });
      }
    }, 50);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderLocations(activeWorkId, result.source.index, result.destination.index);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-stone-50 overflow-hidden">
      {!isSubTab ? (
        <div className="p-6 border-b border-stone-200 bg-white shrink-0 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">地点</h2>
            <p className="text-stone-500 mt-1">管理你的故事世界中的地点。</p>
          </div>
          <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                viewMode === 'list' ? "bg-white text-stone-800 shadow-sm" : "text-stone-500 hover:text-stone-700"
              )}
            >
              <List size={16} />
              列表视图
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                viewMode === '3d' ? "bg-white text-wood-600 shadow-sm" : "text-stone-500 hover:text-stone-700"
              )}
            >
              <Map size={16} />
              3D 沙盘
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-2 border-b border-stone-200 bg-white shrink-0 flex justify-end">
          <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                viewMode === 'list' ? "bg-white text-stone-800 shadow-sm" : "text-stone-500 hover:text-stone-700"
              )}
            >
              <List size={16} />
              列表视图
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                viewMode === '3d' ? "bg-white text-wood-600 shadow-sm" : "text-stone-500 hover:text-stone-700"
              )}
            >
              <Map size={16} />
              3D 沙盘
            </button>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'list' ? (
          <div className="h-full overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
              
              {/* Add Location Form */}
              <form onSubmit={handleAddLocation} className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-3 md:gap-4 sm:items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-stone-500 mb-1">地点名称</label>
                  <input
                    type="text"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    placeholder="例如：跃马客栈，新维里迪亚，火星阿尔法基地"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-wood-500/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newLocationName.trim()}
                  className="px-4 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors w-full sm:w-auto text-sm md:text-base"
                >
                  <Plus size={16} className="mr-1.5 md:mr-2" />
                  添加地点
                </button>
              </form>

              {/* Locations List */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="locations">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {locations.map((location, index) => (
                        <Draggable key={location.id} draggableId={location.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                "group bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden transition-all",
                                snapshot.isDragging && "shadow-xl scale-[1.02] z-50 ring-2 ring-wood-500 ring-offset-2"
                              )}
                            >
                              <div className="flex items-center p-3 border-b border-stone-100 bg-stone-50/50">
                                <div 
                                  {...provided.dragHandleProps}
                                  className="text-stone-400 hover:text-stone-600 cursor-grab active:cursor-grabbing mr-2"
                                >
                                  <GripVertical size={16} />
                                </div>
                                <div className="flex-1 flex items-center">
                                  <MapPin size={16} className="text-wood-600 mr-2 shrink-0" />
                                  <input
                                    type="text"
                                    value={location.name || ''}
                                    onChange={(e) => updateLocation({ id: location.id, name: e.target.value })}
                                    className="font-semibold text-stone-800 bg-transparent border-none p-0 focus:ring-0 w-full"
                                    placeholder="地点名称"
                                  />
                                </div>
                                <ConfirmDeleteButton
                                  onConfirm={() => deleteLocation(location.id)}
                                  className="p-1.5 opacity-0 group-hover:opacity-100"
                                  title="删除地点"
                                />
                              </div>
                              <div className="p-4">
                                <div className="flex items-start space-x-2">
                                  <AlignLeft size={14} className="text-stone-400 shrink-0 mt-1.5" />
                                  <textarea
                                    value={location.description || ''}
                                    onChange={(e) => updateLocation({ id: location.id, description: e.target.value })}
                                    placeholder="描述这个地点..."
                                    rows={4}
                                    className="text-sm bg-stone-50 border border-stone-200/50 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-wood-500/20"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {locations.length === 0 && (
                <div className="text-center py-12 text-stone-500 bg-white rounded-lg border border-stone-200 border-dashed">
                  <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                  <p>尚未添加任何地点。</p>
                  <p className="text-sm mt-1">在上方添加你的第一个地点，开始构建你的世界。</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 p-4 md:p-6">
            <TerrainMap 
              locations={locations} 
              onAddLocation={handleAddLocation3D} 
              onUpdateLocation={(id, updates) => updateLocation({ id, ...updates })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
