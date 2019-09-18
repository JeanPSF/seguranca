import { PRODUCE_SESSION_REQUEST, CONSUME_SESSION_REQUEST } from '../actionTypes'

export const produceSessionRequest = props => ({
    type: PRODUCE_SESSION_REQUEST,
    payload: {...props}
})
export const consumeSessionRequest = props => ({
    type: CONSUME_SESSION_REQUEST,
    payload: {...props}
})