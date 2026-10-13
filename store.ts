import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type StoreState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];

  // Favorites
  favoriteProducts: Product[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;

  // Hydration
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProducts: [],

      _hasHydrated: false,
      setHasHydrated: (value) => set({ _hasHydrated: value }),

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }

            return acc;
          }, [] as CartItem[]),
        })),

      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId,
          ),
        })),

      resetCart: () => set({ items: [] }),

      getSubTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0,
        ),

      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;

          return total + (price - discount) * item.quantity;
        }, 0),

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);

        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      addToFavorite: (product) =>
        set((state) => {
          const isFavorite = state.favoriteProducts.some(
            (item) => item._id === product._id,
          );

          return {
            favoriteProducts: isFavorite
              ? state.favoriteProducts.filter(
                  (item) => item._id !== product._id,
                )
              : [...state.favoriteProducts, { ...product }],
          };
        }),

      removeFromFavorite: (productId) =>
        set((state) => ({
          favoriteProducts: state.favoriteProducts.filter(
            (item) => item._id !== productId,
          ),
        })),

      resetFavorite: () => set({ favoriteProducts: [] }),
    }),
    {
      name: "cart-store",

      // Version 1 introduces the favoriteProducts field.
      version: 1,

      // Do not hydrate localStorage automatically during initialization.
      skipHydration: true,

      // Do not persist the hydration flag or action functions.
      partialize: (state) => ({
        items: state.items,
        favoriteProducts: state.favoriteProducts,
      }),

      // Migrate previously saved favorites to the new field name.
      migrate: (persistedState, version) => {
        const oldState = persistedState as Record<string, unknown>;

        if (version < 1) {
          const { favoriteProduct: oldFavorites, ...rest } = oldState;

          return {
            ...rest,
            favoriteProducts: (oldState.favoriteProducts ??
              oldFavorites ??
              []) as Product[],
          };
        }

        return oldState as Pick<StoreState, "items" | "favoriteProducts">;
      },

      // Mark hydration as complete after restoration finishes.
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to hydrate cart store:", error);
        }

        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useStore;
