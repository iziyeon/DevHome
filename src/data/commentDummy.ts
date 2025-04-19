export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

// 게시글 ID에 따라 댓글을 분리한 더미 데이터
export const commentDummy: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: "minseo",
      content: "오! 드디어 시작하셨군요 🔥 기대됩니다!",
      date: "2025-04-15",
    },
    {
      id: "c2",
      author: "junebug",
      content:
        "Tailwind 설정 팁 감사합니다 :) 설정 충돌 때문에 고생했는데 큰 도움이 되었어요.",
      date: "2025-04-16",
    },
    {
      id: "c7",
      author: "yeon", // ✅ 테스트용 댓글 (현재 로그인 유저)
      content: "테스트용 댓글입니다. 수정/삭제 버튼이 보일 거예요.",
      date: "2025-04-22",
    },
  ],
  "2": [
    {
      id: "c3",
      author: "luna",
      content: "혹시 프로젝트 깃허브 주소도 공유해주실 수 있나요?",
      date: "2025-04-16",
    },
    {
      id: "c4",
      author: "haein",
      content:
        "글 너무 잘 읽었습니다! 글자 크기나 행간 같은 UI 요소가 눈에 편하네요. 앞으로도 잘 부탁드려요 🙌",
      date: "2025-04-17",
    },
  ],
  "3": [
    {
      id: "c5",
      author: "jinho",
      content: "좋은 정보 감사합니다. 이력서 출력 기능은 정말 신박하네요.",
      date: "2025-04-18",
    },
    {
      id: "c6",
      author: "sally",
      content:
        "댓글 기능도 깔끔하게 잘 되어 있네요!\n\n혹시 향후에 대댓글 기능도 추가 예정인가요?",
      date: "2025-04-18",
    },
  ],
};
