import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useUserStore } from "../../../../stores/useUserStore";
import { MessageSquare } from "lucide-react";

interface MyGuestbookListProps {
  username: string;
}

interface GuestbookEntry {
  id: string;
  fromUid: string;
  fromNickname: string;
  content: string;
  createdAt: Timestamp;
}

export default function MyGuestbookList({ username }: MyGuestbookListProps) {
  const user = useUserStore((state) => state.user);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState("");
  const isLoggedIn = !!user;

  const toUid = user?.uid || "";

  useEffect(() => {
    const fetch = async () => {
      if (!toUid) return;
      const ref = collection(db, `guestbooks/${toUid}/entries`);
      const q = query(ref, orderBy("createdAt", "desc"), limit(3));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GuestbookEntry, "id">),
      }));
      setGuestbook(data);
    };
    fetch();
  }, [toUid]);

  const handleSubmit = async () => {
    if (!message.trim() || !user?.uid || !user.nickname) return;

    const entry = {
      fromUid: user.uid,
      fromNickname: user.nickname,
      content: message,
      createdAt: new Date(),
    };

    const ref = collection(db, `guestbooks/${toUid}/entries`);
    const docRef = await addDoc(ref, entry);

    setGuestbook((prev) => [
      {
        id: docRef.id,
        ...entry,
        createdAt: Timestamp.fromDate(entry.createdAt),
      },
      ...prev.slice(0, 2), // 최대 3개 유지
    ]);
    setMessage("");
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white border-b border-white/10 pb-2">
        <MessageSquare size={18} className="text-indigo-300" />
        {username}님의 방명록
      </h3>

      {isLoggedIn && (
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-sm">
          <p className="text-sm text-gray-300">
            작성자:{" "}
            <span className="font-semibold text-white">
              {user.nickname || "익명"}
            </span>
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="w-full h-20 rounded-md border border-white/10 bg-[#1f2937] p-3 text-sm text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none"
          />
          <div className="text-right">
            <button
              onClick={handleSubmit}
              className="btn btn-outline btn-sm text-white border-white/20 hover:border-indigo-300 hover:text-indigo-300 transition"
            >
              등록
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-4">
        {guestbook.map((entry) => (
          <li
            key={entry.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-sm backdrop-blur-sm"
          >
            <p className="font-semibold text-indigo-300 mb-1">
              {entry.fromNickname}
            </p>
            <p className="whitespace-pre-wrap">{entry.content}</p>
            <p className="text-xs text-gray-400 mt-2">
              {entry.createdAt.toDate().toLocaleDateString("ko-KR")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
