import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';

export function DisguiseSettingsModal({ onClose }: { onClose: () => void }) {
  const { disguiseBackgroundText, setDisguiseBackgroundText } = useStore(useShallow(state => ({
    disguiseBackgroundText: state.disguiseBackgroundText,
    setDisguiseBackgroundText: state.setDisguiseBackgroundText
  })));

  const [text, setText] = useState(disguiseBackgroundText);

  const handleSave = () => {
    setDisguiseBackgroundText(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[85vh] max-w-5xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
          <h2 className="text-lg font-semibold text-stone-800">伪装报告内容设置</h2>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-600 rounded-md hover:bg-stone-200 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col min-h-0">
          <p className="text-sm text-stone-500 mb-2 shrink-0">
            请输入用于“狙击镜模式”底部的伪装报告内容。建议输入一些看起来非常专业、枯燥的工作文档。
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 w-full p-4 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500 resize-none font-serif text-sm leading-relaxed"
            placeholder="在此输入伪装文本..."
          />
        </div>
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end gap-2 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200 rounded-md transition-colors">
            取消
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-wood-600 hover:bg-wood-700 rounded-md transition-colors flex items-center gap-2">
            <Save size={16} /> 保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
