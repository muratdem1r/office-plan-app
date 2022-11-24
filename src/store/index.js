import { createStore } from "redux";

const initialState = {
  popup: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POPUP":
      return { ...state, popup: action.payload };
    default:
      return state;
  }
};

const store = createStore(mapReducer);

export default store;
