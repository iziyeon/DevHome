// src/components/pages/login/LoginFooter.tsx

import { Link } from "react-router-dom";

export default function LoginFooter() {
  return (
    <p className="text-sm text-white text-center mt-2">
      아직 계정이 없으신가요?{" "}
      <Link
        to="/signup"
        className="underline text-white hover:text-indigo-300 transition"
      >
        회원가입
      </Link>
    </p>
  );
}
