// src/components/common/GoogleLoginButton.tsx

import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

interface Props {
  className?: string;
}

export default function GoogleLoginButton({ className = "" }: Props) {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Google 로그인 오류:", error);
      alert("구글 로그인에 실패했습니다.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className={`btn btn-outline w-full rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition flex items-center justify-center gap-2 ${className}`}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-center">GOOGLE 계정으로 로그인</span>
    </button>
  );
}
