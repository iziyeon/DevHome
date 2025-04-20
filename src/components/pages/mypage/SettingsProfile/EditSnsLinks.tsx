// src/components/pages/mypage/SettingsProfile/EditSnsLinks.tsx
import { useState } from "react";

export default function EditSnsLinks() {
  const [links, setLinks] = useState({
    github: "https://github.com/your-username",
    twitter: "https://twitter.com/your-handle",
    instagram: "https://instagram.com/your-id",
    notion: "https://notion.so/your-page",
  });

  const handleChange = (key: keyof typeof links, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert("SNS 링크가 저장되었습니다.");
  };

  const fields = [
    { key: "github", label: "GitHub" },
    { key: "twitter", label: "Twitter" },
    { key: "instagram", label: "Instagram" },
    { key: "notion", label: "Notion" },
  ] as const;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">SNS 링크 수정</h3>

      <div className="space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="mb-1 block text-sm text-gray-300">{label}</label>
            <input
              type="url"
              value={links[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={`https://${key}.com`}
              className="input input-bordered w-full bg-white/10 text-white border-white/10 placeholder-gray-400"
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
