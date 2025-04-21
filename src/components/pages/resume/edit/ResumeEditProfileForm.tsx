import { ResumeProfile } from "../../../../types/resumeTypes";

interface Props {
  profile: ResumeProfile;
  onChange: (data: ResumeProfile) => void;
}

export default function ResumeEditProfileForm({ profile, onChange }: Props) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold text-indigo-300">프로필</h2>
      <input
        className="input input-bordered w-full bg-transparent text-white"
        placeholder="이름"
        value={profile.name}
        onChange={(e) => onChange({ ...profile, name: e.target.value })}
      />
      <input
        className="input input-bordered w-full bg-transparent text-white"
        placeholder="직무 (예: 프론트엔드 개발자)"
        value={profile.role}
        onChange={(e) => onChange({ ...profile, role: e.target.value })}
      />
      <input
        className="input input-bordered w-full bg-transparent text-white"
        placeholder="이메일"
        value={profile.email}
        onChange={(e) => onChange({ ...profile, email: e.target.value })}
      />
      <input
        className="input input-bordered w-full bg-transparent text-white"
        placeholder="한 줄 소개"
        value={profile.tagline}
        onChange={(e) => onChange({ ...profile, tagline: e.target.value })}
      />
      <input
        className="input input-bordered w-full bg-transparent text-white"
        placeholder="프로필 이미지 URL"
        value={profile.image}
        onChange={(e) => onChange({ ...profile, image: e.target.value })}
      />
    </div>
  );
}
