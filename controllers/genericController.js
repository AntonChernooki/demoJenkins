// controllers/genericController.js
const GenericService = require('../services/genericService');

const getGenerics = async (req, res) => {
    try {
        const generics = await GenericService.getGenerics();
        res.json(generics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getGenericById = async (req, res) => {
    try {
        const generic = await GenericService.getGenericById(req.params.id);
        if (generic) {
            res.json(generic);
        } else {
            res.status(404).json({ error: 'Generic not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createGeneric = async (req, res) => {
    try {
        const generic = await GenericService.createGeneric(req.body);
        res.status(201).json(generic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateGeneric = async (req, res) => {
    try {
        const generic = await GenericService.getGenericById(req.params.id);
        if (generic) {
            await GenericService.updateGeneric(generic, req.body);
            res.json(generic);
        } else {
            res.status(404).json({ error: 'Generic not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteGeneric = async (req, res) => {
    try {
        const generic = await GenericService.getGenericById(req.params.id);
        if (generic) {
            await GenericService.deleteGeneric(generic);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Generic not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getGenerics,
    getGenericById,
    createGeneric,
    updateGeneric,
    deleteGeneric
};