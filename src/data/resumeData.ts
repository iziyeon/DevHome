export const profile = {
  name: "홍길동",
  role: "Frontend Developer",
  email: "yeon.dev@gmail.com",
  image: "/src/assets/layout/default.jpg",
  tagline: "사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.",
};

export const techStack = {
  frontend: ["React", "TypeScript", "Tailwind CSS"],
  backend: ["Firebase", "Node.js"],
  etc: ["Git", "GitHub", "Figma"],
};

export const projects = [
  {
    title: "DevHome",
    description: "개발자 미니홈피형 포트폴리오 플랫폼",
    stack: ["React", "Firebase", "Tailwind"],
    role: "기획 및 프론트엔드 구현",
    deployUrl: "https://devhome.vercel.app",
    githubUrl: "https://github.com/yeon-dev/devhome",
  },
  {
    title: "맛집추천 서비스",
    description: "내 주변 맛집을 실시간으로 추천해주는 웹앱",
    stack: ["Next.js", "Supabase"],
    role: "검색 필터 및 추천 로직 구현",
    deployUrl: "",
    githubUrl: "https://github.com/yeon-dev/foodapp",
  },
];

export const career = {
  experience: [
    {
      company: "제로베이스",
      position: "프론트엔드 인턴",
      period: "2024.01 – 2024.03",
      description: "디자인 시스템 기반 마이페이지 개발 참여",
    },
  ],
  education: [
    {
      title: "React 마스터 부트캠프",
      org: "제로베이스",
      period: "2023.09 – 2023.12",
    },
    {
      title: "컴퓨터공학과",
      org: "한양대학교",
      period: "2018.03 – 2022.02",
    },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/yeon-dev" },
    { label: "Blog", url: "https://velog.io/@yeon-dev" },
    { label: "Notion 포트폴리오", url: "https://notion.so/portfolio" },
  ],
};
