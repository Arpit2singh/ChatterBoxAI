import React, { useEffect } from 'react';
import { useChannelStore } from '../../store/useChannelStore';
import { useUserStore } from '../../store/useUserStore';
import ChannelListItem from './ChannelListItem';

export default function ChannelList() {
  const { channels, fetchChannels, activeChannelId, setActiveChannel, isLoadingChannels } = useChannelStore();
  const { user } = useUserStore();

  useEffect(() => {
    // Initial fetch on mount
    fetchChannels();

    // Poll for new channels created by other users every 3.5 seconds
    const interval = setInterval(() => {
      fetchChannels();
    }, 3500);

    return () => clearInterval(interval);
  }, [fetchChannels]);

  // If no channel is currently selected but channels exist, auto-select the first one
  useEffect(() => {
    if (!activeChannelId && channels.length > 0 && user?.id) {
      setActiveChannel(channels[0].id, user.id);
    }
  }, [activeChannelId, channels, user, setActiveChannel]);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
      <div className="text-xs font-semibold text-white/40 mb-2 px-2 uppercase tracking-wider flex items-center justify-between">
        <span>Voice Channels</span>
        {isLoadingChannels && (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        {channels.length === 0 ? (
          <div className="text-center py-8 px-2">
            <p className="text-xs text-white/30 mb-2">No channels yet</p>
            <p className="text-[11px] text-cyan-400/80">Click the + above to create a room</p>
          </div>
        ) : (
          channels.map((channel) => (
            <ChannelListItem key={channel.id} channel={channel} />
          ))
        )}
      </div>
    </div>
  );
}
