import { Link, useParams } from "react-router-dom";
import { myPageDummyPosts, Post } from "../../../data/MyPageDummyPosts";
import { PenLine } from "lucide-react";

const categoryMap: Record<string, string> = {
  tech: "기술 노트",
  troubleshooting: "트러블슈팅",
  daily: "Daily",
  project: "프로젝트",
};

export default function PostCategoryPage() {
  const { categoryKey, username } = useParams<{
    categoryKey: string;
    username: string;
  }>();

  const isValidCategory = categoryKey && categoryMap[categoryKey];
  const filteredPosts = isValidCategory
    ? myPageDummyPosts.filter((post) => post.category === categoryKey)
    : [];

  if (!isValidCategory) {
    return (
      <div className="text-center py-10 text-white">잘못된 카테고리입니다.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 text-white animate-fade-in">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold border-b border-white/10 pb-2">
          {categoryMap[categoryKey]} 글 목록
        </h2>

        <Link
          to="/mypage/write"
          className="btn btn-outline btn-sm text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition inline-flex items-center gap-1"
        >
          <PenLine className="w-4 h-4" />
          글쓰기
        </Link>
      </header>

      {renderPostList(filteredPosts, username!)}
    </div>
  );
}

function renderPostList(posts: Post[], username: string) {
  if (posts.length === 0) {
    return <p className="text-gray-400">해당 카테고리에 글이 없습니다.</p>;
  }

  return (
    <ul className="grid sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm hover:border-indigo-300 transition"
        >
          <Link
            to={`/mypage/${username}/post/${post.id}`}
            className="hover:text-indigo-300"
          >
            <p className="font-medium">{post.title}</p>
            <p className="text-xs text-gray-400 mt-1">{post.date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
