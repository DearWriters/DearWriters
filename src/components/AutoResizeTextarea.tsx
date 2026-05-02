import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { cn } from '../lib/utils';

const playClick = () => {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
};

const SearchHighlightPluginKey = new PluginKey('searchHighlight');

const SearchHighlight = Extension.create({
  name: 'searchHighlight',
  addOptions() {
    return { searchTerm: '' };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: SearchHighlightPluginKey,
        state: {
          init() { return DecorationSet.empty; },
          apply: (tr, oldState) => {
            const searchTerm = tr.getMeta('searchTerm');
            const currentSearchTerm = searchTerm !== undefined ? searchTerm : this.options.searchTerm;
            this.options.searchTerm = currentSearchTerm;

            if (!currentSearchTerm) return DecorationSet.empty;

            const decorations: Decoration[] = [];
            const doc = tr.doc;
            const regex = new RegExp(`(${currentSearchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

            doc.descendants((node, pos) => {
              if (node.isText && node.text) {
                let match;
                regex.lastIndex = 0;
                while ((match = regex.exec(node.text)) !== null) {
                  decorations.push(
                    Decoration.inline(pos + match.index, pos + match.index + match[0].length, {
                      class: 'bg-yellow-200/50',
                    })
                  );
                }
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

export const AutoResizeTextarea = ({ 
  value, 
  onChange, 
  className, 
  placeholder, 
  scrollContainerRef, 
  searchTerm, 
  blockId, 
  style, 
  isDimmed = false, 
  isFocused: isFocusedProp, 
  isDisguiseMode = false, 
  isWordMode = false,
  alignment = 'left', 
  typewriterMode = false, 
  onFocus,
  onBlur,
  onKeyUp,
  onClick,
  onKeyDown,
  disabled,
  ...props 
}: any) => {
  const [isFocused, setIsFocused] = React.useState(isFocusedProp || false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocusedProp !== undefined && isFocusedProp !== isFocused) {
      setIsFocused(isFocusedProp);
    }
  }, [isFocusedProp]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Markdown.configure({
        html: false,
        transformPastedText: true,
      }),
      SearchHighlight.configure({ searchTerm: searchTerm || '' }),
      Extension.create({
        name: 'keyboardHandler',
        addProseMirrorPlugins() {
          return [
            new Plugin({
              props: {
                handleKeyDown: (view, event) => {
                  if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Enter' || event.key === ' ') {
                    playClick();
                  }
                  return false;
                }
              }
            })
          ];
        }
      })
    ],
    content: value || '',
    editable: !disabled,
    editorProps: {
      attributes: {
        class: cn(
          isWordMode 
            ? "focus:outline-none min-h-[1em] w-full text-black font-serif text-[15px] leading-[1.8]" 
            : "prose prose-stone max-w-none focus:outline-none min-h-[1em] w-full",
          alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left',
          className
        ),
      },
      handleKeyDown: (view, event) => {
        if (onKeyDown) {
          // Create a synthetic event
          onKeyDown({
            key: event.key,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            altKey: event.altKey,
            preventDefault: () => event.preventDefault(),
            stopPropagation: () => event.stopPropagation(),
            currentTarget: view.dom,
            selectionStart: view.state.selection.from,
            value: view.state.doc.textContent
          } as any);
        }
        return false; // Let Tiptap handle the rest
      }
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      if (onChange) {
        onChange({ target: { value: markdown } });
      }
    },
    onFocus: (e) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus({ target: e.editor.view.dom } as any);
      }
    },
    onBlur: (e) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur({ target: e.editor.view.dom } as any);
      }
    },
    onSelectionUpdate: ({ editor }) => {
      if (typewriterMode && isFocused) {
        const { view } = editor;
        const { head } = view.state.selection;
        const domInfo = view.domAtPos(head);
        if (domInfo && domInfo.node instanceof Element) {
          domInfo.node.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } else if (domInfo && domInfo.node.parentElement) {
          domInfo.node.parentElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    }
  });

  // Update content if value changes externally
  useEffect(() => {
    if (editor && value !== undefined) {
      const currentMarkdown = editor.storage.markdown.getMarkdown();
      if (value !== currentMarkdown) {
        if (value.trim() !== currentMarkdown.trim()) {
           editor.commands.setContent(value, false);
        }
      }
    }
  }, [value, editor]);

  // Handle focus prop
  useEffect(() => {
    if (editor) {
      if (isFocusedProp && !editor.isFocused) {
        editor.commands.focus();
      } else if (!isFocusedProp && editor.isFocused) {
        editor.commands.blur();
      }
    }
  }, [isFocusedProp, editor]);

  // Handle search term
  useEffect(() => {
    if (editor && searchTerm !== undefined) {
      editor.view.dispatch(editor.state.tr.setMeta('searchTerm', searchTerm));
    }
  }, [editor, searchTerm]);

  // Handle disabled state
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full group",
        isDimmed && "opacity-40",
      )}
      style={style}
      onClick={(e) => {
        if (onClick) onClick(e as any);
        if (e.target === containerRef.current) {
          editor?.commands.focus();
        }
      }}
      onKeyUp={(e) => {
        if (onKeyUp) onKeyUp(e as any);
      }}
    >
      <EditorContent editor={editor} className="w-full" />
      {!value && isFocused && placeholder && (
        <div className="absolute top-0 left-0 text-stone-400 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
};
