import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import MyProfileSidebar from "./MyProfileSidebar";
import type { QuickLink } from "../MyQuickLinksPanel";

// 초기 링크 정보 상수로 분리
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

export default function MyPageLayout() {
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
    <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 text-white animate-fade-in grid-cols-1 md:grid-cols-[260px_1fr]">
      <MyProfileSidebar username={username} />
      <div className="space-y-8">
        <Outlet context={{ username, quickLinks, setQuickLinks }} />
      </div>
    </div>
  );
}
