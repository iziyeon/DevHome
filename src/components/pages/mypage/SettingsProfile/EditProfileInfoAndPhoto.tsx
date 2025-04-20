import { useRef, useState, ChangeEvent } from "react";
import defaultProfile from "../../../../assets/layout/default.jpg";

export default function EditProfileInfoAndPhoto() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(defaultProfile);
  const [nickname, setNickname] = useState("홍길동");
  const [bio, setBio] = useState("기록하고 공유하며 성장합니다.");
  const [position, setPosition] = useState("프론트엔드");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const handleSave = () => alert("프로필이 저장되었습니다.");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">프로필 수정</h3>

      <div className="grid gap-6 md:grid-cols-[180px_1fr]">
        <div className="flex flex-col items-center gap-4">
          <img
            src={preview}
            alt="프로필 미리보기"
            className="h-24 w-24 rounded-full border border-white/20 object-cover"
          />
          <button
            onClick={triggerFileInput}
            className="btn btn-outline btn-sm text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition"
          >
            사진 선택
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-300">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input input-bordered w-full bg-white/10 text-white border-white/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">소개</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="textarea textarea-bordered w-full bg-white/10 text-white border-white/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">포지션</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="select select-bordered w-full bg-white/10 text-white border-white/10"
            >
              <option className="text-black">프론트엔드</option>
              <option className="text-black">백엔드</option>
              <option className="text-black">풀스택</option>
              <option className="text-black">기획자</option>
              <option className="text-black">디자이너</option>
            </select>
          </div>
        </div>
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
