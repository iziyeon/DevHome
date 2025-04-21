import { profile } from "../../../data/resumeData";

export default function ResumeHeroSection() {
  return (
    <div className="text-center space-y-4">
      <img
        src={profile.image}
        alt="Profile"
        className="w-28 h-28 rounded-full mx-auto border border-white/30 shadow-sm"
      />
      <div>
        <h2 className="text-2xl font-semibold">{profile.name}</h2>
        <p className="text-white/70">{profile.role}</p>
        <p className="text-white/60 text-sm mt-1">{profile.email}</p>
      </div>
      <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
        {profile.tagline}
      </p>
    </div>
  );
}
