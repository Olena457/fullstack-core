import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, cartQuantity: item.cartQuantity + 1 }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { ...product, cartQuantity: 1 }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.cartQuantity,
          0,
        );
      },
    }),
    {
      name: "entropic-cart-storage",
    },
  ),
);
