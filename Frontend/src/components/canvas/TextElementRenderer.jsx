import React from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { cn } from '../../lib/utils';

export default function TextElementRenderer({ element }) {
  const { selectedElementId, setSelectedElementId } = useCanvasStore();
  const isSelected = selectedElementId === element.id;

  const raw = element.raw || {};
  const textContent = element.content || element.text || raw.Text || raw.text || raw.content || raw.message || raw.value || '';

  // Ensure color is visible on dark canvas
  let textColor = element.style?.color || '#ffffff';
  if (textColor === '#000000' || textColor === 'black' || textColor === 'rgb(0,0,0)') {
    textColor = '#ffffff';
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElementId(element.id);
      }}
      className={cn(
        "absolute cursor-pointer select-none px-3.5 py-2 rounded-xl transition-all flex items-center shadow-xl",
        isSelected 
          ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#03040b] bg-white/15" 
          : "hover:bg-white/10"
      )}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        fontSize: element.style?.fontSize || '16px',
        fontWeight: element.style?.fontWeight || '600',
        color: textColor,
        fontFamily: element.style?.fontFamily || 'Inter, system-ui, sans-serif',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(12px)',
        zIndex: 10
      }}
    >
      <span className="whitespace-pre-wrap leading-relaxed">
        {textContent || 'Text'}
      </span>
    </div>
  );
}
