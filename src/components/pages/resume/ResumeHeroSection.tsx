import { useUserStore } from "../../../stores/useUserStore";
import defaultProfile from "../../../assets/layout/default.jpg";
import { profile as resumeProfile } from "../../../data/resumeData";

export default function ResumeHeroSection() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="text-center space-y-4">
      <img
        src={resumeProfile.image || user?.profileImage || defaultProfile}
        alt="Profile"
        className="w-28 h-28 rounded-full mx-auto border border-white/30 shadow-sm object-cover"
      />
      <div>
        <h2 className="text-2xl font-semibold">
          {resumeProfile.name || user?.name}
        </h2>
        <p className="text-white/70">{resumeProfile.role || user?.position}</p>
        <p className="text-white/60 text-sm mt-1">
          {resumeProfile.email || user?.email}
        </p>
      </div>
      <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
        {resumeProfile.tagline || user?.bio}
      </p>
    </div>
  );
}
