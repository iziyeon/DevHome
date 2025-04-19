import { useParams, useNavigate } from "react-router-dom";
import { PenLine, Trash2 } from "lucide-react";
import { communityDummyPosts } from "../data/communityDummyPosts";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <span className="badge badge-outline text-indigo-300 border-indigo-300 mb-4">
        #{post.category}
      </span>

      <h1 className="text-3xl font-bold text-white mb-3">{post.title}</h1>

      <div className="text-sm text-gray-400 mb-8">
        by {post.author} · {post.date} · {post.readTime}
      </div>

      <div className="prose prose-invert text-white whitespace-pre-wrap">
        {post.content}
      </div>

      {/* ✏️ 수정 / 삭제 버튼 */}
      <div className="flex gap-2 justify-end mt-8">
        <button
          onClick={() => navigate(`/write?id=${post.id}`)}
          className="btn btn-sm btn-outline text-white border-gray-500 hover:border-white flex items-center gap-1"
        >
          <PenLine size={16} />
          수정
        </button>
        <button
          onClick={() => {
            const confirmDelete = confirm("정말로 삭제하시겠습니까?");
            if (confirmDelete) {
              console.log(`게시글 ${post.id} 삭제됨`);
              navigate("/community");
            }
          }}
          className="btn btn-sm btn-error text-white flex items-center gap-1"
        >
          <Trash2 size={16} />
          삭제
        </button>
      </div>

      {/* 🔙 뒤로가기 */}
      <div className="mt-10">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline text-white border-gray-500 hover:border-white"
        >
          ← 뒤로가기
        </button>
      </div>
    </div>
  );
}
