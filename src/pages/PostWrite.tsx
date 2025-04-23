// src/pages/PostWrite.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FilePlus } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { savePostToFirestore } from "../services/firestore/posts";

const categoryOptions = [
  { value: "기능구현팁", label: "기능구현팁" },
  { value: "라이브러리추천", label: "라이브러리추천" },
  { value: "프로젝트공유", label: "프로젝트공유" },
  { value: "포트폴리오공유", label: "포트폴리오공유" },
  { value: "면접후기", label: "면접후기" },
  { value: "커리어토크", label: "커리어토크" },
  { value: "공지사항", label: "공지사항" },
];

export default function PostWrite() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const isEditMode = Boolean(postId);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!isEditMode) return;
    // TODO: 글 수정 시 Firestore에서 기존 데이터 불러오기 (아직은 dummy)
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
      isMyPagePost: false,
    });

    navigate(`/community/post/${savedId}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
          <FilePlus size={20} />
          {isEditMode ? "글 수정하기" : "글쓰기"}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
        >
          목록
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm text-gray-300">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="제목을 입력하세요"
            className="input input-bordered w-full bg-[#1f2937] text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="select select-bordered w-full bg-[#1f2937] text-white"
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
          <label className="mb-2 block text-sm text-gray-300">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="내용을 입력하세요"
            rows={12}
            className="textarea textarea-bordered w-full bg-[#1f2937] text-white"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-sm btn-outline border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
          >
            {isEditMode ? "수정 완료" : "작성 완료"}
          </button>
        </div>
      </form>
    </div>
  );
}
