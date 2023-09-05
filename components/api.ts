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
// Article相關的 api
const articleRequest = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_API}/articles`,
});

// TODO: User 相關的 api
export const apiUserRegister = (data: any) => userRequest.post("/", data, config); // 註冊
export const apiUserGetUserData = (jwt: string) =>
  userRequest.get("/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 獲取自身資料

export const apiUserEditProfile = (jwt: string, data: any) =>
  userRequest.patch("/", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 更改自身使用者資料

export const apiUserGetCreaterData = (username: any) => userRequest.get(`/${username}`, config); // 搜尋特定使用者

export const apiUserGetCreaterOwnArticle = (jwt: string, data: any) =>
  userRequest.get("/own/article", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: data,
  }); // 搜索使用者自身的文章

// TODO: Auth相關的 api
export const apiAuthTakeNonce = (address: any) => authRequest.get(`/login/${address}`, config); // 確認使用者

export const apiAuthTakeToken = (data: any) => authRequest.post("/login", data, config); // 登入驗證

// TODO: Article相關的 api
export const apiArticleGetCreaterArticle = (username: any) => articleRequest.get(`/users/${username}`, config); // 搜尋特定使用者的文章

export const apiArticleCreate = (jwt: string, data: any) =>
  articleRequest.post("/", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 創建文章

export const apiArticleTakeAllArticle = (data: any) =>
  articleRequest.get("", {
    headers: { "Content-Type": "application/json" },
    params: data,
  }); // 查詢所有文章

export const apiArticleTakeArticle = (jwt: string, id: number) =>
  articleRequest.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 獲取指定文章資料

export const apiArticleEditArticle = (jwt: string, aid: number, data: any) =>
  articleRequest.patch(`/${aid}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 修改指定文章

export const apiArticleDeleteArticle = (jwt: string, id: string) =>
  articleRequest.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 刪除指定文章

export const apiArticleCommentCreate = (jwt: string, id: number, data: any) =>
  articleRequest.post(
    `/${id}/comment`,
    { contents: data },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  ); // 新增指定文章留言
export const apiArticleCommentEdit = (jwt: string, id: string, cid: string) =>
  articleRequest.patch(`/${id}/comment/${cid}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //修改留言

export const apiArticleCommentDelete = (jwt: string, id: string, cid: string) =>
  articleRequest.delete(`/${id}/comment/${cid}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //刪除指定文章的一條留言刪除
export const apiArticleLikesRecord = (jwt: string) =>
  articleRequest.get("/user/likes", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 搜尋使用者自身喜愛的文章
export const apiArticleLike = (jwt: string, id: string, data: any) =>
  articleRequest.patch(`/${id}/likeStatus?userLike=${data}`, null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //對文章按讚
export const apiCommentLikesRecord = (jwt: string, data: any) =>
  articleRequest.get(`/user/comments/likes`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: data,
  }); // 搜尋使用者自身喜愛的文章
export const apiCommentLike = (jwt: string, id: string, cid: string, data: any) =>
  articleRequest.patch(`/${id}/comment/${cid}/likeStatus?userLike=${data}`, null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //對留言按讚
