import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Home from "../pages/Home";
import Community from "../pages/Community";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import Resume from "../pages/Resume";
import ResumeEdit from "../pages/ResumeEdit";
import NotFound from "../pages/NotFound";
import CommunityPostDetail from "../components/pages/communityWrite/CommunityPostDetail";
import CommunityPostGrid from "../components/pages/community/CommunityPostGrid";
import CommunitySearchResult from "../components/pages/community/CommunitySearchResult";
import PostWrite from "../pages/PostWrite";
import MyPageHome from "../components/pages/mypage/home/MyPageHome";
import MyPagePostWrite from "../components/pages/mypage/post/MyPagePostWrite";
import MyPagePostDetail from "../components/pages/mypage/post/MyPagePostDetail";
import MyPageGuestbook from "../components/pages/mypage/guestbook/MyPageGuestbook";
import MyPageQuickLinks from "../components/pages/mypage/quicklinks/MyPageQuickLinks";
import MyPageSearchResult from "../components/pages/mypage/post/MyPageSearchResult";
import PostCategoryPage from "../components/pages/mypage/post/PostCategoryPage";
import SettingsProfile from "../components/pages/mypage/SettingsProfile/SettingsProfile";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/community" element={<Community />}>
            <Route index element={<CommunityPostGrid />} />
            <Route path="post/:id" element={<CommunityPostDetail />} />
            <Route path="write" element={<PostWrite />} />
            <Route path="search" element={<CommunitySearchResult />} />
          </Route>

          <Route path="/resume" element={<Resume />} />
          <Route path="/resume/edit" element={<ResumeEdit />} />

          <Route path="/mypage/:username" element={<MyPage />}>
            <Route index element={<MyPageHome />} />
            <Route path="write" element={<MyPagePostWrite />} />
            <Route path="post/:id" element={<MyPagePostDetail />} />
            <Route path="search" element={<MyPageSearchResult />} />
            <Route path="guestbook" element={<MyPageGuestbook />} />
            <Route path="links" element={<MyPageQuickLinks />} />
            <Route
              path="category/:categoryKey"
              element={<PostCategoryPage />}
            />
          </Route>

          <Route path="/settings/profile" element={<SettingsProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
