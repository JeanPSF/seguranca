import { combineReducers } from "redux";
import usersReducer from "./Users/usersReducer";

export default combineReducers({
    users: usersReducer
});