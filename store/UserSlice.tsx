import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  profile: {
    id: number;
    username: string;
    address: string;
    email: string;
    picture: string;
    login: boolean;
  };
}

const initialState: UserState = {
  profile: {
    id: 0,
    username: "",
    address: "",
    email: "",
    picture: "",
    login: false,
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLogin(state, action) {
      const updatedProfile = JSON.parse(action.payload);
      updatedProfile.login = true;
      state.profile = updatedProfile;
    },
    setLogout(state) {
      state.profile = initialState.profile;
    },
  },
});

export const { setLogin, setLogout } = UserSlice.actions;
export default UserSlice.reducer;
