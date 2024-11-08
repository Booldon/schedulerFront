import http from "./http";

// 로그인 API 요청
export const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  document.body.style.cursor = "wait";
  try {
    const response = await http.post("/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    document.body.style.cursor = "default";
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.log(error);
    document.body.style.cursor = "default";
    throw error;
  }
};

// 로그아웃 API 요청
export const logout = async () => {
  document.body.style.cursor = "wait";
  try {
    const response = await http.post("/logout");
    document.body.style.cursor = "default";
    return response.data;
  } catch (error) {
    document.body.style.cursor = "default";
    throw error.response
      ? error.response.data
      : new Error("로그아웃 오류 발생");
  }
};

// GET API 요청
export const getRequest = async (url) => {
  try {
    const response = await http.get(url);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error.response ? error.respons : new Error("GET 요청 오류");
  }
};

// POST API 요청
export const postRequest = async (url, data) => {
  document.body.style.cursor = "wait";
  try {
    const response = await http.post(url, data);
    document.body.style.cursor = "default";
    return response.data; // 응답 데이터 반환
  } catch (error) {
    document.body.style.cursor = "default";
    throw error.response
      ? error.response.data
      : new Error(error.response.mssage);
  }
};
