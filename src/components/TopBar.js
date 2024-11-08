import React, { useEffect, useState } from "react";
import "../css/TopBar.css";
import { getCookie } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/request";
import { getRequest } from "../utils/request";
import UserIconButton from "./button/UserIconButton";
import userIcon from "../img/usericon.png";

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("랜더링 성공");
    checkLoginStatus();
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    try {
      // /api/check에 GET 요청
      const response = await getRequest("/api/check");
      console.log(response);
      // 서버가 인증된 상태로 응답하면 isLoggedIn을 true로 설정
      if (response === "This content is available") {
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
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleUserInfoClick = () => {
    navigate("/userInfo");
  };

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };
  console.log("isLoggedIn : ", isLoggedIn);
  return (
    <div className="top-bar">
      <h2>Calendar</h2>
      {isLoggedIn ? (
        <UserIconButton imageSrc={userIcon} onClick={handleUserInfoClick} />
      ) : (
        ""
      )}

      {isLoggedIn ? (
        <button className="logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
      ) : (
        <button className="login-button" onClick={handleLoginClick}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default TopBar;
