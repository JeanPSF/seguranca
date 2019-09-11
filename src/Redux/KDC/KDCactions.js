import { ADD_KDC_USER } from '../actionTypes'
import { generateUniquekey } from '../../utils';

export const addKdcUser = props => ({
    type: ADD_KDC_USER,
    payload: {...props, id: generateUniquekey()}
})