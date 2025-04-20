import { useNavigate, useParams } from "react-router-dom";
import { PenLine, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { myPageDummyPosts } from "../../../../data/MyPageDummyPosts";
import {
  myPageCommentDummy,
  Comment as MyPageComment,
} from "../../../../data/myPageCommentDummy";

export default function MyPagePostDetail() {
  const { id, username } = useParams<{ id: string; username: string }>();
  const navigate = useNavigate();

  const currentUserNickname = "yeon";
  const post = myPageDummyPosts.find((p) => p.id === id);
  const initialComments = id ? myPageCommentDummy[id] || [] : [];

  const [comments, setComments] = useState<MyPageComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    setComments(initialComments);
  }, [id]);

  const handleDeletePost = () => {
    if (confirm("정말로 삭제하시겠습니까?") && post) {
      console.log(`🗑 글 삭제됨: ${post.id}`);
      navigate(`/mypage/${username}`);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: MyPageComment = {
      id: Math.random().toString(36).slice(2, 9),
      author: currentUserNickname,
      content: commentText,
      date: new Date().toISOString().slice(0, 10),
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  if (!post) {
    return (
      <div className="text-center text-gray-400 py-20">
        해당 게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 text-white">
      <span className="badge badge-outline text-indigo-300 border-indigo-300 mb-4">
        #{post.category}
      </span>

      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

      <div className="text-sm text-gray-400 mb-8">
        {currentUserNickname} · {post.date}
      </div>

      <div className="prose prose-invert whitespace-pre-wrap">
        {post.content || "내용이 없습니다."}
      </div>

      <div className="flex flex-wrap gap-2 justify-end mt-8">
        <button
          onClick={() => navigate(`/mypage/${username}/write?id=${post.id}`)}
          className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition inline-flex items-center gap-1"
        >
          <PenLine size={16} />
          수정
        </button>
        <button
          onClick={handleDeletePost}
          className="btn btn-outline btn-sm border-white/20 text-white hover:border-red-400 hover:text-red-400 transition inline-flex items-center gap-1"
        >
          <Trash2 size={16} />
          삭제
        </button>
      </div>

      <div className="mt-10">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
        >
          ← 뒤로가기
        </button>
      </div>

      <div className="mt-16 space-y-6 animate-fade-in">
        <h2 className="text-xl font-bold text-white">
          💬 댓글 {comments.length}개
        </h2>

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg bg-[#1f2937] border border-gray-600 text-sm text-white opacity-100 animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="font-semibold text-indigo-300">
                  {comment.author}
                </div>

                {comment.author === currentUserNickname && (
                  <div className="flex gap-2">
                    {editingId === comment.id ? (
                      <button
                        onClick={() => {
                          setComments((prev) =>
                            prev.map((c) =>
                              c.id === editingId
                                ? { ...c, content: editText }
                                : c
                            )
                          );
                          setEditingId(null);
                          setEditText("");
                        }}
                        className="btn btn-outline btn-xs border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
                      >
                        저장
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditText(comment.content);
                        }}
                        className="btn btn-outline btn-xs border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
                      >
                        수정
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm("정말로 삭제하시겠습니까?")) {
                          setComments((prev) =>
                            prev.filter((c) => c.id !== comment.id)
                          );
                        }
                      }}
                      className="btn btn-outline btn-xs border-white/20 text-white hover:border-red-400 hover:text-red-400 transition"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>

              {editingId === comment.id ? (
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="mt-2 w-full bg-[#1f2937] text-white border border-white/10 rounded px-2 py-1 text-sm"
                />
              ) : (
                <div className="mt-2 whitespace-pre-wrap">
                  {comment.content}
                </div>
              )}

              <div className="text-gray-400 text-xs mt-2">{comment.date}</div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleCommentSubmit}
          className="space-y-2 animate-fade-in delay-200"
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="textarea textarea-bordered w-full bg-[#1f2937] text-white placeholder-white/40"
            rows={4}
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
            >
              댓글 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
