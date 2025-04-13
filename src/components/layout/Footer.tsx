import { Link, useLocation } from "react-router-dom";
import { GithubIcon, TwitterIcon, InstagramIcon, BookIcon } from "lucide-react";
import logo from "../../assets/layout/logo.png";

export default function Footer() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/community", label: "Community" },
    { to: "/resume", label: "Resume" },
    { to: "/mypage", label: "Mypage" },
  ];

  const externalLinks = [
    { href: "https://github.com/your-repo", label: "- GitHub" },
    { href: "https://notion.so", label: "- Notion" },
  ];

  const snsIcons = [
    { href: "https://github.com", icon: GithubIcon },
    { href: "https://twitter.com", icon: TwitterIcon },
    { href: "https://instagram.com", icon: InstagramIcon },
    { href: "https://notion.so", icon: BookIcon },
  ];

  return (
    <footer className="bg-transparent text-white w-full py-10 pt-16">
      <div className="max-w-screen-md mx-auto min-h-[150px] grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-sm px-4">
        {/* 왼쪽: 로고 */}
        <div className="flex justify-center">
          <Link to="/" className="transition hover:opacity-80">
            <img src={logo} alt="DevHome Logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* 가운데: 내부 링크 */}
        <div className="flex flex-col items-center gap-2">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-base transition hover:text-indigo-300 hover:underline ${
                  isActive ? "text-indigo-300 font-bold underline" : ""
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* 오른쪽: 외부 링크 + 아이콘 */}
        <div className="flex flex-col items-center gap-2">
          {externalLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-300 hover:underline transition"
            >
              {label}
            </a>
          ))}
          <p className="mt-2 text-white/70">- © 2025 DevHome</p>
          <div className="flex gap-3 mt-2 text-white/70">
            {snsIcons.map(({ href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-300 transition"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
