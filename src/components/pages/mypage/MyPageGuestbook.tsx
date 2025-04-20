import { useState } from "react";
// import { useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const isLoggedIn = true;
const currentUserNickname = "yeon";

interface GuestbookEntry {
  id: string;
  author: string;
  content: string;
  date: string;
}

export default function MyPageGuestbook() {
  // const { username: _username } = useParams<{ username: string }>(); // ⚠️ 추후 Firestore용

  const [entries, setEntries] = useState<GuestbookEntry[]>([
    {
      id: "g1",
      author: "guest123",
      content: "안녕하세요! DevHome 너무 멋져요 ✨",
      date: "2025.04.17",
    },
    {
      id: "g2",
      author: "yeon",
      content: "오늘도 기록 시작합니다 :)",
      date: "2025.04.18",
    },
  ]);

  const [newEntry, setNewEntry] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    const newComment: GuestbookEntry = {
      id: Math.random().toString(36).slice(2, 9),
      author: currentUserNickname,
      content: newEntry,
      date: new Date().toISOString().slice(0, 10),
    };

    setEntries((prev) => [...prev, newComment]);
    setNewEntry("");
  };

  const handleDelete = (id: string) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const handleEditStart = (entry: GuestbookEntry) => {
    setEditingId(entry.id);
    setEditText(entry.content);
  };

  const handleEditSave = () => {
    setEntries((prev) =>
      prev.map((e) => (e.id === editingId ? { ...e, content: editText } : e))
    );
    setEditingId(null);
    setEditText("");
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <h2 className="flex items-center gap-2 text-xl font-bold text-white">
        <MessageCircle className="w-5 h-5 text-primary" />
        방명록
      </h2>

      {/* 메시지 목록 */}
      <ul className="space-y-4">
        {entries.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white"
          >
            <div className="flex items-start justify-between">
              <div className="font-semibold text-indigo-300">{item.author}</div>

              {item.author === currentUserNickname && (
                <div className="flex gap-2">
                  {editingId === item.id ? (
                    <button
                      onClick={handleEditSave}
                      className="btn btn-outline btn-xs text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditStart(item)}
                      className="btn btn-outline btn-xs text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
                    >
                      수정
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-outline btn-xs text-white border-white/20 hover:text-red-400 hover:border-red-400 transition"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>

            {editingId === item.id ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="mt-2 w-full rounded px-2 py-1 text-sm text-white bg-[#1f2937] border border-white/10"
              />
            ) : (
              <div className="mt-2 whitespace-pre-wrap">{item.content}</div>
            )}
            <div className="mt-2 text-xs text-gray-400">{item.date}</div>
          </li>
        ))}
      </ul>

      {/* 입력 폼 */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="메시지를 입력하세요"
            rows={4}
            className="w-full rounded-md border border-white/10 bg-[#1f2937] px-4 py-2 text-white placeholder-white/40"
          />
          <div className="text-right">
            <button
              type="submit"
              className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
            >
              등록
            </button>
          </div>
        </form>
      ) : (
        <div className="text-sm italic text-gray-400">
          방명록을 남기려면 로그인해주세요.
        </div>
      )}
    </section>
  );
}
