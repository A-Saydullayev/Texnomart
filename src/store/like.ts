"use client";

import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";

interface LikeState {
  liked: Record<number, boolean>;
}

export const likeStore = new Store<LikeState>({
  liked: {},
});

export const toggleLike = (id: number) => {
  likeStore.setState((state) => ({
    liked: {
      ...state.liked,
      [id]: !state.liked[id],
    },
  }));
};

export const useLikeStore = () => {
  return useStore(likeStore);
};

export const isLiked = (id: number) => {
  return !!likeStore.state.liked[id];
};
