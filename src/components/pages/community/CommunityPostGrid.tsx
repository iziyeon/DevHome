import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useCommunityPosts } from "../../../hooks/useCommunityPosts";

const POSTS_PER_PAGE = 6;

export default function CommunityPostGrid() {
  const location = useLocation();
  const categoryParam =
    new URLSearchParams(location.search).get("category") || undefined;
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, loading } = useCommunityPosts(categoryParam);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(1); // 새로운 카테고리 클릭 시 페이지도 초기화
  }, [location.key]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white animate-fade-in space-y-8">
      {categoryParam && (
        <h2 className="text-xl font-bold border-b border-white/10 pb-2">
          #{categoryParam}
        </h2>
      )}

      {loading ? (
        <p className="text-gray-400">로딩 중...</p>
      ) : paginatedPosts.length === 0 ? (
        <p className="text-gray-400">해당 카테고리에 작성된 글이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedPosts.map((post) => (
            <li
              key={post.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm hover:border-indigo-300 transition"
            >
              <Link
                to={`/community/post/${post.id}`}
                className="hover:text-indigo-300"
              >
                <p className="font-medium truncate">{post.title}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {post.createdAt?.toDate().toLocaleDateString("ko-KR") ||
                    "날짜 없음"}
                  {post.readTime && ` · ${post.readTime}`}
                </p>
              </Link>
            </li>
          ))}
        </ul>
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
