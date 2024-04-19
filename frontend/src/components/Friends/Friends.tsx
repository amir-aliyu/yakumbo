import React, {useState, useEffect} from "react";


const Friends = () => {
    // Sample data for the table
    const [friendsData, setFriendsData] = useState([
        { id: 1, name: "Amir", profilePicture: "url_to_amir_image", dashboardLink: "/amir-dashboard", plantPoints: 100, wateringStreak: 5, uuid: "a" },
        { id: 2, name: "Jon", profilePicture: "url_to_jon_image", dashboardLink: "/jon-dashboard", plantPoints: 80, wateringStreak: 3, uuid: "b" },
        { id: 3, name: "Evelyn", profilePicture: "url_to_evelyn_image", dashboardLink: "/evelyn-dashboard", plantPoints: 120, wateringStreak: 7, uuid: "c"}
    ]);
const [email, setEmail] = useState(''); // Email of the friend to add
const [uuid, setUuid] = useState<string>(''); // Current user's UUID

useEffect(() => {
    getFriends();
    fetch('http://localhost:4000/api/accounts/cookies', { // Get the current user's UUID
      method: 'GET',
      credentials: 'include', // Include credentials
    })
    .then(response => response.json())
    .then(data => {setUuid(data.uuid);})
    .catch(error => console.error('Error:', error));
    console.log(uuid);
  }, [uuid]);

// Function to get the friends
const getFriends = async () => { // Fetch friends data
    // If uuid isn't set, return early
    if (!uuid) return;
    try {
        const response = await fetch(`http://localhost:4000/api/accounts/${uuid}`);
        const data = await response.json();
        console.log("Friends data: ", data.friends)
        const friendUuids = data.friends;
        const friendPromises = friendUuids.map(async (friendUuid: string) => {
            const friendResponse = await fetch(`http://localhost:4000/api/accounts/${friendUuid}`);
            const friendData = await friendResponse.json();
            return {
                id: friendData.id,
                name: friendData.name,
                // TODO: Add profilePicture, dashboardLink, plantPoints, wateringStreak to the account schema
                profilePicture: friendData.profilePicture,
                dashboardLink: friendData.dashboardLink,
                plantPoints: friendData.plantPoints,
                wateringStreak: friendData.wateringStreak,
                uuid: friendUuid
            };
        });
        const friends = await Promise.all(friendPromises);
        setFriendsData(prevData => [...prevData, ...friends]); // Add friends to the state
    } catch (error: any) {
        console.error('Error:', error);
    }
};

useEffect(() => {
    setFriendsData([]);
    fetch('http://localhost:4000/api/accounts/cookies', { // Get the current user's UUID
      method: 'GET',
      credentials: 'include', // Include credentials
    })
    .then(response => response.json())
    .then(data => {
      setUuid(data.uuid);
      getFriends(); // Call getFriends after uuid has been set
    })
    .catch(error => console.error('Error:', error));
  }, []);
  
// Function to add a friend
const addFriend = async () => {
    try {
        const response = await fetch(`http://localhost:4000/api/accounts/${uuid}/friends`, { // Add friend to the user's friends list
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friend: email }),
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
        throw new Error(data.message || 'Failed to add friend');
        } else {
            setFriendsData(prevData => [ // Add the new friend to the state
                ...prevData,
                {
                    id: prevData.length + 1,
                    name: data.name,
                    profilePicture: "url_to_profile_image",
                    dashboardLink: "/dashboard",
                    plantPoints: 0,
                    wateringStreak: 0,
                    uuid: data.uuid
                }
            ]);
        }
        
    } catch (error: any) {
      console.error('Error:', error);
    }
  };

// Function to remove a friend
const removeFriend = async (friendUuid: String) => {
    try {
        const response = await fetch(`http://localhost:4000/api/accounts/${uuid}/friends`, { // Remove friend from the user's friends list
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ friend: friendUuid }),
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove friend');
        } else {
            setFriendsData(prevData => prevData.filter(friend => friend.uuid !== friendUuid)); // Remove the friend from the state
        }
    } catch (error: any) {
        console.error('Error:', error);
    }
};

return (
    <div className="container">
        <h1 className="mt-4 mb-4 fw-bold">My Friends</h1>
        <div className="card mt-4 shadow">
            <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
                <p className="m-0 fs-3">Friends List</p>
                <div className="ms-auto d-flex align-items-center">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Search for a friend by email"
                        className="form-control"
                    />
                    <button onClick={addFriend} className="btn btn-light ms-2" style={{ whiteSpace: 'nowrap' }}>Add Friend</button>
                </div>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {friendsData.map(friend => (
                            <tr key={friend.uuid}>
                                <td>
                                    <img src={friend.profilePicture} alt={friend.name} width="50" height="50" />
                                </td>
                                <td>{friend.name}</td>
                                <td>
                                    <a href={"/"+friend.uuid} target="_blank" rel="noopener noreferrer">Dashboard</a>
                                </td>
                                <td>{friend.plantPoints}</td>
                                <td>{friend.wateringStreak}</td>
                                <td>
                                    <button onClick={() => removeFriend(friend.uuid)} className="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};



export default Friends;