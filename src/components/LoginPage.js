import React, { useState } from "react";
import { login } from "../utils/request";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // CSS 파일을 임포트
import GoogleOAuthButton from "../components/oauthButton/GoogleOAuthButton";
import NaverOAuthButton from "../components/oauthButton/NaverOAuthButton";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await login(formData.username, formData.password);
      alert("로그인 성공");
      setFormData({ username: "", password: "" }); // 폼 초기화
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "로그인에 실패했습니다. 다시 시도해 주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signUp");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="top-bar">LoginPage</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autocomplete="off"
            required
            placeholder="Enter your username"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <GoogleOAuthButton />
          <NaverOAuthButton />
          <button
            type="button"
            className="signUp-button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
