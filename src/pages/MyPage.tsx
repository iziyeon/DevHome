import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import MyProfileSidebar from "../components/pages/mypage/sidebar/MyProfileSidebar";
import type { QuickLink } from "../components/pages/mypage/quicklinks/MyPageQuickLinks";

const DEFAULT_QUICK_LINKS: QuickLink[] = [
  {
    id: "l1",
    label: "GitHub",
    url: "https://github.com/yeon",
    author: "yeon",
  },
  {
    id: "l2",
    label: "Notion",
    url: "https://notion.so/yeon",
    author: "yeon",
  },
];

export default function MyPage() {
  const { username } = useParams<{ username: string }>();
  const [quickLinks, setQuickLinks] =
    useState<QuickLink[]>(DEFAULT_QUICK_LINKS);

  if (!username) {
    return (
      <div className="py-20 text-center text-white">
        유저 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14 grid gap-8 md:gap-10 text-white animate-fade-in grid-cols-1 md:grid-cols-[240px_1fr]">
      <div className="md:sticky md:top-20">
        <MyProfileSidebar username={username} />
      </div>
      <div className="space-y-6 md:space-y-8">
        <Outlet context={{ username, quickLinks, setQuickLinks }} />
      </div>
    </div>
  );
}
