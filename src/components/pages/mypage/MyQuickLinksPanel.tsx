import { LucideIcon } from "lucide-react";

interface LinkItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface MyQuickLinksPanelProps {
  links: LinkItem[];
}

export default function MyQuickLinksPanel({ links }: MyQuickLinksPanelProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-md font-semibold text-white border-b border-white/10 pb-1">
        바로가기
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={link.onClick}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-white text-sm hover:border-indigo-300 hover:text-indigo-300 transition backdrop-blur-sm shadow-sm"
          >
            <link.icon className="h-6 w-6" />
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
