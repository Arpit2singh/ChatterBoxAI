import React, { useState } from 'react';
import { LogIn, X, Hash } from 'lucide-react';
import { useChannelStore } from '../../store/useChannelStore';
import { useUserStore } from '../../store/useUserStore';

export default function JoinChannelModal({ isOpen, onClose }) {
  const [channelId, setChannelId] = useState('');
  const [channelName, setChannelName] = useState('');
  const { setActiveChannel, fetchChannels, channels } = useChannelStore();
  const { user } = useUserStore();
  const isJoining = useChannelStore((state) => state.isJoining);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanId = channelId.trim();
    if (!cleanId) return;

    if (!user?.id) {
      alert('User is not registered yet. Please wait a moment.');
      return;
    }

    try {
      // Join channel via API
      await setActiveChannel(cleanId, user.id);
      
      // If the channel was not already in the store, add it locally
      const exists = channels.find(c => c.id === cleanId);
      if (!exists) {
        useChannelStore.setState((state) => ({
          channels: [
            ...state.channels,
            {
              id: cleanId,
              name: channelName.trim() || `Channel-${cleanId.slice(0, 6)}`,
              participants: 1
            }
          ]
        }));
      }

      await fetchChannels();
      setChannelId('');
      setChannelName('');
      onClose();
    } catch (err) {
      alert('Failed to join channel. Please verify the UUID.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0b0d1e] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <LogIn size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Join Channel by UUID</h3>
            <p className="text-xs text-white/50">Enter the UUID of an existing voice room</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-white/70 mb-1.5 block">
              Channel UUID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 6b63f8a0-3d49-4c66-a0f2-c7f0cf6cb8b8"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors font-mono"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 mb-1.5 block">
              Room Label <span className="text-white/40">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Design Sync"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isJoining || !channelId.trim()}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-40 transition-all"
            >
              {isJoining ? 'Joining...' : 'Join Channel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
