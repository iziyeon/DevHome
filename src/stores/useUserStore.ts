import { create } from "zustand";

export interface UserInfo {
  uid?: string;
  name?: string;
  nickname?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  position?: string;

  snsLinks?: {
    github?: string;
    notion?: string;
    blog?: string;
    instagram?: string;
    x?: string;
  };

  snsLinksVisible?: {
    github?: boolean;
    notion?: boolean;
    blog?: boolean;
    instagram?: boolean;
    x?: boolean;
    [key: string]: boolean | undefined; // ✅ 인덱스 시그니처 추가로 동적 접근 허용
  };

  categoryLabels?: {
    [key: string]: string;
  };

  intro?: {
    interest: string;
    book: string;
    goal: string;
  };
}

interface UserState {
  user: UserInfo | null;
  isLoading: boolean;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  setLoading: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setLoading: (value) => set({ isLoading: value }),
}));
