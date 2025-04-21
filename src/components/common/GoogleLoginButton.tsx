interface Props {
  onClick: () => void;
  className?: string;
}

export default function GoogleLoginButton({ onClick, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
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
