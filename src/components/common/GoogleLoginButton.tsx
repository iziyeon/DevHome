import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  AuthError,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useUserStore } from "../../stores/useUserStore";

interface Props {
  className?: string;
  onClick?: () => void;
}

export default function GoogleLoginButton({ className = "", onClick }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (onClick) onClick();
    setLoading(true);

    try {
      // Google 인증 공급자 생성
      const provider = new GoogleAuthProvider();
      // 로그인 유형 선택 화면을 항상 표시
      provider.setCustomParameters({ prompt: "select_account" });

      // Google 로그인 실행
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google 로그인 성공:", user.displayName);

      // Firestore에서 사용자 정보 확인
      const userSnap = await getDoc(doc(db, "users", user.uid));

      let nickname =
        user.displayName?.replace(/\s+/g, "") || `user${Date.now()}`;

      // 신규 사용자인 경우 Firestore에 정보 저장
      if (!userSnap.exists()) {
        // 사용자 정보 저장
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "이름 없음",
          nickname: nickname,
          profileImage: user.photoURL,
          createdAt: new Date(),
        });
        console.log("신규 사용자 정보가 저장되었습니다.");
      } else {
        const userData = userSnap.data();
        nickname = userData.nickname;
      }

      useUserStore.getState().setUser({
        uid: user.uid,
        name: user.displayName || "이름 없음",
        nickname,
        email: user.email || "",
        profileImage: user.photoURL || "",
      });

      navigate(`/mypage/${nickname}`);
    } catch (error) {
      console.error("Google 로그인 오류:", error);

      // AuthError 타입으로 처리 (FirebaseError도 포함)
      const authError = error as AuthError;

      // 보다 자세한 오류 메시지 제공
      if (authError.code === "auth/popup-closed-by-user") {
        alert("로그인 창이 닫혔습니다. 다시 시도해주세요.");
      } else if (authError.code === "auth/cancelled-popup-request") {
        console.log("팝업 요청이 취소되었습니다.");
      } else if (authError.code === "auth/popup-blocked") {
        alert("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
      } else {
        alert("구글 로그인에 실패했습니다. " + authError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`btn btn-outline w-full rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition flex items-center justify-center gap-2 ${className} ${
        loading ? "opacity-70" : ""
      }`}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-center">
        {loading ? "로그인 중..." : "GOOGLE 계정으로 로그인"}
      </span>
    </button>
  );
}
