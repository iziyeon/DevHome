import { useParams, useNavigate } from "react-router-dom";
import { PenLine, Trash2, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  deleteDoc,
  Timestamp,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useUserStore } from "../../../../stores/useUserStore";

interface FirestorePost {
  title: string;
  category: string;
  content: string;
  nickname: string;
  uid: string;
  updatedAt?: Timestamp;
  createdAt?: Timestamp;
}

interface CommentData {
  id: string;
  uid: string;
  nickname: string;
  content: string;
  createdAt: Timestamp;
}

export default function MyPagePostDetail() {
  const { id, username } = useParams<{ id: string; username: string }>();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const [post, setPost] = useState<FirestorePost | null>(null);
  const [loading, setLoading] = useState(true);
  const isOwner = user?.uid && post?.uid && user.uid === post.uid;

  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const ref = doc(db, "mypagePosts", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPost(snap.data() as FirestorePost);
        } else {
          setPost(null);
        }
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const ref = collection(db, "mypagePosts", id, "comments");
    const q = query(ref, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<CommentData, "id">),
      }));
      setComments(data);
    });
    return () => unsubscribe();
  }, [id]);

  const handleDelete = async () => {
    if (!user || user.uid !== post?.uid) {
      alert("삭제 권한이 없습니다.");
      return;
    }
    if (!id) return;
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (!ok) return;
    await deleteDoc(doc(db, "mypagePosts", id));
    navigate(`/mypage/${username}?refresh=${Date.now()}`);
  };

  const handleCommentSubmit = async () => {
    if (!user?.uid || !user?.nickname || !commentInput.trim() || !id) return;
    const ref = collection(db, "mypagePosts", id, "comments");
    await addDoc(ref, {
      uid: user.uid,
      nickname: user.nickname,
      content: commentInput.trim(),
      createdAt: Timestamp.now(),
    });
    setCommentInput("");
  };

  const handleCommentEdit = (comment: CommentData) => {
    setEditId(comment.id);
    setEditContent(comment.content);
  };

  const handleCommentSave = async (commentId: string) => {
    if (!id || !editContent.trim()) return;
    const ref = doc(db, "mypagePosts", id, "comments", commentId);
    await updateDoc(ref, {
      content: editContent.trim(),
    });
    setEditId(null);
    setEditContent("");
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!id) return;
    const ok = confirm("댓글을 삭제하시겠습니까?");
    if (!ok) return;
    const ref = doc(db, "mypagePosts", id, "comments", commentId);
    await deleteDoc(ref);
  };

  if (loading) {
    return <div className="text-center text-white py-20">로딩 중...</div>;
  }

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
        {post.nickname} ·{" "}
        {post.updatedAt?.toDate().toLocaleString("ko-KR") ?? "시간 정보 없음"}
      </div>
      <div className="prose prose-invert whitespace-pre-wrap">
        {post.content || "내용이 없습니다."}
      </div>

      {isOwner && (
        <div className="flex flex-wrap gap-2 justify-end mt-8">
          <button
            onClick={() => navigate(`/mypage/${username}/write?id=${id}`)}
            className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition inline-flex items-center gap-1"
          >
            <PenLine size={16} />
            수정
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-sm border-white/20 text-white hover:border-red-400 hover:text-red-400 transition inline-flex items-center gap-1"
          >
            <Trash2 size={16} />
            삭제
          </button>
        </div>
      )}

      <div className="mt-12 space-y-6">
        <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
          댓글 {comments.length > 0 ? `(${comments.length})` : ""}
        </h2>

        {comments.length === 0 && (
          <p className="text-gray-400 text-sm">아직 댓글이 없습니다.</p>
        )}

        {comments.map((comment) => {
          const isMine = user?.uid === comment.uid;
          const isEditing = editId === comment.id;
          return (
            <div
              key={comment.id}
              className="border border-white/10 bg-white/5 p-4 rounded-lg text-sm text-white space-y-2"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-indigo-300">
                  {comment.nickname}
                </span>
                <span className="text-gray-400 text-xs">
                  {comment.createdAt.toDate().toLocaleString("ko-KR")}
                </span>
              </div>

              {isEditing ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="textarea textarea-bordered w-full bg-[#1f2937] text-white"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditContent("");
                      }}
                      className="btn btn-xs border-white/20 hover:border-gray-400 hover:text-gray-400"
                    >
                      <X size={14} />
                      취소
                    </button>
                    <button
                      onClick={() => handleCommentSave(comment.id)}
                      className="btn btn-xs border-white/20 hover:border-indigo-300 hover:text-indigo-300"
                    >
                      저장
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  {isMine && (
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => handleCommentEdit(comment)}
                        className="btn btn-outline btn-xs border-white/20 text-white hover:text-indigo-300 hover:border-indigo-300"
                      >
                        <Pencil size={14} />
                        수정
                      </button>
                      <button
                        onClick={() => handleCommentDelete(comment.id)}
                        className="btn btn-outline btn-xs border-white/20 text-white hover:text-red-400 hover:border-red-400"
                      >
                        <Trash2 size={14} />
                        삭제
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        <div className="space-y-2 mt-6">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요"
            rows={3}
            className="textarea textarea-bordered w-full bg-[#1f2937] text-white placeholder-white/40"
          />
          <div className="text-right">
            <button
              onClick={handleCommentSubmit}
              className="btn btn-sm btn-outline border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300"
            >
              댓글 작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
