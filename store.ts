import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  favoriteProduct: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  getItemCount: (productId: string) => number;
  addToFavorite: (product: Product) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],
      addItem: (product) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product._id === product._id
          );
          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += 1;
            return { items: newItems };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },
      removeItem: (productId) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product._id === productId
          );
          if (existingIndex > -1) {
            const item = state.items[existingIndex];
            if (item.quantity > 1) {
              const newItems = [...state.items];
              newItems[existingIndex].quantity -= 1;
              return { items: newItems };
            }
            return {
              items: state.items.filter((i) => i.product._id !== productId),
            };
          }
          return {};
        });
      },
      getItemCount: (productId) => {
        const item = get().items.find((i) => i.product._id === productId);
        return item ? item.quantity : 0;
      },
      addToFavorite: async (product) => {
        set((state) => {
          const exists = state.favoriteProduct.some(
            (item) => item._id === product._id
          );
          if (exists) {
            return {
              favoriteProduct: state.favoriteProduct.filter(
                (item) => item._id !== product._id
              ),
            };
          }
          return { favoriteProduct: [...state.favoriteProduct, product] };
        });
      },
    }),
    {
      name: "ushop-store",
    }
  )
);

export default useCartStore;
