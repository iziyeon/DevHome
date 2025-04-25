import { useParams, useNavigate } from "react-router-dom";
import { PenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc, Timestamp } from "firebase/firestore";
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

export default function MyPagePostDetail() {
  const { id, username } = useParams<{ id: string; username: string }>();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const [post, setPost] = useState<FirestorePost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isOwner = user?.uid && post?.uid && user.uid === post.uid;

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "mypagePosts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data() as FirestorePost);
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

  const handleDelete = async () => {
    if (!user || user.uid !== post?.uid) {
      alert("삭제 권한이 없습니다.");
      return;
    }
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (!ok || !id) return;

    try {
      await deleteDoc(doc(db, "mypagePosts", id));
      navigate(`/mypage/${username}?refresh=${Date.now()}`);
    } catch (error) {
      console.error("❌ 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
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
        {post.updatedAt?.toDate().toLocaleString() ?? "시간 정보 없음"}
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
    </div>
  );
}
