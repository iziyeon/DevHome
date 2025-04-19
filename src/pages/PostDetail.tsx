import { useParams, useNavigate } from "react-router-dom";
import { PenLine, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

import { communityDummyPosts } from "../data/CommunityDummyPosts";
import { commentDummy, Comment } from "../data/commentDummy";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUserNickname = "yeon";

  const post = communityDummyPosts.find((p) => p.id === id);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    console.log("🟡 현재 게시글 ID:", id);

    if (!id) {
      console.warn("⚠️ postId가 없습니다.");
      setComments([]);
      return;
    }

    const data = commentDummy[id];
    if (data) {
      setComments(data);
      console.log("✅ 댓글 불러오기 성공:", data);
    } else {
      setComments([]);
      console.warn("❌ 댓글 없음:", id);
    }
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
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

      {/* 본문 */}
      <div className="prose prose-invert text-white whitespace-pre-wrap">
        {post.content}
      </div>

      {/* 수정/삭제 버튼 */}
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

      {/* 뒤로가기 */}
      <div className="mt-10">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline text-white border-gray-500 hover:border-white"
        >
          ← 뒤로가기
        </button>
      </div>

      {/* 💬 댓글 영역 */}
      <div className="mt-16 space-y-6 animate-fade-in">
        <h2 className="text-xl font-bold text-white">
          💬 댓글 {comments.length}개
        </h2>

        {/* 댓글 목록 */}
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
              <div className="flex justify-between items-start">
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
                        className="btn btn-outline btn-xs text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition"
                      >
                        저장
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditText(comment.content);
                        }}
                        className="btn btn-outline btn-xs text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition"
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
                      className="btn btn-outline btn-xs text-white border-white/20 hover:border-red-400 hover:text-red-400 transition"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>

              {/* 댓글 내용 */}
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

        {/* 댓글 작성 폼 */}
        <form onSubmit={handleCommentSubmit} className="space-y-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="textarea textarea-bordered w-full bg-[#1f2937] text-white placeholder-white/40"
            rows={4}
            required
          />
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary btn-sm">
              댓글 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
