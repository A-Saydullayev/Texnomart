"use client";

import { useSyncExternalStore } from "react";
import { Store } from "@tanstack/store";

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
  const getSnapshot = () => likeStore.state;
  const getServerSnapshot = () => likeStore.state;
  
  return useSyncExternalStore(
    (callback) => likeStore.subscribe(callback),
    getSnapshot,
    getServerSnapshot
  );
};

export const isLiked = (id: number) => {
  return !!likeStore.state.liked[id];
};