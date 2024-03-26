const express = require('express');
const router = express.Router();

const {
    getAllPlants,
    getPlantById,
    addPlant,
    updatePlantById,
    deletePlantById
} = require('../controllers/plantController');

// GET Requests
router.get('/', getAllPlants);
router.get('/:id', getPlantById);

// POST Requests
router.post('/', addPlant)

// PATCH Requests
router.patch('/:id', updatePlantById);

// DELETE Requests
router.delete('/:id', deletePlantById);


module.exports = router;