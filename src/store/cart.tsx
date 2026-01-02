"use client";

import { useSyncExternalStore } from "react";
import { Store } from "@tanstack/store";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  discountPercentage: number;
}

interface CartState {
  items: CartItem[];
}

export const cartStore = new Store<CartState>({
  items: [],
});

export const addToCart = (item: Omit<CartItem, "quantity">) => {
  cartStore.setState((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    
    return {
      items: [...state.items, { ...item, quantity: 1 }],
    };
  });
};

export const removeFromCart = (id: number) => {
  cartStore.setState((state) => ({
    items: state.items.filter((item) => item.id !== id),
  }));
};

export const updateQuantity = (id: number, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  
  cartStore.setState((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ),
  }));
};

export const clearCart = () => {
  cartStore.setState({ items: [] });
};

export const useCartStore = () => {
  const getSnapshot = () => cartStore.state;
  const getServerSnapshot = () => cartStore.state;
  
  return useSyncExternalStore(
    (callback) => cartStore.subscribe(callback),
    getSnapshot,
    getServerSnapshot
  );
};

export const getCartTotal = () => {
  return cartStore.state.items.reduce((total, item) => {
    const price = item.price * (1 - item.discountPercentage / 100);
    return total + price * item.quantity;
  }, 0);
};

export const getCartCount = () => {
  return cartStore.state.items.reduce((count, item) => count + item.quantity, 0);
};