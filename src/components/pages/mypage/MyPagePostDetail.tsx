import { useParams } from "react-router-dom";
import { myPageDummyPosts } from "../../../data/MyPageDummyPosts";
import { PenLine, Trash2 } from "lucide-react";

export default function MyPagePostDetail() {
  const { id } = useParams<{ id: string }>();
  const post = myPageDummyPosts.find((p) => p.id === id);

  const isAuthor = true;

  if (!post) {
    return (
      <div className="py-20 text-center text-white">
        해당 게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-14 text-white animate-fade-in space-y-10">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <div className="text-sm text-gray-400">{post.date}</div>
      </div>

      <div className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
        {post.content}
      </div>

      {isAuthor && (
        <div className="flex justify-end gap-3 text-sm">
          <button className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition inline-flex items-center gap-1">
            <PenLine className="w-4 h-4" />
            수정
          </button>
          <button className="btn btn-outline btn-sm border-white/20 text-white hover:border-rose-400 hover:text-rose-400 transition inline-flex items-center gap-1">
            <Trash2 className="w-4 h-4" />
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
