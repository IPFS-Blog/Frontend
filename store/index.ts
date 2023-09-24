import { configureStore } from "@reduxjs/toolkit";

import CreaterSlice from "./CreaterSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    User: UserSlice,
    Creater: CreaterSlice,
  },
});
