import { create } from "zustand";
import { Timestamp } from "firebase/firestore";

export interface UserInfo {
  uid: string;
  email: string;
  name: string;
  nickname: string;
  profileImage?: string;
  position?: string;
  bio?: string;
  intro?: {
    interest?: string;
    book?: string;
    goal?: string;
  };
  categoryLabels?: {
    [key: string]: string;
  };
  snsLinks?: {
    github?: string;
    notion?: string;
    blog?: string;
    instagram?: string;
    x?: string;
  };
  snsLinksVisible?: { [key: string]: boolean };
  experience?: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  education?: {
    title: string;
    org: string;
    period: string;
  }[];
  links?: {
    label: string;
    url: string;
  }[];
  projects?: {
    title: string;
    description: string;
    stack: string[];
    role: string;
    deployUrl?: string;
    githubUrl?: string;
  }[];
  techStack?: {
    [category: string]: string[];
  };
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface UserStore {
  user: UserInfo | null;
  isLoading: boolean;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
