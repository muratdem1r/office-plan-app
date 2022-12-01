import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mapReducer from "./reducers/mapReducer";

const store = createStore(mapReducer, applyMiddleware(thunk));

export default store;
