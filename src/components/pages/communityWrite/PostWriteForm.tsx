// src/components/pages/write/PostWriteForm.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useUserStore } from "../../../stores/useUserStore";
import { savePostToFirestore } from "../../../services/firestore/posts";

const categoryOptions = [
  "기능구현팁",
  "라이브러리추천",
  "프로젝트공유",
  "포트폴리오공유",
  "면접후기",
  "커리어토크",
  "공지사항",
];

export default function PostWriteForm() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const isEditMode = Boolean(postId);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isEditMode || !postId) return;
      try {
        const ref = doc(db, "communityPosts", postId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setTitle(data.title || "");
          setCategory(data.category || "");
          setContent(data.content || "");
        }
      } catch (err) {
        console.error("❌ 기존 글 불러오기 실패:", err);
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

    try {
      const savedId = await savePostToFirestore({
        id: postId || undefined,
        title,
        category,
        content,
        uid: user.uid,
        nickname: user.nickname,
        isMyPagePost: false,
      });

      navigate(`/community/post/${savedId}`);
    } catch (error) {
      console.error("❌ 게시글 저장 실패:", error);
      alert("글 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm text-gray-300">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full bg-[#1f2937] text-white"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-300">카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full bg-[#1f2937] text-white"
          required
        >
          <option value="" disabled>
            선택해주세요
          </option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-300">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full h-48 bg-[#1f2937] text-white"
          placeholder="내용을 입력하세요"
          required
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? "수정 완료" : "작성 완료"}
        </button>
      </div>
    </form>
  );
}
