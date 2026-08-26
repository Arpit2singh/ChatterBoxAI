import { create } from 'zustand';
import api from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';

export const useUserStore = create((set) => ({
  user: null, // { id: 'uuid', name: 'string' }
  isRegistering: false,

  registerUser: async (name) => {
    set({ isRegistering: true });
    try {
      const user = await api.post(`${ENDPOINTS.REGISTER}?name=${encodeURIComponent(name)}`);
      set({ user, isRegistering: false });
      return user;
    } catch (error) {
      console.error('Failed to register user:', error);
      set({ isRegistering: false });
      throw error;
    }
  }
}));
