import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

import Home from "../pages/Home";
import Community from "../pages/Community";
import CommunityPostGrid from "../components/pages/community/CommunityPostGrid";
import CommunitySearchResult from "../components/pages/community/CommunitySearchResult";
import PostWrite from "../pages/PostWrite";
import CommunityPostDetail from "../components/pages/communityWrite/CommunityPostDetail";

import MyPage from "../pages/MyPage";
import MyPageHome from "../components/pages/mypage/home/MyPageHome";
import PostCategoryPage from "../components/pages/mypage/post/PostCategoryPage";
import MyPagePostDetail from "../components/pages/mypage/post/MyPagePostDetail";
import MyPagePostWrite from "../components/pages/mypage/post/MyPagePostWrite";
import MyPageGuestbook from "../components/pages/mypage/guestbook/MyPageGuestbook";
import MyPageQuickLinks from "../components/pages/mypage/quicklinks/MyPageQuickLinks";
import MyPageSearchResult from "../components/pages/mypage/post/MyPageSearchResult";

import SettingsProfile from "../components/pages/mypage/SettingsProfile/SettingsProfile";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<Home />} />

          {/* ✅ 커뮤니티 라우트 내부 구조 */}
          <Route path="/community" element={<Community />}>
            <Route index element={<CommunityPostGrid />} />
            <Route path="search" element={<CommunitySearchResult />} />
            <Route path="write" element={<PostWrite />} />
            <Route path="post/:id" element={<CommunityPostDetail />} />
          </Route>

          {/* ✅ 리디렉션: /posts/:id → /community/post/:id */}
          <Route path="/posts/:id" element={<RedirectToCommunityPost />} />

          {/* ✅ 마이페이지 구조 */}
          <Route path="/mypage/:username" element={<MyPage />}>
            <Route index element={<MyPageHome />} />
            <Route path="search" element={<MyPageSearchResult />} />
            <Route
              path="category/:categoryKey"
              element={<PostCategoryPage />}
            />
            <Route path="post/:id" element={<MyPagePostDetail />} />
            <Route path="write" element={<MyPagePostWrite />} />
            <Route path="guestbook" element={<MyPageGuestbook />} />
            <Route path="links" element={<MyPageQuickLinks />} />
          </Route>

          {/* ✅ 설정 페이지 라우트 */}
          <Route path="/settings/profile" element={<SettingsProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RedirectToCommunityPost() {
  const { pathname } = window.location;
  const match = pathname.match(/^\/posts\/(.+)$/);
  const id = match?.[1];
  return <Navigate to={`/community/post/${id}`} replace />;
}
