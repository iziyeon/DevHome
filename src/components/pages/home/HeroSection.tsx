// src/components/pages/home/HeroSection.tsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleLoginButton from "../../common/GoogleLoginButton";

export default function HeroSection() {
  const fullText = "개발자의 이야기를 담는 집\nDevHome";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const isTypingDone = index >= fullText.length;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const titleLines = typedText.split("\n");

  return (
    <section className="relative flex flex-col justify-center items-center text-center px-6 min-h-[45vh] text-white overflow-hidden">
      <div className="z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 min-h-[5rem]">
          {titleLines.map((line, i) => (
            <div key={i} className={i === 0 ? "whitespace-nowrap" : ""}>
              {line}
              {i === titleLines.length - 1 && !isTypingDone && (
                <span className="animate-blink">|</span>
              )}
            </div>
          ))}
        </h1>

        <p className="text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
          인터랙티브 이력서와 커뮤니티가 하나로, 나만의 개발 여정을 기록하는
          공간
        </p>

        {!isLoggedIn && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto w-full">
            <GoogleLoginButton
              onClick={() => console.log("🟡 Google 로그인 예정")}
              className="w-full sm:w-auto px-5 py-3"
            />
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
