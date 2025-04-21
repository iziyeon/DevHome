import { TechStack } from "../../../../types/resumeTypes";

interface Props {
  techStack: TechStack;
  onChange: (data: TechStack) => void;
}

export default function ResumeEditTechStackForm({
  techStack,
  onChange,
}: Props) {
  const handleChange = (
    category: keyof TechStack,
    index: number,
    value: string
  ) => {
    const updated = [...techStack[category]];
    updated[index] = value;
    onChange({ ...techStack, [category]: updated });
  };

  const handleAdd = (category: keyof TechStack) => {
    onChange({ ...techStack, [category]: [...techStack[category], ""] });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    category: keyof TechStack,
    index: number
  ) => {
    const value = techStack[category][index];
    const isLast = index === techStack[category].length - 1;

    if (e.key === "Enter" && isLast && value.trim() !== "") {
      e.preventDefault();
      handleAdd(category);
    }
  };

  const renderCategory = (label: string, category: keyof TechStack) => {
    const items = techStack[category];

    // 렌더링 조건: 입력된 항목이 하나라도 있거나 추가되었을 경우만 표시
    const shouldRender = items.length > 0;

    if (!shouldRender) {
      return (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => handleAdd(category)}
            className="text-sm text-indigo-300 hover:underline"
          >
            {label} 추가하기
          </button>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <h3 className="font-semibold text-white mb-2">{label}</h3>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <input
              key={idx}
              className="input input-bordered w-full bg-transparent text-white"
              placeholder="기술 입력"
              value={item}
              onChange={(e) => handleChange(category, idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, category, idx)}
            />
          ))}
        </div>
        <div className="text-right mt-2">
          <button
            type="button"
            onClick={() => handleAdd(category)}
            className="text-sm text-indigo-300 hover:underline"
          >
            + 항목 추가
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow space-y-6">
      <h2 className="text-xl font-bold text-indigo-300">기술 스택</h2>
      {renderCategory("Frontend", "frontend")}
      {renderCategory("Backend", "backend")}
      {renderCategory("기타 기술", "etc")}
    </div>
  );
}
