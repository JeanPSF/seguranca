import { ADD_USER, ADD_USER_SESSION } from '../actionTypes'

export const addUser = props => ({
    type: ADD_USER,
    payload: props
})
export const addSession = props => ({
    type: ADD_USER_SESSION,
    payload: {target: props.target, session: props.session}
})