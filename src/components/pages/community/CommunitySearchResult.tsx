import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";
import { communityDummyPosts } from "../../../data/CommunityDummyPosts";

const postsPerPage = 6;

export default function CommunitySearchResult() {
  const location = useLocation();
  const keyword =
    new URLSearchParams(location.search).get("keyword")?.toLowerCase() || "";
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = communityDummyPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
        <Search size={20} />
        <span>
          &quot;{keyword}&quot; 검색 결과{" "}
          <span className="text-indigo-300">{filteredPosts.length}건</span>
        </span>
      </h2>

      {currentPosts.length > 0 ? (
        <>
          <ul className="space-y-2 text-sm text-gray-300">
            {currentPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/posts/${post.id}`}
                  className="hover:text-indigo-300 transition"
                >
                  {post.title}
                  <span className="ml-2 text-xs text-white/40">
                    - {post.date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

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
        </>
      ) : (
        <p className="text-center text-gray-400 py-20">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
