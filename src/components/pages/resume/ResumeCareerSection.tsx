import { useUserStore } from "../../../stores/useUserStore";

export default function ResumeCareerSection() {
  const user = useUserStore((state) => state.user);
  const experience = user?.experience || [];
  const education = user?.education || [];
  const links = user?.links || [];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-4">경력</h2>
        {experience.length === 0 ? (
          <p className="text-sm text-white/60">경력 정보가 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {experience.map((e) => (
              <li key={e.company}>
                <p className="font-bold">
                  {e.company} | {e.position}
                </p>
                <p className="text-sm text-white/60">{e.period}</p>
                <p className="text-white/80 mt-1">{e.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">교육 / 학력</h2>
        {education.length === 0 ? (
          <p className="text-sm text-white/60">학력 정보가 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {education.map((edu) => (
              <li key={edu.title}>
                <p className="font-bold">{edu.title}</p>
                <p className="text-sm text-white/60">
                  {edu.org} | {edu.period}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">링크</h2>
        {links.length === 0 ? (
          <p className="text-sm text-white/60">링크가 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-indigo-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
