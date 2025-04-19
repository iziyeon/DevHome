import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

import Home from "../pages/Home";
import Community from "../pages/Community";

import MyPageLayout from "../components/pages/mypage/layout/MyPageLayout";
import MyPageHome from "../components/pages/mypage/MyPageHome";
import PostCategoryPage from "../components/pages/mypage/PostCategoryPage";
import MyPagePostDetail from "../components/pages/mypage/MyPagePostDetail";
import MyPagePostWrite from "../components/pages/mypage/MyPagePostWrite";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mypage/:username" element={<MyPageLayout />}>
            <Route index element={<MyPageHome />} />
            <Route
              path="category/:categoryKey"
              element={<PostCategoryPage />}
            />
            <Route path="post/:id" element={<MyPagePostDetail />} />
            <Route path="write" element={<MyPagePostWrite />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
