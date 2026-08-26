import { create } from 'zustand';
import api from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';

export const useChannelStore = create((set, get) => ({
  channels: [],
  activeChannelId: null,
  isJoining: false,
  isCreating: false,
  isLoadingChannels: false,
  
  fetchChannels: async () => {
    set({ isLoadingChannels: true });
    try {
      let data;
      try {
        data = await api.get(ENDPOINTS.GET_ALL_CHANNELS);
      } catch (err) {
        // Fallback to /channels if endpoint is named differently
        data = await api.get('/channels');
      }

      const channelList = Array.isArray(data) ? data : (data?.data || []);
      console.log('📡 [Channels] Fetched channel list:', channelList);

      set((state) => {
        const formatted = channelList.map(ch => ({
          id: ch.id,
          name: ch.name || 'Unnamed Room',
          createdBy: ch.createdBy,
          createdAt: ch.createdAt,
          participants: ch.participants || 0,
          activeSpeaker: null
        }));

        // Preserve current active channel if still exists, or keep as is
        return {
          channels: formatted,
          isLoadingChannels: false
        };
      });
    } catch (error) {
      console.warn('⚠️ [Channels] Could not fetch channels list:', error.message);
      set({ isLoadingChannels: false });
    }
  },
  
  setActiveChannel: async (channelId, userId) => {
    set({ isJoining: true });
    try {
      if (userId && channelId) {
        await api.post(`${ENDPOINTS.JOIN_CHANNEL}?channelId=${channelId}&userId=${userId}`);
      }
      set({ activeChannelId: channelId, isJoining: false });
      return true;
    } catch (error) {
      console.error('Failed to join channel:', error);
      // Still set activeChannelId on frontend so user can enter room even if DB join logs warning
      set({ activeChannelId: channelId, isJoining: false });
      return false;
    }
  },
  
  addChannel: async (name, createdByUserId) => {
    set({ isCreating: true });
    try {
      const channel = await api.post(`${ENDPOINTS.CREATE_CHANNEL}?name=${encodeURIComponent(name)}&createdByUserId=${createdByUserId}`);
      
      // Re-fetch all channels from backend to keep state 100% in sync
      await get().fetchChannels();

      // Automatically join the newly created channel
      if (channel?.id) {
        get().setActiveChannel(channel.id, createdByUserId);
      }

      set({ isCreating: false });
      return channel;
    } catch (error) {
      console.error('Failed to create channel:', error);
      set({ isCreating: false });
      throw error;
    }
  },

  updateSpeaker: (channelId, speakerName) => set((state) => ({
    channels: state.channels.map(c => c.id === channelId ? { ...c, activeSpeaker: speakerName } : c)
  }))
}));
