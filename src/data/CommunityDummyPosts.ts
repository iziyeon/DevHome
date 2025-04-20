// src/data/communityDummyPosts.ts

// 📌 커뮤니티 카테고리 타입 정의
export type CommunityCategory =
  | "프로젝트공유"
  | "기능구현팁"
  | "포트폴리오공유"
  | "라이브러리추천"
  | "면접후기"
  | "커리어토크"
  | "공지사항";

// 📌 게시글 타입 정의
export interface CommunityPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  imageUrl: string;
  category: CommunityCategory;
}

// 📌 샘플 데이터
const titles = [
  "🔥 DevHome 시작합니다!",
  "Tailwind + DaisyUI 설정 팁",
  "내 포트폴리오 소개합니다",
  "Next.js vs Vite 비교해봤습니다",
  "useEffect 정리: 언제, 왜 쓰는가?",
  "면접에서 받은 질문 5가지",
  "프리랜서 6개월 차 후기",
  "DevHome 공지사항 - 신규 기능 안내",
  "Redux vs Zustand: 상태관리 비교",
  "사이드 프로젝트: 팀 블로그 만들기",
  "React로 포트폴리오 사이트 만들기",
  "웹 개발에서의 생산성 도구 모음",
  "자주 쓰는 Git 명령어 모음",
  "프론트엔드와 백엔드의 차이점",
  "컴퓨터 그래픽스 기초",
];

const authors = [
  "dev_yeon",
  "junebug",
  "minseo",
  "jinho",
  "haein",
  "woojin",
  "luna",
  "admin",
  "sally",
  "yujin",
  "mirae",
  "jason",
];

const categories: CommunityCategory[] = [
  "프로젝트공유",
  "기능구현팁",
  "포트폴리오공유",
  "라이브러리추천",
  "면접후기",
  "커리어토크",
  "공지사항",
];

// 📌 랜덤 아이템 추출 함수
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 📌 날짜 생성 함수
function getRandomDate(index: number): string {
  const day = String((index % 28) + 1).padStart(2, "0");
  return `2025-04-${day}`;
}

// 📌 더미 데이터 생성 함수
function generateCommunityPosts(count: number): CommunityPost[] {
  return Array.from({ length: count }, (_, i) => {
    const id = `${i + 1}`;
    const title = getRandomItem(titles);
    const author = getRandomItem(authors);
    const category = getRandomItem(categories);
    const date = getRandomDate(i + 1);
    const readTime = `${Math.floor(Math.random() * 4) + 2} mins ago`;

    return {
      id,
      title: `${title} #${id}`,
      author,
      date,
      readTime,
      content: `${title}에 대한 실제 사용 경험과 의견을 공유합니다.`,
      imageUrl: `https://source.unsplash.com/random/400x200?technology,${id}`,
      category,
    };
  });
}

// ✅ 전체 더미 데이터
export const communityDummyPosts: CommunityPost[] = generateCommunityPosts(50);

// ✅ 페이지당 게시글 수
export const POSTS_PER_PAGE = 6;

// ✅ 특정 페이지 게시글 가져오기
export function getPostsForPage(page: number): CommunityPost[] {
  if (page < 1) return [];
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  return communityDummyPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
}
