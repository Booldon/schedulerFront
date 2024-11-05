import React from "react";
import "../../css/OAuthButton.css";

const NaverOAuthButton = () => {
  const handleOAuthLogin = () => {
    // OAuth 로그인 로직 추가
  };

  return (
    <button
      type="button"
      class="login-with-naver-btn"
      onClick={handleOAuthLogin}
    >
      Sign in with Naver
    </button>
  );
};

export default NaverOAuthButton;
