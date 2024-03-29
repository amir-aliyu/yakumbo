// PlantFormModal.tsx
import React, { FC, useState, useEffect, useCallback } from 'react';
import './PlantForm.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

interface PlantFormProps {
  formIsOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: string, wateringTime: string) => Promise<void>;
  plantData?: { name: string; type: string; wateringTime: string }; // Optional for edit
}

const PlantForm: FC<PlantFormProps> = ({ formIsOpen, onClose, onSubmit, plantData }) => {
  const [presetPlants, setPresetPlants] = useState<any[]>([]); // Adjusted for TypeScript

  const fetchPresetPlants = useCallback(async () => {
    try {
      const response = await fetch('/api/plants/presets');
      const data = await response.json();
      if (response.ok) {
        setPresetPlants(data);
      } else {
      }
    } catch (error: any) {
    }
  }, []);

  useEffect(() => {
    fetchPresetPlants();
  }, [fetchPresetPlants]);

  function PlantForm() {

    const [formPlantName, setFormPlantName] = useState(plantData ? plantData.name : '')
    const [formPlantType, setFormPlantType] = useState(plantData ? plantData.type : '')
    const [formWateringTime, setFormWateringTime] = useState(plantData ? plantData.wateringTime : '')
    const [inputValue, setInputValue] = useState('')

    return (
        <Box component="form" onSubmit={handleSubmit}>
          {/* Add Plant Form */}
          <TextField
            required
            className="mt-2"
            id="formPlantName" 
            name="formPlantName"
            label="Plant Name"
            value={formPlantName}
            fullWidth
            onChange={(e) => setFormPlantName(e.target.value)}
          />
          <Autocomplete
            freeSolo
            className="mt-2"
            value={formPlantType}
            onChange={(event: any, newValue: string | null) => {
              setFormPlantType(newValue);
              if (newValue) {
                setFormWateringTime(presetPlants.find((plant) => plant.type === newValue).wateringTime);
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              setFormPlantType(newInputValue);
            }}
            id="formPlantType"
            options={presetPlants.map((option) => option.type)}
            sx={{ width: "full" }}
            renderInput={(params) => <TextField
                {...params}
                required
                label="Plant Type"
                name="formPlantType"
            />}
          />
          <TextField
            required
            className="mt-2"
            id="formWateringTime" 
            name="formWateringTime"
            label="Watering Time (s)"
            value={formWateringTime}
            fullWidth
            onChange={(e) => setFormWateringTime(e.target.value)}
          />
          <button type="submit" className="btn btn-warning mt-4 text-dark">
            {plantData ? 'Confirm Edit' : 'Add Plant'}
          </button>
        </Box>
    );
  }

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    console.log(
        'formPlantName:', data.get('formPlantName'),
        'formPlantType:', data.get('formPlantType'),
        'formWateringTime:', data.get('formWateringTime')
    )
    event.preventDefault();
    await onSubmit(
        data.get('formPlantName').toString(),
        data.get('formPlantType').toString(),
        data.get('formWateringTime').toString()
    );
    handleClose(); // Close the modal and reset the form on successful submission
  };

  if (!formIsOpen) return null; // Don't render the modal if it's not open

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
            <PlantForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantForm;
