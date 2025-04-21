import { Experience } from "../../../../types/resumeTypes";

interface Props {
  experience: Experience[];
  onChange: (data: Experience[]) => void;
}

const emptyItem: Experience = {
  company: "",
  position: "",
  period: "",
  description: "",
};

export default function ResumeEditCareerExperience({
  experience,
  onChange,
}: Props) {
  const handleChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updated = [...experience];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...experience, { ...emptyItem }]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const current = experience[index];
    const isLast = index === experience.length - 1;
    const hasValue = current.company.trim() || current.position.trim();
    if (e.key === "Enter" && isLast && hasValue) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-white mb-2">경력</h3>

      {experience.length === 0 && (
        <button
          type="button"
          onClick={handleAdd}
          className="text-sm text-indigo-300 hover:underline"
        >
          + 경력 추가하기
        </button>
      )}

      {experience.map((item, i) => (
        <div
          key={i}
          className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-2 mb-4"
        >
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="회사명"
            value={item.company}
            onChange={(e) => handleChange(i, "company", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="직무 / 직책"
            value={item.position}
            onChange={(e) => handleChange(i, "position", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="근무 기간"
            value={item.period}
            onChange={(e) => handleChange(i, "period", e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full bg-transparent text-white"
            placeholder="주요 업무 / 성과"
            value={item.description}
            onChange={(e) => handleChange(i, "description", e.target.value)}
          />
        </div>
      ))}

      {experience.length > 0 && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleAdd}
            className="text-sm text-indigo-300 hover:underline"
          >
            + 경력 추가
          </button>
        </div>
      )}
    </div>
  );
}
