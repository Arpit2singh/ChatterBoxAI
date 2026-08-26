import { create } from 'zustand';
import api from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';
import { useChannelStore } from './useChannelStore';
import { useUserStore } from './useUserStore';

export const useVoiceStore = create((set, get) => ({
  connectionState: 'disconnected',
  agentState: 'idle',
  transcript: [],
  isLoadingTranscript: false,

  setConnectionState: (state) => set({ connectionState: state }),
  setAgentState: (state) => set({ agentState: state }),

  fetchConversations: async () => {
    set({ isLoadingTranscript: true });
    try {
      const convos = await api.get(ENDPOINTS.GET_ALL_CONVERSATIONS);
      // Map to frontend shape: { id, sender, text, time, isAgent }
      const mapped = convos.map(c => ({
        id: c.id,
        sender: c.user?.name || (c.speakerType === 'agent' ? 'Chatterbox AI' : 'Unknown'),
        text: c.message,
        time: new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAgent: c.speakerType === 'agent'
      }));
      set({ transcript: mapped, isLoadingTranscript: false });
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
      set({ isLoadingTranscript: false });
    }
  },

  addTranscriptMessage: async (text, isAgent = false) => {
    const channelId = useChannelStore.getState().activeChannelId;
    const userId = useUserStore.getState().user?.id;
    if (!channelId || (!userId && !isAgent)) return;

    // Optimistic UI update
    const optimisticMsg = {
      id: Date.now(),
      sender: isAgent ? 'Chatterbox AI' : (useUserStore.getState().user?.name || 'User'),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAgent
    };
    
    set((state) => ({ transcript: [...state.transcript, optimisticMsg] }));

    try {
      await api.post(ENDPOINTS.SAVE_CONVERSATION, {
        channel: { id: channelId },
        user: isAgent ? null : { id: userId },
        message: text,
        speakerType: isAgent ? 'agent' : 'user'
      });
      // Optionally refetch conversations here to get the real DB ID
    } catch (err) {
      console.error('Failed to save conversation:', err);
    }
  }
}));
