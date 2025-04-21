// src/components/pages/signup/SignupFooter.tsx

import { Link } from "react-router-dom";

export default function SignupFooter() {
  return (
    <p className="text-sm text-white text-center mt-2">
      이미 계정이 있으신가요?{" "}
      <Link
        to="/login"
        className="underline text-white hover:text-indigo-300 transition"
      >
        로그인
      </Link>
    </p>
  );
}
