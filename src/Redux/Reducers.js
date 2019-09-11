import { combineReducers } from "redux";
import usersReducer from "./Users/usersReducer";
import kdcReducer from "./KDC/KDCreducer";

export default combineReducers({
    users: usersReducer,
    kdc: kdcReducer
});