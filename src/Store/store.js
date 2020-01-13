import { createStore } from "redux";
import reducer from "../Reducers/rootReducer";

const store = createStore(reducer);
export default store;
