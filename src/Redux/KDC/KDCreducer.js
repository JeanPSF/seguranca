import { ADD_KDC_USER } from '../actionTypes'

const INITIAL_STATE = {
    users: {
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
            friend: 'k0omyspa_kzubawj1is',
            key: '15-1-2-3-4-5-6-7-8-9-10-11-12-13-14-0',
            sessions: {}
        }
    },
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