import { ExternalLink } from "lucide-react";
import { useUserStore } from "../../../../stores/useUserStore";

export default function MyQuickLinksPanel() {
  const user = useUserStore((state) => state.user);
  const snsLinks = user?.snsLinks || {};
  const snsLinksVisible = user?.snsLinksVisible || {};

  const validLinks = Object.entries(snsLinks)
    .filter(([key, url]) => {
      const isVisible = snsLinksVisible[key];
      const hasUrl = url?.trim();
      return hasUrl && isVisible !== false; // ❗️undefined는 true로 간주
    })
    .map(([key, url]) => ({
      id: key,
      label: key,
      url: url!,
    }));

  if (validLinks.length === 0) return null;

  return (
    <section className="space-y-4 animate-fade-in">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white border-b border-white/10 pb-2">
        <ExternalLink className="w-5 h-5 text-indigo-300" />
        바로가기
      </h3>

      <ul className="grid sm:grid-cols-2 gap-4">
        {validLinks.map((link) => (
          <li
            key={link.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-sm backdrop-blur-sm"
          >
            <p className="font-semibold text-indigo-300 mb-1">{link.label}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline hover:text-indigo-300 transition"
            >
              {link.url}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
