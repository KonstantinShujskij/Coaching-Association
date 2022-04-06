import { ADD_USER, CLEAR_DRAG_USER, CLEAR_FORM, DEEP_DELETE_USER, DELETE_USER, 
    DRAG_USER, INSERT_USER, MOVE_USER, SET_FORM, SET_PAGE, VALIDATE_FORM } from "./types";

export function setPage(page) {
    return { type: SET_PAGE, payload: page }
}   

export function dragUser(user) {
    return { type: DRAG_USER, payload: user }
}

export function clearDragUser() {
    return { type: CLEAR_DRAG_USER }
}
    
export function setForm(payload) {
    return { type: SET_FORM, payload }
}

export function validateForm() {
    return { type: VALIDATE_FORM }
}

export function clearForm() {
    return { type: CLEAR_FORM }
}

export function addUser() {
    return { type: ADD_USER }
}

export function deleteUser(userId) {
    return { type: DELETE_USER, payload: userId }
}

export function deepDeleteUser(userId) {
    return { type: DEEP_DELETE_USER, payload: userId }
}

export function moveUser(userId, shift) {
    return { type: MOVE_USER, payload: {userId, shift} }
}

export function insertUser(user, parent) {
    return {
        type: INSERT_USER,
        payload: { user, parent }
    }
}



