import React, { useEffect } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { useChannelStore } from '../../store/useChannelStore';
import ElementRenderer from './ElementRenderer';

export default function CanvasBoard() {
  const { elements, fetchElements, setSelectedElementId } = useCanvasStore();
  const { activeChannelId } = useChannelStore();

  useEffect(() => {
    if (!activeChannelId) return;

    // Initial fetch
    fetchElements(activeChannelId);

    // Polling every 1.5 seconds for real-time synchronization with backend
    const interval = setInterval(() => {
      fetchElements(activeChannelId);
    }, 1500);

    return () => clearInterval(interval);
  }, [activeChannelId, fetchElements]);

  const handleBoardClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedElementId(null);
    }
  };

  return (
    <div 
      id="canvas-board"
      className="relative w-[4000px] h-[4000px] origin-top-left cursor-crosshair select-none"
      style={{
        backgroundColor: '#03040c',
        backgroundImage: `
          radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px),
          radial-gradient(rgba(56, 189, 248, 0.08) 1.5px, transparent 1.5px)
        `,
        backgroundSize: '32px 32px, 128px 128px'
      }}
      onClick={handleBoardClick}
    >
      {/* Visual Canvas Origin Marker */}
      <div className="absolute top-10 left-10 pointer-events-none text-[11px] font-mono text-white/20 tracking-wider">
        CANVAS (0, 0)
      </div>

      {elements.map((element) => (
        <ElementRenderer key={element.id} element={element} />
      ))}
    </div>
  );
}
