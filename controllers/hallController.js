// controllers/hallController.js
const HallService = require('../services/hallService');

const getHalls = async (req, res) => {
    try {
        const halls = await HallService.getHalls();
        res.json(halls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHallById = async (req, res) => {
    try {
        const hall = await HallService.getHallById(req.params.id);
        if (hall) {
            res.json(hall);
        } else {
            res.status(404).json({ error: 'Hall not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createHall = async (req, res) => {
    try {
        const hall = await HallService.createHall(req.body);
        res.status(201).json(hall);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateHall = async (req, res) => {
    try {
        const hall = await HallService.getHallById(req.params.id);
        if (hall) {
            await HallService.updateHall(hall, req.body);
            res.json(hall);
        } else {
            res.status(404).json({ error: 'Hall not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteHall = async (req, res) => {
    try {
        const hall = await HallService.getHallById(req.params.id);
        if (hall) {
            await HallService.deleteHall(hall);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Hall not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getHalls,
    getHallById,
    createHall,
    updateHall,
    deleteHall
};