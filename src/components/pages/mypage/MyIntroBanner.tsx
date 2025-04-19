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
    <section className="animate-fade-in rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center text-white shadow-sm backdrop-blur-sm space-y-2">
      <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
        <Compass size={16} />
        현재 관심사 : {interest}
      </p>
      <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
        <BookOpen size={16} />
        요즘 읽는 책 : {book}
      </p>
      <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
        <Target size={16} />
        오늘 목표 : {goal}
      </p>
    </section>
  );
}
