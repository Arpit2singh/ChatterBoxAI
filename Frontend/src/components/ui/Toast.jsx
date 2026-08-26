import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50 px-4 py-3 rounded-lg shadow-2xl border backdrop-blur-xl transition-all duration-300 flex items-center gap-3",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        type === 'success' ? "bg-green-500/10 border-green-500/20 text-green-400" :
        type === 'error' ? "bg-red-500/10 border-red-500/20 text-red-400" :
        "bg-[#0f1123]/90 border-white/10 text-white"
      )}
    >
      {type === 'success' && <span className="text-lg">✓</span>}
      {type === 'error' && <span className="text-lg">⚠</span>}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
