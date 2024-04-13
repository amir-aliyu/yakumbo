// PlantFormModal.tsx
import React, { FC, useState, useEffect, useCallback } from 'react';
import './PlantForm.css';
import { TextField, Button, Autocomplete, Box, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import genericPlant from './genericplant.tsx';

interface PlantFormProps {
  formIsOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: string, wateringTime: string, image: string) => Promise<void>;
  plantData?: { name: string; type: string; wateringTime: string, image:string }; // Optional for edit
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

  useEffect(() => {
    fetchPresetPlants();
  }, [fetchPresetPlants]);

  function PlantForm() {

    const [formPlantName, setFormPlantName] = useState(plantData ? plantData.name : '');
    const [formPlantType, setFormPlantType] = useState(plantData ? plantData.type : '');
    const [formWateringTime, setFormWateringTime] = useState(plantData ? plantData.wateringTime : 'Sunday');
    const [formPlantImage, setFormPlantImage] = useState(plantData ? plantData.image : '');
    const [inputValue, setInputValue] = useState('');

    const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
      // Get the selected file
      const file = event.target.files?.[0];
      if (file) {
        try {
          // Convert the file to base64
          const base64 = await imageToBase64(file);
          setFormPlantImage(base64);
          console.log(base64);
        } catch (error: any) {
          console.error('Error converting image:', error);
        }
      }
    };

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
              setFormPlantType(newValue as string);
              if (newValue) {
                const plant = presetPlants.find((plant) => plant.type === newValue);
                if (plant && typeof plant.wateringTime === 'string') {
                  setFormWateringTime(presetPlants.find((plant) => plant.type === newValue).wateringTime);
                }
                console.log(presetPlants.find((plant) => plant.type === newValue).wateringTime);
                setFormPlantImage(presetPlants.find((plant) => plant.type === newValue).image);
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
          <Autocomplete
              multiple
              id="formWateringTime"
              options={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
              getOptionLabel={(option) => option}
              value={typeof formWateringTime === 'string' ? formWateringTime.split(" ") : formWateringTime}
              onChange={(event, newValue: string[]) => {
                  console.log("HERE")
                  setFormWateringTime(newValue.join(' '));
                  console.log(formWateringTime)
                  console.log("HERE2")
              }}
              renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Watering Days" placeholder="Select Watering Days" fullWidth />
              )}
          />
          <label htmlFor="formPlantImage" className="form-label mt-4">Plant Image: &nbsp;&nbsp;&nbsp;</label>
          <label className="btn btn-warning text-dark">
            <CloudUploadIcon />
            &nbsp;&nbsp;Upload file
            <input type="file" hidden onChange={handleFileSelection} />
          </label>
          {formPlantImage ? 
              <img src={`data:image/png;base64, ${formPlantImage}`} className={"ms-2 mt-2"} style={{ width: '25%', height: '25%' }} /> 
          : <img src={`data:image/png;base64, ${genericPlant}`} className={"ms-2 mt-2"} style={{ width: '25%', height: '25%' }} />
          }
          <TextField
            id="formPlantImage" 
            name="formPlantImage"
            hidden
            value={formPlantImage}
          />
          <TextField
            id="formWateringTime" 
            name="formWateringTime"
            hidden
            value={formWateringTime}
          />
          <br />
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
      'formWateringTime:', data.get('formWateringTime'),
      'formPlantImage:', data.get('formPlantImage')
    )
    event.preventDefault();
    await onSubmit(
      data.get('formPlantName')?.toString() ?? '',
      data.get('formPlantType')?.toString() ?? '',
      data.get('formWateringTime')?.toString() ?? '',
      data.get('formPlantImage')?.toString() ?? ''
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
