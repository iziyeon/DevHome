import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { FilePlus } from "lucide-react";
import { useUserStore } from "../../../../stores/useUserStore";
import { savePostToFirestore } from "../../../../services/firestore/posts";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function MyPagePostWrite() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const isEditMode = Boolean(postId);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const user = useUserStore((state) => state.user);

  // ✅ 유저의 categoryLabels를 옵션 배열로 변환
  const categoryOptions = useMemo(() => {
    return user?.categoryLabels
      ? Object.entries(user.categoryLabels).map(([value, label]) => ({
          value,
          label,
        }))
      : [];
  }, [user?.categoryLabels]);

  // ✅ 수정 모드일 때 게시글 데이터를 불러옴
  useEffect(() => {
    const fetchPost = async () => {
      if (!isEditMode || !postId) return;
      try {
        const ref = doc(db, "mypagePosts", postId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setTitle(data.title || "");
          setCategory(data.category || "");
          setContent(data.content || "");
        }
      } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
      }
    };

    fetchPost();
  }, [isEditMode, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !user?.nickname) {
      alert("로그인이 필요합니다.");
      return;
    }

    const savedId = await savePostToFirestore({
      id: postId || undefined,
      title,
      category,
      content,
      uid: user.uid,
      nickname: user.nickname,
      isMyPagePost: true,
    });

    navigate(`/mypage/${username}/post/${savedId}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <FilePlus size={20} />
          {isEditMode ? "글 수정하기" : "글쓰기"}
        </h1>
        <button
          onClick={() => navigate(`/mypage/${username}`)}
          className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
        >
          목록
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-1 block text-sm text-gray-300">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="제목을 입력하세요"
            className="input input-bordered w-full bg-[#1f2937] text-white border-white/10 placeholder-white/30"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="select select-bordered w-full bg-[#1f2937] text-white border-white/10"
          >
            <option value="" disabled>
              카테고리를 선택해주세요
            </option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="내용을 입력하세요"
            rows={12}
            className="textarea textarea-bordered w-full bg-[#1f2937] text-white border-white/10 placeholder-white/30"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
          >
            {isEditMode ? "수정 완료" : "작성 완료"}
          </button>
        </div>
      </form>
    </div>
  );
}
