import { combineReducers } from "redux";
import formReducer from "./formReducer";
import listReducer from "./listReducer";
import appReducer from './appReducer';


export const rootReducer = combineReducers({
    list: listReducer,
    form: formReducer,
    app: appReducer,
});
