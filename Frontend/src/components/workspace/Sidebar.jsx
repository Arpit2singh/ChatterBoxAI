import React, { useState } from 'react';
import { Mic, Plus, LogIn } from 'lucide-react';
import ChannelList from './ChannelList';
import UserPanel from './UserPanel';
import CreateChannelModal from './CreateChannelModal';
import JoinChannelModal from './JoinChannelModal';

export default function Sidebar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <>
      <div className="w-[260px] h-full bg-[#070817] flex flex-col border-r border-white/5 shadow-2xl z-20 shrink-0">
        {/* Branding & Server Area */}
        <div className="h-16 flex items-center px-4 border-b border-white/5 shrink-0 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/40 to-cyan-500/30 border border-white/20 flex items-center justify-center">
              <Mic className="text-white" size={16} />
            </div>
            <span className="font-['Outfit'] font-bold text-[17px] tracking-tight">Chatterbox AI</span>
          </div>
        </div>

        {/* Channels Section Header */}
        <div className="pt-4 px-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Channels</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="text-white/60 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
              title="Join Channel by UUID"
              aria-label="Join Channel by UUID"
            >
              <LogIn size={15} />
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="text-white/60 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
              title="Create Channel"
              aria-label="Create Channel"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden mt-1 flex flex-col">
          <ChannelList />
        </div>

        {/* User Panel */}
        <UserPanel />
      </div>

      <CreateChannelModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      <JoinChannelModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </>
  );
}
