import React, { useState } from 'react';
import { Hash, Volume2, Copy, Check } from 'lucide-react';
import { useChannelStore } from '../../store/useChannelStore';
import { useUserStore } from '../../store/useUserStore';
import { cn } from '../../lib/utils';

export default function ChannelListItem({ channel }) {
  const { activeChannelId, setActiveChannel } = useChannelStore();
  const { user } = useUserStore();
  const [copied, setCopied] = useState(false);
  const isActive = activeChannelId === channel.id;

  const handleCopy = (e) => {
    e.stopPropagation();
    if (channel.id) {
      navigator.clipboard.writeText(channel.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      onClick={() => setActiveChannel(channel.id, user?.id)}
      className={cn(
        "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-all group cursor-pointer select-none",
        isActive 
          ? "bg-white/10 text-white font-medium shadow-sm" 
          : "text-white/60 hover:bg-white/5 hover:text-white/90"
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <Hash size={16} className={cn("opacity-50 shrink-0", isActive && "opacity-100 text-cyan-400")} />
        <span className="truncate">{channel.name}</span>
      </div>
      
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleCopy}
          title="Copy Channel UUID"
          className="opacity-0 group-hover:opacity-100 hover:bg-white/10 p-1 rounded transition-all text-white/50 hover:text-white"
        >
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
        </button>

        {channel.activeSpeaker && (
          <Volume2 size={14} className="text-cyan-400 animate-pulse" />
        )}
        {channel.participants > 0 && (
          <span className="text-xs opacity-50 px-1">{channel.participants}</span>
        )}
      </div>
    </div>
  );
}
