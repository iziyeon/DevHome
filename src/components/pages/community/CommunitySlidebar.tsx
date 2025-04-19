// src/components/pages/community/CommunitySlidebar.tsx
import { Search, Tag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface CommunitySlidebarProps {
  onCategoryClick?: () => void;
}

const CATEGORY_GROUPS: Record<string, string[]> = {
  "개발 팁 & 구현": ["기능구현팁", "라이브러리추천"],
  "작업물 공유": ["프로젝트공유", "포트폴리오공유"],
  "커리어 & 경험": ["면접후기", "커리어토크"],
  운영: ["공지사항"],
};

export default function CommunitySlidebar({
  onCategoryClick,
}: CommunitySlidebarProps) {
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("category");

  return (
    <aside className="space-y-8 text-white" aria-label="커뮤니티 필터 사이드바">
      {/* 🔍 검색 */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Search size={18} />
          검색
        </h3>
        <input
          type="text"
          name="search"
          aria-label="게시글 검색어 입력"
          placeholder="검색어 입력"
          className="input input-bordered w-full bg-[#1f2937] text-white placeholder-gray-400"
        />
      </div>

      {/* 🏷 카테고리 그룹 */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Tag size={18} />
          카테고리
        </h3>

        <div className="space-y-6">
          {Object.entries(CATEGORY_GROUPS).map(([groupName, categories]) => (
            <section key={groupName}>
              <p className="text-sm text-indigo-300 font-medium mb-2">
                {groupName}
              </p>
              <ul className="space-y-1 text-sm">
                {categories.map((category) => {
                  const isActive = currentCategory === category;

                  return (
                    <li key={category}>
                      <Link
                        to={`/community?category=${encodeURIComponent(
                          category
                        )}`}
                        onClick={onCategoryClick}
                        className={`block text-left hover:underline ${
                          isActive
                            ? "text-indigo-300 font-semibold underline"
                            : ""
                        }`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        # {category}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
