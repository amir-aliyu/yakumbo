import React from "react";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./Layout.css"

const Layout = () => {
    const [uuid, setUuid] = React.useState(null);

    useEffect(() => {
        fetch('/api/accounts/cookies', {
            method: 'GET',
            credentials: 'include', // Include credentials
        })
        .then(response => response.json())
        .then(data => {setUuid(data.uuid);})
        .catch(error => console.error('Error:', error));
        console.log(uuid);
    }, [uuid, setUuid]);

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse d-flex d-flex justify-content-between" id="navbarSupportedContent">
                {/* <form className="d-flex my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
                {/* <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/inspiration">Our Inspiration</Link>
                    </li>
                </ul> */}
            </div>
        </nav>
        <Outlet />
    </div>
  )
};

export default Layout;
