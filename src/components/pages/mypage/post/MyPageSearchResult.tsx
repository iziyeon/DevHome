import { useSearchParams, useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useUserStore } from "../../../../stores/useUserStore";
import { useMyPagePosts } from "../../../../hooks/useMyPagePosts";

const postsPerPage = 6;

export default function MyPageSearchResult() {
  const [params] = useSearchParams();
  const { username } = useParams<{ username: string }>();
  const keyword = params.get("keyword")?.toLowerCase() ?? "";
  const [currentPage, setCurrentPage] = useState(1);

  const user = useUserStore((state) => state.user);
  const { posts, loading } = useMyPagePosts(user?.uid || "");

  const filteredPosts = useMemo(() => {
    if (!keyword) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
    );
  }, [posts, keyword]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    .map((post) => ({
      ...post,
      date: post.createdAt?.toDate().toLocaleDateString("ko-KR") || "",
    }));

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  if (!user?.uid) {
    return (
      <p className="text-sm text-gray-400 py-10 text-center">
        유저 정보를 불러오는 중입니다...
      </p>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-2">
        <Search size={20} className="text-indigo-300" />
        <span>
          "{keyword}" 검색 결과{" "}
          <span className="text-indigo-300 font-semibold">
            {filteredPosts.length}건
          </span>
        </span>
      </h2>

      {!loading && currentPosts.length > 0 ? (
        <ul className="space-y-3 text-sm text-gray-300">
          {currentPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/mypage/${username}/post/${post.id}`}
                className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-300 hover:text-indigo-300 transition"
              >
                <span className="truncate">{post.title}</span>
                <span className="ml-4 shrink-0 text-xs text-gray-400">
                  {post.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p className="text-sm text-gray-400">
            검색 결과가 없습니다. 다른 키워드로 검색해보세요.
          </p>
        )
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline text-white border-white/20 disabled:opacity-40"
          >
            이전
          </button>
          <span className="text-sm text-gray-300 pt-[7px]">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline text-white border-white/20 disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
