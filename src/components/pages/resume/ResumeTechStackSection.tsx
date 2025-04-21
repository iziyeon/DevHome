import { techStack } from "../../../data/resumeData";

export default function ResumeTechStackSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">기술 스택</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-white font-bold capitalize mb-2">{category}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
