import React from 'react';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { Book, Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export function WorksLibrary() {
  const { works, setActiveWork, addWork, deleteWork, reorderWorks, updateWork } = useStore(useShallow(state => ({
    works: state.works,
    setActiveWork: state.setActiveWork,
    addWork: state.addWork,
    deleteWork: state.deleteWork,
    reorderWorks: state.reorderWorks,
    updateWork: state.updateWork
  })));

  const sortedWorks = [...works].sort((a, b) => a.order - b.order);

  return (
    <div className="flex-1 flex flex-col h-[100dvh] bg-stone-100 p-8 overflow-y-auto">
      <div className="flex justify-center mb-12 mt-4">
        <div className="relative border-4 border-[#5c4a3d] bg-[#3b3024] px-8 py-4 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-1 border-2 border-[#d4af37] opacity-60"></div>
          <h1 className="text-4xl font-serif text-[#EADDC5] tracking-widest" style={{ fontFamily: 'serif' }}>藏书阁</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {sortedWorks.map((work, index) => (
          <div key={work.id} className="group flex flex-col items-center relative">
            <button
              onClick={() => setActiveWork(work.id)}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-48 bg-stone-800 rounded-r-lg shadow-lg transform transition-transform group-hover:-translate-y-2 group-hover:shadow-2xl flex items-center justify-center border-l-4 border-stone-600 overflow-hidden">
                {work.coverImage ? (
                  <img src={work.coverImage} alt={work.title} className="w-full h-full object-cover" />
                ) : (
                  <Book className="text-stone-400" size={48} />
                )}
              </div>
              <span className="mt-4 text-sm font-medium text-stone-700 text-center truncate w-full">{work.title}</span>
            </button>
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
              <label className="text-stone-400 hover:text-stone-600 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result as string;
                      updateWork({ ...work, coverImage: base64String });
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
                <Book size={16} />
              </label>
              <button onClick={() => deleteWork(work.id)} className="text-red-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
              {index > 0 && (
                <button onClick={() => reorderWorks(index, index - 1)} className="text-stone-400 hover:text-stone-600">
                  <ArrowLeft size={16} />
                </button>
              )}
              {index < sortedWorks.length - 1 && (
                <button onClick={() => reorderWorks(index, index + 1)} className="text-stone-400 hover:text-stone-600">
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => addWork('新书')}
          className="group flex flex-col items-center"
        >
          <div className="w-32 h-48 bg-stone-200 rounded-r-lg shadow-inner flex items-center justify-center border-2 border-dashed border-stone-400">
            <Plus className="text-stone-500" size={48} />
          </div>
          <span className="mt-4 text-sm font-medium text-stone-700">添加新书</span>
        </button>
      </div>
    </div>
  );
}
