// src/components/pages/write/PostWriteForm.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { communityDummyPosts } from "../../../data/communityDummyPosts";

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

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // ✅ 수정 모드일 때 기존 글 데이터 불러오기
  useEffect(() => {
    if (!isEditMode) return;

    const existingPost = communityDummyPosts.find((p) => p.id === postId);
    if (existingPost) {
      setTitle(existingPost.title);
      setCategory(existingPost.category);
      setContent(existingPost.content);
    }
  }, [isEditMode, postId]);

  // ✅ 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      id: postId,
      title,
      category,
      content,
    };

    if (isEditMode) {
      console.log("🛠 수정된 글:", formData);
    } else {
      console.log("📝 새 글 작성됨:", formData);
    }

    // TODO: Firestore 저장 또는 업데이트 로직
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제목 */}
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

      {/* 카테고리 */}
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

      {/* 내용 */}
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

      {/* 제출 */}
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? "수정 완료" : "작성 완료"}
        </button>
      </div>
    </form>
  );
}
