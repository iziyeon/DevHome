// src/pages/Community.tsx

import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import CommunityHeader from "../components/pages/community/CommunityHeader";
import CommunitySidebarDrawer from "../components/pages/community/CommunitySidebarDrawer";
import CommunitySlidebar from "../components/pages/community/CommunitySlidebar";

export default function Community() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isWritePage = location.pathname === "/community/write";
  const isPostDetailPage = location.pathname.startsWith("/community/post/");

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 relative">
      <CommunitySidebarDrawer
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block lg:w-[280px] p-4 rounded-xl">
          <CommunitySlidebar />
        </aside>

        <div className="flex-1 w-full">
          {!isWritePage && !isPostDetailPage && (
            <CommunityHeader onOpenSidebar={handleOpenSidebar} />
          )}

          {location.pathname === "/community" && (
            <div className="flex justify-end mb-4">
              <Link
                to="/community/write"
                className="btn btn-sm btn-outline text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition flex items-center gap-1"
              >
                <Pencil size={16} />
                글쓰기
              </Link>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
}
