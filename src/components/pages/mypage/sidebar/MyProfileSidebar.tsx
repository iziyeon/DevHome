import { Link } from "react-router-dom";
import {
  BookText,
  FileText,
  Mail,
  PenLine,
  UserRoundCog,
  Folder,
  Paperclip,
  Github,
  Twitter,
  Instagram,
  Notebook,
  Globe,
} from "lucide-react";
import SearchInput from "../../../common/SearchInput";
import defaultProfile from "../../../../assets/layout/default.jpg";
import { useUserStore } from "../../../../stores/useUserStore";
import { JSX } from "react";

interface MyProfileSidebarProps {
  username: string;
}

const CATEGORIES = [
  { key: "tech", label: "기술 노트", icon: <FileText size={16} /> },
  { key: "troubleshooting", label: "트러블슈팅", icon: <PenLine size={16} /> },
  { key: "daily", label: "Daily", icon: <Mail size={16} /> },
  { key: "project", label: "프로젝트", icon: <BookText size={16} /> },
];

const iconMap: { [key: string]: JSX.Element } = {
  github: <Github size={18} />,
  notion: <Notebook size={18} />,
  twitter: <Twitter size={18} />,
  x: <Twitter size={18} />,
  instagram: <Instagram size={18} />,
  blog: <Globe size={18} />,
};

export default function MyProfileSidebar({ username }: MyProfileSidebarProps) {
  const user = useUserStore((state) => state.user);

  return (
    <aside className="w-full md:w-[240px] text-white">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-6">
        <div className="text-center space-y-2">
          <img
            src={defaultProfile}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
          <h2 className="text-lg font-bold">{username}</h2>
          <p className="text-sm text-gray-300">기록하고 공유하며 성장합니다.</p>
        </div>

        <SearchInput navigateTo={`/mypage/${username}/search`} />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-indigo-300">
            <Folder size={16} />글 카테고리
          </h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map(({ key, label, icon }) => (
              <li key={key}>
                <Link
                  to={`/mypage/${username}/category/${key}`}
                  className="flex items-center gap-2 hover:text-indigo-300 transition"
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-indigo-300">
            <Paperclip size={16} />
            기타
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to={`/mypage/${username}/guestbook`}
                className="flex items-center gap-2 hover:text-indigo-300 transition"
              >
                <Mail size={16} />
                방명록
              </Link>
            </li>
            <li>
              <Link
                to={`/mypage/${username}/links`}
                className="flex items-center gap-2 hover:text-indigo-300 transition"
              >
                <BookText size={16} />
                바로가기
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          {user?.snsLinks &&
            Object.entries(user.snsLinks).map(([key, url]) =>
              url && iconMap[key] ? (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-300 transition"
                  aria-label={key}
                >
                  {iconMap[key]}
                </a>
              ) : null
            )}
        </div>

        <div className="pt-2 text-center">
          <Link
            to="/settings/profile"
            className="btn btn-sm btn-outline text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
          >
            <UserRoundCog size={16} className="mr-1" />
            EDIT
          </Link>
        </div>
      </div>
    </aside>
  );
}
