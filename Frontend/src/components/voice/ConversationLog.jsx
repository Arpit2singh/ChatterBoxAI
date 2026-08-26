import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useVoiceStore } from '../../store/useVoiceStore';
import { useChannelStore } from '../../store/useChannelStore';
import { cn } from '../../lib/utils';

export default function ConversationLog() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const { transcript, fetchConversations, addTranscriptMessage } = useVoiceStore();
  const { activeChannelId } = useChannelStore();

  useEffect(() => {
    if (activeChannelId) {
      fetchConversations();
    }
  }, [activeChannelId, fetchConversations]);

  return (
    <div className="absolute right-6 top-20 z-30 flex flex-col items-end gap-4 pointer-events-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto p-3 rounded-xl bg-[#0f1123]/90 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 shadow-2xl transition-all"
        aria-label="Toggle Conversation Log"
      >
        <MessageSquare size={20} />
      </button>

      {isOpen && (
        <div className="pointer-events-auto w-[320px] max-h-[400px] flex flex-col bg-[#0f1123]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-4">
          <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-white/5">
            <span className="text-sm font-semibold text-white/90">Conversation Log</span>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 max-h-[300px]">
            {transcript.length === 0 ? (
              <div className="text-center py-6 text-xs text-white/30">
                No messages yet. Start speaking or send a message below.
              </div>
            ) : (
              transcript.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col gap-1 max-w-[90%]", msg.isAgent ? "items-start" : "items-end self-end")}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-bold uppercase text-white/40 tracking-wider">
                      {msg.sender}
                    </span>
                    <span className="text-[9px] text-white/30">{msg.time}</span>
                  </div>
                  <div className={cn(
                    "px-3 py-2 rounded-xl text-sm leading-relaxed",
                    msg.isAgent 
                      ? "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm"
                      : "bg-cyan-500/20 text-cyan-50 border border-cyan-500/30 rounded-tr-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (inputText.trim()) {
                addTranscriptMessage(inputText.trim(), false);
                setInputText('');
              }
            }}
            className="p-2 border-t border-white/5 bg-black/40 flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-500 text-black font-semibold text-xs rounded-lg transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
