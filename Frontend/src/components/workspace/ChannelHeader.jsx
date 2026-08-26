import React, { useState } from 'react';
import { Hash, Users, MoreHorizontal, Radio, Copy, Check, Download } from 'lucide-react';
import { useChannelStore } from '../../store/useChannelStore';
import { useVoiceStore } from '../../store/useVoiceStore';
import { useCanvasStore } from '../../store/useCanvasStore';
import { useParticipants } from '@livekit/components-react';
import { downloadCanvasAsPng, downloadCanvasAsJson } from '../../lib/exportCanvas';

export default function ChannelHeader() {
  const { channels, activeChannelId } = useChannelStore();
  const { connectionState } = useVoiceStore();
  const { elements } = useCanvasStore();
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  let liveCount = 0;
  try {
    const participants = useParticipants();
    if (participants) liveCount = participants.length;
  } catch (e) {
    // Outside LiveKit room context fallback
  }

  const activeChannel = channels.find(c => c.id === activeChannelId);

  const handleCopyId = () => {
    if (activeChannel?.id) {
      navigator.clipboard.writeText(activeChannel.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    setIsExporting(true);
    await downloadCanvasAsPng(elements, activeChannel?.name || 'canvas');
    setIsExporting(false);
  };

  return (
    <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#03040b]/80 backdrop-blur-md z-10 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Hash size={20} className="text-white/40" />
          <h1 className="font-semibold text-[15px] text-white tracking-wide">
            {activeChannel?.name || 'select-channel'}
          </h1>
        </div>

        {activeChannel?.id && (
          <button
            onClick={handleCopyId}
            title="Click to copy Channel UUID"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-xs font-mono border border-white/10"
          >
            {copied ? (
              <>
                <Check size={13} className="text-green-400" />
                <span className="text-green-400 font-sans font-medium">Copied UUID!</span>
              </>
            ) : (
              <>
                <Copy size={13} className="text-cyan-400" />
                <span>{activeChannel.id.slice(0, 8)}...</span>
              </>
            )}
          </button>
        )}
        
        <div className="w-[1px] h-4 bg-white/10" />
        
        <div className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded bg-white/5 text-white/60">
          <Radio 
            size={12} 
            className={
              connectionState === 'connected' ? 'text-green-400' :
              connectionState === 'connecting' ? 'text-yellow-400' : 'text-red-400'
            } 
          />
          <span className="capitalize">{connectionState}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Export / Download Canvas Button */}
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-all shadow-sm"
          title="Download Canvas as PNG"
        >
          <Download size={14} className={isExporting ? "animate-bounce" : ""} />
          <span>{isExporting ? 'Exporting...' : 'Export PNG'}</span>
        </button>

        <div 
          title="Active Participants in Room"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <Users size={16} className={liveCount > 0 ? "text-cyan-400" : "text-white/60"} />
          <span className="text-sm font-medium">{liveCount || activeChannel?.participants || 1}</span>
        </div>
      </div>
    </div>
  );
}
