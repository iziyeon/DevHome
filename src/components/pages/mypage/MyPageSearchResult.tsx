import { useSearchParams } from "react-router-dom";
import { myPageDummyPosts } from "../../../data/MyPageDummyPosts";
import MyPostList from "./MyPostList";
import { Search } from "lucide-react";

export default function MyPageSearchResult() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.toLowerCase() ?? "";

  const getFilteredPosts = (keyword: string) => {
    if (!keyword) return [];

    return myPageDummyPosts
      .filter(
        (post) =>
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const filteredPosts = getFilteredPosts(keyword);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Search size={20} />
        <span>
          "{keyword}" 검색 결과{" "}
          <span className="text-indigo-300 font-semibold">
            {filteredPosts.length}건
          </span>
        </span>
      </h2>

      {filteredPosts.length > 0 ? (
        <MyPostList posts={filteredPosts} title="" />
      ) : (
        <p className="text-sm text-gray-400">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
