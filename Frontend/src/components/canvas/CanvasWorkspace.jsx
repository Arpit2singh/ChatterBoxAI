import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CanvasBoard from './CanvasBoard';
import CanvasToolbar from './CanvasToolbar';

export default function CanvasWorkspace() {
  return (
    <div className="flex-1 relative w-full h-full overflow-hidden bg-[#040511]">
      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={4}
        centerOnInit={false}
        initialPositionX={0}
        initialPositionY={0}
        wheel={{ step: 0.1 }}
        panning={{ velocityDisabled: true }}
      >
        {(transformProps) => (
          <>
            <TransformComponent 
              wrapperStyle={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
              contentStyle={{ width: '4000px', height: '4000px', position: 'relative' }}
            >
              <CanvasBoard />
            </TransformComponent>
            
            <CanvasToolbar {...transformProps} />
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
