import { createSlice } from "@reduxjs/toolkit";

interface CreaterSlice {
  profile: {
    id: number;
    username: string;
    address: string;
    email: string;
    picture: string;
  };
}

const initialState: CreaterSlice = {
  profile: {
    id: 0,
    username: "",
    address: "",
    email: "",
    picture: "",
  },
};

const CreaterSlice = createSlice({
  name: "creater",
  initialState: initialState,
  reducers: {
    update(state, action) {
      const updatedProfile = JSON.parse(action.payload);
      state.profile = updatedProfile;
    },
  },
});

export const { update } = CreaterSlice.actions;
export default CreaterSlice.reducer;
