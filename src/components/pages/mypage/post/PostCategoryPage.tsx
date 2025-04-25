import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../../stores/useUserStore";
import { useMyPagePosts } from "../../../../hooks/useMyPagePosts";
import { PenLine } from "lucide-react";

const postsPerPage = 6;

export default function PostCategoryPage() {
  const { categoryKey, username } = useParams<{
    categoryKey: string;
    username: string;
  }>();

  const user = useUserStore((state) => state.user);

  const categoryName =
    (user?.categoryLabels as { [key: string]: string })?.[categoryKey || ""] ||
    categoryKey;

  const [currentPage, setCurrentPage] = useState(1);
  const { posts, loading } = useMyPagePosts(user?.uid || "", categoryKey);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setCurrentPage(1);
  }, [categoryKey]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  if (!categoryName) {
    return (
      <div className="text-center py-20 text-gray-400">
        잘못된 카테고리입니다.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14 text-white animate-fade-in">
      <header className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold border-b border-white/10 pb-2">
          {categoryName}
        </h2>
        <Link
          to={`/mypage/${username}/write`}
          className="btn btn-outline btn-sm text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition inline-flex items-center gap-1"
        >
          <PenLine size={16} />
          글쓰기
        </Link>
      </header>

      {loading ? (
        <p className="text-gray-400">로딩 중...</p>
      ) : currentPosts.length === 0 ? (
        <p className="text-gray-400">해당 카테고리에 글이 없습니다.</p>
      ) : (
        <>
          <ul className="grid sm:grid-cols-2 gap-4">
            {currentPosts.map((post) => (
              <li
                key={post.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm hover:border-indigo-300 transition"
              >
                <Link
                  to={`/mypage/${username}/post/${post.id}`}
                  className="hover:text-indigo-300 transition"
                >
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {post.createdAt?.toDate().toLocaleDateString("ko-KR") || ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-8">
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
        </>
      )}
    </div>
  );
}
