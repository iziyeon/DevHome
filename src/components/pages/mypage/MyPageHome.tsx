import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";

export default function MyPageHome() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">마이페이지</h2>
        <Link
          to="/mypage/write"
          className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition inline-flex items-center gap-1"
        >
          <PenLine className="w-4 h-4" />
          글쓰기
        </Link>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center text-white text-sm">
        인트로 배너 자리
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center text-white text-sm">
        최신 글 리스트 자리
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center text-white text-sm">
        방명록 리스트 자리
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center text-white text-sm">
        바로가기 패널 자리
      </div>
    </div>
  );
}
