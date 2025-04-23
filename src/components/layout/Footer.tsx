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
    { href: "https://github.com/your-repo", label: "GitHub" },
    { href: "https://notion.so", label: "Notion" },
  ];

  const snsIcons = [
    { href: "https://github.com", icon: GithubIcon },
    { href: "https://twitter.com", icon: TwitterIcon },
    { href: "https://instagram.com", icon: InstagramIcon },
    { href: "https://notion.so", icon: BookIcon },
  ];

  return (
    <footer className="bg-transparent text-white w-full py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-sm">
        {/* 로고 & 카피 */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link to="/" className="hover:opacity-80 transition">
            <img src={logo} alt="DevHome Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-white/70 text-sm">© 2025 DevHome</p>
        </div>

        {/* 내부 링크 */}
        <div className="flex flex-col items-center gap-2 text-base">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`transition hover:text-indigo-300 hover:underline ${
                  isActive ? "text-indigo-300 font-bold underline" : ""
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* 외부 링크 & SNS */}
        <div className="flex flex-col items-center md:items-end gap-2 text-base">
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
          <div className="flex gap-4 mt-3">
            {snsIcons.map(({ href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-indigo-300 transition"
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
