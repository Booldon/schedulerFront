import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootPage from "./components/RootPage"; // 메인 페이지
import SignUpPage from "./components/SignUpPage"; // 로그인 페이지
import LoginPage from "./components/LoginPage"; // 로그인 페이지

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootPage />} /> {/* 메인 페이지 */}
        <Route path="/signUp" element={<SignUpPage />} />
        {/* 회원가입 페이지 */}
        {/* <Route path="/userInfo" element={<UserInfoPage />} /> */}
        {/*유저 정보 페이지*/}
        <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
      </Routes>
    </Router>
  );
};

export default App;
