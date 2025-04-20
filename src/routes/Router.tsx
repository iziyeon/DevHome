import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

import Home from "../pages/Home";
import Community from "../pages/Community";

import MyPageLayout from "../components/pages/mypage/layout/MyPageLayout";
import MyPageHome from "../components/pages/mypage/MyPageHome";
import PostCategoryPage from "../components/pages/mypage/PostCategoryPage";
import MyPagePostDetail from "../components/pages/mypage/MyPagePostDetail";
import MyPagePostWrite from "../components/pages/mypage/MyPagePostWrite";
import MyPageGuestbook from "../components/pages/mypage/MyPageGuestbook";
import MyPageQuickLinks from "../components/pages/mypage/MyPageQuickLinks";
import MyPageSearchResult from "../components/pages/mypage/MyPageSearchResult";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mypage/:username" element={<MyPageLayout />}>
            <Route index element={<MyPageHome />} />
            <Route path="search" element={<MyPageSearchResult />} />
            <Route
              path="category/:categoryKey"
              element={<PostCategoryPage />}
            />
            <Route path="post/:id" element={<MyPagePostDetail />} />
            <Route path="write" element={<MyPagePostWrite />} />
            <Route path="guestbook" element={<MyPageGuestbook />} />
            <Route path="links" element={<MyPageQuickLinks />} />{" "}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
