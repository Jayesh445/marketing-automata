'use client';

import { create } from 'zustand';


interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'super_admin';
}

interface AdminAuthState {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}


export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  admin: null,
  isLoading: true,
  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock admin validation
      if (email === 'admin@platform.com' && password === 'admin123') {
        const mockAdmin: AdminUser = {
          id: 'admin-1',
          name: 'Platform Admin',
          email,
          role: 'super_admin',
        };
        set({ admin: mockAdmin });
        localStorage.setItem('admin-token', 'mock-admin-jwt-token');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    localStorage.removeItem('admin-token');
    set({ admin: null });
  },
  initialize: () => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      set({
        admin: {
          id: 'admin-1',
          name: 'Platform Admin',
          email: 'admin@platform.com',
          role: 'super_admin',
        },
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }
  },
}))




