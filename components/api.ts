import axios from "axios";

// TODO: 內部API

// Auth相關的 api
const _authRequest = axios.create({
  baseURL: "/api/auth",
});
const _userRequest = axios.create({
  baseURL: "/api/user",
});

// Auth相關的 api
export const _apiAuthLogin = (jwt: any) => _authRequest.post("/login", jwt); // 將jwt塞進cookie
export const _apiAuthLogout = () => _authRequest.post("/logout"); // 將jwt從cookie移除

// User相關的 api
export const _apiCheckJwt = () => _userRequest.get("/jwt"); // 從cookie中撈看看是否有jwt

// API Header設定
const config = { headers: { "Content-Type": "application/json" } };

// TODO: 後端API

// User相關的 api
const userRequest = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_API}/users`,
});
// Auth相關的 api
const authRequest = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_API}/auth`,
});

export const apiUserRegister = (data: any) => userRequest.post("/register", data, config); // 註冊
export const apiUserGetUserData = (jwt: string) =>
  userRequest.get("/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 攜帶jwt拿取使用者資訊
export const apiEditProfile = (jwt: string, data: any) =>
  userRequest.patch("/", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 編輯個人資料
export const apiUserGetCreaterData = (username: any) => userRequest.get(`/${username}`, config); // 註冊

// TODO: Auth相關的 api
export const apiAuthTakeNonce = (address: any) => authRequest.get(`/login/${address}`, config); // 拿取nonce做身分驗證

export const apiAuthTakeToken = (data: any) => authRequest.post("/login", data, config); // 拿取jwt
