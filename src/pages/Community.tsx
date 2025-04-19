import { useState } from "react";
import CommunityHeader from "../components/pages/community/CommunityHeader";
import CommunitySidebarDrawer from "../components/pages/community/CommunitySidebarDrawer";
import CommunityPostGrid from "../components/pages/community/CommunityPostGrid";
import CommunitySlidebar from "../components/pages/community/CommunitySlidebar";

export default function Community() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      {/* 상단 제목 및 필터 버튼 */}
      <CommunityHeader onOpenSidebar={handleOpenSidebar} />

      {/* 모바일 사이드바 드로어 */}
      <CommunitySidebarDrawer
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* 게시글 + 사이드바 레이아웃 */}
      <div className="flex flex-col lg:flex-row-reverse gap-8">
        {/* 사이드바 (데스크탑 전용) */}
        <aside className="hidden lg:block lg:w-[220px] bg-[#1e1e2e] p-4 rounded-xl">
          <CommunitySlidebar />
        </aside>

        {/* 게시글 목록 */}
        <CommunityPostGrid />
      </div>
    </div>
  );
}
