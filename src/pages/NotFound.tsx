// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white px-4 sm:px-6 md:px-8">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="btn btn-outline text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
