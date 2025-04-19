import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

import Home from "../pages/Home";
import Community from "../pages/Community";

import MyPageLayout from "../components/pages/mypage/layout/MyPageLayout";
import MyPageHome from "../components/pages/mypage/MyPageHome";
import PostCategoryPage from "../components/pages/mypage/PostCategoryPage";

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
