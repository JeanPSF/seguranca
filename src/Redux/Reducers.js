import { combineReducers } from "redux";
import usersReducer from "./Users/usersReducer";
import kdcReducer from "./KDC/KDCreducer";
import queuesReducer from "./Queues/queuesReducer";

export default combineReducers({
    users: usersReducer,
    kdc: kdcReducer,
    queues: queuesReducer,
});