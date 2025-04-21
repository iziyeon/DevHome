// src/components/pages/signup/SignupForm.tsx

import {
  LogInIcon,
  LockIcon,
  MailIcon,
  UserCheck,
  UserIcon,
} from "lucide-react";
import SignupInput from "./SignupInput";
import InputWithCheck from "./InputWithCheck";
import SignupFooter from "./SignupFooter";
import GoogleLoginButton from "../../../components/common/GoogleLoginButton";

interface SignupFormProps {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  emailError: string;
  passwordError: string;
  confirmError: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNicknameCheck: () => void;
  onEmailCheck: () => void;
  onGoogleLogin: () => void;
}

export default function SignupForm({
  name,
  nickname,
  email,
  password,
  passwordConfirm,
  emailError,
  passwordError,
  confirmError,
  onNameChange,
  onNicknameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
  onNicknameCheck,
  onEmailCheck,
  onGoogleLogin,
}: SignupFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md space-y-4 bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-bold text-center text-white">회원가입</h1>

      <SignupInput
        label="이름"
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="홍길동"
        icon={<UserIcon className="w-4 h-4 mr-2 text-white" />}
      />

      <InputWithCheck
        label="닉네임"
        type="text"
        value={nickname}
        onChange={onNicknameChange}
        placeholder="devhong"
        icon={<UserCheck className="w-4 h-4 mr-2 text-white" />}
        onCheck={onNicknameCheck}
        checkLabel="중복확인"
      />

      <InputWithCheck
        label="이메일"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="example@email.com"
        icon={<MailIcon className="w-4 h-4 mr-2 text-white" />}
        onCheck={onEmailCheck}
        checkLabel="중복확인"
        error={emailError}
      />

      <SignupInput
        label="비밀번호"
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="영문+숫자 포함 8자 이상"
        icon={<LockIcon className="w-4 h-4 mr-2 text-white" />}
        error={passwordError}
      />

      <SignupInput
        label="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={onPasswordConfirmChange}
        placeholder="비밀번호 재입력"
        icon={<LockIcon className="w-4 h-4 mr-2 text-white" />}
        error={confirmError}
      />

      <button
        type="submit"
        className="btn btn-outline w-full rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition flex items-center justify-center gap-2 mt-2"
      >
        <LogInIcon className="w-4 h-4" />
        이메일로 가입하기
      </button>

      <SignupFooter />
      <div className="mt-4">
        <GoogleLoginButton onClick={onGoogleLogin} />
      </div>
    </form>
  );
}
