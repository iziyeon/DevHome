// src/components/layout/Header.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/layout/logo.png";

const isLoggedIn = true;
const username = "yeon";

const navLinks = [
  { to: () => "/community", label: "Community", always: true },
  { to: () => "/resume", label: "Resume", authOnly: true },
  {
    to: (username?: string) => (username ? `/mypage/${username}` : "/mypage"),
    label: "Mypage",
    authOnly: true,
  },
];

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isCurrent = (path: string) =>
    location.pathname === path ? "text-indigo-300 font-bold underline" : "";

  const renderNavLinks = (isMobile = false) =>
    navLinks.map(({ to, label, always, authOnly }) => {
      if (always || (authOnly && isLoggedIn)) {
        const path = to(username);
        return (
          <Link
            key={label}
            to={path}
            onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
            className={`btn btn-ghost ${
              isMobile ? "text-left justify-start" : "text-base"
            } hover:underline ${isCurrent(path)}`}
          >
            {label}
          </Link>
        );
      }
      return null;
    });

  const renderAuthButtons = (isMobile = false) => {
    if (isLoggedIn) {
      return (
        <button
          onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
          className={`btn btn-outline ${
            isMobile ? "text-left" : "btn-sm rounded-full"
          } border-primary text-white hover:bg-primary hover:text-white transition`}
        >
          Logout
        </button>
      );
    }

    return (
      <>
        {location.pathname !== "/login" && (
          <Link
            to="/login"
            onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
            className={`btn ${
              isMobile ? "btn-ghost text-left" : "btn-sm btn-ghost"
            }`}
          >
            Login
          </Link>
        )}
        {location.pathname !== "/signup" && (
          <Link
            to="/signup"
            onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
            className={`btn ${
              isMobile ? "btn-ghost text-left" : "btn-sm btn-primary"
            }`}
          >
            Sign Up
          </Link>
        )}
      </>
    );
  };

  return (
    <header className="w-full bg-transparent text-white">
      <div className="navbar px-6 relative z-50">
        <div className="flex flex-1 items-center gap-6">
          <Link to="/" className="btn btn-ghost text-xl">
            <img src={logo} alt="DevHome Logo" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex gap-4">{renderNavLinks()}</div>
        </div>

        <div className="hidden md:flex gap-2">{renderAuthButtons()}</div>

        <div className="md:hidden">
          <button
            className="btn btn-ghost"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isMenuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
        } bg-[#1e1e2e] text-white border-t border-[#2d2d3a] px-6 flex flex-col gap-3`}
      >
        {renderNavLinks(true)}
        {renderAuthButtons(true)}
      </div>
    </header>
  );
}
