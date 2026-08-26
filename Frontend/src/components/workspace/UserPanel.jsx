import React from 'react';
import { Mic, MicOff, Settings, Headphones } from 'lucide-react';
import { useVoiceStore } from '../../store/useVoiceStore';
import { useUserStore } from '../../store/useUserStore';
import { cn } from '../../lib/utils';

export default function UserPanel() {
  const { isMuted, toggleMute } = useVoiceStore();
  const { user } = useUserStore();

  const handleRename = async () => {
    const newName = prompt('Enter your name:', user?.name || '');
    if (newName && newName.trim() && newName.trim() !== user?.name) {
      try {
        await useUserStore.getState().registerUser(newName.trim());
      } catch (err) {
        alert('Failed to register name.');
      }
    }
  };

  return (
    <div className="h-14 bg-[#050610] border-t border-white/5 flex items-center justify-between px-3">
      <div 
        onClick={handleRename}
        title="Click to change your name"
        className="flex items-center gap-2 flex-1 min-w-0 hover:bg-white/5 p-1 rounded-md cursor-pointer transition-colors"
      >
        <div className="relative">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} 
            alt="Avatar" 
            className="w-8 h-8 rounded-full bg-white/10"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#050610]" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate leading-tight">{user?.name || 'Loading...'}</span>
          <span className="text-[11px] text-white/50 truncate leading-tight">Online (Click to edit)</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={toggleMute}
          className="p-1.5 rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          {isMuted ? <MicOff size={18} className="text-red-400" /> : <Mic size={18} />}
        </button>
        <button className="p-1.5 rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors">
          <Headphones size={18} />
        </button>
        <button className="p-1.5 rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}
