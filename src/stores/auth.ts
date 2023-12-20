import { create } from 'zustand';


type AuthStore = {
    auth: boolean;
    authenticate: () => void;
    deauthenticate: () => void;
  };

// Create a store
export const useAuthStore = create<AuthStore>((set) => ({
  auth: false,
  authenticate: () => set({ auth: true }),
  deauthenticate: () => set({ auth: false }),
}));