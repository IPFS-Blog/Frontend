// 訂閱本人的使用者們
import { createSlice } from "@reduxjs/toolkit";

interface follower {
  id: number;
  username: string;
  email: string;
  address: string;
  picture: string | null;
}

const initialState: follower[] = [];

const followersSlice = createSlice({
  name: "followers",
  initialState: initialState,
  reducers: {
    updatedfollowers(state, action) {
      const updatedfollowers = JSON.parse(action.payload);
      state.splice(0, state.length, ...updatedfollowers);
    },
  },
});

export const { updatedfollowers } = followersSlice.actions;
export default followersSlice.reducer;
