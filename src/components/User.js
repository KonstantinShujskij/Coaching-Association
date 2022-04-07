import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { isDeepChild, isParent } from "../function";

import { deleteUser, moveUser, validateForm, dragUser, insertUser, 
    deepDeleteUser, clearDragUser } from "../redux/actions";

import UserList from "./UserList";

export default function User({user, parent, isUpBtn, isDownBtn}) {
    const dispatch = useDispatch();

    const treners = useSelector((state) => state.list.treners);
    const dragTrener = useSelector((state) => state.app.dragItem)
    
    function dropHandler(e) {
        e.preventDefault(); 

        if(dragTrener) {
            if(user.name === dragTrener.name) { return; }
            if(isParent(user, dragTrener.name)) { return; }
            if(isDeepChild(treners, user.name, dragTrener.name)) { return; }

            dispatch(deepDeleteUser(dragTrener.name));
            dispatch(insertUser(dragTrener, user.name));   
            dispatch(clearDragUser());         
        }       
    }
    function dragHandler(e) { dispatch(dragUser(user)); }

    return (
        <>
            <div className="user" 
                onDragOver={(e) => e.preventDefault()} 
                onDrop={dropHandler}>                
                {(parent && 
                    <button 
                        className="user-btn remove-btn me-3"
                        onClick={() => {
                            dispatch(deleteUser(user.name));
                            dispatch(validateForm());
                        }} />
                )}
                {(parent && 
                    <button 
                        className="user-btn drag-btn me-3"
                        onDragStart={dragHandler}
                        onDragOver={(e) => { e.preventDefault();}}
                        draggable={true} />
                )}
                {(isDownBtn && 
                    <button 
                        className="user-btn down-btn me-3"
                        onClick={() => dispatch(moveUser(user.name, 1))} />
                )}
                {(isUpBtn && 
                    <button 
                        className="user-btn up-btn" 
                        onClick={() => dispatch(moveUser(user.name, -1))} />
                )}

                <span className="ms-3">{user.name}</span> 
                <span className="ms-3">{user.email}</span> 
                {(parent && <span className="ms-3">{parent}</span>)}
            </div>
            <UserList users={user.childs} parent={user.name} />
        </>
    );
}
