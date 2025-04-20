import { useSearchParams, useNavigate } from "react-router-dom";
import { communityDummyPosts } from "../../../data/CommunityDummyPosts";

const POSTS_PER_PAGE = 12;

export default function CommunityPostGrid() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "전체";
  const sort = searchParams.get("sort") || "desc";

  const filteredPosts =
    category === "전체"
      ? communityDummyPosts
      : communityDummyPosts.filter((post) => post.category === category);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return sort === "asc"
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date);
  });

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  return (
    <div className="flex flex-col justify-between min-h-[600px] space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
        {currentPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            className="w-full text-left rounded-xl bg-white/5 border border-white/10 p-4 text-white hover:text-indigo-300 hover:border-indigo-300 transition"
          >
            <p className="font-semibold truncate">{post.title}</p>
            <p className="text-xs text-gray-400 mt-1">{post.date}</p>
          </button>
        ))}
      </div>

      {currentPosts.length === 0 && (
        <div className="text-gray-400 text-center py-16">
          게시글이 없습니다.
        </div>
      )}

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
