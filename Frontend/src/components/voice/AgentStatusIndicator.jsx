import React from 'react';
import { useVoiceStore } from '../../store/useVoiceStore';
import { cn } from '../../lib/utils';

export default function AgentStatusIndicator() {
  const { agentState } = useVoiceStore();

  return (
    <div className="flex items-center justify-center w-8 h-8 relative">
      {agentState === 'idle' && (
        <div className="w-2 h-2 rounded-full bg-white/40" />
      )}
      
      {agentState === 'listening' && (
        <>
          <div className="w-3 h-3 rounded-full bg-cyan-400 absolute z-10" />
          <div className="w-full h-full rounded-full border-2 border-cyan-400/50 animate-ping absolute" />
        </>
      )}

      {agentState === 'processing' && (
        <div className="w-4 h-4 rounded-sm bg-gradient-to-tr from-violet-500 to-cyan-400 animate-spin" />
      )}

      {agentState === 'speaking' && (
        <div className="flex items-end gap-1 h-4">
          <div className="w-1 bg-cyan-400 animate-[bounce_1s_infinite] h-full" style={{ animationDelay: '0ms' }} />
          <div className="w-1 bg-violet-400 animate-[bounce_1s_infinite] h-2/3" style={{ animationDelay: '200ms' }} />
          <div className="w-1 bg-cyan-400 animate-[bounce_1s_infinite] h-full" style={{ animationDelay: '400ms' }} />
        </div>
      )}
    </div>
  );
}
