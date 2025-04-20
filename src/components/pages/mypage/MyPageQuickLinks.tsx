import { useState } from "react";
// import { useParams } from "react-router-dom";
import { ExternalLink, Trash2 } from "lucide-react";

const currentUserNickname = "yeon";

interface QuickLink {
  id: string;
  label: string;
  url: string;
  author: string;
}

export default function MyPageQuickLinks() {
  // const { username: _username } = useParams<{ username: string }>(); //

  const [links, setLinks] = useState<QuickLink[]>([
    {
      id: "l1",
      label: "GitHub",
      url: "https://github.com/yeon",
      author: "yeon",
    },
    {
      id: "l2",
      label: "Notion",
      url: "https://notion.so/yeon",
      author: "yeon",
    },
  ]);

  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setLinks((prev) => prev.filter((link) => link.id !== id));
    }
  };

  const handleAddLink = () => {
    if (!newLabel.trim() || !newUrl.trim()) return;

    const newLink: QuickLink = {
      id: Math.random().toString(36).slice(2, 9),
      label: newLabel,
      url: newUrl,
      author: currentUserNickname,
    };

    setLinks((prev) => [...prev, newLink]);
    setNewLabel("");
    setNewUrl("");
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold flex items-center gap-2 text-white">
        <ExternalLink className="w-5 h-5 text-white" />
        바로가기 링크
      </h2>

      {/* ✅ 입력 폼 */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-2">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="링크 이름 (예: 블로그)"
          className="input input-sm bg-[#1f2937] text-white border-white/10 placeholder-white/30"
        />
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://example.com"
          className="input input-sm bg-[#1f2937] text-white border-white/10 placeholder-white/30"
        />
        <button
          onClick={handleAddLink}
          className="btn btn-outline btn-sm text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition"
        >
          등록
        </button>
      </div>

      {/* ✅ 링크 목록 */}
      <ul className="space-y-4">
        {links.map((link) => (
          <li
            key={link.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-indigo-300">{link.label}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white underline hover:text-indigo-300 transition"
              >
                {link.url}
              </a>
            </div>

            {link.author === currentUserNickname && (
              <button
                onClick={() => handleDelete(link.id)}
                className="btn btn-outline btn-xs border-white/20 text-white hover:border-red-400 hover:text-red-400 transition"
              >
                <Trash2 size={14} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
