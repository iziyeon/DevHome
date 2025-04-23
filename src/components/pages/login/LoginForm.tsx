import { LogInIcon, MailIcon, LockIcon } from "lucide-react";
import LoginInput from "./LoginInput";
import LoginFooter from "./LoginFooter";
import GoogleLoginButton from "../../../components/common/GoogleLoginButton";

interface LoginFormProps {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
}

export default function LoginForm({
  email,
  password,
  emailError,
  passwordError,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
}: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md space-y-5 bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-bold text-center text-white">로그인</h1>

      <LoginInput
        label="이메일"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="example@email.com"
        icon={<MailIcon className="w-4 h-4 mr-2 text-white" />}
        error={emailError}
      />

      <LoginInput
        label="비밀번호"
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="••••••••"
        icon={<LockIcon className="w-4 h-4 mr-2 text-white" />}
        error={passwordError}
      />

      <button
        type="submit"
        className="btn btn-outline w-full rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition flex items-center justify-center gap-2"
      >
        <LogInIcon className="w-4 h-4" />
        이메일로 로그인하기
      </button>

      <LoginFooter />

      <GoogleLoginButton onClick={onGoogleLogin} />
    </form>
  );
}
