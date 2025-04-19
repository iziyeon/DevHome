import { useState } from "react";
import { MessageSquare } from "lucide-react";

interface MyGuestbookListProps {
  username: string;
}

const dummyGuestbook = [
  { id: "1", from: "방문자A", message: "홈이 너무 멋져요!" },
  { id: "2", from: "방문자B", message: "이력서 잘 봤습니다!" },
];

export default function MyGuestbookList({ username }: MyGuestbookListProps) {
  const [guestbook, setGuestbook] = useState(dummyGuestbook);
  const [message, setMessage] = useState("");

  const isLoggedIn = true;
  const displayName = "홍길동";

  const handleSubmit = () => {
    if (!message.trim()) return;
    setGuestbook([
      ...guestbook,
      { id: Date.now().toString(), from: displayName, message },
    ]);
    setMessage("");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white border-b border-white/10 pb-1">
        <MessageSquare size={18} />
        {username}님의 방명록
      </h3>

      {isLoggedIn && (
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-sm">
          <p className="text-sm text-gray-300">
            작성자:{" "}
            <span className="font-semibold text-white">{displayName}</span>
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="w-full h-15 rounded-md border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none"
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

      <div className="space-y-4">
        {guestbook.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-sm backdrop-blur-sm"
          >
            <p>
              <span className="font-semibold text-gray-200">{entry.from}:</span>{" "}
              {entry.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
