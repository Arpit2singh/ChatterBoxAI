import React, { useEffect, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceStore } from '../../store/useVoiceStore';
import AgentStatusIndicator from './AgentStatusIndicator';
import { cn } from '../../lib/utils';
import { useConnectionState, useLocalParticipant, useVoiceAssistant } from '@livekit/components-react';

export default function VoiceControlBar() {
  const { agentState, setAgentState, setConnectionState } = useVoiceStore();
  const [fallbackMuted, setFallbackMuted] = useState(false);
  
  let connectionState = 'disconnected';
  let isMuted = fallbackMuted;
  let toggleMute = () => setFallbackMuted(!fallbackMuted);
  let liveAgentState = null;
  
  try {
    const conn = useConnectionState();
    if (conn) connectionState = conn;
    
    const participantState = useLocalParticipant();
    if (participantState?.localParticipant) {
      isMuted = !participantState.isMicrophoneEnabled;
      toggleMute = () => {
        participantState.localParticipant.setMicrophoneEnabled(isMuted);
      };
    }

    const voiceAssistant = useVoiceAssistant();
    if (voiceAssistant?.state) {
      liveAgentState = voiceAssistant.state;
    }
  } catch (e) {
    // Outside LiveKitRoom context fallback
  }

  useEffect(() => {
    setConnectionState(connectionState);
  }, [connectionState, setConnectionState]);

  useEffect(() => {
    if (liveAgentState) {
      setAgentState(liveAgentState);
    }
  }, [liveAgentState, setAgentState]);

  // Temporary function to cycle through states for demo purposes
  const cycleState = () => {
    const states = ['idle', 'listening', 'processing', 'speaking'];
    const nextState = states[(states.indexOf(agentState) + 1) % states.length];
    setAgentState(nextState);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto bg-[#070817]/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 pr-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center gap-4">
        <button
          onClick={toggleMute}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
            isMuted 
              ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" 
              : "bg-cyan-500 text-black shadow-cyan-500/30 hover:scale-105"
          )}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <div className="flex flex-col min-w-[140px] cursor-pointer" onClick={cycleState}>
          <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase mb-0.5">
            Agent Status
          </span>
          <div className="flex items-center gap-2">
            <AgentStatusIndicator />
            <span className={cn(
              "text-sm font-medium capitalize",
              agentState === 'idle' && "text-white/60",
              agentState === 'listening' && "text-cyan-400",
              agentState === 'processing' && "text-violet-400",
              agentState === 'speaking' && "text-cyan-300"
            )}>
              {agentState}...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
