import { useSearchParams, useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useUserStore } from "../../../../stores/useUserStore";
import { useMyPagePosts } from "../../../../hooks/useMyPagePosts";

const postsPerPage = 6;

export default function MyPageSearchResult() {
  const [params] = useSearchParams();
  const { username } = useParams<{ username: string }>();
  const keyword = params.get("keyword")?.toLowerCase() ?? "";
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"latest" | "oldest">("latest");
  const [selectedCategory, setSelectedCategory] = useState("");

  const user = useUserStore((state) => state.user);
  const { posts, loading } = useMyPagePosts(user?.uid || "");

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, sortOption, selectedCategory]);

  const categoryOptions = user?.categoryLabels
    ? Object.entries(user.categoryLabels).map(([key, label]) => ({
        value: key,
        label,
      }))
    : [];

  const filteredPosts = useMemo(() => {
    let list = posts;

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (keyword) {
      list = list.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword)
      );
    }

    list = [...list].sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return sortOption === "latest" ? timeB - timeA : timeA - timeB;
    });

    return list;
  }, [posts, keyword, selectedCategory, sortOption]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    .map((post) => ({
      ...post,
      date: post.createdAt?.toDate().toLocaleDateString("ko-KR") || "",
    }));

  const highlightKeyword = (text: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === keyword ? (
        <mark key={i} className="text-indigo-300 bg-transparent font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

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

      <div className="flex flex-wrap gap-4 items-center text-sm">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as "latest" | "oldest")}
          className="select select-sm bg-[#1f2937] text-white border-white/10"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-sm bg-[#1f2937] text-white border-white/10"
        >
          <option value="">전체 카테고리</option>
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {!loading && currentPosts.length > 0 ? (
        <ul className="space-y-3 text-sm text-gray-300">
          {currentPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/mypage/${username}/post/${post.id}`}
                className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-300 hover:text-indigo-300 transition"
              >
                <span className="truncate">{highlightKeyword(post.title)}</span>
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
