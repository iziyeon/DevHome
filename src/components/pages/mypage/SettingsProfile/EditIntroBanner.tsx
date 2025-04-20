// src/components/pages/mypage/SettingsProfile/EditIntroBanner.tsx
import { useState } from "react";

export default function EditIntroBanner() {
  const [interest, setInterest] = useState("웹 애니메이션");
  const [book, setBook] = useState("개발자 글쓰기");
  const [goal, setGoal] = useState("한 줄 커밋이라도 하기");

  const handleSave = () => {
    // 나중에 Firestore 연동
    alert("Intro 정보가 저장되었습니다.");
  };

  const fields = [
    {
      key: "interest",
      label: "현재 관심사",
      placeholder: "예: 웹 애니메이션, 글쓰기",
      value: interest,
      onChange: setInterest,
    },
    {
      key: "book",
      label: "요즘 읽는 책",
      placeholder: "예: 개발자 글쓰기, 삶의 태도",
      value: book,
      onChange: setBook,
    },
    {
      key: "goal",
      label: "오늘의 목표",
      placeholder: "예: 포스트 하나 작성, 한 줄 커밋",
      value: goal,
      onChange: setGoal,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Intro 배너 수정</h3>

      <div className="space-y-4">
        {fields.map(({ key, label, value, onChange, placeholder }) => (
          <div key={key}>
            <label className="mb-1 block text-sm text-gray-300">{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
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
