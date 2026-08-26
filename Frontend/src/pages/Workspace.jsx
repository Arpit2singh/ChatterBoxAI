import React, { useEffect } from 'react';
import Sidebar from '../components/workspace/Sidebar';
import MainArea from '../components/workspace/MainArea';
import { useUserStore } from '../store/useUserStore';

export default function Workspace() {
  const { user, registerUser, isRegistering } = useUserStore();

  useEffect(() => {
    if (!user && !isRegistering) {
      const randomName = `Guest-${Math.floor(1000 + Math.random() * 9000)}`;
      registerUser(randomName).catch(console.error);
    }
  }, [user, isRegistering, registerUser]);

  if (!user) {
    return (
      <div className="flex h-screen w-screen bg-[#03040b] text-white items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span className="text-white/60 text-sm">Joining Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#03040b] text-white overflow-hidden font-sans">
      <Sidebar />
      <MainArea />
    </div>
  );
}
