import { useState } from "react";
import CommunityPostGrid from "../components/pages/community/CommunityPostGrid";
import CommunityHeader from "../components/pages/community/CommunityHeader";

export default function Community() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <CommunityHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
      <CommunityPostGrid />
    </div>
  );
}
