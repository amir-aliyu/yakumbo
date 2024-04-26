import React from "react";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./Layout.css"

const Layout = () => {
    const [uuid, setUuid] = React.useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/accounts/cookies', {
            method: 'GET',
            credentials: 'include', // Include credentials
        })
        .then(response => response.json())
        .then(data => {setUuid(data.uuid);})
        .catch(error => console.error('Error:', error));
        console.log(uuid);
    }, [uuid, setUuid]);

    const handleLogOut = async () => {
        await fetch('http://localhost:4000/api/accounts/logout', {
            method: 'POST',
            credentials: 'include', // Include credentials
        })
        .then(response => response.json())
        .then(data => {setUuid(null);})
        .catch(error => console.error('Error:', error));
        // refresh the page after logging out
        window.location.reload();
    }

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
                    {uuid ? <button className="btn btn-success my-2 my-sm-0" onClick={handleLogOut}>Logout</button> : <li className="nav-item">
                        <Link to="/login">Login</Link>
                    </li>}
                </ul>
            </div>
        </nav>
        <Outlet />
    </div>
  )
};

export default Layout;
