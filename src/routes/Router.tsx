// src/routes/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

// 📌 페이지 컴포넌트
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Community from "../pages/Community";
import PostDetail from "../pages/PostDetail";
import PostWrite from "../pages/PostWrite";
import NotFound from "../pages/NotFound";

// 📌 마이페이지 - 메인 레이아웃 및 콘텐츠
// import MyPageLayout from "../components/pages/mypage/layout/MyPageLayout";
// import MyPageHome from "../components/pages/mypage/content/MyPageHome";
// import MyPageGuestbook from "../components/pages/mypage/content/MyPageGuestbook";
// import MyPageQuickLinks from "../components/pages/mypage/content/MyPageQuickLinks";

// 📌 마이페이지 - 카테고리/글 상세/작성
// import PostCategoryPage from "../components/pages/mypage/CategoryPages/PostCategoryPage";
// import MyPagePostDetail from "../components/pages/mypage/PostDetail/MyPagePostDetail";
// import MyPagePostWrite from "../components/pages/mypage/PostDetail/MyPagePostWrite";

// 📌 설정 페이지
// import SettingsProfile from "../components/pages/mypage/SettingsProfile/SettingsProfile";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 전체 레이아웃을 감싸는 공통 Wrapper */}
        <Route element={<PageWrapper />}>
          {/* ✅ 메인 라우트 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* ✅ 커뮤니티 관련 */}
          <Route path="/community" element={<Community />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/write" element={<PostWrite />} />{" "}
          {/* 커뮤니티 글쓰기 */}
          {/* ✅ 마이페이지 레이아웃 및 내부 */}
          {/* <Route path="/mypage/:username" element={<MyPageLayout />}>
            <Route index element={<MyPageHome />} />
            <Route path="guestbook" element={<MyPageGuestbook />} />
            <Route path="links" element={<MyPageQuickLinks />} />
            <Route
              path="category/:categoryKey"
              element={<PostCategoryPage />}
            />
          </Route>
          <Route
            path="/mypage/:username/post/:postId"
            element={<MyPagePostDetail />}
          />
          <Route path="/mypage/write" element={<MyPagePostWrite />} />{" "} */}
          {/* 마이페이지 글쓰기 */}
          {/* ✅ 설정 */}
          {/* <Route path="/settings/profile" element={<SettingsProfile />} /> */}
        </Route>

        {/* ✅ 404 Not Found 처리 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
