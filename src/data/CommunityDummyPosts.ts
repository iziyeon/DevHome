export interface CommunityPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  imageUrl: string;
  category: string;
}

export const communityDummyPosts: CommunityPost[] = [
  {
    id: "1",
    title: "🔥 DevHome 시작합니다!",
    author: "dev_yeon",
    date: "2025-04-15",
    readTime: "2 mins read",
    content: "DevHome의 첫 번째 기능을 공유합니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,1",
    category: "프로젝트공유",
  },
  {
    id: "2",
    title: "Tailwind + DaisyUI 설정 팁",
    author: "junebug",
    date: "2025-04-16",
    readTime: "3 mins read",
    content: "다크 테마와 충돌 시 해결 팁을 공유합니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,2",
    category: "기능구현팁",
  },
  {
    id: "3",
    title: "내 포트폴리오 소개합니다",
    author: "minseo",
    date: "2025-04-17",
    readTime: "4 mins read",
    content: "포트폴리오에 사용한 기술과 디자인을 소개합니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,3",
    category: "포트폴리오공유",
  },
  {
    id: "4",
    title: "Next.js vs Vite 비교해봤습니다",
    author: "jinho",
    date: "2025-04-18",
    readTime: "5 mins read",
    content: "두 환경의 장단점과 실제 사용 후기를 공유합니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,4",
    category: "라이브러리추천",
  },
  {
    id: "5",
    title: "useEffect 정리: 언제, 왜 쓰는가?",
    author: "haein",
    date: "2025-04-18",
    readTime: "2 mins read",
    content: "React 훅 중 가장 헷갈리는 useEffect를 정리해봅니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,5",
    category: "기능구현팁",
  },
  {
    id: "6",
    title: "면접에서 받은 질문 5가지",
    author: "woojin",
    date: "2025-04-19",
    readTime: "3 mins read",
    content: "최근 프론트엔드 면접에서 받은 질문을 정리했습니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,6",
    category: "면접후기",
  },
  {
    id: "7",
    title: "프리랜서 6개월 차 후기",
    author: "luna",
    date: "2025-04-20",
    readTime: "4 mins read",
    content: "프리랜서로 일하면서 느낀 장단점과 실무 이야기",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,7",
    category: "커리어토크",
  },
  {
    id: "8",
    title: "DevHome 공지사항 - 신규 기능 안내",
    author: "admin",
    date: "2025-04-20",
    readTime: "1 min read",
    content: "GitHub 연동 기능이 새롭게 추가되었습니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,8",
    category: "공지사항",
  },
  {
    id: "9",
    title: "Redux vs Zustand: 상태관리 비교",
    author: "sally",
    date: "2025-04-20",
    readTime: "5 mins read",
    content: "두 상태관리 라이브러리의 실제 사용 비교",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,10",
    category: "라이브러리추천",
  },
  {
    id: "10",
    title: "사이드 프로젝트: 팀 블로그 만들기",
    author: "yujin",
    date: "2025-04-20",
    readTime: "4 mins read",
    content: "협업으로 진행한 팀 블로그 프로젝트 소개",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,11",
    category: "프로젝트공유",
  },
  {
    id: "11",
    title: "React로 포트폴리오 사이트 만들기",
    author: "mirae",
    date: "2025-04-20",
    readTime: "3 mins read",
    content: "React + Tailwind 기반 포트폴리오 구축기",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,12",
    category: "포트폴리오공유",
  },
  {
    id: "12",
    title: "웹 개발에서의 생산성 도구 모음",
    author: "jason",
    date: "2025-04-21",
    readTime: "3 mins read",
    content: "개발을 효율적으로 만들어주는 툴을 소개합니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,13",
    category: "기능구현팁",
  },
  {
    id: "13",
    title: "자주 쓰는 Git 명령어 모음",
    author: "haein",
    date: "2025-04-21",
    readTime: "2 mins read",
    content: "Git을 사용할 때 유용한 명령어들을 정리해봤습니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,14",
    category: "기능구현팁",
  },
  {
    id: "14",
    title: "프론트엔드와 백엔드의 차이점",
    author: "junebug",
    date: "2025-04-22",
    readTime: "4 mins read",
    content: "프론트엔드와 백엔드의 차이를 쉽게 설명해봅니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,15",
    category: "커리어토크",
  },
  {
    id: "15",
    title: "컴퓨터 그래픽스 기초",
    author: "dev_yeon",
    date: "2025-04-22",
    readTime: "5 mins read",
    content: "컴퓨터 그래픽스를 배우기 위한 기본 개념을 다룹니다.",
    imageUrl: "https://source.unsplash.com/random/400x200?technology,16",
    category: "기능구현팁",
  },
];

// 한 페이지당 게시글 수
export const POSTS_PER_PAGE = 6;

// 특정 페이지의 게시글 목록 가져오기 함수
export function getPostsForPage(page: number): CommunityPost[] {
  if (page < 1) return [];
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  return communityDummyPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
}
