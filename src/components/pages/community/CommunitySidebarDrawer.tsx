// src/components/pages/community/CommunitySidebarDrawer.tsx
import CommunitySlidebar from "./CommunitySlidebar";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommunitySidebarDrawer({
  isOpen,
  onClose,
}: SidebarDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 📦 사이드바 패널 */}
      <aside
        className="fixed top-0 right-0 z-50 h-full w-64 bg-[#1e1e2e] p-4 shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out lg:hidden"
        role="complementary"
        aria-label="카테고리 필터 사이드바"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold text-lg">필터</h3>
          <button
            className="btn btn-sm btn-ghost text-white"
            onClick={onClose}
            aria-label="사이드바 닫기"
          >
            ✕
          </button>
        </div>
        <CommunitySlidebar onCategoryClick={onClose} />
      </aside>

      {/* 🌒 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
