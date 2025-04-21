import { ResumeData } from "../../../types/resumeTypes";

interface Props {
  resume: ResumeData;
}

export default function ResumePrintView({ resume }: Props) {
  return (
    <div
      style={{
        width: "800px",
        padding: "40px",
        backgroundColor: "#ffffff",
        color: "#111111",
        fontFamily: "sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
      }}
    >
      {/* 프로필 */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img
          src={resume.profile.image}
          alt="profile"
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "9999px",
            border: "1px solid #e5e7eb",
            objectFit: "cover",
          }}
        />
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "12px" }}>
          {resume.profile.name}
        </h2>
        <p style={{ color: "#6b7280" }}>{resume.profile.role}</p>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>
          {resume.profile.email}
        </p>
        <p style={{ marginTop: "8px", color: "#374151" }}>
          {resume.profile.tagline}
        </p>
      </div>

      {/* 기술 스택 */}
      {Object.values(resume.techStack).some((items) =>
        (items as string[]).some((item) => item.trim())
      ) && (
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#6366f1",
              marginBottom: "12px",
            }}
          >
            기술 스택
          </h3>
          <div style={{ display: "flex", gap: "32px" }}>
            {Object.entries(resume.techStack).map(([category, items]) =>
              (items as string[]).some((item) => item.trim()) ? (
                <div key={category} style={{ flex: 1 }}>
                  <strong style={{ display: "block", marginBottom: "4px" }}>
                    {category}
                  </strong>
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {(items as string[]).map((item: string, i: number) =>
                      item ? <li key={i}>{item}</li> : null
                    )}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* 프로젝트 */}
      {resume.projects.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#6366f1",
              marginBottom: "12px",
            }}
          >
            프로젝트
          </h3>
          {resume.projects.map((p, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <strong style={{ fontSize: "14px" }}>{p.title}</strong>
              <p style={{ color: "#4b5563" }}>{p.description}</p>
              <p style={{ color: "#6b7280" }}>[{p.stack}]</p>
              <p style={{ color: "#374151" }}>{p.role}</p>
              <div style={{ marginTop: "8px" }}>
                {p.deployUrl && (
                  <p>
                    <a
                      href={p.deployUrl}
                      style={{ color: "#6366f1", textDecoration: "underline" }}
                    >
                      배포 링크
                    </a>
                  </p>
                )}
                {p.githubUrl && (
                  <p>
                    <a
                      href={p.githubUrl}
                      style={{ color: "#6366f1", textDecoration: "underline" }}
                    >
                      GitHub
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 경력 */}
      {resume.career.experience.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#6366f1",
              marginBottom: "12px",
            }}
          >
            경력
          </h3>
          {resume.career.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <p style={{ fontWeight: "bold" }}>
                {e.company} | {e.position}
              </p>
              <p style={{ color: "#6b7280" }}>{e.period}</p>
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 교육 */}
      {resume.career.education.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#6366f1",
              marginBottom: "12px",
            }}
          >
            교육
          </h3>
          {resume.career.education.map((e, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <p style={{ fontWeight: "bold" }}>{e.title}</p>
              <p style={{ color: "#6b7280" }}>
                {e.org} | {e.period}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 링크 */}
      {resume.career.links.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#6366f1",
              marginBottom: "12px",
            }}
          >
            링크
          </h3>
          <ul style={{ paddingLeft: "20px" }}>
            {resume.career.links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  style={{ color: "#6366f1", textDecoration: "underline" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
