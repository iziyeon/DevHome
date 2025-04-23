import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface Props {
  className?: string;
}

export default function GoogleLoginButton({ className = "" }: Props) {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "이름 없음",
          nickname: user.displayName || "nickname",
          email: user.email || "이메일 없음",
          createdAt: new Date(),
        });
        navigate(`/mypage/${user.displayName || "nickname"}`);
      } else {
        const nickname =
          userSnap.data()?.nickname || user.displayName || "nickname";
        navigate(`/mypage/${nickname}`);
      }
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
