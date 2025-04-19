import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FilePlus } from "lucide-react";
import { myPageDummyPosts } from "../../../data/MyPageDummyPosts";

const categoryOptions = [
  { value: "tech", label: "기술 노트" },
  { value: "troubleshooting", label: "트러블슈팅" },
  { value: "daily", label: "Daily" },
  { value: "project", label: "프로젝트" },
];

export default function MyPagePostWrite() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const isEditMode = Boolean(postId);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isEditMode) return;
    const existingPost = myPageDummyPosts.find((p) => p.id === postId);
    if (existingPost) {
      setTitle(existingPost.title);
      setCategory(existingPost.category);
      setContent(existingPost.content || "");
    }
  }, [isEditMode, postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { id: postId || "new", title, category, content };

    if (isEditMode) {
      console.log("마이페이지 글 수정됨:", formData);
    } else {
      console.log("마이페이지 글 작성됨:", formData);
    }

    navigate(-1);
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
        {/* 제목 입력 */}
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

        {/* 카테고리 선택 */}
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

        {/* 내용 작성 */}
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

        {/* 작성 or 수정 버튼 */}
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
