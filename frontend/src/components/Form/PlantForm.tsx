// PlantFormModal.tsx
import React, { FC, useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import './PlantForm.css';
import Downshift, { useCombobox } from 'downshift';

interface PlantFormProps {
  formIsOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: string, wateringTime: string) => Promise<void>;
  plantData?: { name: string; type: string; wateringTime: string }; // Optional for edit
}

const PlantForm: FC<PlantFormProps> = ({ formIsOpen, onClose, onSubmit, plantData }) => {
  const [plantName, setPlantName] = useState('');
  const [presetPlants, setPresetPlants] = useState<any[]>([]); // Adjusted for TypeScript
  const [plantType, setPlantType] = useState('');
  const [wateringTime, setWateringTime] = useState('');

  const fetchPresetPlants = useCallback(async () => {
    try {
      const response = await fetch('/api/plants');
      const data = await response.json();
      if (response.ok) {
        setPresetPlants(data);
      } else {
        throw new Error(data.message || 'Error fetching presets');
      }
    } catch (error: any) {
    }
  }, []);

  function getPlantsFilter(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase()

    return function plantsFilter(plant) {
      return (
        !inputValue ||
        plant.type.toLowerCase().includes(lowerCasedInputValue)
      )
    }
  }

  const PlantDropdown = () => {
    fetchPresetPlants();
    const [items, setItems] = useState(presetPlants)
    const [selectedItem, setSelectedItem] = React.useState(null)

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      onInputValueChange({inputValue}) {
        setItems(presetPlants.filter(getPlantsFilter(inputValue)))
      },
      items,
      itemToString(item) {
        return item ? item.type : ''
      },
      selectedItem,
      onSelectedItemChange: ({selectedItem: newSelectedItem}) => {
        setSelectedItem(newSelectedItem);
        setPlantType(newSelectedItem.type);
      },
    })

    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
          <label htmlFor="plantType" className="w-fit" {...getLabelProps()}>
            Plant Type:
          </label>
          <div className="flex shadow-sm bg-white gap-0.5">
            <input
              id="plantType"
              placeholder="Select your plant type"
              className="flex form-control mt-2"
              {...getInputProps()}
            />
            <button
              aria-label="toggle menu"
              className="flex bg-white shadow-sm px-2"
              type="button"
              {...getToggleButtonProps()}
            >
              <svg
                    viewBox="0 0 20 20"
                    preserveAspectRatio="none"
                    width={16}
                    fill="transparent"
                    stroke="#979797"
                    strokeWidth="1.1px"
                    transform={isOpen ? 'rotate(180)' : undefined}
                  >
                    <path d="M1,6 L10,15 L19,6" />
              </svg>
            </button>
          </div>
        </div>
        <ul
          className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={cx(
                  highlightedIndex === index && 'bg-blue-300',
                  plantType === item && 'font-bold',
                  'py-2 px-3 shadow-sm flex flex-col',
                )}
                key={item._id.toString()}
                {...getItemProps({item, index})}
              >
                <span>{item.type}</span>
              </li>
            ))}
        </ul>
        <p className="font-semibold">
          {plantType
            ? `You have selected ${plantType}.`
            : 'Select a plant type!'}
        </p>
      </div>
    )
  }

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

  if (!formIsOpen) return null; // Don't render the modal if it's not open

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
                <PlantDropdown />
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
