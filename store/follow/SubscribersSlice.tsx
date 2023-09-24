// subscribersSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subscriber {
  id: number;
  username: string;
  email: string;
  address: string;
  picture: string | null;
}

const initialState: Subscriber[] = [];

const subscribersSlice = createSlice({
  name: "subscribers",
  initialState: initialState,
  reducers: {
    updatedSubscribers(state, action: PayloadAction<Subscriber[]>) {
      return action.payload; // 更新订阅者数据
    },
  },
});

export const { updatedSubscribers } = subscribersSlice.actions;
export default subscribersSlice.reducer;
