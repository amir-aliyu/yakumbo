import React from "react";
import { Link } from 'react-router-dom';

const Preferences = () => {
    return (
        <div className="container">
            <h1 className="mt-4 mb-4 fw-bold">My Preferences</h1>
            <div className="row">
                <div className="col mt-4">
                    <div className="card shadow">
                        <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
                            <p className="m-0 fs-3">Preferences</p>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
                            <div className="fw-bold d-flex align-items-center">
                                <p className="m-0 fs-3">Recipe History</p>
                                <Link className="ms-auto" to="/History"><button className="btn btn-light ms-auto text-dark">View History</button></Link>
                            </div>
                        </div>
                    </div>  
                </div>
                <div className="col mt-4">
                    <div className="card shadow">
                        <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
                            <p className="m-0 fs-3">Preferences</p>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
                            <ul>
                                <li>Edit Profile</li>
                                <li>Friend Notifications</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default Preferences;