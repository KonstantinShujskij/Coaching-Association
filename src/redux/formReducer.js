import { CLEAR_FORM, SET_FORM, VALIDATE_FORM } from "./types";

const initialState = {
    name: '',
    email: '',
    selected: null,
    errors: {
        name: {
            id: '',
            title: '',
            isActive: false 
        },
        email: {
            id: '',
            title: '',
            isActive: false
        }
    },
}

export default function formReducer(state=initialState, action) {
    switch (action.type) { 
        case SET_FORM:
            return {...state, ...action.payload}
        case CLEAR_FORM:
            return {...state, name: '', email: ''}
        case VALIDATE_FORM:
            return {...state, errors: action.payload}
        default:
            return state;
    }    
}