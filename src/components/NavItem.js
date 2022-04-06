import React from "react";

export default function NavItem({item, clickHandler, active}) {
    const classes = ['nav-link'];
    if(active) { classes.push('active') }
    
    return (
        <li className="nav-item" onClick={() => {clickHandler(item.id)}}>
            <span className={classes.join(' ')}>{item.title}</span>
        </li>
    )
}