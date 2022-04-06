
import { CLEAR_DRAG_USER, DRAG_USER, SET_PAGE } from "./types";
import { FORM_PAGE, LIST_PAGE } from "../const";
import { copyTreners } from "../function";

const initialState = {
    pages: [
        {title: 'Form', id: FORM_PAGE},
        {title: 'List', id: LIST_PAGE},
    ],
    currentPage: FORM_PAGE,
    dragItem: undefined
}

export default function appReducer(state=initialState, action) {
    switch (action.type) { 
        case SET_PAGE:
            return {...state, currentPage: action.payload};   
        case DRAG_USER:
            return {...state, dragItem: copyTreners([action.payload])[0]}
        case CLEAR_DRAG_USER:
            return {...state, dragItem: undefined}
        default:
            return state;
    }    
}