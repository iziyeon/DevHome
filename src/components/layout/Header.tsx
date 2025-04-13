import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/layout/logo.png";

const isLoggedIn = true; // TODO: 실제 로그인 상태 연동

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/community", label: "Community", always: true },
    { to: "/resume", label: "Resume", authOnly: true },
    { to: "/mypage", label: "Mypage", authOnly: true },
  ];

  const renderRightButtons = () => {
    if (isLoggedIn) {
      return (
        <button className="btn btn-outline btn-sm rounded-full border-primary text-white hover:bg-primary hover:text-white transition">
          Logout
        </button>
      );
    }

    return (
      <>
        {location.pathname !== "/login" && (
          <Link className="btn btn-sm btn-ghost" to="/login">
            Login
          </Link>
        )}
        {location.pathname !== "/signup" && (
          <Link className="btn btn-sm btn-primary" to="/signup">
            Sign Up
          </Link>
        )}
      </>
    );
  };

  const handleMobileMenuClose = () => setIsMenuOpen(false);

  return (
    <div className="navbar bg-transparent text-white px-6 fixed top-0 w-full z-50">
      {/* 왼쪽: 로고 + 메뉴 */}
      <div className="flex flex-1 items-center gap-6">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src={logo} alt="DevHome Logo" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex gap-4">
          {navLinks.map(({ to, label, always, authOnly }) =>
            always || (authOnly && isLoggedIn) ? (
              <Link
                key={to}
                to={to}
                className={`btn btn-ghost text-base hover:underline ${
                  location.pathname === to
                    ? "text-indigo-300 font-bold underline"
                    : ""
                }`}
              >
                {label}
              </Link>
            ) : null
          )}
        </div>
      </div>

      {/* 오른쪽 버튼 */}
      <div className="hidden md:flex gap-2">{renderRightButtons()}</div>

      {/* 모바일 메뉴 버튼 */}
      <div className="md:hidden">
        <button
          className="btn btn-ghost"
          onClick={() => setIsMenuOpen((p) => !p)}
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

      {/* 모바일 드롭다운 */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 text-base-content p-4 flex flex-col gap-2 z-50 md:hidden shadow-lg">
          {navLinks.map(({ to, label, always, authOnly }) =>
            always || (authOnly && isLoggedIn) ? (
              <Link
                key={to}
                to={to}
                onClick={handleMobileMenuClose}
                className={`btn btn-ghost text-left hover:underline ${
                  location.pathname === to
                    ? "text-indigo-300 font-bold underline"
                    : ""
                }`}
              >
                {label}
              </Link>
            ) : null
          )}

          {!isLoggedIn && (
            <>
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  className="btn btn-ghost text-left"
                  onClick={handleMobileMenuClose}
                >
                  Login
                </Link>
              )}
              {location.pathname !== "/signup" && (
                <Link
                  to="/signup"
                  className="btn btn-ghost text-left"
                  onClick={handleMobileMenuClose}
                >
                  Sign Up
                </Link>
              )}
            </>
          )}

          {isLoggedIn && (
            <button
              className="btn btn-outline text-left"
              onClick={handleMobileMenuClose}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
