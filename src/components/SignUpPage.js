import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/request";
import "../css/SignUpPage.css"; // CSS 파일을 임포트

const SignUpPage = () => {
  const [postData, setPostData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await postRequest("/auth/join", postData);
      console.log("회원가입 성공:", response.data);
      setPostData({ username: "", password: "", email: "" });
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "회원가입에 실패했습니다. 다시 시도해 주세요."
      );
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="top-bar">
          <span className="top-bar-text">SignUpPage</span>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-form">Username</label>
          <input
            type="text"
            name="username"
            value={postData.username}
            onChange={handleChange}
            required
            autocomplete="off"
            placeholder="Enter your username"
          />

          <label className="signup-form">Password</label>
          <input
            type="password"
            name="password"
            value={postData.password}
            onChange={handleChange}
            required
            autocomplete="off"
            placeholder="Enter a strong password"
          />

          <label className="signup-form">Email</label>
          <input
            type="email"
            name="email"
            value={postData.email}
            onChange={handleChange}
            required
            autocomplete="off"
            placeholder="Enter your email"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
