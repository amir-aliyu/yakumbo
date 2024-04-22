import React from "react";

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
                                <ul>
                                    <li>Subscription Type</li>
                                    <li>Notification Frequency</li>
                                    <li>Recipe History</li>
                                </ul>
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