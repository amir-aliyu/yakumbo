import React from "react";

const History = () => {
    // Sample data for the table
    const friendsData = [
        { id: 1, name: "Amir", profilePicture: "url_to_amir_image", dashboardLink: "/amir-dashboard", plantPoints: 100, wateringStreak: 5 },
        { id: 2, name: "Jon", profilePicture: "url_to_jon_image", dashboardLink: "/jon-dashboard", plantPoints: 80, wateringStreak: 3 },
        { id: 3, name: "Evelyn", profilePicture: "url_to_evelyn_image", dashboardLink: "/evelyn-dashboard", plantPoints: 120, wateringStreak: 7 }
    ];

    return (
        <div className="container">
            <h1 className="mt-4 mb-4 fw-bold">Recipe History</h1>
            <div className="card mt-4 shadow">
                <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
                    <p className="m-0 fs-3">History</p>
                </div>
                <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
                    <p>date - view recipe - have plant?</p>
                </div>
            </div>
        </div>
    );
};

export default History;