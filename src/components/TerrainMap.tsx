import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { Location } from '../store/types';
import { Edit2, MapPin, MousePointer2, MapPinOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface TerrainMapProps {
  locations: Location[];
  onAddLocation: (name: string, coordinates: { x: number, y: number, z: number }) => void;
  onUpdateLocation: (id: string, updates: Partial<Location>) => void;
}

function Terrain({ 
  onTerrainDoubleClick, 
  onTerrainClick
}: { 
  onTerrainDoubleClick: (e: ThreeEvent<MouseEvent>) => void,
  onTerrainClick: (e: ThreeEvent<MouseEvent>) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Generate terrain geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 50, 64, 64);
    const noise2D = createNoise2D();
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Generate some hills and valleys
      const z = noise2D(x * 0.05, y * 0.05) * 3 + noise2D(x * 0.1, y * 0.1) * 1;
      pos.setZ(i, z);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      rotation={[-Math.PI / 2, 0, 0]} 
      onDoubleClick={onTerrainDoubleClick}
      onClick={onTerrainClick}
      receiveShadow
    >
      <meshStandardMaterial 
        color="#d4af37" 
        flatShading={true} 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

function LocationMarker({ 
  location, 
  isEditMode, 
  isSelected, 
  onSelect, 
  onUpdate 
}: { 
  location: Location;
  isEditMode: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (id: string, updates: Partial<Location>) => void;
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(location.name);

  // Reset edit name when location changes or selection lost
  useEffect(() => {
    setEditName(location.name);
    if (!isSelected) setIsEditingName(false);
  }, [location.name, isSelected]);

  if (!location.coordinates) return null;
  
  const { x, y, z } = location.coordinates;
  
  return (
    <group position={[x, y, z]}>
      {/* The marker pin */}
      <mesh 
        position={[0, 0.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (isEditMode) onSelect();
        }}
      >
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial 
          color={isSelected ? "#eaddc5" : "#8b7355"} 
          flatShading={true} 
          emissive={isSelected ? "#d4af37" : "#8b7355"} 
          emissiveIntensity={isSelected ? 0.5 : 0.2} 
        />
      </mesh>
      
      {/* The label */}
      <Html position={[0, 1.5, 0]} center style={{ pointerEvents: isSelected && isEditMode ? 'auto' : 'none', zIndex: isSelected ? 10 : 1 }}>
        {isSelected && isEditMode ? (
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-xl border border-[#d4af37]/50 flex flex-col gap-2 min-w-[160px] animate-in zoom-in-95 duration-100">
            {isEditingName ? (
              <div className="flex flex-col gap-2">
                <input 
                  autoFocus
                  value={editName} 
                  onChange={e => setEditName(e.target.value)}
                  className="px-2 py-1 text-sm border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && editName.trim()) {
                      onUpdate(location.id, { name: editName.trim() });
                      setIsEditingName(false);
                    }
                  }}
                />
                <div className="flex gap-1">
                  <button 
                    onClick={() => {
                      if (editName.trim()) {
                        onUpdate(location.id, { name: editName.trim() });
                        setIsEditingName(false);
                      }
                    }}
                    className="flex-1 bg-[#8b7355] text-white text-xs py-1 rounded hover:bg-[#5c4a3d]"
                  >
                    保存
                  </button>
                  <button 
                    onClick={() => {
                      setEditName(location.name);
                      setIsEditingName(false);
                    }}
                    className="flex-1 bg-stone-200 text-stone-700 text-xs py-1 rounded hover:bg-stone-300"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="font-bold text-[#5c4a3d] text-center border-b border-stone-100 pb-1 mb-1">{location.name}</div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setIsEditingName(true)}
                    className="flex-1 flex items-center justify-center gap-1 bg-stone-100 text-stone-700 text-xs py-1.5 rounded hover:bg-stone-200 transition-colors"
                  >
                    <Edit2 size={12} /> 重命名
                  </button>
                  <button 
                    onClick={() => {
                      onUpdate(location.id, { coordinates: undefined });
                    }}
                    className="flex-1 flex items-center justify-center gap-1 bg-orange-50 text-orange-600 text-xs py-1.5 rounded hover:bg-orange-100 transition-colors"
                  >
                    <MapPinOff size={12} /> 取消放置
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-[#8b7355]/20 text-xs font-bold text-[#5c4a3d] whitespace-nowrap transition-transform hover:scale-110">
            {location.name}
          </div>
        )}
      </Html>
    </group>
  );
}

export function TerrainMap({ locations, onAddLocation, onUpdateLocation }: TerrainMapProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null);
  const [placingLocId, setPlacingLocId] = useState<string | null>(null);

  const [promptPos, setPromptPos] = useState<{ x: number, y: number, z: number, screenX: number, screenY: number } | null>(null);
  const [newLocationName, setNewLocationName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const unassignedLocations = locations.filter(l => !l.coordinates);

  const handleTerrainDoubleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isEditMode && placingLocId) return; // Don't prompt for new if placing existing
    
    setPromptPos({
      x: e.point.x,
      y: e.point.y,
      z: e.point.z,
      screenX: e.clientX,
      screenY: e.clientY
    });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleTerrainClick = (e: ThreeEvent<MouseEvent>) => {
    if (isEditMode && placingLocId) {
      e.stopPropagation();
      onUpdateLocation(placingLocId, { coordinates: { x: e.point.x, y: e.point.y, z: e.point.z } });
      setPlacingLocId(null);
    } else {
      setSelectedLocId(null);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocationName.trim() && promptPos) {
      onAddLocation(newLocationName.trim(), { x: promptPos.x, y: promptPos.y, z: promptPos.z });
      setNewLocationName('');
      setPromptPos(null);
    }
  };

  return (
    <div className="w-full h-full relative bg-[#f4ebd8] rounded-xl overflow-hidden border border-stone-200 shadow-inner">
      {/* Edit Mode Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
            setSelectedLocId(null);
            setPlacingLocId(null);
          }}
          className={cn(
            "px-4 py-2 rounded-lg shadow-md font-medium text-sm flex items-center gap-2 transition-all",
            isEditMode ? "bg-[#8b7355] text-white" : "bg-white text-stone-700 hover:bg-stone-50"
          )}
        >
          <Edit2 size={16} />
          {isEditMode ? "退出编辑模式" : "进入编辑模式"}
        </button>
      </div>

      {/* Unassigned Locations Panel */}
      {isEditMode && (
        <div className="absolute top-4 left-4 w-64 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-stone-200 overflow-hidden flex flex-col max-h-[80%] z-10">
          <div className="p-3 border-b border-stone-200 bg-stone-50">
            <h3 className="font-bold text-stone-800 flex items-center gap-2">
              <MapPin size={16} className="text-[#8b7355]" />
              未分配地点 ({unassignedLocations.length})
            </h3>
            <p className="text-xs text-stone-500 mt-1">点击选择，然后在右侧沙盘中点击放置。</p>
          </div>
          <div className="overflow-y-auto p-2 flex flex-col gap-1">
            {unassignedLocations.length === 0 ? (
              <div className="text-center py-4 text-stone-400 text-sm">暂无未分配地点</div>
            ) : (
              unassignedLocations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => setPlacingLocId(placingLocId === loc.id ? null : loc.id)}
                  className={cn(
                    "text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between",
                    placingLocId === loc.id ? "bg-[#eaddc5] text-[#5c4a3d] ring-1 ring-[#d4af37]" : "hover:bg-stone-100 text-stone-700"
                  )}
                >
                  <span className="truncate">{loc.name}</span>
                  {placingLocId === loc.id && <MousePointer2 size={14} className="text-[#8b7355]" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <Canvas 
        camera={{ position: [0, 15, 20], fov: 45 }} 
        shadows
        style={{ cursor: placingLocId ? 'crosshair' : 'auto' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#8b7355" />
        
        <Terrain 
          onTerrainDoubleClick={handleTerrainDoubleClick} 
          onTerrainClick={handleTerrainClick}
        />
        
        {locations.map(loc => (
          <LocationMarker 
            key={loc.id} 
            location={loc} 
            isEditMode={isEditMode}
            isSelected={selectedLocId === loc.id}
            onSelect={() => setSelectedLocId(loc.id)}
            onUpdate={onUpdateLocation}
          />
        ))}
        
        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 - 0.1} 
          minDistance={5} 
          maxDistance={40}
          enableDamping
        />
      </Canvas>

      {/* Overlay for adding location */}
      {promptPos && (
        <div 
          className="absolute z-20 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-xl border border-stone-200 animate-in fade-in zoom-in-95"
          style={{ 
            left: Math.min(promptPos.screenX, window.innerWidth - 250), 
            top: Math.min(promptPos.screenY, window.innerHeight - 100) 
          }}
        >
          <form onSubmit={handleAdd} className="flex flex-col gap-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">为这片未知之地命名</label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                className="px-2 py-1 text-sm border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="地点名称..."
              />
              <button 
                type="submit" 
                disabled={!newLocationName.trim()}
                className="px-3 py-1 bg-[#8b7355] text-white text-sm rounded hover:bg-[#5c4a3d] disabled:opacity-50"
              >
                确定
              </button>
              <button 
                type="button" 
                onClick={() => setPromptPos(null)}
                className="px-3 py-1 bg-stone-200 text-stone-600 text-sm rounded hover:bg-stone-300"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 pointer-events-none z-10">
        <div className="bg-white/80 backdrop-blur px-3 py-2 rounded-lg shadow-sm border border-stone-200 text-xs text-stone-500 flex flex-col gap-1">
          <p>🖱️ <b>左键拖拽</b>: 旋转视角</p>
          <p>🖱️ <b>右键拖拽</b>: 平移视角</p>
          <p>🖱️ <b>滚轮</b>: 缩舒</p>
          <p>🎯 <b>双击地形</b>: 添加新地点</p>
          {isEditMode && (
            <>
              <div className="w-full h-px bg-stone-200 my-1"></div>
              <p className="text-[#8b7355]">✏️ <b>编辑模式已开启</b></p>
              <p>👆 <b>点击标记</b>: 重命名/取消放置</p>
              <p>📌 <b>点击左侧列表</b>: 放置未分配地点</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
