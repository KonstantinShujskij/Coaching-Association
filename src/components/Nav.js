import React from "react";
import { useDispatch } from "react-redux";

import NavItem from "./NavItem";

export default function Nav({pages, setPage, activePage}) {
    const dispatch = useDispatch();
    const itemClickHandler = (page) => { dispatch(setPage(page)) }

    return (
        <ul className="nav justify-content-center">
            {pages.map((page) => {
                return <NavItem 
                            item={page} 
                            key={page.id} 
                            clickHandler={itemClickHandler}
                            active={(activePage === page.id)} />
            })}
        </ul>
    );
}