import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1b1b2f] via-[#403d63] to-[#0f1626] text-white overflow-hidden">
      <BackgroundLights />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function BackgroundLights() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-20 rounded-full blur-[140px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-15 rounded-full blur-[120px] top-[240px] right-[-160px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-400 opacity-10 rounded-full blur-[120px] bottom-[-60px] left-[40%]" />
    </div>
  );
}
