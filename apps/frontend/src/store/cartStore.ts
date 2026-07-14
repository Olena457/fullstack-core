import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

export interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, size, color) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, cartQuantity: item.cartQuantity + 1 }
                  : item,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...product,
                cartQuantity: 1,
                selectedSize: size,
                selectedColor: color,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, cartQuantity: quantity } : item,
          ),
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
