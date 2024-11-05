import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import GoogleOAuthButton from "./oauthButton/GoogleOAuthButton";
import NaverOAuthButton from "./oauthButton/NaverOAuthButton";
import axios from "axios";
import { login } from "../utils/request";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const data = await login(username, password); // login API 호출
      console.log("로그인 성공:", data);
      navigate("/"); // 루트 경로로 리다이렉트
    } catch (error) {
      setErrorMessage(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* TopBar 부분 */}
        <div className="top-bar">
          <span className="top-bar-text">LoginPage</span>
        </div>

        {/* username 필드 */}
        <div className="form-field">
          <label>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* password 필드 */}
        <div className="form-field">
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="oAuth-field">
          <GoogleOAuthButton />
        </div>
        <div className="oAuth-field">
          <NaverOAuthButton />
        </div>
        {/* 로그인, 회원가입 버튼 */}
        <div className="action-buttons">
          <button className="action-button signup-button">회원가입</button>
          <button
            className="action-button login-button"
            onClick={handleLoginClick}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
