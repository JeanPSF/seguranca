import { PRODUCE_SESSION_REQUEST, CONSUME_SESSION_REQUEST } from '../actionTypes'

const INITIAL_STATE = {
    session: [],
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case PRODUCE_SESSION_REQUEST:
            
            return {
                ...state,
                session: [...state.session, action.payload]
            };
        case CONSUME_SESSION_REQUEST:
            return {
                ...state,
                session: [...state.session].pop()
            };
        default:
            return state;
    }
}