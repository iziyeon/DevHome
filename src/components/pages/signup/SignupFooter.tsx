import { Link } from "react-router-dom";

export default function SignupFooter() {
  return (
    <div className="mt-6 text-center text-sm text-white">
      <p className="mb-1">이미 계정이 있으신가요?</p>
      <Link
        to="/login"
        className="inline-block underline underline-offset-4 text-white hover:text-indigo-300 transition"
      >
        로그인하러 가기
      </Link>
    </div>
  );
}
