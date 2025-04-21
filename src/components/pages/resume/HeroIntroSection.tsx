export default function HeroIntroSection() {
  return (
    <div className="text-center space-y-4">
      <img
        src="/src/assets/layout/default.jpg"
        alt="Profile"
        className="w-28 h-28 rounded-full mx-auto border border-white/30 shadow-sm"
      />
      <div>
        <h2 className="text-2xl font-semibold">홍길동</h2>
        <p className="text-white/70">Frontend Developer</p>
      </div>
      <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
        안녕하세요! 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
        코드로 사람의 행동을 바꾸는 경험을 좋아합니다.
      </p>
    </div>
  );
}
