import { ADD_USER, VALIDATE_FORM } from "./types";
import { LIST_PAGE } from "../const";

import { getCount, getTrenersId } from "../function";
import { validationCount, validationEmail, validationName } from "../validation";
import { getErrorDescription } from "./errors";
import { setPage } from "./actions";



export function validateFormMiddleware({ dispatch, getState }){
    return function(next) {
        return function(action) {
            if(action.type === VALIDATE_FORM) {
                const state = getState();
                const name = state.form.name;
                const email = state.form.email;
                const names = getTrenersId(state.list.treners);

                const errors = {
                    name: { id: '', title: '', isActive: false },
                    email: { id: '', title: '', isActive: false}
                }

                let error;
                if(name) {
                    error = validationName(name, names);
                    if(error) { errors.name = {...getErrorDescription(error), isActive: true}; }
                }
                if(email) {
                    error = validationEmail(email, name);
                    if(error) { errors.email = {...getErrorDescription(error), isActive: true}; }
                }               
                
                action = {...action, payload: errors}
            }
            else if(action.type === ADD_USER) {
                const state = getState()
                const errors = state.form.errors;
                const countError = validationCount(getCount(state.list.treners))

                if(!countError && !errors.name.isActive && !errors.email.isActive) {
                    action = {...action, payload: {
                        name: state.form.name,
                        email: state.form.email,
                        parent: state.form.selected
                    }};
                    dispatch(setPage(LIST_PAGE))
                }                
            }
            return next(action);
        }
    }
}