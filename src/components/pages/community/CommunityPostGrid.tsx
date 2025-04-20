// src/components/pages/community/CommunityPostGrid.tsx

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  communityDummyPosts,
  POSTS_PER_PAGE,
} from "../../../data/CommunityDummyPosts";

export default function CommunityPostGrid() {
  const location = useLocation();
  const categoryParam = new URLSearchParams(location.search).get("category");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = categoryParam
    ? communityDummyPosts.filter((post) => post.category === categoryParam)
    : communityDummyPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white animate-fade-in space-y-8">
      {categoryParam && (
        <h2 className="text-xl font-bold border-b border-white/10 pb-2">
          #{categoryParam}
        </h2>
      )}

      {paginatedPosts.length === 0 ? (
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
                  {post.date} · {post.readTime}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-1 sm:gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1
                  ? "btn-primary text-white"
                  : "btn-outline border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
