import {
  NotebookPen,
  Bug,
  PenLine,
  Hammer,
  Github,
  Twitter,
  Instagram,
  Book,
  FolderOpen,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultProfile from "../../../../assets/layout/default.jpg";

export default function MyProfileSidebar({ username }: { username: string }) {
  const navigate = useNavigate();
  const { username: paramUsername } = useParams<{ username: string }>();
  const user = username || paramUsername;

  return (
    <aside className="animate-fade-in text-white">
      <div className="space-y-6 rounded-xl border border-white/10 bg-white/5 px-6 py-6 text-center shadow-sm backdrop-blur-sm">
        {/* 1. 프로필 이미지 */}
        <img
          src={defaultProfile}
          alt="기본 프로필 이미지"
          className="mx-auto h-24 w-24 rounded-full border border-white/20 object-cover"
        />

        {/* 2. 닉네임 + 소개 */}
        <div>
          <h2 className="text-lg font-semibold">{user}</h2>
          <p className="text-sm text-gray-400">기록하고 공유하며 성장합니다.</p>
        </div>

        {/* 3. 글 메뉴 – 카테고리별 링크 */}
        <nav className="flex flex-col gap-3 pt-2 text-left text-sm text-gray-300">
          <Link
            to={`/mypage/${user}/category/tech`}
            className="flex items-center gap-2 hover:text-indigo-300 transition"
          >
            <NotebookPen size={16} /> 기술 노트
          </Link>
          <Link
            to={`/mypage/${user}/category/troubleshooting`}
            className="flex items-center gap-2 hover:text-indigo-300 transition"
          >
            <Bug size={16} /> 트러블슈팅
          </Link>
          <Link
            to={`/mypage/${user}/category/daily`}
            className="flex items-center gap-2 hover:text-indigo-300 transition"
          >
            <PenLine size={16} /> Daily
          </Link>
          <Link
            to={`/mypage/${user}/category/project`}
            className="flex items-center gap-2 hover:text-indigo-300 transition"
          >
            <Hammer size={16} /> 프로젝트
          </Link>
        </nav>

        {/* 4. 기타 메뉴 – 방명록 / 바로가기 */}
        <div className="flex flex-col gap-3 pt-4 text-left text-sm text-gray-300">
          <button
            onClick={() => navigate(`/mypage/${user}/guestbook`)}
            className="flex items-center gap-2 text-left hover:text-indigo-300 transition"
          >
            <PenLine size={16} /> 방명록
          </button>
          <button
            onClick={() => navigate(`/mypage/${user}/links`)}
            className="flex items-center gap-2 text-left hover:text-indigo-300 transition"
          >
            <FolderOpen size={16} /> 바로가기
          </button>
        </div>

        {/* 5. SNS 링크 */}
        <div className="flex justify-center gap-4 pt-2 text-white/70">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-indigo-300"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-indigo-300"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-indigo-300"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-indigo-300"
          >
            <Book className="h-5 w-5" />
          </a>
        </div>

        {/* 6. 프로필 수정 버튼 */}
        <div className="pt-2">
          <button
            onClick={() => navigate("/settings/profile")}
            className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
          >
            edit
          </button>
        </div>
      </div>
    </aside>
  );
}
