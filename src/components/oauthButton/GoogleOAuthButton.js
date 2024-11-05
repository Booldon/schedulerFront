import React from "react";
import "../../css/OAuthButton.css";

const GoogleOAuthButton = () => {
  const handleOAuthLogin = () => {
    // OAuth 로그인 로직 추가
  };

  return (
    <button
      type="button"
      class="login-with-google-btn"
      onClick={handleOAuthLogin}
    >
      Sign in with Google
    </button>
  );
};

export default GoogleOAuthButton;
