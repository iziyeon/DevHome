// src/components/pages/mypage/SettingsProfile/EditCategoryLabels.tsx
import { useState } from "react";

export default function EditCategoryLabels() {
  const [labels, setLabels] = useState({
    tech: "기술 노트",
    troubleshooting: "트러블슈팅",
    daily: "Daily",
    project: "프로젝트",
  });

  const handleChange = (key: keyof typeof labels, value: string) => {
    setLabels((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("수정된 카테고리 이름들:", labels);
    alert("카테고리 이름이 저장되었습니다. (추후 Firestore 연동 예정)");
  };

  const fields: { key: keyof typeof labels; label: string }[] = [
    { key: "tech", label: "기술 노트" },
    { key: "troubleshooting", label: "트러블슈팅" },
    { key: "daily", label: "Daily" },
    { key: "project", label: "프로젝트" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">카테고리 수정</h3>

      <div className="space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="mb-1 block text-sm text-gray-300">{label}</label>
            <input
              type="text"
              value={labels[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="input input-bordered w-full rounded bg-white/10 text-white border-white/10 placeholder-gray-400"
            />
          </div>
        ))}
      </div>

      <div className="text-right">
        <button
          onClick={handleSave}
          className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
        >
          저장
        </button>
      </div>
    </div>
  );
}
