import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useChannelStore } from '../../store/useChannelStore';
import { useUserStore } from '../../store/useUserStore';

export default function CreateChannelModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const addChannel = useChannelStore((state) => state.addChannel);
  const isCreating = useChannelStore((state) => state.isCreating);
  const { user } = useUserStore();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && user?.id) {
      try {
        await addChannel(name.trim(), user.id);
        setName('');
        onClose();
      } catch (err) {
        alert('Failed to create channel.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0f1123] border border-white/10 rounded-xl shadow-2xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold text-white mb-2">Create Channel</h2>
        <p className="text-white/60 text-sm mb-6">Create a new collaborative voice room.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-white/70 uppercase mb-2">
              Channel Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-white/40">#</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-8 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                placeholder="new-project"
                autoFocus
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
