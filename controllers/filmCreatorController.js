// controllers/filmCreatorController.js
const FilmCreatorService = require('../services/filmCreatorService');

const getFilmCreators = async (req, res) => {
    try {
        const filmCreators = await FilmCreatorService.getFilmCreators();
        res.json(filmCreators);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFilmCreatorById = async (req, res) => {
    try {
        const filmCreator = await FilmCreatorService.getFilmCreatorById(req.params.id);
        if (filmCreator) {
            res.json(filmCreator);
        } else {
            res.status(404).json({ error: 'Film Creator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getFilmCreatorByFilmId = async (req, res) => {
    try {
        const filmCreator = await FilmCreatorService.getFilmCreatorByFilmId(req.params.id);
        if (filmCreator) {
            res.json(filmCreator);
        } else {
            res.status(404).json({ error: 'Film Creator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFilmCreator = async (req, res) => {
    try {
        const filmCreator = await FilmCreatorService.createFilmCreator(req.body);
        res.status(201).json(filmCreator);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFilmCreator = async (req, res) => {
    try {
        const filmCreator = await FilmCreatorService.getFilmCreatorById(req.params.id);
        if (filmCreator) {
            await FilmCreatorService.updateFilmCreator(filmCreator, req.body);
            res.json(filmCreator);
        } else {
            res.status(404).json({ error: 'Film Creator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFilmCreator = async (req, res) => {
    try {
        const filmCreator = await FilmCreatorService.getFilmCreatorById(req.params.id);
        if (filmCreator) {
            await FilmCreatorService.deleteFilmCreator(filmCreator);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Film Creator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFilmCreators,
    getFilmCreatorById,
    getFilmCreatorByFilmId,
    createFilmCreator,
    updateFilmCreator,
    deleteFilmCreator
};