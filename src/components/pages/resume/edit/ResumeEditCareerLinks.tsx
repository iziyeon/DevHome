import { useEffect } from "react";
import { useUserStore } from "../../../../stores/useUserStore";
import { LinkItem } from "../../../../types/resumeTypes";

interface Props {
  links: LinkItem[];
  onChange: (data: LinkItem[]) => void;
}

const emptyItem: LinkItem = {
  label: "",
  url: "",
};

export default function ResumeEditCareerLinks({ links, onChange }: Props) {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (links.length === 0 && user?.snsLinks) {
      const prefill = Object.entries(user.snsLinks)
        .filter(([, url]) => url)
        .map(([label, url]) => ({ label, url: url! }));
      onChange(prefill.length > 0 ? prefill : [emptyItem]);
    }
  }, [links.length, user?.snsLinks]);

  const handleChange = (
    index: number,
    field: keyof LinkItem,
    value: string
  ) => {
    const updated = [...links];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...links, { ...emptyItem }]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const current = links[index];
    const isLast = index === links.length - 1;
    const hasValue = current.label.trim() || current.url.trim();
    if (e.key === "Enter" && isLast && hasValue) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-white mb-2">링크</h3>

      {links.length === 0 && (
        <button
          type="button"
          onClick={handleAdd}
          className="text-sm text-indigo-300 hover:underline"
        >
          + 링크 추가하기
        </button>
      )}

      {links.map((item, i) => (
        <div
          key={i}
          className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-2 mb-4"
        >
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="링크 이름 (예: GitHub, Blog)"
            value={item.label}
            onChange={(e) => handleChange(i, "label", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
          <input
            className="input input-bordered w-full bg-transparent text-white"
            placeholder="링크 URL"
            value={item.url}
            onChange={(e) => handleChange(i, "url", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        </div>
      ))}

      {links.length > 0 && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleAdd}
            className="text-sm text-indigo-300 hover:underline"
          >
            + 링크 추가
          </button>
        </div>
      )}
    </div>
  );
}
