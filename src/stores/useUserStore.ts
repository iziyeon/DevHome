import { create } from "zustand";

export interface UserInfo {
  uid?: string;
  name?: string;
  nickname?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  snsLinks?: {
    github?: string;
    notion?: string;
    blog?: string;
    instagram?: string;
    x?: string;
  };
  categoryLabels?: {
    tech: string;
    troubleshooting: string;
    daily: string;
    project: string;
  };
  intro?: {
    interest: string;
    book: string;
    goal: string;
  };
}

interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
