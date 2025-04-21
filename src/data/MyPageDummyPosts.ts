// src/data/MyPageDummyPosts.ts

// ✅ 카테고리 타입 분리
export type PostCategory = "tech" | "troubleshooting" | "daily" | "project";

// ✅ 게시글 타입 정의
export interface Post {
  id: string;
  title: string;
  category: PostCategory;
  date: string; // YYYY.MM.DD
  content: string;
}

// ✅ 더미 제목 리스트
const titles = [
  "상태관리 핵심 요약",
  "배포 자동화 도전기",
  "디자인 시스템 구축기",
  "데이터 fetch 구조 개선",
  "다크모드 구현기",
  "useEffect 정복기",
  "페이지네이션 구현법",
  "테스트 코드 첫걸음",
  "TS 환경 세팅",
  "코드 리뷰에서 배운 점",
  "API 연동 실전",
  "SEO 최적화 시도",
  "Firebase Firestore 문제",
  "React Query 실습",
  "DaisyUI 테마 적용기",
];

// ✅ 카테고리 리스트
const categories: PostCategory[] = [
  "tech",
  "troubleshooting",
  "daily",
  "project",
];

// ✅ 랜덤 추출 헬퍼 함수
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ✅ 날짜 생성 함수
function getRandomDate(index: number): string {
  const day = String((index % 28) + 1).padStart(2, "0");
  return `2025.03.${day}`;
}

// ✅ 더미 게시글 생성 함수
function generateDummyPosts(count: number): Post[] {
  return Array.from({ length: count }, (_, i) => {
    const id = `${i + 1}`;
    const title = getRandomItem(titles);
    const category = getRandomItem(categories);
    const date = getRandomDate(i + 1);

    return {
      id,
      title: `${title} #${id}`,
      category,
      date,
      content: `${title}에 대한 상세 내용입니다.\n이 글은 테스트용으로 생성된 ${category} 글입니다.`,
    };
  });
}

// ✅ 최종 export
export const myPageDummyPosts: Post[] = generateDummyPosts(50);
