import { ADD_USER, ADD_USER_SESSION } from '../actionTypes'

const INITIAL_STATE = {
    'k0omyspa_kzubawj1is': {
        name: 'Bob',
        id: 'k0omyspa_kzubawj1is',
        friend: 'k0omz1te_dei5hd5gfqv',
        key: '0-1-2-3-4-5-6-7-8-9-10-11-12-13-14-15',
        sessions: {}
    },
    'k0omz1te_dei5hd5gfqv': {
        name: 'Alice',
        id: 'k0omz1te_dei5hd5gfqv',
        friend: null,
        key: '15-1-2-3-4-5-6-7-8-9-10-11-12-13-14-0',
        sessions: {}
    }
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case ADD_USER:
            return {
                ...state,
                [action.payload.name]: {
                    ...action.payload,
                    sessions: action.payload.sessions ? action.payload.sessions : {}
                },
            };
        case ADD_USER_SESSION:
            return {
                ...state,
                [action.payload.target]: {
                    ...state[action.payload.target],
                    sessions: state[action.payload.target].sessions ? {...state[action.payload.target].sessions, [action.payload.session[action.payload.target].sessionKey]: {...action.payload.session}} : {}
                },
            };
        default:
            return state;
    }
}