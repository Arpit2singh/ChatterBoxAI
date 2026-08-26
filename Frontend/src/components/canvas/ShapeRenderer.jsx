import React from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { cn } from '../../lib/utils';

export default function ShapeRenderer({ element }) {
  const { selectedElementId, setSelectedElementId } = useCanvasStore();
  const isSelected = selectedElementId === element.id;

  // Resolve shape value: prioritize element.shape, then raw database shape, then element.type
  const rawShape = (
    element.shape ??
    element.raw?.shape ??
    (element.type !== 'shape' ? element.type : null) ??
    element.raw?.type ??
    ''
  ).toString().trim().toLowerCase();

  const width = Math.max(Number(element.width) || 160, 40);
  const height = Math.max(Number(element.height) || 100, 40);
  const textContent = element.content || element.text || (typeof element.raw?.text === 'string' ? element.raw.text : '');

  const backgroundColor = element.style?.backgroundColor || 'rgba(56, 189, 248, 0.25)';
  const borderColor = element.style?.borderColor || 'rgba(56, 189, 248, 0.5)';
  const color = element.style?.color || '#ffffff';
  const fontSize = element.style?.fontSize || '14px';
  const fontFamily = element.style?.fontFamily || 'inherit';

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElementId(element.id);
  };

  // Explicitly handle known shapes: circle, square, triangle, rectangle
  switch (rawShape) {
    case 'circle': {
      return (
        <div
          onClick={handleClick}
          className={cn(
            "absolute cursor-pointer transition-all flex items-center justify-center p-3 text-center select-none overflow-hidden rounded-full",
            isSelected && "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#03040b]"
          )}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor,
            border: `1.5px solid ${borderColor}`,
            borderRadius: '50%',
            boxShadow: element.style?.boxShadow || '0 8px 32px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
            color,
            fontSize,
            fontFamily
          }}
        >
          {textContent ? (
            <span className="font-semibold text-white leading-snug break-words max-w-full">{textContent}</span>
          ) : null}
        </div>
      );
    }

    case 'square': {
      // Explicit square case: equal width and height
      const side = Math.max(width, height);
      return (
        <div
          onClick={handleClick}
          className={cn(
            "absolute cursor-pointer transition-all flex items-center justify-center p-3 text-center select-none overflow-hidden",
            isSelected && "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#03040b]"
          )}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${side}px`,
            height: `${side}px`,
            backgroundColor,
            border: `1.5px solid ${borderColor}`,
            borderRadius: element.style?.borderRadius || '8px',
            boxShadow: element.style?.boxShadow || '0 8px 32px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
            color,
            fontSize,
            fontFamily
          }}
        >
          {textContent ? (
            <span className="font-semibold text-white leading-snug break-words max-w-full">{textContent}</span>
          ) : null}
        </div>
      );
    }

    case 'triangle': {
      // Explicit triangle case: 3-point SVG polygon path
      const strokeW = isSelected ? 2.5 : 1.5;
      const pad = strokeW + 2;
      // Coordinates: apex (top-center), bottom-right, bottom-left
      const p1 = `${width / 2},${pad}`;
      const p2 = `${width - pad},${height - pad}`;
      const p3 = `${pad},${height - pad}`;
      const points = `${p1} ${p2} ${p3}`;

      return (
        <div
          onClick={handleClick}
          className="absolute cursor-pointer select-none transition-all flex items-center justify-center"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${width}px`,
            height: `${height}px`,
            filter: isSelected
              ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)) drop-shadow(0 8px 24px rgba(0,0,0,0.45))'
              : 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))'
          }}
        >
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible block w-full h-full"
          >
            <polygon
              points={points}
              fill={backgroundColor}
              stroke={isSelected ? '#22d3ee' : borderColor}
              strokeWidth={strokeW}
              strokeLinejoin="round"
              style={{ backdropFilter: 'blur(12px)' }}
            />
          </svg>

          {textContent ? (
            <div
              className="absolute inset-x-0 flex items-center justify-center text-center px-4 pointer-events-none"
              style={{
                top: `${height * 0.42}px`,
                bottom: `${pad + 4}px`,
              }}
            >
              <span
                className="font-semibold text-white leading-snug break-words max-w-full"
                style={{ color, fontSize, fontFamily }}
              >
                {textContent}
              </span>
            </div>
          ) : null}
        </div>
      );
    }

    case 'rectangle': {
      // Explicit rectangle case
      return (
        <div
          onClick={handleClick}
          className={cn(
            "absolute cursor-pointer transition-all flex items-center justify-center p-3 text-center select-none overflow-hidden",
            isSelected && "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#03040b]"
          )}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor,
            border: `1.5px solid ${borderColor}`,
            borderRadius: element.style?.borderRadius || '8px',
            boxShadow: element.style?.boxShadow || '0 8px 32px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
            color,
            fontSize,
            fontFamily
          }}
        >
          {textContent ? (
            <span className="font-semibold text-white leading-snug break-words max-w-full">{textContent}</span>
          ) : null}
        </div>
      );
    }

    default: {
      // Fallback: ONLY triggered for completely unknown or unsupported shape values
      return (
        <div
          onClick={handleClick}
          className={cn(
            "absolute cursor-pointer transition-all flex items-center justify-center p-3 text-center select-none overflow-hidden",
            isSelected && "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#03040b]"
          )}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor,
            border: `1.5px solid ${borderColor}`,
            borderRadius: '8px',
            boxShadow: element.style?.boxShadow || '0 8px 32px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
            color,
            fontSize,
            fontFamily
          }}
        >
          {textContent ? (
            <span className="font-semibold text-white leading-snug break-words max-w-full">{textContent}</span>
          ) : null}
        </div>
      );
    }
  }
}
