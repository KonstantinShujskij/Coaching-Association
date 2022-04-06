import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce, useInput } from "../hooks";
import { getCount, getTrenersId } from "../function";
import { validationCount } from "../validation";

import { addUser, clearForm, setForm, validateForm } from "../redux/actions";
import { getErrorDescription } from "../redux/errors";

import Alert from "./Alert";

export default function CreateForm() {
    const dispatch = useDispatch();

    const treners = useSelector((state) => state.list.treners);
    const form = useSelector((state) => state.form);
    const countError = validationCount(getCount(treners));

    const debounceName = useDebounce((name) => {
        dispatch(setForm({name: name.replace(/\s+/g, ' ').trim()}))
        dispatch(validateForm());
    }, 500);
    const debounceEmail = useDebounce((email) => {
        dispatch(setForm({email: email.replace(/\s+/g, ' ').trim()}));
        dispatch(validateForm());
    }, 500);

    const name = useInput(form.name, (name) => debounceName(name));
    const email = useInput(form.email, (email) => debounceEmail(email));
    const select = useRef();

    return (
        <>
        <h2 className="text-center mt-3 mb-3">Create-Form</h2>
        <div className="form me-auto ms-auto">
            <div className="row mb-3">
                <div className="col-4">
                    <label htmlFor="name" className="me-auto">Full Name</label>
                </div>      
                <div className="col-8">
                    <input type="text" id="name" className="form-control" {...name.bind} />
                </div>      
            </div>
            <div className="row mb-3">
                <div className="col-4">
                    <label htmlFor="email" className="me-auto">Email</label>
                </div>      
                <div className="col-8">
                    <input type="text" id="email" className="form-control" {...email.bind} />
                </div>      
            </div>
            <div className="row mb-3">
                <div className="col-4">
                    <label htmlFor="coach" className="me-auto">Select Coach</label>
                </div>      
                <div className="col-8">
                    <select id="coach" ref={select} className="form-select" >
                        {getTrenersId(treners).map((trener) => <option value={trener} key={trener}>{trener}</option>)}
                    </select>
                </div>      
            </div>
            <div className="row mb-3">  
                <div className="col-8 ms-auto">
                    <button 
                        className="btn btn-success me-auto ms-auto" 
                        onClick={() => {
                            dispatch(setForm({selected: select.current.value}))
                            dispatch(addUser());
                            dispatch(clearForm());
                            name.clear();
                            email.clear();
                        }}>Create</button>
                </div>      
            </div>
            <div className="row">
                <div className="col-12">
                    {(form.errors.name.isActive) && <Alert title={form.errors.name.title} />}
                </div>
                <div className="col-12">
                    {(form.errors.email.isActive) && <Alert title={form.errors.email.title} />}
                </div>
                <div className="col-12">
                    {(countError) && <Alert title={getErrorDescription(countError).title} />}
                </div>
            </div>
        </div>            
        
        </>
    );
}