// src/components/pages/community/CommunityHeader.tsx
import { PanelRight } from "lucide-react";
import { useLocation } from "react-router-dom";

interface CommunityHeaderProps {
  onOpenSidebar: () => void;
}

export default function CommunityHeader({
  onOpenSidebar,
}: CommunityHeaderProps) {
  const location = useLocation();
  const isSearchPage = location.pathname === "/community/search";
  const isPostDetailPage = location.pathname.startsWith("/community/post/");
  const isWritePage = location.pathname === "/community/write";

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6">
      {!isSearchPage && !isPostDetailPage && !isWritePage && (
        <button
          className="btn btn-sm btn-outline text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition flex items-center gap-1 lg:hidden"
          onClick={onOpenSidebar}
          aria-label="사이드바 열기"
        >
          <PanelRight size={18} />
          카테고리
        </button>
      )}
    </div>
  );
}
