import { useState } from "react";
import { Outlet } from "react-router-dom";
import CommunityHeader from "../components/pages/community/CommunityHeader";
import CommunitySidebarDrawer from "../components/pages/community/CommunitySidebarDrawer";
import CommunitySlidebar from "../components/pages/community/CommunitySlidebar";

export default function Community() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <CommunityHeader onOpenSidebar={handleOpenSidebar} />

      <CommunitySidebarDrawer
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="flex flex-col lg:flex-row-reverse gap-8">
        <aside className="hidden lg:block lg:w-[280px]  p-4 rounded-xl">
          <CommunitySlidebar />
        </aside>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
