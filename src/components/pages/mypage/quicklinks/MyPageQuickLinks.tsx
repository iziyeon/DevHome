import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ExternalLink, Trash2, Pencil } from "lucide-react";
import { useUserStore } from "../../../../stores/useUserStore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

interface QuickLink {
  id: string;
  label: string;
  url: string;
}

interface OutletContext {
  username: string;
  quickLinks: QuickLink[];
  setQuickLinks: React.Dispatch<React.SetStateAction<QuickLink[]>>;
}

export default function MyPageQuickLinks() {
  const { quickLinks, setQuickLinks } = useOutletContext<OutletContext>();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [editId, setEditId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [visibleMap, setVisibleMap] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const initialVisible = user?.snsLinksVisible || {};
    const initialLinks = Object.entries(user?.snsLinks || {})
      .filter(([, url]) => url?.trim())
      .map(([label, url]) => {
        const id = label + Date.now(); // unique id
        setVisibleMap((prev) => ({
          ...prev,
          [label]: initialVisible[label] ?? true,
        }));
        return {
          id,
          label,
          url: url || "",
        };
      });
    setQuickLinks(initialLinks);
  }, [user?.snsLinks, user?.snsLinksVisible, setQuickLinks]);

  const handleToggleVisible = (label: string) => {
    setVisibleMap((prev) => ({ ...prev, [label]: !prev[label] }));
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

  const handleDelete = (id: string) => {
    const target = quickLinks.find((l) => l.id === id);
    if (!target) return;
    setQuickLinks((prev) => prev.filter((link) => link.id !== id));
    setVisibleMap((prev) => {
      const copy = { ...prev };
      delete copy[target.label];
      return copy;
    });
  };

  const handleAdd = () => {
    if (!newLabel.trim() || !newUrl.trim()) return;
    const id = newLabel + Date.now();
    const newLink: QuickLink = {
      id,
      label: newLabel.trim(),
      url: newUrl.trim(),
    };
    setQuickLinks((prev) => [...prev, newLink]);
    setVisibleMap((prev) => ({ ...prev, [newLink.label]: true }));
    setNewLabel("");
    setNewUrl("");
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    const newSnsLinks = Object.fromEntries(
      quickLinks.map((link) => [link.label, link.url])
    );
    const newVisible = Object.fromEntries(
      quickLinks.map((link) => [link.label, visibleMap[link.label] ?? true])
    );

    const userRef = doc(db, "users", user.uid);
    const newUserData = {
      ...user,
      snsLinks: newSnsLinks,
      snsLinksVisible: newVisible,
      updatedAt: new Date(),
    };

    await setDoc(userRef, newUserData);
    setUser(newUserData);
    alert("저장되었습니다 ✅");
  };

  return (
    <section className="space-y-8 animate-fade-in">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white border-b border-white/10 pb-2">
        <ExternalLink className="w-5 h-5 text-indigo-300" />
        바로가기 링크 관리
      </h2>

      <ul className="space-y-4">
        {quickLinks.map((link) => {
          const isVisible = visibleMap[link.label] ?? true;
          return (
            <li
              key={link.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-sm backdrop-blur-sm space-y-2"
            >
              {editId === link.id ? (
                <>
                  <input
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="input input-sm w-full bg-[#1f2937] border-white/10 text-white"
                    placeholder="링크 이름"
                  />
                  <input
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="input input-sm w-full bg-[#1f2937] border-white/10 text-white"
                    placeholder="https://"
                  />
                  <div className="text-right">
                    <button
                      onClick={handleEditSave}
                      className="btn btn-outline btn-xs text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
                    >
                      저장
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold text-indigo-300">
                    {link.label || "제목 없음"}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline hover:text-indigo-300 transition"
                  >
                    {link.url || "링크 없음"}
                  </a>
                  <div className="flex items-center justify-between gap-2 text-xs pt-1">
                    <span>메인화면에 표시</span>
                    <button
                      onClick={() => handleToggleVisible(link.label)}
                      className={`btn btn-xs px-4 ${
                        isVisible
                          ? "text-indigo-300 border-indigo-300"
                          : "text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
                      }`}
                    >
                      {isVisible ? "표시됨" : "숨김"}
                    </button>
                  </div>
                </>
              )}

              {editId !== link.id && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleEditStart(link)}
                    className="btn btn-outline btn-xs text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
                  >
                    <Pencil size={14} />
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="btn btn-outline btn-xs text-white border-white/20 hover:text-red-400 hover:border-red-400"
                  >
                    <Trash2 size={14} />
                    삭제
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-white">링크 추가</h4>
        <input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="링크 이름"
          className="input input-sm w-full bg-[#1f2937] border-white/10 text-white"
        />
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://"
          className="input input-sm w-full bg-[#1f2937] border-white/10 text-white"
        />
        <div className="text-right">
          <button
            onClick={handleAdd}
            className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
          >
            등록
          </button>
        </div>
      </div>

      <div className="text-right pt-4">
        <button
          onClick={handleSave}
          className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
        >
          저장
        </button>
      </div>
    </section>
  );
}
