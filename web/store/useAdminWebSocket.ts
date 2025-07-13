'use client';

import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface AdminWebSocketContextType {
  client: Client | null;
  isConnected: boolean;
  subscribe: (destination: string, callback: (message: any) => void) => void;
  unsubscribe: (destination: string) => void;
  sendMessage: (destination: string, body: any) => void;
}

export function useAdminWebSocket(): AdminWebSocketContextType {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionsRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('/api/admin/ws'),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('admin-token')}`,
      },
      debug: (str) => {
        console.log('Admin STOMP: ' + str);
      },
      onConnect: () => {
        console.log('Connected to Admin WebSocket');
        setIsConnected(true);
      },
      onDisconnect: () => {
        console.log('Disconnected from Admin WebSocket');
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error('Admin STOMP error', frame);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    setClient(stompClient);
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const subscribe = (destination: string, callback: (message: any) => void) => {
    if (client && isConnected) {
      const subscription = client.subscribe(destination, (message) => {
        try {
          const data = JSON.parse(message.body);
          callback(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
      subscriptionsRef.current.set(destination, subscription);
    }
  };

  const unsubscribe = (destination: string) => {
    const subscription = subscriptionsRef.current.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      subscriptionsRef.current.delete(destination);
    }
  };

  const sendMessage = (destination: string, body: any) => {
    if (client && isConnected) {
      client.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  };

  return {
    client,
    isConnected,
    subscribe,
    unsubscribe,
    sendMessage,
  };
}