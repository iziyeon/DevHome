interface MyIntroBannerProps {
  interest?: string;
  book?: string;
  goal?: string;
}

export default function MyIntroBanner({
  interest,
  book,
  goal,
}: MyIntroBannerProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 space-y-1">
      <p>
        <span className="text-white font-semibold">요즘 관심사:</span>{" "}
        {interest || "정보 없음"}
      </p>
      <p>
        <span className="text-white font-semibold">요즘 읽는 책:</span>{" "}
        {book || "정보 없음"}
      </p>
      <p>
        <span className="text-white font-semibold">오늘의 목표:</span>{" "}
        {goal || "정보 없음"}
      </p>
    </div>
  );
}
