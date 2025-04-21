import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { PenLine } from "lucide-react";
import MyIntroBanner from "./MyIntroBanner";
import MyPostList from "./MyPostList";
import MyGuestbookList from "../guestbook/MyGuestbookList";
import MyQuickLinksPanel from "../quicklinks/MyQuickLinksPanel";
import { myPageDummyPosts } from "../../../../data/MyPageDummyPosts";
import type { QuickLink } from "../quicklinks/MyQuickLinksPanel";

interface OutletContext {
  username: string;
  quickLinks: QuickLink[];
}

export default function MyPageHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quickLinks, username } = useOutletContext<OutletContext>();

  const searchParam = new URLSearchParams(location.search).get("search");

  const filteredPosts = myPageDummyPosts
    .filter((post) => {
      if (!searchParam) return true;
      const keyword = searchParam.toLowerCase();
      return (
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">마이페이지</h2>
        <button
          onClick={() => navigate(`/mypage/${username}/write`)}
          className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition inline-flex items-center gap-1"
        >
          <PenLine size={16} />
          글쓰기
        </button>
      </div>

      <MyIntroBanner
        interest="취업"
        book="모던 자바스크립트 Deep Dive"
        goal="한 줄 커밋이라도 하기"
      />

      <MyPostList posts={filteredPosts} />

      <MyGuestbookList username={username} />

      <MyQuickLinksPanel links={quickLinks} />
    </div>
  );
}
