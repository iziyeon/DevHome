import { Education } from "../../../../types/resumeTypes";

interface Props {
  education: Education[];
  onChange: (data: Education[]) => void;
}

const emptyItem: Education = {
  title: "",
  org: "",
  period: "",
};

export default function ResumeEditCareerEducation({
  education,
  onChange,
}: Props) {
  const handleChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...education];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...education, { ...emptyItem }]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const current = education[index];
    const isLast = index === education.length - 1;
    const hasValue = current.title.trim() || current.org.trim();
    if (e.key === "Enter" && isLast && hasValue) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-white mb-2">교육</h3>

      {education.length === 0 && (
        <button
          type="button"
          onClick={handleAdd}
          className="text-sm text-indigo-300 hover:underline"
        >
          + 교육 이력 추가하기
        </button>
      )}

      {education.map((item, i) => (
        <div
          key={i}
          className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-2 mb-4"
        >
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="교육명"
            value={item.title}
            onChange={(e) => handleChange(i, "title", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="기관명"
            value={item.org}
            onChange={(e) => handleChange(i, "org", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="수강 기간"
            value={item.period}
            onChange={(e) => handleChange(i, "period", e.target.value)}
          />
        </div>
      ))}

      {education.length > 0 && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleAdd}
            className="text-sm text-indigo-300 hover:underline"
          >
            + 교육 추가
          </button>
        </div>
      )}
    </div>
  );
}
