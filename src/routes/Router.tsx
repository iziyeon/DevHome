import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Community from "../pages/Community";
import PostDetail from "../pages/PostDetail";
import PostWrite from "../pages/PostWrite";
import MyPage from "../pages/MyPage";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/write" element={<PostWrite />} />
          <Route path="/home/:username" element={<MyPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
