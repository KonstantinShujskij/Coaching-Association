import React from "react";
import User from "./User";

export default function UserList({users, parent}) {
    return (
        <>
            <div className="pl-3" style={{paddingLeft: '3rem'}}>
                {users.map((user, index) => {                    
                    return (
                        <User 
                            user={user} 
                            parent={parent} 
                            isUpBtn={(index > 0)}
                            isDownBtn={(users.length > 1 && (index + 1) < users.length)}
                            key={user.name} />
                    );
                })}
            </div>
            
        </>        
    )
}