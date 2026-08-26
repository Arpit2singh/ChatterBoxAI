import React, { useEffect, useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import { useChannelStore } from '../../store/useChannelStore';
import { useUserStore } from '../../store/useUserStore';
import api from '../../lib/api';
import { ENDPOINTS } from '../../lib/endpoints';

export default function RoomConnector({ children }) {
  const { activeChannelId, channels } = useChannelStore();
  const { user } = useUserStore();
  const [token, setToken] = useState(null);

  const activeChannel = channels.find(c => c.id === activeChannelId);

  useEffect(() => {
    if (!activeChannel || !user) return;

    let isMounted = true;
    const fetchToken = async () => {
      try {
        const response = await api.post(
          `${ENDPOINTS.JOIN_CHANNEL_WITH_NAME}?roomname=${encodeURIComponent(activeChannel.id)}&participantIdentity=${encodeURIComponent(user.id)}&participantName=${encodeURIComponent(user.name)}`
        );
        if (isMounted) setToken(response);
      } catch (err) {
        console.error('Failed to fetch LiveKit token:', err);
      }
    };

    fetchToken();

    return () => {
      isMounted = false;
      setToken(null);
    };
  }, [activeChannel?.id, user?.id, user?.name]);

  if (!token || !activeChannel) return <>{children}</>;

  return (
    <LiveKitRoom
      key={activeChannel.id}
      serverUrl="wss://chatterbox-ai-imqres7q.livekit.cloud"
      token={token}
      connect={true}
      audio={true}
      video={false}
      className="flex-1 flex flex-col w-full h-full relative overflow-hidden"
    >
      <RoomAudioRenderer />
      <StartAudio label="Click here to enable AI Audio" />
      {children}
    </LiveKitRoom>
  );
}
