// src/pages/SignUp.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import SignupForm from "../components/pages/signup/SignupForm";

export default function SignUp() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setFirebaseError("");

    let isValid = true;

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setPasswordError(
        "비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다."
      );
      isValid = false;
    }

    if (passwordConfirm !== password) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // 회원가입 성공 시 홈으로 이동
    } catch (error: unknown) {
      const firebaseErr = error as FirebaseError;
      if (firebaseErr.code === "auth/email-already-in-use") {
        setFirebaseError("이미 사용 중인 이메일입니다.");
      } else {
        setFirebaseError("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  const handleNicknameCheck = () => {
    alert("닉네임 중복확인은 나중에 구현됩니다.");
  };

  const handleEmailCheck = () => {
    alert("이메일 중복확인은 나중에 구현됩니다.");
  };

  const handleGoogleLogin = () => {
    alert("Google 로그인은 나중에 연동됩니다.");
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-24 px-4">
      <div className="w-full max-w-md">
        {firebaseError && (
          <p className="text-red-400 text-center mb-4">{firebaseError}</p>
        )}
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
    </div>
  );
}
