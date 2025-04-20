// src/components/pages/write/PostWriteForm.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { communityDummyPosts } from "../data/CommunityDummyPosts";

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

  useEffect(() => {
    if (!isEditMode) return;
    const existingPost = communityDummyPosts.find((p) => p.id === postId);
    if (existingPost) {
      setTitle(existingPost.title);
      setCategory(existingPost.category);
      setContent(existingPost.content);
    }
  }, [isEditMode, postId]);

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 px-4 sm:px-6 max-w-2xl mx-auto"
    >
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
          className="textarea textarea-bordered w-full min-h-[200px] bg-[#1f2937] text-white"
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
