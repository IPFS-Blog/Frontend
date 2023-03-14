import { TOGGLE_CARD } from "./actions";

const initialState = {
  isCardOpen: false,
};

const cardReducer = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case TOGGLE_CARD:
      return {
        ...state,
        isCardOpen: !state.isCardOpen,
      };
    default:
      return state;
  }
};

export default cardReducer;
