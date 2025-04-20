import { useNavigate, useOutletContext } from "react-router-dom";
import { PenLine } from "lucide-react";

import MyIntroBanner from "./MyIntroBanner";
import MyPostList from "./MyPostList";
import MyGuestbookList from "./MyGuestbookList";
import MyQuickLinksPanel from "./MyQuickLinksPanel";

import { myPageDummyPosts } from "../../../data/MyPageDummyPosts";
import type { QuickLink } from "./MyQuickLinksPanel";

interface OutletContext {
  username: string;
  quickLinks: QuickLink[];
}

export default function MyPageHome() {
  const navigate = useNavigate();
  const { quickLinks, username } = useOutletContext<OutletContext>();

  const recentPosts = myPageDummyPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">마이페이지</h2>
        <button
          onClick={() => navigate(`/mypage/${username}/write`)}
          className="btn btn-outline btn-sm inline-flex items-center gap-1 border-white/20 text-white transition hover:text-indigo-300 hover:border-indigo-300"
        >
          <PenLine className="w-4 h-4" />
          글쓰기
        </button>
      </div>

      <MyIntroBanner
        interest="취업"
        book="모던 자바스크립트 Deep Dive"
        goal="한 줄 커밋이라도 하기"
      />

      <MyPostList posts={recentPosts} />
      <MyGuestbookList username={username} />
      <MyQuickLinksPanel links={quickLinks} />
    </div>
  );
}
