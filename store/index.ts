import { configureStore } from "@reduxjs/toolkit";

import CreaterSlice from "./CreaterSlice";
import followersReducer from "./follow/followersSlice"; // 獲取訂閱本人的使用者
import SubscribersSlice from "./follow/SubscribersSlice"; // 獲取本人訂閱的創作者們
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    User: UserSlice,
    Creater: CreaterSlice,
    Subscribers: SubscribersSlice,
    followers: followersReducer,
  },
});
