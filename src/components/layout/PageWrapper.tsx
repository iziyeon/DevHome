// src/components/layout/PageWrapper.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper() {
  return (
    <div className="relative min-h-screen text-white bg-gradient-to-b from-[#1b1b2f] via-[#403d63] to-[#0f1626] overflow-hidden">
      {/* 🌟 흐릿하게 퍼지는 Light Spot 효과 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Light 1 */}
        <div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-20 rounded-full blur-[120px] top-[-100px] left-[-100px]" />
        {/* Light 2 */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-15 rounded-full blur-[100px] top-[200px] right-[-150px]" />
        {/* Light 3 */}
        <div className="absolute w-[400px] h-[400px] bg-pink-400 opacity-10 rounded-full blur-[100px] bottom-[0px] left-[40%]" />
      </div>

      {/* 실질 콘텐츠 */}
      <div className="relative z-10">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
