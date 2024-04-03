import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css"

const Layout = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse d-flex d-flex justify-content-between" id="navbarSupportedContent">
                <form className="d-flex my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/dashboard">Dashboard</Link>                    
                    </li>
                    <li className="nav-item">
                        <Link to="/friends">Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/preferences">My Preferences</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <Outlet />
    </div>
  )
};

export default Layout;