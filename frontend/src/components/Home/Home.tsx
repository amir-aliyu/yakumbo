import React, { FC, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlantForm from '../Form/PlantForm.tsx';
//import test from 'node:test';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [plants, setPlants] = useState<any[]>([]); // Adjusted for TypeScript
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<{ _id: string; name: string; type: string; wateringTime: string, image: string } | null>(null);

  const displayNotification = (message: string, type: "success" | "error" | "info") => {
    toast[type](message, {position: 'bottom-right'});
  };

  const fetchPlants = useCallback(async () => {
    console.log('fetching plants')
    try {
      const response = await fetch('/api/plants/');
      const data = await response.json();
      if (response.ok) {
        console.log('plants')
        console.log(data);
        setPlants(data);
      } else {
        throw new Error(data.message || 'Error fetching plants');
      }
    } catch (error: any) {
      displayNotification('Error fetching plants', 'error');
    }
  }, []);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  // Function to convert an image to base64 encoding
  // (This could be moved to the server side so we can use jimp to resize the image before converting it to base64)
  const imageToBase64 = async (image: File) => {
    // Return a promise that resolves with the base64 string
    return new Promise<string>((resolve, reject) => {
      // Create a new FileReader
      const reader = new FileReader();
      // Set the onload event handler
      reader.onload = () => {
        // Resolve the promise with the result
        resolve((reader.result as string).substring(22)); // Remove the data URL prefix (data:image/png;base64,)
      };
      // Set the onerror event handler
      reader.onerror = () => {
        // Reject the promise with an error
        reject(new Error('Failed to read image file'));
      };
      // Read the image file as a data URL
      reader.readAsDataURL(image);
    });
  };

  // Function to handle file selection
  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected file
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Convert the file to base64
        const base64 = await imageToBase64(file);
        console.log(base64);
      } catch (error: any) {
        console.error('Error converting image:', error);
      }
    }
  };

  const deletePlant = async (plantId: string) => {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        fetchPlants(); // Refresh the list
        displayNotification('Plant deleted successfully!', 'success');
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

  // function to update the watering streak
  const updateStreak = async (plantId: string) => {
    try {
      // Fetch the current plant data
      const response = await fetch(`/api/plants/${plantId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch plant details');
      }
      
      // Increment the streak by 1
      const newStreak = data.streak + 1;
      
      // Update the streak via PATCH request
      const updateResponse = await fetch(`/api/plants/${plantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ streak: newStreak }),
      });
      
      if (updateResponse.ok) {
        displayNotification('Streak updated successfully!', 'success');
        fetchPlants(); // Refresh the plant list
      } else {
        throw new Error('Failed to update streak');
      }
    } catch (error: any) {
      displayNotification('Error updating streak', 'error');
    }
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
  const handleSubmit = async (name: string, type: string, wateringTime: string, image: string) => {
    if (editingPlant) {
      // call the API to update the plant
    try {
      const response = await fetch(`/api/plants/${editingPlant._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, type, wateringTime, image }),
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
          body: JSON.stringify({ name, type, wateringTime, image }),
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

  return (
    <div className="container">
      <h1 className="mt-4 mb-4 fw-bold">My Plants</h1>


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
              <div className="col fw-bold fs-5">Watering Days</div>
              <div className="col fw-bold fs-5">Watering Streak</div>
              <div className="col fw-bold fs-5 text-end">Actions</div> {/* Right-aligned header */}
            </div>
          </li>
          {/* Plant Items */}
          {plants.map((plant: any) => (
            <li key={plant._id} className="list-group-item">
              <div className="row">
                <div className="col">
                  {/* NOTE: The base64 string should start with a / */}
                  {plant.image ? 
    <img src={`data:image/png;base64, ${plant.image}`} className={"me-2"} style={{ width: '50px', height: '50px' }} /> 
    : null}
                  {plant.name}
                </div>
                <div className="col">
                  {plant.type}
                </div>
                <div className="col">
                  {plant.wateringTime}
                </div>
                <div className="col">
                  {plant.streak}     
                <button
                    className="btn btn-light btn-sm"
                    style={{ width: '75px' }}
                    onClick={() => updateStreak(plant._id)}
                  >
                    Watered
                  </button>
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
      formIsOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      plantData={editingPlant ? { name: editingPlant.name, type: editingPlant.type, wateringTime: editingPlant.wateringTime, image: editingPlant.image } : undefined}
    />

    </div>
  );
};

export default Home;
