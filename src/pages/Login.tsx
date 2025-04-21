// src/pages/Login.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/pages/login/LoginForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

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

    if (!isValid) return;

    const username = "hong"; // TODO: Firebase 연동 시 교체
    navigate(`/mypage/${username}`);
  };

  const handleGoogleLogin = () => {
    alert("Google 로그인은 나중에 연동됩니다.");
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-24 px-4">
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
  );
}
