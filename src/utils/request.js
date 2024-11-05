import http from "./http";

// 로그인 API 요청
export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await http.post("/login", formData);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error.response ? error.response.data : new Error("로그인 오류 발생");
  }
};

// 로그아웃 API 요청
export const logout = async () => {
  try {
    const response = await http.post("/logout");
    return response.data;
  } catch (error) {
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
    throw error.response
      ? error.response.data
      : new Error(error.response.mssage);
  }
};

// POST API 요청
export const postRequest = async (url, data) => {
  try {
    const response = await http.post(url, data);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(error.response.mssage);
  }
};
