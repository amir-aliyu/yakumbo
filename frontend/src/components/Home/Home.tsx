import React, { FC, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [plants, setPlants] = useState<any[]>([]); // Adjusted for TypeScript
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [wateringTime, setWateringTime] = useState('');

  const displayNotification = (message: string, type: "success" | "error" | "info") => {
    toast[type](message);
  };

  const fetchPlants = useCallback(async () => {
    console.log('fetching plants')
    try {
      const response = await fetch('/api/plants/');
      console.log(response)
      const data = await response.json();
      if (response.ok) {
        setPlants(data);
      } else {
        throw new Error(data.message || 'Error fetching plants');
      }
    } catch (error: any) {
      displayNotification(error.message || 'Error fetching plants. Please try again.', 'error');
    }
  }, []);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  const addPlant = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/plants/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: plantName, type: plantType, wateringTime: wateringTime }),
      });
      const data = await response.json();
      if (response.ok) {
        displayNotification('Plant added successfully!', 'success');
        fetchPlants(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to add plant');
      }
    } catch (error: any) {
      displayNotification(error.message || 'Error adding plant. Please try again.', 'error');
    }
  };

  const deletePlant = async (plantId: string) => {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        displayNotification('Plant deleted successfully!', 'success');
        fetchPlants(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to delete plant');
      }
    } catch (error: any) {
      displayNotification(error.message || 'Error deleting plant. Please try again.', 'error');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Plant Watering App</h1>

      {/* Add Plant Form */}
      <div className="card mb-4">
        <div className="card-header">Add a Plant</div>
        <div className="card-body">
          <form onSubmit={addPlant}>
            <div className="form-group">
              <label htmlFor="plantName">Plant Name:</label>
              <input
                type="text"
                className="form-control mt-2"
                id="plantName"
                placeholder="Enter plant name"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="plantType">Plant Type:</label>
              <input
                type="text"
                className="form-control mt-2"
                id="plantType"
                placeholder="Enter plant type"
                value={plantType}
                onChange={(e) => setPlantType(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="wateringTime">Watering Time (in seconds):</label>
              <input
                type="number"
                className="form-control mt-2"
                id="wateringTime"
                placeholder="Enter watering time"
                value={wateringTime}
                onChange={(e) => setWateringTime(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Add Plant
            </button>
          </form>
        </div>
      </div>

{/* Plant List */}
<div className="card mt-4">
  <div className="card-header">Plants List</div>
  <div className="card-body">
    <ul id="plantsList" className="list-group">
      {/* Header Row */}
      <li className="list-group-item">
        <div className="row">
          <div className="col fw-bold">Name</div>
          <div className="col fw-bold">Type</div>
          <div className="col fw-bold">Watering Time</div>
          <div className="col fw-bold text-end">Actions</div> {/* Right-aligned header */}
        </div>
      </li>
      {/* Plant Items */}
      {plants.map((plant: any) => (
        <li key={plant._id} className="list-group-item">
          <div className="row">
            <div className="col">
              {plant.name}
            </div>
            <div className="col">
              {plant.type}
            </div>
            <div className="col">
              {plant.wateringTime}s
            </div>
            <div className="col text-end">
              <button
                className="btn btn-info btn-sm me-2"
                style={{ width: '75px' }}
                onClick={() => deletePlant(plant._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                style={{ width: '75px' }}
                onClick={() => deletePlant(plant._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>




    </div>
  );
};

export default Home;
