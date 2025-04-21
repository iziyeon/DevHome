import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import type { UseReactToPrintOptions } from "react-to-print";
import { Pencil, FilePlus } from "lucide-react";
import { ResumeData } from "../types/resumeTypes";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  etc: "기타 기술",
};

export default function Resume() {
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("resume");
    if (saved) {
      setResume(JSON.parse(saved));
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: (): HTMLElement | null => resumeRef.current,
    documentTitle: "이력서",
  } as UseReactToPrintOptions);

  return (
    <section className="max-w-4xl mx-auto py-16 px-4 text-white space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">이력서</h1>
        <button
          type="button"
          onClick={() => navigate("/resume/edit")}
          className="btn btn-sm btn-outline text-white border-white/30 hover:border-indigo-300 flex items-center gap-2"
        >
          {resume ? <Pencil size={16} /> : <FilePlus size={16} />}
          {resume ? "수정하기" : "작성하기"}
        </button>
      </div>

      {!resume ? (
        <p className="text-white text-center mt-16">
          이력서가 없습니다. 작성하기 버튼을 눌러 시작해보세요.
        </p>
      ) : (
        <>
          <div ref={resumeRef} className="space-y-12">
            <div className="text-center space-y-3">
              <img
                src={resume.profile.image}
                alt="profile"
                className="w-24 h-24 rounded-full mx-auto border border-white/20"
              />
              <h2 className="text-xl font-semibold">{resume.profile.name}</h2>
              <p className="text-white/60">{resume.profile.role}</p>
              <p className="text-sm text-white/40">{resume.profile.email}</p>
              <p className="text-white/80 mt-2">{resume.profile.tagline}</p>
            </div>

            {Object.values(resume.techStack).some((items) =>
              (items as string[]).some((item) => item.trim() !== "")
            ) && (
              <div>
                <h2 className="text-xl font-bold text-indigo-300 mb-2">
                  기술 스택
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-white/80">
                  {Object.entries(resume.techStack)
                    .filter(([, items]) =>
                      (items as string[]).some((item) => item.trim() !== "")
                    )
                    .map(([category, items]) => (
                      <div key={category}>
                        <h3 className="font-semibold capitalize mb-1">
                          {categoryLabels[category] || category}
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {(items as string[]).map((item, i) =>
                            item.trim() !== "" ? <li key={i}>{item}</li> : null
                          )}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {resume.projects.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-indigo-300 mb-2">
                  프로젝트
                </h2>
                <div className="space-y-6">
                  {resume.projects.map((p, i) => (
                    <div
                      key={i}
                      className="bg-white/5 p-4 rounded-xl space-y-2 border border-white/10"
                    >
                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="text-sm text-white/70">{p.description}</p>
                      <p className="text-sm text-white/50">[ {p.stack} ]</p>
                      <p className="text-sm text-white/80">{p.role}</p>
                      <div className="flex gap-4 text-sm">
                        {p.deployUrl && (
                          <a
                            href={p.deployUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-indigo-300"
                          >
                            배포 링크
                          </a>
                        )}
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-indigo-300"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.career.experience.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-indigo-300 mb-2">경력</h2>
                <div className="space-y-4">
                  {resume.career.experience.map((e, i) => (
                    <div key={i}>
                      <p className="font-semibold">
                        {e.company} | {e.position}
                      </p>
                      <p className="text-sm text-white/50">{e.period}</p>
                      <p className="text-sm text-white/70">{e.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.career.education.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-indigo-300 mb-2">교육</h2>
                <div className="space-y-4">
                  {resume.career.education.map((e, i) => (
                    <div key={i}>
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-sm text-white/50">
                        {e.org} | {e.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.career.links.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-indigo-300 mb-2">링크</h2>
                <ul className="space-y-2 text-sm">
                  {resume.career.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-indigo-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-center pt-6">
            <button
              type="button"
              onClick={() => handlePrint?.()}
              className="btn btn-outline text-white border-white/20 rounded-full hover:border-indigo-300 hover:text-indigo-300"
            >
              PDF로 출력하기
            </button>
          </div>
        </>
      )}
    </section>
  );
}
