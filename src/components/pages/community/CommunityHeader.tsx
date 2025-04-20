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
  const isSearchPage = location.pathname === "/community/search";

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
      {!isSearchPage && (
        <h2 className="text-3xl font-bold text-white">
          {category ? `#${category}` : "Latest posts"}
        </h2>
      )}

      <div className="flex items-center gap-2 ml-auto">
        <Link
          to="/write"
          className="btn btn-sm btn-outline text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition flex items-center gap-1"
        >
          <Pencil size={16} />
          글쓰기
        </Link>

        <button
          className="btn btn-sm btn-outline text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition lg:hidden flex items-center gap-1"
          onClick={onOpenSidebar}
        >
          <PanelRight size={18} />
        </button>
      </div>
    </div>
  );
}
