import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { PenLine } from "lucide-react";
import MyIntroBanner from "./MyIntroBanner";
import MyPostList from "./MyPostList";
import MyGuestbookList from "../guestbook/MyGuestbookList";
import MyQuickLinksPanel from "../quicklinks/MyQuickLinksPanel";
import { useUserStore } from "../../../../stores/useUserStore";
import { useMyPagePosts } from "../../../../hooks/useMyPagePosts";
import { useMemo } from "react";

interface OutletContext {
  username: string;
}

export default function MyPageHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useOutletContext<OutletContext>();
  const user = useUserStore((state) => state.user);
  const intro = user?.intro;

  const searchParam = new URLSearchParams(location.search).get("search");
  const { posts, loading } = useMyPagePosts(user?.uid || "");

  const filteredPosts = useMemo(() => {
    if (!user?.uid) return [];
    const keyword = searchParam?.toLowerCase() || "";
    return posts
      .filter((post) => {
        if (!keyword) return true;
        return (
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword)
        );
      })
      .slice(0, 5)
      .map((post) => ({
        ...post,
        date: post.createdAt?.toDate().toLocaleDateString("ko-KR") || "",
      }));
  }, [posts, searchParam, user?.uid]);

  if (!user?.uid) {
    return (
      <p className="text-sm text-gray-400 py-10 text-center">
        유저 정보를 불러오는 중입니다...
      </p>
    );
  }

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

      {intro && (
        <MyIntroBanner
          interest={intro.interest}
          book={intro.book}
          goal={intro.goal}
        />
      )}

      {!loading && filteredPosts.length > 0 && (
        <MyPostList posts={filteredPosts} />
      )}

      {!loading && filteredPosts.length === 0 && (
        <p className="text-sm text-gray-400">작성한 글이 없습니다.</p>
      )}

      <MyGuestbookList username={username} />

      <MyQuickLinksPanel />
    </div>
  );
}
