import { career } from "../../../data/resumeData";

export default function ResumeCareerSection() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-4">경력</h2>
        <ul className="space-y-4">
          {career.experience.map((e) => (
            <li key={e.company}>
              <p className="font-bold">
                {e.company} | {e.position}
              </p>
              <p className="text-sm text-white/60">{e.period}</p>
              <p className="text-white/80 mt-1">{e.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">교육 / 학력</h2>
        <ul className="space-y-4">
          {career.education.map((edu) => (
            <li key={edu.title}>
              <p className="font-bold">{edu.title}</p>
              <p className="text-sm text-white/60">
                {edu.org} | {edu.period}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">링크</h2>
        <ul className="space-y-2">
          {career.links.map((link) => (
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
      </div>
    </div>
  );
}
