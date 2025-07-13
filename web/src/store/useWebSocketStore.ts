import { create } from 'zustand';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebSocketStore {
    client: Client | null;
    isConnected: boolean;
    subscriptions: Map<string, StompSubscription>;
    connect: () => void;
    disconnect: () => void;
    subscribe: (destination: string, callback: (msg: any) => void) => void;
    unsubscribe: (destination: string) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
    client: null,
    isConnected: false,
    subscriptions: new Map(),

    connect: () => {
        const client = new Client({
            webSocketFactory: () => new SockJS('/api/ws'),
            debug: (str) => console.log('STOMP: ' + str),
            onConnect: () => {
                set({ isConnected: true });
                console.log('WebSocket connected');
            },
            onDisconnect: () => {
                set({ isConnected: false });
                console.log('WebSocket disconnected');
            },
            onStompError: (frame) => console.error('STOMP error', frame),

        });

        set({ client });
        client.activate();
    },

    disconnect: () => {
        const { client, subscriptions } = get();
        subscriptions.forEach((subscription) => subscription.unsubscribe());
        subscriptions.clear();
        if (client) {
            client.deactivate();
            set({ isConnected: false, client: null, subscriptions: new Map() });
        }
    },

    subscribe: (destination, callback) => {
        const { client, subscriptions, isConnected } = get();
        if (client && isConnected && !subscriptions.has(destination)) {
            const subscription = client.subscribe(destination, (message) => {
                callback(JSON.parse(message.body));
            });
            subscriptions.set(destination, subscription);
            set({ subscriptions });
        }
    },

    unsubscribe: (destination) => {
        const { subscriptions } = get();
        const subscription = subscriptions.get(destination);
        if (subscription) {
            subscription.unsubscribe();
            subscriptions.delete(destination);
            set({ subscriptions });
        }
    },
}));