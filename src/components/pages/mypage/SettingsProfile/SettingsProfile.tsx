import { useState } from "react";
import EditProfileInfoAndPhoto from "./EditProfileInfoAndPhoto";
import EditIntroBanner from "./EditIntroBanner";
import EditSnsLinks from "./EditSnsLinks";
import EditCategoryLabels from "./EditCategoryLabels";

const tabs = [
  { key: "profile", label: "프로필" },
  { key: "intro", label: "Intro 배너" },
  { key: "category", label: "카테고리" },
  { key: "sns", label: "SNS 링크" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function SettingsProfile() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 md:px-6 py-10 md:py-14 text-white animate-fade-in md:grid-cols-[220px_1fr]">
      <nav className="flex flex-row md:flex-col gap-2 text-sm text-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-md px-4 py-2 text-left transition ${
              activeTab === tab.key
                ? "bg-white/10 text-indigo-300 font-semibold"
                : "hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="space-y-6">
        {activeTab === "profile" && <EditProfileInfoAndPhoto />}
        {activeTab === "intro" && <EditIntroBanner />}
        {activeTab === "category" && <EditCategoryLabels />}
        {activeTab === "sns" && <EditSnsLinks />}
      </section>
    </div>
  );
}
