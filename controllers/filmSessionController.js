// controllers/filmSessionController.js

const FilmSessionService = require('../services/filmSessionService');

const getFilmSessions = async (req, res) => {
    try {
        const filmSessions = await FilmSessionService.getFilmSessions();
        res.json(filmSessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFilmSessionById = async (req, res) => {
    try {
        const filmSession = await FilmSessionService.getFilmSessionById(req.params.id);
        if (filmSession) {
            res.json(filmSession);
        } else {
            res.status(404).json({ error: 'Film Session not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Новая функция для получения сеансов по ID фильма
const getSessionsByFilmId = async (req, res) => {
    const filmId = req.params.filmId;
    try {
        const filmSessions = await FilmSessionService.getSessionsByFilmId(filmId); // Предполагается, что эта функция реализована в сервисе
        if (filmSessions.length > 0) {
            res.json(filmSessions);
        } else {
            res.status(404).json({ error: 'No sessions found for the given film ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFilmSession = async (req, res) => {
    try {
        const filmSession = await FilmSessionService.createFilmSession(req.body);
        res.status(201).json(filmSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFilmSession = async (req, res) => {
    try {
        const filmSession = await FilmSessionService.getFilmSessionById(req.params.id);
        if (filmSession) {
            await FilmSessionService.updateFilmSession(filmSession, req.body);
            res.json(filmSession);
        } else {
            res.status(404).json({ error: 'Film Session not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFilmSession = async (req, res) => {
    try {
        const filmSession = await FilmSessionService.getFilmSessionById(req.params.id);
        if (filmSession) {
            await FilmSessionService.deleteFilmSession(filmSession);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Film Session not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAvailableSeatsBySessionId = async (req, res) => {
    const sessionId = req.params.id;
    console.log(`Fetching available seats for session ID: ${sessionId}`);
    try {
        const availableSeats = await FilmSessionService.getAvailableSeatsBySessionId(sessionId);
        if (availableSeats.length > 0) {
            res.json(availableSeats);
        } else {
            res.status(404).json({ error: 'No available seats found' });
        }
    } catch (error) {
        console.error('Error fetching available seats:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFilmSessions,
    getFilmSessionById,
    getSessionsByFilmId,
    createFilmSession,
    updateFilmSession,
    getAvailableSeatsBySessionId,
    deleteFilmSession
};