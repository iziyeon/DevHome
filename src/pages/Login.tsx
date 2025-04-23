// src/pages/Login.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import LoginForm from "../components/pages/login/LoginForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
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
    }

    if (!isValid) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === "auth/user-not-found") {
        setFirebaseError("등록되지 않은 이메일입니다.");
      } else if (firebaseError.code === "auth/wrong-password") {
        setFirebaseError("비밀번호가 틀렸습니다.");
      } else {
        setFirebaseError("로그인 중 오류가 발생했습니다.");
      }
    }
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
        <LoginForm
          email={email}
          password={password}
          emailError={emailError}
          passwordError={passwordError}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleSubmit}
          onGoogleLogin={handleGoogleLogin}
        />
      </div>
    </div>
  );
}
