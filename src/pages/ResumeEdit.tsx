import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import ResumeEditProfileForm from "../components/pages/resume/edit/ResumeEditProfileForm";
import ResumeEditTechStackForm from "../components/pages/resume/edit/ResumeEditTechStackForm";
import ResumeEditProjectsForm from "../components/pages/resume/edit/ResumeEditProjectsForm";
import ResumeEditCareerForm from "../components/pages/resume/edit/ResumeEditCareerForm";
import { ResumeData } from "../types/resumeTypes";

export default function ResumeEdit() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const [resumeData, setResumeData] = useState<ResumeData>({
    profile: {
      name: user?.name || "",
      role: user?.position || "",
      email: user?.email || "",
      tagline: user?.bio || "",
      image: user?.profileImage || "",
    },
    techStack: {
      frontend: [],
      backend: [],
      etc: [],
    },
    projects: [],
    career: {
      experience: [],
      education: [],
      links: [],
    },
  });

  const handleSave = () => {
    localStorage.setItem("resume", JSON.stringify(resumeData));
    alert("이력서가 저장되었습니다.");
    navigate("/resume");
  };

  return (
    <section className="max-w-4xl mx-auto py-16 px-4 text-white space-y-16">
      <h1 className="text-3xl font-bold text-center">이력서 수정</h1>

      <ResumeEditProfileForm
        profile={resumeData.profile}
        onChange={(data) => setResumeData({ ...resumeData, profile: data })}
      />
      <ResumeEditTechStackForm
        techStack={resumeData.techStack}
        onChange={(data) => setResumeData({ ...resumeData, techStack: data })}
      />
      <ResumeEditProjectsForm
        projects={resumeData.projects}
        onChange={(data) => setResumeData({ ...resumeData, projects: data })}
      />
      <ResumeEditCareerForm
        career={resumeData.career}
        onChange={(data) => setResumeData({ ...resumeData, career: data })}
      />

      <div className="text-center pt-8">
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-outline rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
        >
          이력서 저장하기
        </button>
      </div>
    </section>
  );
}
