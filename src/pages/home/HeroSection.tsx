import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const fullText = "개발자의 이야기를 담는 집\nDevHome";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  const isTypingDone = index >= fullText.length;

  useEffect(() => {
    const typeText = () => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }
    };

    const timeout = setTimeout(typeText, 100);
    return () => clearTimeout(timeout);
  }, [index, fullText]);

  const handleGoogleLogin = () => {
    console.log("🟡 Google 로그인 진행 예정");
  };

  const titleLines = typedText.split("\n");

  return (
    <section className="relative flex flex-col justify-center items-center text-center px-6 min-h-[45vh]  text-white overflow-hidden">
      <div className="z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 min-h-[5rem]">
          {titleLines.map((line, i) => (
            <div key={i}>
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

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-primary px-5 py-3 text-sm font-semibold rounded-md leading-none tracking-tight hover:scale-105 transition-transform duration-200"
          >
            Get Started for Google
          </button>
          <Link
            to="/login"
            className="btn btn-outline border-white text-white px-5 py-3 text-sm font-semibold rounded-md leading-none tracking-tight hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
          >
            Email Login
          </Link>
          <Link
            to="/signup"
            className="btn btn-ghost text-white px-5 py-3 text-sm font-semibold rounded-md leading-none tracking-tight hover:text-indigo-300 hover:scale-105 transition-transform duration-200"
          >
            이메일로 가입하기
          </Link>
        </div>
      </div>
    </section>
  );
}
