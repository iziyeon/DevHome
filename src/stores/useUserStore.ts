import { create } from "zustand";

export interface User {
  uid: string;
  name: string;
  nickname: string;
  email: string;
  bio?: string;
  profileImage?: string;
  position?: string;
  intro?: {
    interest?: string;
    book?: string;
    goal?: string;
  };
  snsLinks?: {
    github?: string;
    notion?: string;
    blog?: string;
    instagram?: string;
    x?: string;
  };
  snsLinksVisible?: {
    [key: string]: boolean;
  };
  categoryLabels?: {
    [key: string]: string;
  };
  techStack?: {
    [key: string]: string[];
  };
  projects?: Array<{
    title: string;
    description: string;
    stack: string;
    role: string;
    deployUrl?: string;
    githubUrl?: string;
  }>;
  experience?: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
  education?: Array<{
    title: string;
    org: string;
    period: string;
  }>;
  links?: Array<{
    label: string;
    url: string;
  }>;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
