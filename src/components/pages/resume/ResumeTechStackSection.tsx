import { useUserStore } from "../../../stores/useUserStore";

export default function ResumeTechStackSection() {
  const user = useUserStore((state) => state.user);
  const techStack = user?.techStack || {};

  const categories = Object.keys(techStack);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">기술 스택</h2>
      {categories.length === 0 ? (
        <p className="text-sm text-white/60">
          기술 스택이 등록되지 않았습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-white font-bold capitalize mb-2">
                {category}
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {techStack[category].map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
