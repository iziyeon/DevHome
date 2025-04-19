import { Link, useNavigate, useParams } from "react-router-dom";
import { PenLine, FileText, FolderOpen } from "lucide-react";

import MyIntroBanner from "./MyIntroBanner";
import MyPostList from "./MyPostList";
import MyGuestbookList from "./MyGuestbookList";
import MyQuickLinksPanel from "./MyQuickLinksPanel";
import { myPageDummyPosts } from "../../../data/MyPageDummyPosts";

export default function MyPageHome() {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">마이페이지</h2>
        <Link
          to={`/mypage/${username}/write`}
          className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition inline-flex items-center gap-1"
        >
          <PenLine className="w-4 h-4" />
          글쓰기
        </Link>
      </div>

      <MyIntroBanner
        interest="취업"
        book="모던 자바스크립트 Deep Dive"
        goal="한 줄 커밋이라도 하기"
      />

      <MyPostList
        posts={myPageDummyPosts
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 5)}
      />

      <MyGuestbookList username="yeon" />

      <MyQuickLinksPanel
        links={[
          {
            label: "이력서 보기",
            icon: FileText,
            onClick: () => navigate("/resume"),
          },
          {
            label: "내 프로젝트 보기",
            icon: FolderOpen,
            onClick: () => navigate("/projects"),
          },
        ]}
      />
    </div>
  );
}
