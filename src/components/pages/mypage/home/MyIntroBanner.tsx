import { Compass, BookOpen, Target } from "lucide-react";

interface MyIntroBannerProps {
  interest: string;
  book: string;
  goal: string;
}

export default function MyIntroBanner({
  interest,
  book,
  goal,
}: MyIntroBannerProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 md:px-6 text-center text-white shadow-sm backdrop-blur-sm space-y-2 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-center md:gap-6 text-sm text-gray-300">
        <div className="inline-flex items-center justify-center gap-2">
          <Compass size={16} className="text-indigo-300" />
          <span>관심사 : {interest}</span>
        </div>
        <div className="inline-flex items-center justify-center gap-2">
          <BookOpen size={16} className="text-indigo-300" />
          <span>읽는 책 : {book}</span>
        </div>
        <div className="inline-flex items-center justify-center gap-2">
          <Target size={16} className="text-indigo-300" />
          <span>오늘 목표 : {goal}</span>
        </div>
      </div>
    </section>
  );
}
