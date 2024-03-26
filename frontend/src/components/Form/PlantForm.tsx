// PlantFormModal.tsx
import React, { FC, useState, useEffect } from 'react';
import './PlantForm.css';

interface PlantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: string, wateringTime: string) => Promise<void>;
  plantData?: { name: string; type: string; wateringTime: string }; // Optional for edit
}

const PlantForm: FC<PlantFormProps> = ({ isOpen, onClose, onSubmit, plantData }) => {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [wateringTime, setWateringTime] = useState('');

  useEffect(() => {
    if (plantData) {
      setPlantName(plantData.name);
      setPlantType(plantData.type);
      setWateringTime(plantData.wateringTime);
    } else {
      setPlantName('');
      setPlantType('');
      setWateringTime('');
    }
  }, [plantData]);

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(plantName, plantType, wateringTime);
    handleClose(); // Close the modal and reset the form on successful submission
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  const resetForm = () => {
    setPlantName('');
    setPlantType('');
    setWateringTime('');
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      {/* Overlay */}
      <div className="modal-backdrop"></div>
      {/* Modal Content */}
      <div className="modal-dialog">
        <div className="modal-content bg-light">
          <div className="modal-header bg-warning">
            <h5 className="modal-title">{plantData ? 'Edit Plant' : 'Add a New Plant'}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              
            {/* Add Plant Form */}
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
            <button type="submit" className="btn btn-warning mt-2 text-dark">
              {plantData ? 'Confirm Edit' : 'Add Plant'}
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantForm;
