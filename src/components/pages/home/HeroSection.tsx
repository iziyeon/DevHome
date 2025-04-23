import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleLoginButton from "../../common/GoogleLoginButton";
import { useUserStore } from "../../../stores/useUserStore";

export default function HeroSection() {
  const fullText = "개발자의 이야기를 담는 집\nDevHome";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const isTypingDone = index >= fullText.length;

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const titleLines = typedText.split("\n");

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[20vh] text-white px-4 sm:px-6">
      <div className="z-10 w-full max-w-3xl mx-auto text-center">
        <h1 className="text-[28px] sm:text-[32px] md:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 break-keep whitespace-pre-wrap">
          {titleLines.map((line, i) => (
            <div key={i}>
              {line}
              {i === titleLines.length - 1 && !isTypingDone && (
                <span className="animate-blink">|</span>
              )}
            </div>
          ))}
        </h1>

        <p className="text-[17px] sm:text-[19px] md:text-xl text-white/80 mb-10 animate-fade-in leading-relaxed whitespace-pre-wrap break-keep">
          인터랙티브 이력서와 커뮤니티가 하나로,
          {"\n"}나만의 개발 여정을 기록하는 공간
        </p>

        {!user && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
            <GoogleLoginButton className="w-full sm:w-auto px-5 py-3" />
            <Link
              to="/login"
              className="btn btn-outline w-full sm:w-auto rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition px-5 py-3"
            >
              이메일로 로그인
            </Link>
            <Link
              to="/signup"
              className="btn btn-outline w-full sm:w-auto rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition px-5 py-3"
            >
              이메일로 가입하기
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
