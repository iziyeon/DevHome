export interface ResumeProfile {
  name: string;
  role: string;
  email: string;
  tagline: string;
  image: string;
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  etc: string[];
}

export interface Project {
  title: string;
  description: string;
  stack: string;
  role: string;
  deployUrl: string;
  githubUrl: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Education {
  title: string;
  org: string;
  period: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface ResumeCareer {
  experience: Experience[];
  education: Education[];
  links: LinkItem[];
}

export interface ResumeData {
  profile: ResumeProfile;
  techStack: TechStack;
  projects: Project[];
  career: ResumeCareer;
}
