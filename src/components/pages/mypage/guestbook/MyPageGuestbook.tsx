import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useUserStore } from "../../../../stores/useUserStore";
import { MessageCircle } from "lucide-react";

interface GuestbookEntry {
  id: string;
  fromUid: string;
  fromNickname: string;
  content: string;
  createdAt: Date;
}

export default function MyPageGuestbook() {
  const user = useUserStore((state) => state.user);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  const toUid = user?.uid || ""; // 현재 로그인한 사용자의 마이페이지

  useEffect(() => {
    const fetch = async () => {
      if (!toUid) return;
      const q = query(
        collection(db, `guestbooks/${toUid}/entries`),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as GuestbookEntry[];
      setEntries(data);
      setLoading(false);
    };
    fetch();
  }, [toUid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !newEntry.trim()) return;

    const ref = collection(db, `guestbooks/${toUid}/entries`);
    const newDoc = await addDoc(ref, {
      fromUid: user.uid,
      fromNickname: user.nickname || "익명",
      content: newEntry,
      createdAt: new Date(),
    });

    setEntries([
      {
        id: newDoc.id,
        fromUid: user.uid,
        fromNickname: user.nickname || "익명",
        content: newEntry,
        createdAt: new Date(),
      },
      ...entries,
    ]);
    setNewEntry("");
  };

  const handleDelete = async (id: string) => {
    if (!user?.uid || !confirm("정말로 삭제하시겠습니까?")) return;

    await deleteDoc(doc(db, `guestbooks/${toUid}/entries`, id));
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleEditStart = (entry: GuestbookEntry) => {
    setEditingId(entry.id);
    setEditText(entry.content);
  };

  const handleEditSave = async () => {
    if (!user?.uid || !editingId) return;

    const ref = doc(db, `guestbooks/${toUid}/entries`, editingId);
    await updateDoc(ref, { content: editText });
    setEntries(
      entries.map((e) => (e.id === editingId ? { ...e, content: editText } : e))
    );
    setEditingId(null);
    setEditText("");
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white border-b border-white/10 pb-2">
        <MessageCircle className="w-5 h-5 text-indigo-300" />
        방명록
      </h2>

      {loading ? (
        <p className="text-sm text-gray-400">로딩 중...</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <span className="font-semibold text-indigo-300">
                  {item.fromNickname}
                </span>
                {item.fromUid === user?.uid && (
                  <div className="flex gap-2">
                    {editingId === item.id ? (
                      <button
                        onClick={handleEditSave}
                        className="btn btn-outline btn-xs text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
                      >
                        저장
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditStart(item)}
                        className="btn btn-outline btn-xs text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
                      >
                        수정
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-outline btn-xs text-white border-white/20 hover:text-red-400 hover:border-red-400"
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
                <p className="mt-2 whitespace-pre-wrap">{item.content}</p>
              )}
              <div className="mt-2 text-xs text-gray-400">
                {item.createdAt.toLocaleDateString("ko-KR")}
              </div>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="메시지를 입력하세요"
            rows={4}
            className="w-full rounded-md border border-white/10 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400"
          />
          <div className="text-right">
            <button
              type="submit"
              className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
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
