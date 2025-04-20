// src/components/pages/community/CommunitySearchResult.tsx
import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { communityDummyPosts } from "../../../data/CommunityDummyPosts";

export default function CommunitySearchResult() {
  const location = useLocation();
  const keyword =
    new URLSearchParams(location.search).get("keyword")?.toLowerCase() || "";

  const filteredPosts = communityDummyPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
        <Search size={20} />
        <span>
          &quot;{keyword}&quot; 검색 결과{" "}
          <span className="text-indigo-300">{filteredPosts.length}건</span>
        </span>
      </h2>

      {filteredPosts.length > 0 ? (
        <ul className="space-y-2 text-sm text-gray-300">
          {filteredPosts.map((post) => (
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
      ) : (
        <p className="text-center text-gray-400 py-20">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
