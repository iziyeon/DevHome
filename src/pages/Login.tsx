import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "../firebase";
import { useUserStore } from "../stores/useUserStore";
import LoginForm from "../components/pages/login/LoginForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        useUserStore.getState().setUser({
          uid: user.uid,
          name: userData.name,
          nickname: userData.nickname,
          email: userData.email,
        });
        navigate(`/mypage/${userData.nickname}`);
      } else {
        console.warn("Firestore에 유저 정보가 없습니다.");
        alert("사용자 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error("로그인 오류:", firebaseError.message);
      if (firebaseError.code === "auth/user-not-found") {
        setEmailError("등록되지 않은 이메일입니다.");
      } else if (firebaseError.code === "auth/wrong-password") {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
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
