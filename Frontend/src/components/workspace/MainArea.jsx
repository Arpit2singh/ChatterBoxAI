import React from 'react';
import ChannelHeader from './ChannelHeader';
import CanvasWorkspace from '../canvas/CanvasWorkspace';
import VoiceControlBar from '../voice/VoiceControlBar';
import ConversationLog from '../voice/ConversationLog';
import RoomConnector from '../voice/RoomConnector';

export default function MainArea() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0b0d26] via-[#040510] to-[#010103]">
      <ChannelHeader />
      
      <RoomConnector>
        {/* Canvas Workspace */}
        <CanvasWorkspace />

        {/* Voice and Collaboration Overlays */}
        <ConversationLog />
        <VoiceControlBar />
      </RoomConnector>
    </div>
  );
}
