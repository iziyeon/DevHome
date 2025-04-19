import { useParams } from "react-router-dom";
import { communityDummyPosts } from "../data/communityDummyPosts";

export default function PostDetail() {
  const { id } = useParams();
  const post = communityDummyPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center text-gray-400 py-20">
        해당 게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* 카테고리 */}
      <span className="badge badge-outline text-indigo-300 border-indigo-300 mb-4">
        #{post.category}
      </span>

      {/* 제목 */}
      <h1 className="text-3xl font-bold text-white mb-3">{post.title}</h1>

      {/* 작성자 정보 */}
      <div className="text-sm text-gray-400 mb-8">
        by {post.author} · {post.date} · {post.readTime}
      </div>

      {/* 본문 내용 */}
      <div className="prose prose-invert text-white whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
}
