import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartProducts: [],
  addToCart: (
    productId,
    productTitle,
    productPrice,
    productImage,
    productQuantity,
    productShop
  ) =>
    set((state) => {
      const existingProduct = state.cartProducts.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        return {
          cartProducts: state.cartProducts.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: product.quantity + productQuantity,
              };
            }
            return product;
          }),
        };
      } else {
        return {
          cartProducts: [
            ...state.cartProducts,
            {
              id: productId,
              title: productTitle,
              price: productPrice,
              image: productImage,
              quantity: productQuantity || 1,
              shop: productShop || null,
            },
          ],
        };
      }
    }),
  addToProductCounter: (productId) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    })),
  subtractFromProductCounter: (productId) =>
    set((state) => ({
      cartProducts: state.cartProducts
        .map((item) => {
          if (item.id === productId) {
            if (item.quantity - 1 <= 0) {
              return null;
            }
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(Boolean),
    })),
  clearCart: () => set(() => ({ cartProducts: [] })),
}));

export const useActiveShop = create((set) => ({
  activeShop: null,
  setActiveShop: (shopId) => set((state) => ({ activeShop: shopId })),
}));
