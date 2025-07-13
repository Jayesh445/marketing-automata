import { create } from "zustand";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

interface AuthStore {
    user: User | null;
    isLoading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({

    user: null,
    isLoading: false,
    login: async (credentials: any) => {
        set({ isLoading: true });
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockUser = {
                id: '1',
                name: 'John Doe',
                email: credentials.email,
                avatar: '/api/placeholder/32/32',
                role: 'admin',
            };
            set({ user: mockUser });
            localStorage.setItem('auth-token', 'mock-jwt-token');
        } catch (error) {
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    logout: () => {
        localStorage.removeItem('auth-token');
        set({ user: null });
    },
    setUser: (user: User | null) => set({ user }),
}))