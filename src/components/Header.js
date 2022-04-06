import React from "react";
import { useSelector } from "react-redux";

import { setPage } from "../redux/actions"

import Nav from "./Nav";

export default function Header() {
    const pages = useSelector((state) => state.app.pages);
    const currentPage = useSelector((state) => state.app.currentPage);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark header">
            <div className="container-fluid">
                <span className="navbar-brand">Coaching Association</span>

                <Nav pages={pages} setPage={setPage} activePage={currentPage}/>
            </div>
        </nav>
    )
}