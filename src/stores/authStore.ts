import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserProfile } from '../types';

interface AuthState {
  user: User | null;
  currentProfile: UserProfile | null;
  isAuthenticated: boolean;
  isAnonymous: boolean;
  login: (user: User) => void;
  logout: () => void;
  setAnonymous: (anonymous: boolean) => void;
  switchProfile: (profileId: string) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      currentProfile: null,
      isAuthenticated: false,
      isAnonymous: true,
      
      login: (user: User) => {
        set({
          user,
          currentProfile: user.profiles[0] || null,
          isAuthenticated: true,
          isAnonymous: false,
        });
      },
      
      logout: () => {
        set({
          user: null,
          currentProfile: null,
          isAuthenticated: false,
          isAnonymous: true,
        });
      },
      
      setAnonymous: (anonymous: boolean) => {
        set({ isAnonymous: anonymous });
      },
      
      switchProfile: (profileId: string) => {
        const { user } = get();
        if (user) {
          const profile = user.profiles.find(p => p.id === profileId);
          if (profile) {
            set({ currentProfile: profile });
          }
        }
      },
      
      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
