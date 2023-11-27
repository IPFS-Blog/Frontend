// 獲取本人訂閱的創作者們
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
      return action.payload; // 更新訂閱者
    },
    clearSubscribers() {
      return initialState; // 重置為空
    },
  },
});

export const { updatedSubscribers, clearSubscribers } = subscribersSlice.actions;
export default subscribersSlice.reducer;
