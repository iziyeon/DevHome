import { Outlet, useParams } from "react-router-dom";

export default function MyPageLayout() {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return (
      <div className="py-20 text-center text-white">
        유저 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 text-white animate-fade-in md:grid-cols-[260px_1fr]">
      <aside className="bg-white/5 border border-white/10 rounded-xl p-4 text-center text-white">
        사이드바 자리
      </aside>

      {/* 오른쪽 콘텐츠 영역 */}
      <div className="space-y-8">
        <Outlet />
      </div>
    </div>
  );
}
