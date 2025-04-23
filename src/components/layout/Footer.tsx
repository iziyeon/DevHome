import { Link, useLocation } from "react-router-dom";
import { Github, Twitter, Instagram, BookOpen, Globe } from "lucide-react";
import logo from "../../assets/layout/logo.png";
import { useUserStore } from "../../stores/useUserStore";
import type { JSX } from "react";

const iconMap: { [key: string]: JSX.Element } = {
  github: <Github className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  x: <Twitter className="w-5 h-5" />,
  notion: <BookOpen className="w-5 h-5" />,
  blog: <Globe className="w-5 h-5" />,
};

export default function Footer() {
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/community", label: "Community" },
    { to: "/resume", label: "Resume" },
    {
      to: user?.nickname ? `/mypage/${user.nickname}` : "/login",
      label: "Mypage",
    },
  ];

  const externalLinks = [
    { href: "https://github.com/your-repo", label: "GitHub" },
    { href: "https://notion.so", label: "Notion" },
  ];

  return (
    <footer className="bg-transparent text-white w-full py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-sm">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link to="/" className="hover:opacity-80 transition">
            <img src={logo} alt="DevHome Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-white/70 text-sm">© 2025 DevHome</p>
        </div>

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
            {user?.snsLinks &&
              Object.entries(user.snsLinks).map(([key, url]) =>
                url && iconMap[key] ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-indigo-300 transition"
                  >
                    {iconMap[key]}
                  </a>
                ) : null
              )}
          </div>
        </div>
      </div>
    </footer>
  );
}
