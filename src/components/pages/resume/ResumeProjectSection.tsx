import { useUserStore } from "../../../stores/useUserStore";

export default function ResumeProjectSection() {
  const user = useUserStore((state) => state.user);
  const projects = user?.projects || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">프로젝트</h2>
      {projects.length === 0 ? (
        <p className="text-sm text-white/60">등록된 프로젝트가 없습니다.</p>
      ) : (
        <div className="space-y-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="border border-white/10 rounded-xl p-4 bg-white/5"
            >
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-white/70 mb-1">{p.description}</p>
              <p className="text-white/60 text-sm mb-2">[{p.stack}]</p>
              <p className="text-white/80 mb-2">{p.role}</p>
              <div className="flex gap-4 text-sm">
                {p.deployUrl && (
                  <a
                    href={p.deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-indigo-300"
                  >
                    배포 링크
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-indigo-300"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
