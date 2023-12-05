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
  baseURL: `${process.env.NEXT_PUBLIC_API}/users`,
});
// Auth相關的 api
const authRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/auth`,
});
// Article相關的 api
const articleRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/articles`,
});
// default api
const Request = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
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

export const apiUserGetCreatorSubscribers = (jwt: string, uid: any) =>
  userRequest.post(
    `/${uid}/subscribers`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  ); // 新增訂閱指定使用者
export const apiUserDeleteCreatorData = (jwt: string, uid: any) =>
  userRequest.delete(`/${uid}/subscribers`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 取消訂閱指定使用者
export const apiUserGetCreatorOwnSubscribers = (jwt: string) =>
  userRequest.get(`/own/subscribers`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 獲取本人訂閱的創作者們
export const apiUserGetCreatorOwnFollowers = (jwt: string) =>
  userRequest.get(`/own/followers`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); // 獲取訂閱本人的使用者

// TODO: Auth相關的 api
export const apiAuthRegister = (data: any) => authRequest.post("/register", data, config); // 使用者註冊

export const apiAuthTakeNonce = (address: any) => authRequest.get(`/login/${address}`, config); // 確認使用者

export const apiAuthTakeToken = (data: any) => authRequest.post("/login", data, config); // 登入驗證

export const apiAuthEmailConfirm = (data: any) => authRequest.post("/confirm", data, config); // 信箱驗證

// TODO: Article相關的 api
export const apiArticleGetCreaterOwnArticle = (jwt: string, data: any) =>
  articleRequest.get("/user/own", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: data,
  }); // 搜索使用者自身的文章

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
export const apiArticleCommentEdit = (jwt: string, id: number, cid: number, data: any) =>
  articleRequest.patch(
    `/${id}/comment/${cid}`,
    { contents: data },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  ); //修改留言

export const apiArticleCommentDelete = (jwt: string, id: number, cid: number) =>
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
  }); // 搜尋使用者自身按讚的文章
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
  }); // 搜尋使用者自身按讚的留言
export const apiCommentLike = (jwt: string, id: string, cid: string, data: any) =>
  articleRequest.patch(`/${id}/comment/${cid}/likeStatus?userLike=${data}`, null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //對留言按讚
export const apiBookMarkAdd = (jwt: string, id: string) =>
  articleRequest.post(`/${id}/favorite`, "", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //收藏文章
export const apiBookMarkDelete = (jwt: string, id: string) =>
  articleRequest.delete(`/${id}/favorite`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //刪除收藏文章
export const apiBookMarkAddReord = (jwt: string) =>
  articleRequest.get(`/own/favorite`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }); //收藏文章紀錄

export const apiSearch = (data: any) =>
  Request.get(`/search`, {
    headers: { "Content-Type": "application/json" },
    params: data,
  }); //搜尋關鍵詞
