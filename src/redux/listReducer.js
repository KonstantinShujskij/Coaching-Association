import { ADD_USER, DEEP_DELETE_USER, DELETE_USER, INSERT_USER, MOVE_USER } from "./types";
import { addTrener, deepDeleteTrener, deleteTrener, insertTrener } from "../function";

const initialState = {
    treners: [
        {
            name: 'Penelope Randi',
            email: ' penelope.randi@example.com',
            childs: []
        }
    ],
}

export default function listReducer(state=initialState, action) {
    switch (action.type) { 
        case ADD_USER:
            if(!action.payload) { return state; }
            const newTrener = {name: action.payload.name, email: action.payload.email, childs: []}
            return {...state, treners: addTrener(state.treners, newTrener, action.payload.parent)}
        case DELETE_USER:
            return {...state, treners: deleteTrener(state.treners, action.payload)}
        case DEEP_DELETE_USER: 
            return {...state, treners: deepDeleteTrener(state.treners, action.payload)}
        case MOVE_USER:
            return {...state, treners: insertTrener(state.treners, action.payload.userId, action.payload.shift)}
        case INSERT_USER:
            return {...state, treners: addTrener(state.treners, action.payload.user, action.payload.parent)}
        default:
            return state;
    }    
}