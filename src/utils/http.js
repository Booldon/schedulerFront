import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 기본 API URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 함께 보내야 할 경우 설정
});

// 응답 인터셉터: 에러 처리 등 공통 작업 가능
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error);
    // async 키워드 추가
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data === "JWT token is expired"
    ) {
      try {
        console.log(error.response);
        // 토큰 갱신을 위한 /refresh 경로로 GET 요청
        await axios.post(process.env.REACT_APP_API_URL + "/auth/refresh", {
          withCredentials: true,
        });

        // 실패했던 요청을 새 토큰으로 재시도
        return http(error.config);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
        console.error("토큰 갱신 실패: 로그인 페이지로 리다이렉트");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default http;
