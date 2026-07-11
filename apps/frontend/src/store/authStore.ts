import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore, User } from "../types/auth"; 

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: (user: User, token: string) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      isAuthenticated: () => !!get().token,
    }),
    {
      name: "entropic-auth", 
    },
  ),
);
