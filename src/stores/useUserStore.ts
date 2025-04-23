// src/stores/useUserStore.ts

import { create } from "zustand";

interface UserInfo {
  uid: string;
  name: string;
  nickname: string;
  email: string;
}

interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
