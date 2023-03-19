import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  profile: {
    address: string;
    username: string;
    login: boolean;
  };
}

const initialState: UserState = {
  profile: {
    address: "",
    username: "",
    login: false,
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLogin(state, action) {
      console.log(action);
      console.log("成功!!");
      state.profile = action.payload;
    },
    setLogout(state) {
      state.profile = initialState.profile;
    },
  },
});

export const { setLogin, setLogout } = UserSlice.actions;
export default UserSlice.reducer;
