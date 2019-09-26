import { ADD_USER, ADD_USER_SESSION,SEND_KDC_SESSION, CHECK_NONCE,GENERATE_NONCE,
    SEND_NONCE } from '../actionTypes'

export const addUser = props => ({
    type: ADD_USER,
    payload: props
})
export const addSession = props => ({
    type: ADD_USER_SESSION,
    payload: {target: props.target, session: props.session}
})
export const sendSessionKey = props => ({
    type: SEND_KDC_SESSION,
    payload: props,
})
export const generateNonce = props => ({
    type: GENERATE_NONCE,
    payload: props,
})
export const sendNonce = props => ({
    type: SEND_NONCE,
    payload: props,
})
export const checkNonce = props => ({
    type: CHECK_NONCE,
    payload: props,
})