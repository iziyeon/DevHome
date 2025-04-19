import { useSearchParams, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import { communityDummyPosts } from "../../../data/CommunityDummyPosts";

const POSTS_PER_PAGE = 6;

export default function CommunityPostGrid() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "전체";
  const sort = searchParams.get("sort") || "desc";

  // 카테고리 필터링
  const filteredPosts =
    category === "전체"
      ? communityDummyPosts
      : communityDummyPosts.filter((post) => post.category === category);

  // 정렬 처리
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return sort === "asc"
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date);
  });

  // 페이지 분할
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  return (
    <div className="flex flex-col justify-between min-h-[600px] space-y-8">
      {/* 게시글 카드 그리드 */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {/* 게시글이 없을 때 */}
      {currentPosts.length === 0 && (
        <div className="text-gray-400 text-center py-16">
          게시글이 없습니다.
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2 pt-8 mt-auto">
        {Array.from({ length: totalPages }, (_, i) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set("page", String(i + 1));

          return (
            <button
              key={i}
              onClick={() => navigate(`?${newParams.toString()}`)}
              className={`btn btn-sm ${
                page === i + 1
                  ? "btn-primary text-white"
                  : "btn-outline border-gray-500 text-white"
              }`}
              aria-label={`페이지 ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
