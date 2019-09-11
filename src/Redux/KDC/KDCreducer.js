import { ADD_KDC_USER } from '../actionTypes'

const INITIAL_STATE = {
    users: {},
    sessions: {}
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case ADD_KDC_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.name]: {...action.payload}
                }
            };

        default:
            return state;
    }
}