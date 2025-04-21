import { Project } from "../../../../types/resumeTypes";

interface Props {
  projects: Project[];
  onChange: (data: Project[]) => void;
}

const initialProject: Project = {
  title: "",
  description: "",
  stack: "",
  role: "",
  deployUrl: "",
  githubUrl: "",
};

export default function ResumeEditProjectsForm({ projects, onChange }: Props) {
  const updateItem = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...projects, { ...initialProject }]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const current = projects[index];
    const isLast = index === projects.length - 1;
    const isFilled =
      current.title.trim() !== "" || current.description.trim() !== "";
    if (e.key === "Enter" && isLast && isFilled) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow space-y-6">
      <h2 className="text-xl font-bold text-indigo-300">프로젝트</h2>

      {projects.length === 0 && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleAdd}
            className="text-sm text-indigo-300 hover:underline"
          >
            + 프로젝트 추가하기
          </button>
        </div>
      )}

      {projects.map((project, idx) => (
        <div
          key={idx}
          className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-2"
        >
          <h3 className="font-semibold">프로젝트 {idx + 1}</h3>
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="제목"
            value={project.title}
            onChange={(e) => updateItem(idx, "title", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          />
          <textarea
            className="textarea textarea-bordered w-full bg-transparent text-white"
            placeholder="설명"
            value={project.description}
            onChange={(e) => updateItem(idx, "description", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="사용 기술"
            value={project.stack}
            onChange={(e) => updateItem(idx, "stack", e.target.value)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="담당 역할"
            value={project.role}
            onChange={(e) => updateItem(idx, "role", e.target.value)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="배포 링크 (선택)"
            value={project.deployUrl}
            onChange={(e) => updateItem(idx, "deployUrl", e.target.value)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="GitHub 링크 (선택)"
            value={project.githubUrl}
            onChange={(e) => updateItem(idx, "githubUrl", e.target.value)}
          />
        </div>
      ))}

      {projects.length > 0 && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleAdd}
            className="text-sm text-indigo-300 hover:underline"
          >
            + 프로젝트 추가
          </button>
        </div>
      )}
    </div>
  );
}
