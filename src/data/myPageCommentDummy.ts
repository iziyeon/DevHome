// src/data/myPageCommentDummy.ts

// 타입 정의
export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

// 게시글별 댓글 더미 데이터
export const myPageCommentDummy: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: "yeon",
      content: "첫 댓글 테스트입니다!",
      date: "2025-04-21",
    },
    {
      id: "c2",
      author: "luna",
      content: "이 글 너무 공감돼요. 잘 보고 갑니다 :)",
      date: "2025-04-21",
    },
  ],
  "2": [
    {
      id: "c3",
      author: "junebug",
      content: "기억해야 할 내용이네요. 감사합니다!",
      date: "2025-04-22",
    },
  ],
};
