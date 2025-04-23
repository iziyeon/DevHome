import { create } from "zustand";

interface UserInfo {
  uid: string;
  name: string;
  nickname: string;
  email: string;

  profileImage?: string;
  bio?: string;
  position?: string;

  snsLinks?: {
    github?: string;
    notion?: string;
    blog?: string;
    instagram?: string;
    x?: string;
    [key: string]: string | undefined;
  };
}

interface UserState {
  user: UserInfo | null;
  isLoading: boolean;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
