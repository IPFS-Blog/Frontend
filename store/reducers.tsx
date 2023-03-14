import { combineReducers } from "redux";

import cardReducer from "./card";

const rootReducer = combineReducers({
  card: cardReducer,
});

export default rootReducer;
