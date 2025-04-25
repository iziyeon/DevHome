// src/pages/SignUp.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "../firebase";
import { useUserStore } from "../stores/useUserStore";
import SignupForm from "../components/pages/signup/SignupForm";
import {
  DEFAULT_CATEGORY_LABELS,
  DEFAULT_INTRO,
  DEFAULT_SNS_LINKS,
} from "../constants/defaultUserData";

export default function SignUp() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 시도 중...");

    // 기본 유효성 검사
    let isValid = true;

    if (!name.trim()) {
      isValid = false;
    }

    if (!nickname.trim()) {
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setPasswordError(
        "비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== passwordConfirm) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmError("");
    }

    if (!isValid) {
      console.log("유효성 검사 실패");
      return;
    }

    try {
      console.log("Firebase 회원가입 시작...");
      // Firebase Auth로 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Firebase 회원가입 성공:", user.uid);

      // 기본 사용자 데이터 구성
      const userData = {
        name,
        nickname,
        email,
        createdAt: new Date(),
        intro: DEFAULT_INTRO,
        categoryLabels: DEFAULT_CATEGORY_LABELS,
        snsLinks: DEFAULT_SNS_LINKS,
        snsLinksVisible: Object.keys(DEFAULT_SNS_LINKS).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        ),
        bio: `${name}의 개발 블로그입니다.`,
        profileImage: "",
        position: "개발자",
      };

      console.log("Firestore에 사용자 데이터 저장 시작...");
      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("Firestore 저장 완료");

      // 사용자 상태 업데이트
      setUser({
        uid: user.uid,
        ...userData,
      });
      console.log("사용자 상태 업데이트 완료");

      // 회원가입 성공 후 마이페이지로 자동 이동
      console.log(`마이페이지로 이동: /mypage/${nickname}`);
      navigate(`/mypage/${nickname}`);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error("회원가입 오류:", firebaseError);

      if (firebaseError.code === "auth/email-already-in-use") {
        setEmailError("이미 사용 중인 이메일입니다.");
      } else {
        console.error("회원가입 오류:", firebaseError.message);
        alert(`회원가입 중 오류가 발생했습니다: ${firebaseError.message}`);
      }
    }
  };

  const handleNicknameCheck = () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    alert("사용 가능한 닉네임입니다.");
  };

  const handleEmailCheck = () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    alert("사용 가능한 이메일입니다.");
  };

  const handleGoogleLogin = () => {
    alert("Google 로그인은 나중에 연동됩니다.");
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-24 px-4">
      <SignupForm
        name={name}
        nickname={nickname}
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        emailError={emailError}
        passwordError={passwordError}
        confirmError={confirmError}
        onNameChange={(e) => setName(e.target.value)}
        onNicknameChange={(e) => setNickname(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onPasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
        onSubmit={handleSubmit}
        onNicknameCheck={handleNicknameCheck}
        onEmailCheck={handleEmailCheck}
        onGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}
