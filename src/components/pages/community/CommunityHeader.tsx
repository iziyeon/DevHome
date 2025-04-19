import { PanelRight, Pencil } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface CommunityHeaderProps {
  onOpenSidebar: () => void;
}

export default function CommunityHeader({
  onOpenSidebar,
}: CommunityHeaderProps) {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
      {/* 제목 */}
      <h2 className="text-3xl font-bold text-white">
        {category ? `#${category}` : "Latest posts"}
      </h2>

      {/* 버튼 영역 */}
      <div className="flex items-center gap-2">
        {/* 글쓰기 버튼 */}
        <Link
          to="/write"
          className="btn btn-primary btn-sm flex items-center gap-1"
          aria-label="새 글 쓰기"
        >
          <Pencil size={16} />
          글쓰기
        </Link>

        {/* 모바일 필터 버튼 */}
        <button
          className="btn btn-sm btn-outline text-white lg:hidden"
          onClick={onOpenSidebar}
          aria-label="카테고리 필터 열기"
        >
          <PanelRight size={18} />
          <span className="ml-1"></span>
        </button>
      </div>
    </div>
  );
}
