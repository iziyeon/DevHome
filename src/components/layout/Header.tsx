import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/layout/logo.png";
import { useUserStore } from "../../stores/useUserStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const isLoggedIn = Boolean(user);

  const isCurrent = (path: string) =>
    location.pathname === path ? "text-indigo-300 font-bold underline" : "";

  const navLinks = [
    { to: "/community", label: "Community", show: true },
    { to: "/resume", label: "Resume", show: isLoggedIn },
    {
      to: `/mypage/${user?.nickname || "mypage"}`,
      label: "Mypage",
      show: isLoggedIn,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const renderNavLinks = (isMobile = false) =>
    navLinks.map(({ to, label, show }) => {
      if (!show) return null;
      return (
        <Link
          key={label}
          to={to}
          onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
          className={`btn btn-ghost ${
            isMobile ? "text-left justify-start" : "text-base"
          } hover:underline hover:text-indigo-300 ${isCurrent(to)}`}
        >
          {label}
        </Link>
      );
    });

  const renderAuthButtons = (isMobile = false) => {
    const baseClass =
      "btn btn-outline rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition";

    if (isLoggedIn) {
      return (
        <button
          onClick={() => {
            handleLogout();
            if (isMobile) setIsMenuOpen(false);
          }}
          className={`${baseClass} ${isMobile ? "w-full text-left" : "btn-sm"}`}
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
            className={`${baseClass} ${
              isMobile ? "w-full text-left" : "btn-sm"
            }`}
          >
            Login
          </Link>
        )}
        {location.pathname !== "/signup" && (
          <Link
            to="/signup"
            onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
            className={`${baseClass} ${
              isMobile ? "w-full text-left" : "btn-sm"
            }`}
          >
            Sign Up
          </Link>
        )}
      </>
    );
  };

  return (
    <header className="w-full bg-transparent text-white z-50">
      <div className="navbar px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex-1 flex items-center gap-6">
          <Link
            to="/"
            className="btn btn-ghost text-xl flex items-center gap-2"
          >
            <img src={logo} alt="DevHome Logo" className="h-8 w-auto sm:h-9" />
          </Link>
          <div className="hidden md:flex gap-4">{renderNavLinks()}</div>
        </div>

        <div className="hidden md:flex gap-3 items-center">
          {renderAuthButtons()}
        </div>

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

      {/* 모바일 메뉴 */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isMenuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
        } bg-[#1e1e2e] border-t border-[#2d2d3a] px-6 flex flex-col gap-3`}
      >
        {renderNavLinks(true)}
        {renderAuthButtons(true)}
      </div>
    </header>
  );
}
