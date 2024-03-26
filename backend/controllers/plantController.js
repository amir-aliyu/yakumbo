const Plant = require('../models/plantModel');

// Get all plants
const getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).json(plants);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific plant by ID
const getPlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json(plant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add new plant
const addPlant = async (req, res) => {
    const { name, type, wateringTime } = req.body;
    try {
        const plant = await Plant.create({ name, type, wateringTime });
        res.status(200).json(plant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a plant by ID
const updatePlantById = async (req, res) => {
    try {
        const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json(plant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a plant by ID
const deletePlantById = async (req, res) => {
    try {
        const result = await Plant.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json({ message: `Plant with ID ${req.params.id} deleted` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllPlants,
    getPlantById,
    addPlant,
    updatePlantById,
    deletePlantById
};
