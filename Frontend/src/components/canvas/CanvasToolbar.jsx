import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Square, Circle, Type, Trash2, Download } from 'lucide-react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { useChannelStore } from '../../store/useChannelStore';
import { downloadCanvasAsPng } from '../../lib/exportCanvas';

export default function CanvasToolbar({ zoomIn, zoomOut, resetTransform }) {
  const { addElement, createText, deleteElement, selectedElementId, elements } = useCanvasStore();
  const { channels, activeChannelId } = useChannelStore();
  const activeChannel = channels.find(c => c.id === activeChannelId);

  const handleAddRectangle = () => {
    addElement({
      type: 'shape',
      shape: 'rectangle',
      positionX: 300 + Math.random() * 80,
      positionY: 200 + Math.random() * 80,
      sizeX: 180,
      sizeY: 100,
      color: 'rgba(56, 189, 248, 0.25)'
    });
  };

  const handleAddSquare = () => {
    addElement({
      type: 'shape',
      shape: 'square',
      positionX: 310 + Math.random() * 80,
      positionY: 210 + Math.random() * 80,
      sizeX: 120,
      sizeY: 120,
      color: 'rgba(59, 130, 246, 0.25)'
    });
  };

  const handleAddCircle = () => {
    addElement({
      type: 'shape',
      shape: 'circle',
      positionX: 320 + Math.random() * 80,
      positionY: 220 + Math.random() * 80,
      sizeX: 120,
      sizeY: 120,
      color: 'rgba(168, 85, 247, 0.25)'
    });
  };

  const handleAddTriangle = () => {
    addElement({
      type: 'shape',
      shape: 'triangle',
      positionX: 330 + Math.random() * 80,
      positionY: 230 + Math.random() * 80,
      sizeX: 140,
      sizeY: 120,
      color: 'rgba(245, 158, 11, 0.25)'
    });
  };

  const handleAddText = () => {
    const text = prompt('Enter text for canvas:', 'New Idea');
    if (text) {
      createText(text, 350, 250);
    }
  };

  return (
    <>
      {/* Top Floating Whiteboard Creation Tools */}
      <div className="absolute top-18 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-[#070817]/90 backdrop-blur-2xl border border-white/10 p-1.5 rounded-2xl shadow-2xl">
        <button
          onClick={handleAddRectangle}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Add Rectangle"
        >
          <div className="w-3.5 h-2.5 border-2 border-cyan-400 rounded-[2px]" />
          <span>Rectangle</span>
        </button>

        <button
          onClick={handleAddSquare}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Add Square"
        >
          <Square size={15} className="text-blue-400" />
          <span>Square</span>
        </button>

        <button
          onClick={handleAddCircle}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Add Circle"
        >
          <Circle size={15} className="text-violet-400" />
          <span>Circle</span>
        </button>

        <button
          onClick={handleAddTriangle}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Add Triangle"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" className="text-amber-400">
            <polygon points="12 3 22 21 2 21" />
          </svg>
          <span>Triangle</span>
        </button>

        <button
          onClick={handleAddText}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Add Text"
        >
          <Type size={16} className="text-emerald-400" />
          <span>Text</span>
        </button>

        {selectedElementId && (
          <>
            <div className="w-[1px] h-4 bg-white/10 mx-1" />
            <button
              onClick={() => deleteElement(selectedElementId)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              title="Delete Selected"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </>
        )}
      </div>

      {/* Bottom Right Pan / Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30">
        <div className="bg-[#0f1123]/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl shadow-2xl flex flex-col gap-1">
          <button 
            onClick={() => downloadCanvasAsPng(elements, activeChannel?.name || 'canvas')}
            className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            title="Download Canvas Image (PNG)"
          >
            <Download size={18} />
          </button>
          <div className="h-[1px] bg-white/10 mx-1" />
          <button 
            onClick={() => zoomIn()}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <button 
            onClick={() => zoomOut()}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <button 
            onClick={() => resetTransform()}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset View"
          >
            <Maximize size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
