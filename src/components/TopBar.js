import React, { useEffect, useState } from "react";
import "../css/TopBar.css";
import { getCookie } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/request";
import { getRequest } from "../utils/request";

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("랜더링 성공");
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // /api/check에 GET 요청
      const response = await getRequest("/api/check");
      // 서버가 인증된 상태로 응답하면 isLoggedIn을 true로 설정
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      // 요청이 실패하면 로그아웃 상태로 처리
      setIsLoggedIn(false);
    }
  };

  const handleLogoutClick = async () => {
    try {
      // 로그아웃 요청 전송 (헤더나 쿠키 설정 없이 간단하게)
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="top-bar">
      <h2>Calendar</h2>
      {isLoggedIn ? (
        <button className="logout-button" onClick={handleLogoutClick}>
          로그아웃
        </button>
      ) : (
        <button className="login-button" onClick={handleLoginClick}>
          로그인
        </button>
      )}
    </div>
  );
};

export default TopBar;
