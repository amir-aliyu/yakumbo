import React from "react";

const Friends = () => {
    // Sample data for the table
    const friendsData = [
        { id: 1, name: "Amir", profilePicture: "url_to_amir_image", dashboardLink: "/amir-dashboard", plantPoints: 100, wateringStreak: 5 },
        { id: 2, name: "Jon", profilePicture: "url_to_jon_image", dashboardLink: "/jon-dashboard", plantPoints: 80, wateringStreak: 3 },
        { id: 3, name: "Evelyn", profilePicture: "url_to_evelyn_image", dashboardLink: "/evelyn-dashboard", plantPoints: 120, wateringStreak: 7 }
    ];

    return (
        <div className="card mt-4 shadow">
            <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
                <p className="m-0 fs-3">Friends List</p>
                <button className="btn btn-light ms-auto text-dark">Add Friend</button>
            </div>
            <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Name</th>
                            <th>Dashboard</th>
                            <th>Plant Points</th>
                            <th>Watering Streak</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friendsData.map(friend => (
                            <tr key={friend.id}>
                                <td>
                                    <img src={friend.profilePicture} alt={friend.name} width="50" height="50" />
                                </td>
                                <td>{friend.name}</td>
                                <td>
                                    <a href={friend.dashboardLink} target="_blank" rel="noopener noreferrer">Dashboard</a>
                                </td>
                                <td>{friend.plantPoints}</td>
                                <td>{friend.wateringStreak}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Friends;