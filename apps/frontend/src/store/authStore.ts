import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthStore } from "../types/auth";
import { useCartStore } from "./cartStore";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: (user: User, token: string) => set({ user, token }),

      logout: () => {
        set({ user: null, token: null });
        useCartStore.getState().clearCart();
        localStorage.removeItem("favorites-storage");
      },

      isAuthenticated: () => {
        const hasToken = !!get().token;
        return hasToken;
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
