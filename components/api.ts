import axios from "axios";
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

// User 相關的 api
export const apiUserRegister = (data: any) => userRequest.post("/register", data, config);

// Auth相關的 api
export const apiAuthTakeNonce = (address: any) => authRequest.get(`/login/${address}`);
export const apiAuthTakeToken = (data: any) => authRequest.post("/login/token", data, config);

// TODO: 內部API

// Auth相關的 api
const _authRequest = axios.create({
  baseURL: "/api/auth",
});

// Auth相關的 api
export const _apiAuthLogin = (JWT: any) => _authRequest.post("/login", JWT);

// User相關的 api
export const _apiIsUser = () => axios.get("/api/user");
