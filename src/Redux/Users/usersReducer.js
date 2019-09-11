import { ADD_USER } from '../actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case ADD_USER:
            return {
              ...state,
              [action.payload.name]: {...action.payload},
            };

        default:
            return state;
    }
}