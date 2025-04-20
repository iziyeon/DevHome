import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ExternalLink, Trash2, Pencil } from "lucide-react";
import type { QuickLink } from "./MyQuickLinksPanel";

interface OutletContext {
  username: string;
  quickLinks: QuickLink[];
  setQuickLinks: React.Dispatch<React.SetStateAction<QuickLink[]>>;
}

export default function MyPageQuickLinks() {
  const { quickLinks, setQuickLinks } = useOutletContext<OutletContext>();

  const [editId, setEditId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setQuickLinks((prev) => prev.filter((link) => link.id !== id));
    }
  };

  const handleEditStart = (link: QuickLink) => {
    setEditId(link.id);
    setEditLabel(link.label);
    setEditUrl(link.url);
  };

  const handleEditSave = () => {
    setQuickLinks((prev) =>
      prev.map((link) =>
        link.id === editId ? { ...link, label: editLabel, url: editUrl } : link
      )
    );
    setEditId(null);
    setEditLabel("");
    setEditUrl("");
  };

  const handleAdd = () => {
    if (!newLabel.trim() || !newUrl.trim()) return;

    const newLink: QuickLink = {
      id: Math.random().toString(36).slice(2, 9),
      label: newLabel,
      url: newUrl,
      author: "yeon",
    };

    setQuickLinks((prev) => [...prev, newLink]);
    setNewLabel("");
    setNewUrl("");
  };

  return (
    <section className="space-y-8 animate-fade-in">
      <h2 className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-1">
        <ExternalLink className="w-5 h-5 text-white" />
        바로가기 링크
      </h2>

      <ul className="space-y-4">
        {quickLinks.map((link) => (
          <li
            key={link.id}
            className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-sm backdrop-blur-sm"
          >
            <div className="w-full space-y-1">
              {editId === link.id ? (
                <>
                  <input
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="input input-sm w-full mb-1 text-white bg-[#1f2937] border-white/10"
                    placeholder="링크 이름"
                  />
                  <input
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="input input-sm w-full text-white bg-[#1f2937] border-white/10"
                    placeholder="https://"
                  />
                  <div className="mt-2 text-right">
                    <button
                      onClick={handleEditSave}
                      className="btn btn-outline btn-xs text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
                    >
                      저장
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold text-indigo-300">{link.label}</p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white underline hover:text-indigo-300 transition"
                  >
                    {link.url}
                  </a>
                </>
              )}
            </div>

            {editId !== link.id && (
              <div className="ml-2 flex items-center gap-2">
                <button
                  onClick={() => handleEditStart(link)}
                  className="btn btn-outline btn-xs flex items-center gap-1 text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
                >
                  <Pencil size={14} />
                  수정
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="btn btn-outline btn-xs text-white border-white/20 hover:text-red-400 hover:border-red-400 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-white">링크 추가</h4>
        <input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="링크 이름"
          className="input input-sm w-full text-white bg-[#1f2937] border-white/10"
        />
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://"
          className="input input-sm w-full text-white bg-[#1f2937] border-white/10"
        />
        <div className="text-right">
          <button
            onClick={handleAdd}
            className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
          >
            등록
          </button>
        </div>
      </div>
    </section>
  );
}
