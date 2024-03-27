import React, { FC, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlantForm from '../Form/PlantForm.tsx';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [plants, setPlants] = useState<any[]>([]); // Adjusted for TypeScript
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<{ _id: string; name: string; type: string; wateringTime: string } | null>(null);

  const displayNotification = (message: string, type: "success" | "error" | "info") => {
    toast[type](message);
  };

  const fetchPlants = useCallback(async () => {
    console.log('fetching plants')
    try {
      const response = await fetch('/api/plants/');
      const data = await response.json();
      if (response.ok) {
        setPlants(data);
      } else {
        throw new Error(data.message || 'Error fetching plants');
      }
    } catch (error: any) {
      displayNotification('Error fetching plants', 'error');
    }
  }, []);

  const fetchPresetPlants = useCallback(async () => {
    console.log('fetching preset plants')
    try {
      const response = await fetch('/api/plants/presets');
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        throw new Error(data.message || 'Error fetching presets');
      }
    } catch (error: any) {
      displayNotification('Error fetching presets', 'error');
    }
  }, []);

  useEffect(() => {
    fetchPlants();
    fetchPresetPlants();
  }, [fetchPlants, fetchPresetPlants]);
  

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
      displayNotification('Error deleting plant', 'error');
    }
  };

  // Function to open modal for adding a new plant
  const handleAddPlantClick = () => {
    setEditingPlant(null); // Ensure no plant data is set for adding
    setIsModalOpen(true);
  };

  // Function to open modal for editing an existing plant
const handleEditPlantClick = async (plantId: string) => {
  try {
    const response = await fetch(`/api/plants/${plantId}`);
    const data = await response.json();
    if (response.ok) {
      setEditingPlant(data); // Set the current plant data to edit
      setIsModalOpen(true);
    } else {
      throw new Error(data.message || 'Failed to fetch plant details');
    }
  } catch (error: any) {
    displayNotification('Error fetching plant details', 'error');
  }
};

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to submit the form data
  const handleSubmit = async (name: string, type: string, wateringTime: string) => {
    if (editingPlant) {
      // call the API to update the plant
    try {
      const response = await fetch(`/api/plants/${editingPlant._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, type, wateringTime }),
      });
      const data = await response.json();
      if (response.ok) {
        displayNotification('Plant updated successfully!', 'success');
        fetchPlants(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to update plant');
      }
    } catch (error: any) {
      displayNotification('Error updating plant', 'error');
    }
    } else {
       // call api to add new plant
      try {
        const response = await fetch('/api/plants/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, type, wateringTime }),
        });
        const data = await response.json();
        if (response.ok) {
          displayNotification('Plant added successfully!', 'success');
          fetchPlants(); // Refresh the list
          closeModal(); // Close the modal
        } else {
          throw new Error(data.message || 'Failed to add plant');
        }
      } catch (error: any) {
        displayNotification('Error adding plant', 'error');
      }
    }
    closeModal();
  };
  

  // LOGIC FOR CRON JOBS
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/');

    ws.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("WebSocket Message:", message);
      if (message.type === 'notification') {
          displayNotification(message.message, 'info');
      }
  };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    return () => {
        ws.close();
    };
    }, []);

  return (
    <div className="container">
      <h1 className="mt-4 mb-4 fw-bold">Plant Watering App</h1>


    {/* Plant List */}
    <div className="card mt-4 shadow">
      <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
        <p className="m-0 fs-3">Plant List</p>
        <button onClick={handleAddPlantClick} className="btn btn-light ms-auto text-dark">Add Plant</button>
      </div>
      <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
        <ul id="plantsList" className="list-group">
          {/* Header Row */}
          <li className="list-group-item bg-light">
            <div className="row">
              <div className="col fw-bold fs-5">Name</div>
              <div className="col fw-bold fs-5">Type</div>
              <div className="col fw-bold fs-5">Watering Time</div>
              <div className="col fw-bold fs-5 text-end">Actions</div> {/* Right-aligned header */}
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
                    onClick={() => handleEditPlantClick(plant._id)}
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

    {/* Plant Form Modal */}
    <PlantForm
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      plantData={editingPlant ? { name: editingPlant.name, type: editingPlant.type, wateringTime: editingPlant.wateringTime } : undefined}
    />

    </div>
  );
};

export default Home;
